import { useRef, useCallback, useEffect } from 'react';
import type { LandmarkPoint } from '@/types/tryon';
import type { Product }       from '@/types/product';
import { resolveTransforms }  from '@/lib/tryon/categoryMapping';
import {
  preloadImage,
  getCachedImage,
  drawVideoFrame,
  drawEarringPair,
  drawOverlay,
} from '@/lib/tryon/overlayRenderer';

interface UseOverlayProps {
  canvasRef:   React.RefObject<HTMLCanvasElement>;
  videoRef:    React.RefObject<HTMLVideoElement>;
  product:     Product | null;
  faceLandmarks?: LandmarkPoint[];
  handLandmarks?: LandmarkPoint[];
  mirrored:    boolean;
}

export function useOverlay({
  canvasRef,
  videoRef,
  product,
  faceLandmarks,
  handLandmarks,
  mirrored,
}: UseOverlayProps) {
  const rafRef = useRef<number | null>(null);

  /** Pre-load the overlay PNG whenever product changes */
  useEffect(() => {
    if (product?.tryOnAsset) {
      preloadImage(product.tryOnAsset).catch(() => {
        /* silently fail — will just skip overlay until loaded */
      });
    }
  }, [product?.tryOnAsset]);

  /** Main render loop */
  const startRendering = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const render = () => {
      const canvas = canvasRef.current;
      const video  = videoRef.current;
      if (!canvas || !video || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Match canvas size to video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width  = video.videoWidth  || 640;
        canvas.height = video.videoHeight || 480;
      }

      const { width: w, height: h } = canvas;

      // 1. Clear + draw video frame
      ctx.clearRect(0, 0, w, h);
      drawVideoFrame(ctx, video, mirrored);

      // 2. Draw overlay if product + image ready
      if (product) {
        const img = getCachedImage(product.tryOnAsset);
        if (img) {
          const transforms = resolveTransforms(
            product.category,
            { faceLandmarks, handLandmarks },
            w, h,
            img.naturalWidth,
            img.naturalHeight,
          );

          if (transforms.earrings) {
            drawEarringPair(ctx, img, transforms.earrings.left, transforms.earrings.right, mirrored);
          }
          if (transforms.necklace) drawOverlay(ctx, img, transforms.necklace);
          if (transforms.ring)     drawOverlay(ctx, img, transforms.ring);
          if (transforms.bracelet) drawOverlay(ctx, img, transforms.bracelet);
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
  }, [canvasRef, videoRef, product, faceLandmarks, handLandmarks, mirrored]);

  const stopRendering = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => () => stopRendering(), [stopRendering]);

  return { startRendering, stopRendering };
}
