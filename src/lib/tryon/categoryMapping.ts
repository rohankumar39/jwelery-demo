import type { LandmarkPoint, OverlayTransform } from '@/types/tryon';
import type { JewelleryCategory, TryOnType } from '@/types/product';
import {
  getEarringTransforms,
  getNecklaceTransform,
  getRingTransform,
  getBraceletTransform,
} from './landmarkUtils';

export type DetectionMode = 'face' | 'hand' | 'both';

/** Which MediaPipe model(s) a category needs */
export function getDetectionMode(tryOnType: TryOnType): DetectionMode {
  if (tryOnType === 'face' || tryOnType === 'neck') return 'face';
  if (tryOnType === 'hand' || tryOnType === 'wrist') return 'hand';
  return 'face';
}

export interface LandmarkSets {
  faceLandmarks?: LandmarkPoint[];
  handLandmarks?: LandmarkPoint[];   // first detected hand
}

export interface JewelleryTransforms {
  earrings?: { left: OverlayTransform; right: OverlayTransform } | null;
  necklace?: OverlayTransform | null;
  ring?:     OverlayTransform | null;
  bracelet?: OverlayTransform | null;
}

/**
 * Given category + landmarks + canvas size + image size,
 * return the correct OverlayTransform(s) for rendering.
 */
export function resolveTransforms(
  category:  JewelleryCategory,
  landmarks: LandmarkSets,
  canvasW:   number,
  canvasH:   number,
  imgW:      number,
  imgH:      number,
): JewelleryTransforms {
  const { faceLandmarks, handLandmarks } = landmarks;

  switch (category) {
    case 'earrings':
      if (!faceLandmarks) return {};
      return {
        earrings: getEarringTransforms(faceLandmarks, canvasW, canvasH, imgW, imgH),
      };

    case 'necklace':
    case 'pendant':
      if (!faceLandmarks) return {};
      return {
        necklace: getNecklaceTransform(faceLandmarks, canvasW, canvasH, imgW, imgH),
      };

    case 'ring':
      if (!handLandmarks) return {};
      return {
        ring: getRingTransform(handLandmarks, canvasW, canvasH, imgW, imgH),
      };

    case 'bracelet':
      if (!handLandmarks) return {};
      return {
        bracelet: getBraceletTransform(handLandmarks, canvasW, canvasH, imgW, imgH),
      };

    default:
      return {};
  }
}
