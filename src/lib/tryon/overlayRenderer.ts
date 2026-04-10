import type { OverlayTransform } from '@/types/tryon';

// ─── Image cache ────────────────────────────
const imageCache = new Map<string, HTMLImageElement>();

export function preloadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) return Promise.resolve(imageCache.get(src)!);
  return new Promise((resolve, reject) => {
    const img = new Image();
    // SVGs served from same origin don't need crossOrigin
    // but setting it allows canvas taint-free drawImage
    img.crossOrigin = 'anonymous';
    img.onload  = () => { imageCache.set(src, img); resolve(img); };
    img.onerror = () => {
      // Retry without crossOrigin (some SVG servers don't send CORS headers)
      const img2 = new Image();
      img2.onload  = () => { imageCache.set(src, img2); resolve(img2); };
      img2.onerror = (e) => reject(e);
      img2.src = src;
    };
    img.src = src;
  });
}

export function getCachedImage(src: string): HTMLImageElement | null {
  return imageCache.get(src) ?? null;
}

// ─── Draw video frame ────────────────────────
export function drawVideoFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  mirrored = true,
): void {
  const { width: w, height: h } = ctx.canvas;
  ctx.save();
  if (mirrored) { ctx.translate(w, 0); ctx.scale(-1, 1); }
  ctx.drawImage(video, 0, 0, w, h);
  ctx.restore();
}

// ─── Draw a single overlay ───────────────────
export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  transform: OverlayTransform,
  opacity = 1,
): void {
  const { x, y, width, height, rotation } = transform;
  const cx = x + width / 2;
  const cy = y + height / 2;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  try {
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
  } catch {
    // Canvas taint guard — skip frame silently
  }
  ctx.restore();
}

// ─── Earring pair ────────────────────────────
export function drawEarringPair(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  left: OverlayTransform,
  right: OverlayTransform,
  mirrored = true,
): void {
  drawOverlay(ctx, img, mirrored ? right : left);
  drawOverlay(ctx, img, mirrored ? left  : right);
}

// ─── Capture ────────────────────────────────
export function captureCanvas(canvas: HTMLCanvasElement, quality = 0.92): string {
  try {
    return canvas.toDataURL('image/jpeg', quality);
  } catch {
    // If canvas is tainted (crossOrigin issues), capture without overlay
    return canvas.toDataURL('image/png');
  }
}

export function downloadDataURL(dataURL: string, filename = 'aura-tryon.jpg'): void {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function shareImage(dataURL: string, productName: string): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    const res  = await fetch(dataURL);
    const blob = await res.blob();
    const file = new File([blob], 'aura-tryon.jpg', { type: blob.type });
    await navigator.share({
      title: `Trying on ${productName} — Aura Jewels`,
      text:  'Check out how this looks on me! 💎',
      files: [file],
    });
    return true;
  } catch {
    return false;
  }
}
