import type { LandmarkPoint, OverlayTransform } from '@/types/tryon';

// ─────────────────────────────────────────────
// MediaPipe landmark indices
// ─────────────────────────────────────────────

/** FaceMesh landmarks (out of 468) */
export const FACE_LM = {
  LEFT_EAR:   234,   // leftmost face point ~ear
  RIGHT_EAR:  454,   // rightmost face point ~ear
  CHIN:       152,
  NOSE_TIP:   1,
  LEFT_EYE:   33,
  RIGHT_EYE:  263,
  TOP_HEAD:   10,
  FOREHEAD:   151,
} as const;

/** Hand landmarks (0-20 per hand) */
export const HAND_LM = {
  WRIST:              0,
  INDEX_MCP:          5,
  MIDDLE_MCP:         9,
  RING_MCP:          13,
  PINKY_MCP:         17,
  INDEX_PIP:          6,
  MIDDLE_PIP:        10,
  RING_PIP:          14,
  THUMB_CMC:          1,
  INDEX_FINGER_TIP:   8,
} as const;

// ─────────────────────────────────────────────
// Coordinate helpers
// ─────────────────────────────────────────────

/** Convert normalised [0-1] landmark to canvas pixel coords */
export function toCanvas(
  lm: LandmarkPoint,
  canvasW: number,
  canvasH: number,
): { x: number; y: number } {
  return { x: lm.x * canvasW, y: lm.y * canvasH };
}

/** Pixel distance between two canvas points */
export function pixelDist(
  ax: number, ay: number,
  bx: number, by: number,
): number {
  return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
}

/** Angle (radians) of the vector from point A to point B */
export function angleBetween(
  ax: number, ay: number,
  bx: number, by: number,
): number {
  return Math.atan2(by - ay, bx - ax);
}

/** Midpoint of two canvas points */
export function midpoint(
  ax: number, ay: number,
  bx: number, by: number,
): { x: number; y: number } {
  return { x: (ax + bx) / 2, y: (ay + by) / 2 };
}

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─────────────────────────────────────────────
// Earring placement
// ─────────────────────────────────────────────

/**
 * Returns transforms for LEFT and RIGHT earrings.
 * Scales earring width relative to face width (ear-to-ear distance).
 */
export function getEarringTransforms(
  landmarks: LandmarkPoint[],
  canvasW: number,
  canvasH: number,
  imgNaturalW: number,
  imgNaturalH: number,
): { left: OverlayTransform; right: OverlayTransform } | null {
  const leftLm  = landmarks[FACE_LM.LEFT_EAR];
  const rightLm = landmarks[FACE_LM.RIGHT_EAR];
  const chinLm  = landmarks[FACE_LM.CHIN];

  if (!leftLm || !rightLm || !chinLm) return null;

  const left  = toCanvas(leftLm,  canvasW, canvasH);
  const right = toCanvas(rightLm, canvasW, canvasH);
  const chin  = toCanvas(chinLm,  canvasW, canvasH);

  // Face width in pixels
  const faceWidth = pixelDist(left.x, left.y, right.x, right.y);

  // Earring width = ~18% of face width  (tweak per asset)
  const earringW = faceWidth * 0.18;
  const earringH = earringW * (imgNaturalH / imgNaturalW);

  // Face tilt angle for rotation
  const tilt = angleBetween(left.x, left.y, right.x, right.y);

  // Drop earring slightly below ear landmark
  const dropFactor = faceWidth * 0.04;

  return {
    left: {
      x: left.x - earringW / 2,
      y: left.y + dropFactor,
      width: earringW,
      height: earringH,
      rotation: tilt,
    },
    right: {
      x: right.x - earringW / 2,
      y: right.y + dropFactor,
      width: earringW,
      height: earringH,
      rotation: tilt,
    },
  };
}

// ─────────────────────────────────────────────
// Necklace placement
// ─────────────────────────────────────────────

/**
 * Places necklace below chin.
 * Width scales with face width.
 */
export function getNecklaceTransform(
  landmarks: LandmarkPoint[],
  canvasW: number,
  canvasH: number,
  imgNaturalW: number,
  imgNaturalH: number,
): OverlayTransform | null {
  const chinLm   = landmarks[FACE_LM.CHIN];
  const leftLm   = landmarks[FACE_LM.LEFT_EAR];
  const rightLm  = landmarks[FACE_LM.RIGHT_EAR];

  if (!chinLm || !leftLm || !rightLm) return null;

  const chin  = toCanvas(chinLm,  canvasW, canvasH);
  const left  = toCanvas(leftLm,  canvasW, canvasH);
  const right = toCanvas(rightLm, canvasW, canvasH);

  const faceWidth  = pixelDist(left.x, left.y, right.x, right.y);
  const necklaceW  = faceWidth * 1.4;
  const necklaceH  = necklaceW * (imgNaturalH / imgNaturalW);

  const tilt = angleBetween(left.x, left.y, right.x, right.y);

  // Drop below chin
  const dropOffset = faceWidth * 0.18;

  return {
    x:        chin.x - necklaceW / 2,
    y:        chin.y + dropOffset,
    width:    necklaceW,
    height:   necklaceH,
    rotation: tilt,
  };
}

// ─────────────────────────────────────────────
// Ring placement
// ─────────────────────────────────────────────

/**
 * Places ring on the ring finger (landmark 14 = RING_PIP).
 * Width scales with finger width (MCP-to-PIP distance).
 */
export function getRingTransform(
  landmarks: LandmarkPoint[],
  canvasW: number,
  canvasH: number,
  imgNaturalW: number,
  imgNaturalH: number,
): OverlayTransform | null {
  const mcpLm = landmarks[HAND_LM.RING_MCP];
  const pipLm = landmarks[HAND_LM.RING_PIP];
  const wristLm = landmarks[HAND_LM.WRIST];

  if (!mcpLm || !pipLm || !wristLm) return null;

  const mcp   = toCanvas(mcpLm,   canvasW, canvasH);
  const pip   = toCanvas(pipLm,   canvasW, canvasH);
  const wrist = toCanvas(wristLm, canvasW, canvasH);

  const fingerLen = pixelDist(mcp.x, mcp.y, pip.x, pip.y);
  const angle     = angleBetween(mcp.x, mcp.y, pip.x, pip.y);

  // Ring width = ~finger segment width (estimated as 60% of segment length)
  const ringW = fingerLen * 0.9;
  const ringH = ringW * (imgNaturalH / imgNaturalW);

  // Place between MCP and PIP
  const mid = midpoint(mcp.x, mcp.y, pip.x, pip.y);

  return {
    x:        mid.x - ringW / 2,
    y:        mid.y - ringH / 2,
    width:    ringW,
    height:   ringH,
    rotation: angle - Math.PI / 2,
  };
}

// ─────────────────────────────────────────────
// Bracelet / Bangle placement
// ─────────────────────────────────────────────

/**
 * Places bracelet at the wrist landmark.
 * Width scales with hand width.
 */
export function getBraceletTransform(
  landmarks: LandmarkPoint[],
  canvasW: number,
  canvasH: number,
  imgNaturalW: number,
  imgNaturalH: number,
): OverlayTransform | null {
  const wristLm  = landmarks[HAND_LM.WRIST];
  const indexLm  = landmarks[HAND_LM.INDEX_MCP];
  const pinkyLm  = landmarks[HAND_LM.PINKY_MCP];

  if (!wristLm || !indexLm || !pinkyLm) return null;

  const wrist = toCanvas(wristLm, canvasW, canvasH);
  const index = toCanvas(indexLm, canvasW, canvasH);
  const pinky = toCanvas(pinkyLm, canvasW, canvasH);

  const handWidth  = pixelDist(index.x, index.y, pinky.x, pinky.y);
  const braceletW  = handWidth * 1.3;
  const braceletH  = braceletW * (imgNaturalH / imgNaturalW);

  const angle = angleBetween(pinky.x, pinky.y, index.x, index.y);

  return {
    x:        wrist.x - braceletW / 2,
    y:        wrist.y - braceletH / 2,
    width:    braceletW,
    height:   braceletH,
    rotation: angle,
  };
}
