'use client';
import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlipHorizontal, SwitchCamera } from 'lucide-react';
import { useCamera }    from '@/hooks/useCamera';
import { useMediaPipe } from '@/hooks/useMediaPipe';
import { useOverlay }   from '@/hooks/useOverlay';
import { useCapture }   from '@/hooks/useCapture';
import { getDetectionMode }  from '@/lib/tryon/categoryMapping';
import CameraPermissionUI    from './CameraPermissionUI';
import CaptureButton         from './CaptureButton';
import TryOnProductSelector  from './TryOnProductSelector';
import { getTryOnSupportedProducts } from '@/data/products';
import { buildTryOnEnquiryURL }      from '@/lib/whatsapp';
import { MessageCircle }             from 'lucide-react';
import type { Product } from '@/types/product';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  initialProduct?: Product | null;
}

export default function TryOnCanvas({ initialProduct }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeProduct, setActiveProduct] = useState<Product | null>(initialProduct ?? null);
  const [mirrored,      setMirrored]      = useState(true);
  const [started,       setStarted]       = useState(false);
  const [tryOnStatus,   setTryOnStatus]   = useState<import('@/types/tryon').TryOnStatus>('idle');

  const tryOnProducts = getTryOnSupportedProducts();

  // ── Hooks ───────────────────────────────────
  const {
    videoRef, status: camStatus, errorMessage,
    startCamera, stopCamera, switchCamera, facingMode,
  } = useCamera();

  const {
    results, isReady, loadMediaPipe, stopMediaPipe, setOnStatus,
  } = useMediaPipe();

  const { startRendering, stopRendering } = useOverlay({
    canvasRef,
    videoRef,
    product:       activeProduct,
    faceLandmarks: results.faceLandmarks,
    handLandmarks: results.handLandmarks,
    mirrored,
  });

  const {
    capturedImage, isCapturing, canShare,
    capture, download, share, clearCapture,
  } = useCapture();

  // ── Status propagation ───────────────────────
  useEffect(() => {
    setOnStatus(setTryOnStatus);
  }, [setOnStatus]);

  useEffect(() => {
    setTryOnStatus(camStatus);
  }, [camStatus]);

  // ── Start flow ───────────────────────────────
  const handleStart = useCallback(async () => {
    setStarted(true);
    await startCamera();
  }, [startCamera]);

  // When camera is ready (loading-mediapipe), kick off MediaPipe
  useEffect(() => {
    if (camStatus === 'loading-mediapipe' && videoRef.current && activeProduct) {
      const mode = getDetectionMode(activeProduct.tryOnType);
      loadMediaPipe(videoRef.current, mode).then(() => {
        startRendering();
      });
    }
  }, [camStatus, activeProduct, loadMediaPipe, startRendering, videoRef]);

  // Restart MediaPipe when product category changes (may need different model)
  const prevCategoryRef = useRef<string | null>(null);
  useEffect(() => {
    if (!activeProduct || !isReady) return;
    const prevCat = prevCategoryRef.current;
    const newCat  = activeProduct.category;
    if (prevCat && prevCat !== newCat) {
      const prevType = tryOnProducts.find(p => p.category === prevCat)?.tryOnType;
      const newType  = activeProduct.tryOnType;
      if (prevType && getDetectionMode(prevType) !== getDetectionMode(newType)) {
        // Need different model — reload
        stopMediaPipe();
        if (videoRef.current) {
          const mode = getDetectionMode(newType);
          loadMediaPipe(videoRef.current, mode).then(() => startRendering());
        }
      }
    }
    prevCategoryRef.current = newCat;
  }, [activeProduct, isReady, loadMediaPipe, startRendering, stopMediaPipe, tryOnProducts, videoRef]);

  // ── Stop everything ──────────────────────────
  const handleStop = useCallback(() => {
    stopRendering();
    stopMediaPipe();
    stopCamera();
    setStarted(false);
    setTryOnStatus('idle');
    clearCapture();
  }, [stopCamera, stopMediaPipe, stopRendering, clearCapture]);

  // ── Capture ──────────────────────────────────
  const handleCapture = useCallback(() => {
    if (canvasRef.current) capture(canvasRef.current);
  }, [capture]);

  const handleShare = useCallback(async () => {
    if (activeProduct) await share(activeProduct.name);
  }, [share, activeProduct]);

  // ── Determine overlay status ─────────────────
  const showPermissionUI =
    !started ||
    tryOnStatus === 'idle' ||
    tryOnStatus === 'requesting-permission' ||
    tryOnStatus === 'loading-mediapipe' ||
    tryOnStatus === 'permission-denied' ||
    tryOnStatus === 'no-camera' ||
    tryOnStatus === 'unsupported' ||
    tryOnStatus === 'error';

  const showTrackingLost = tryOnStatus === 'tracking-lost' && !showPermissionUI;

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">

      {/* ── Viewport ── */}
      <div className="relative rounded-sm overflow-hidden bg-white border border-[rgba(201,168,76,0.15)]"
        style={{ aspectRatio: '3/4' }}>

        {/* Hidden video source */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          playsInline
          muted
          autoPlay
        />

        {/* Canvas — main AR output */}
        <canvas
          ref={canvasRef}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            showPermissionUI && 'opacity-0',
          )}
        />

        {/* Capture flash overlay */}
        <AnimatePresence>
          {isCapturing && (
            <motion.div
              className="absolute inset-0 bg-white z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
          )}
        </AnimatePresence>

        {/* Captured image preview */}
        <AnimatePresence>
          {capturedImage && (
            <motion.div
              className="absolute inset-0 z-20"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={capturedImage} alt="Captured try-on" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera permission/status UI */}
        {showPermissionUI && (
          <CameraPermissionUI
            status={tryOnStatus}
            errorMessage={errorMessage}
            onRetry={started ? () => startCamera() : handleStart}
          />
        )}

        {/* Tracking lost hint */}
        <AnimatePresence>
          {showTrackingLost && (
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-ivory-DEFAULT/80 backdrop-blur-sm border border-[rgba(201,168,76,0.25)] rounded-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-body text-xs text-[rgba(10,10,10,0.8)]">
                {activeProduct?.category === 'ring' || activeProduct?.category === 'bracelet'
                  ? '✋ Show your hand to the camera'
                  : '👤 Position your face in the frame'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner frame decoration */}
        {['top-3 left-3 border-t border-l','top-3 right-3 border-t border-r',
          'bottom-3 left-3 border-b border-l','bottom-3 right-3 border-b border-r'].map((cls,i)=>(
          <div key={i} className={`absolute w-5 h-5 border-[rgba(201,168,76,0.35)] ${cls}`}/>
        ))}

        {/* Controls overlay (top-right) */}
        {started && tryOnStatus === 'active' && !capturedImage && (
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            <button
              onClick={() => setMirrored(m => !m)}
              title="Flip mirror"
              className="w-9 h-9 rounded-sm bg-ivory-DEFAULT/90 border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[rgba(10,10,10,0.7)] hover:text-obsidian-900 hover:border-[rgba(255,255,255,0.25)] transition-all"
            >
              <FlipHorizontal className="w-4 h-4" />
            </button>
            <button
              onClick={switchCamera}
              title="Switch camera"
              className="w-9 h-9 rounded-sm bg-ivory-DEFAULT/90 border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-[rgba(10,10,10,0.7)] hover:text-obsidian-900 hover:border-[rgba(255,255,255,0.25)] transition-all"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stop button */}
        {started && !capturedImage && (
          <div className="absolute bottom-3 left-3 z-10">
            <button
              onClick={handleStop}
              className="btn text-[0.58rem] px-3 py-2 bg-ivory-DEFAULT/90 border border-[rgba(255,255,255,0.12)] text-[rgba(10,10,10,0.6)] hover:text-red-400 hover:border-red-400/30 rounded-sm"
            >
              Stop
            </button>
          </div>
        )}
      </div>

      {/* ── Capture controls ── */}
      {started && (tryOnStatus === 'active' || tryOnStatus === 'tracking-lost') && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CaptureButton
            onCapture={handleCapture}
            onDownload={download}
            onShare={handleShare}
            onClear={clearCapture}
            capturedImage={capturedImage}
            isCapturing={isCapturing}
            canShare={canShare}
          />
        </motion.div>
      )}

      {/* ── Start CTA (before camera) ── */}
      {!started && (
        <motion.button
          onClick={handleStart}
          whileTap={{ scale: 0.97 }}
          className="btn btn-gold w-full justify-center py-4 text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-ivory-DEFAULT animate-pulse" />
          Start Camera & Try On
        </motion.button>
      )}

      {/* ── Product selector ── */}
      <TryOnProductSelector
        products={tryOnProducts}
        activeProductId={activeProduct?.id ?? null}
        onSelect={(p) => {
          setActiveProduct(p);
          clearCapture();
        }}
      />

      {/* ── WhatsApp CTA ── */}
      {activeProduct && (
        <motion.a
          href={buildTryOnEnquiryURL(activeProduct.name)}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="btn w-full justify-center py-3.5 border border-[rgba(74,222,128,0.2)] text-green-400 hover:bg-[rgba(74,222,128,0.06)] hover:border-[rgba(74,222,128,0.4)] rounded-sm text-xs tracking-widest"
        >
          <MessageCircle className="w-4 h-4" />
          Enquire about {activeProduct.name} on WhatsApp
        </motion.a>
      )}

      {/* Privacy note */}
      <p className="text-center font-body font-light text-[0.62rem] text-[rgba(250,247,240,0.22)] leading-relaxed">
        Your camera feed is processed entirely on your device.
        Nothing is recorded, uploaded, or shared.
      </p>
    </div>
  );
}
