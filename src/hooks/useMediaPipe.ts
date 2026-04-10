'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import type { LandmarkPoint, TryOnStatus } from '@/types/tryon';
import type { DetectionMode } from '@/lib/tryon/categoryMapping';

interface MediaPipeResults {
  faceLandmarks?: LandmarkPoint[];
  handLandmarks?: LandmarkPoint[];
}

interface UseMediaPipeReturn {
  results:       MediaPipeResults;
  isReady:       boolean;
  isTracking:    boolean;
  loadMediaPipe: (video: HTMLVideoElement, mode: DetectionMode) => Promise<void>;
  stopMediaPipe: () => void;
  setOnStatus:   (cb: (s: TryOnStatus) => void) => void;
}

export function useMediaPipe(): UseMediaPipeReturn {
  const faceMeshRef  = useRef<any>(null);
  const handsRef     = useRef<any>(null);
  const rafRef       = useRef<number | null>(null);
  const onStatusRef  = useRef<((s: TryOnStatus) => void) | null>(null);

  const [results,    setResults]    = useState<MediaPipeResults>({});
  const [isReady,    setIsReady]    = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  const setOnStatus = useCallback((cb: (s: TryOnStatus) => void) => {
    onStatusRef.current = cb;
  }, []);

  const stopMediaPipe = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsTracking(false);
    setResults({});
  }, []);

  const loadMediaPipe = useCallback(async (
    video: HTMLVideoElement,
    mode: DetectionMode,
  ) => {
    try {
      onStatusRef.current?.('loading-mediapipe');

      // Dynamically import MediaPipe — avoids SSR issues
      const needsFace = mode === 'face' || mode === 'both';
      const needsHand = mode === 'hand' || mode === 'both';

      let faceMesh: any = null;
      let hands: any    = null;

      if (needsFace) {
        const { FaceMesh } = await import('@mediapipe/face_mesh');
        faceMesh = new FaceMesh({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });
        faceMesh.setOptions({
          maxNumFaces:              1,
          refineLandmarks:          true,
          minDetectionConfidence:   0.6,
          minTrackingConfidence:    0.6,
        });
        faceMesh.onResults((res: any) => {
          const lms = res.multiFaceLandmarks?.[0];
          setResults(prev => ({
            ...prev,
            faceLandmarks: lms
              ? lms.map((l: any) => ({ x: l.x, y: l.y, z: l.z }))
              : undefined,
          }));
          const tracking = !!lms;
          setIsTracking(tracking);
          onStatusRef.current?.(tracking ? 'active' : 'tracking-lost');
        });
        await faceMesh.initialize();
        faceMeshRef.current = faceMesh;
      }

      if (needsHand) {
        const { Hands } = await import('@mediapipe/hands');
        hands = new Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands:              1,
          modelComplexity:          1,
          minDetectionConfidence:   0.65,
          minTrackingConfidence:    0.65,
        });
        hands.onResults((res: any) => {
          const lms = res.multiHandLandmarks?.[0];
          setResults(prev => ({
            ...prev,
            handLandmarks: lms
              ? lms.map((l: any) => ({ x: l.x, y: l.y, z: l.z }))
              : undefined,
          }));
          const tracking = !!lms;
          setIsTracking(tracking);
          onStatusRef.current?.(tracking ? 'active' : 'tracking-lost');
        });
        await hands.initialize();
        handsRef.current = hands;
      }

      setIsReady(true);
      onStatusRef.current?.('active');

      // ── RAF detection loop ──────────────────────
      const detect = async () => {
        if (video.readyState >= 2) {
          if (faceMeshRef.current) await faceMeshRef.current.send({ image: video });
          if (handsRef.current)    await handsRef.current.send({ image: video });
        }
        rafRef.current = requestAnimationFrame(detect);
      };

      rafRef.current = requestAnimationFrame(detect);

    } catch (err) {
      console.error('[MediaPipe] load error:', err);
      onStatusRef.current?.('error');
    }
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      stopMediaPipe();
      faceMeshRef.current?.close?.();
      handsRef.current?.close?.();
    };
  }, [stopMediaPipe]);

  return {
    results,
    isReady,
    isTracking,
    loadMediaPipe,
    stopMediaPipe,
    setOnStatus,
  };
}
