import { useState, useCallback } from 'react';
import { captureCanvas, downloadDataURL, shareImage } from '@/lib/tryon/overlayRenderer';

interface UseCaptureReturn {
  capturedImage:  string | null;
  isCapturing:    boolean;
  canShare:       boolean;
  capture:        (canvas: HTMLCanvasElement) => void;
  download:       () => void;
  share:          (productName: string) => Promise<void>;
  clearCapture:   () => void;
}

export function useCapture(): UseCaptureReturn {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing,   setIsCapturing]   = useState(false);
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const capture = useCallback((canvas: HTMLCanvasElement) => {
    setIsCapturing(true);
    // Brief flash effect delay
    setTimeout(() => {
      const dataURL = captureCanvas(canvas, 0.92);
      setCapturedImage(dataURL);
      setIsCapturing(false);
    }, 120);
  }, []);

  const download = useCallback(() => {
    if (!capturedImage) return;
    const filename = `aura-jewels-tryon-${Date.now()}.jpg`;
    downloadDataURL(capturedImage, filename);
  }, [capturedImage]);

  const share = useCallback(async (productName: string) => {
    if (!capturedImage) return;
    const shared = await shareImage(capturedImage, productName);
    if (!shared) {
      // Fallback: download if share not supported
      download();
    }
  }, [capturedImage, download]);

  const clearCapture = useCallback(() => {
    setCapturedImage(null);
  }, []);

  return {
    capturedImage,
    isCapturing,
    canShare,
    capture,
    download,
    share,
    clearCapture,
  };
}
