import { useRef, useState, useCallback, useEffect } from 'react';
import type { TryOnStatus } from '@/types/tryon';

interface UseCameraReturn {
  videoRef:       React.RefObject<HTMLVideoElement>;
  status:         TryOnStatus;
  errorMessage:   string | null;
  startCamera:    () => Promise<void>;
  stopCamera:     () => void;
  switchCamera:   () => Promise<void>;
  facingMode:     'user' | 'environment';
}

export function useCamera(): UseCameraReturn {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const streamRef   = useRef<MediaStream | null>(null);

  const [status,       setStatus]       = useState<TryOnStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [facingMode,   setFacingMode]   = useState<'user' | 'environment'>('user');

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
  }, []);

  const startCamera = useCallback(async (facing: 'user' | 'environment' = facingMode) => {
    // Check browser support
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unsupported');
      setErrorMessage('Your browser does not support camera access. Please try Chrome or Safari.');
      return;
    }

    setStatus('requesting-permission');
    setErrorMessage(null);

    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width:  { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatus('loading-mediapipe');
    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setStatus('permission-denied');
          setErrorMessage('Camera permission was denied. Please allow camera access in your browser settings and try again.');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setStatus('no-camera');
          setErrorMessage('No camera found on this device.');
        } else if (err.name === 'NotReadableError') {
          setStatus('error');
          setErrorMessage('Camera is in use by another application. Please close it and try again.');
        } else {
          setStatus('error');
          setErrorMessage(`Camera error: ${err.message}`);
        }
      } else {
        setStatus('error');
        setErrorMessage('An unexpected error occurred while accessing the camera.');
      }
    }
  }, [facingMode]);

  const switchCamera = useCallback(async () => {
    const next = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(next);
    await startCamera(next);
  }, [facingMode, startCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopCamera(); };
  }, [stopCamera]);

  return {
    videoRef,
    status,
    errorMessage,
    startCamera: () => startCamera(facingMode),
    stopCamera,
    switchCamera,
    facingMode,
  };
}
