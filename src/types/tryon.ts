export type TryOnStatus =
  | 'idle' | 'requesting-permission' | 'permission-denied'
  | 'no-camera' | 'unsupported' | 'loading-mediapipe'
  | 'active' | 'tracking-lost' | 'error';

export interface LandmarkPoint { x: number; y: number; z?: number; }
export interface OverlayTransform { x: number; y: number; width: number; height: number; rotation: number; }
export interface TryOnState {
  status: TryOnStatus;
  activeProductId: string | null;
  capturedImage: string | null;
  isMirrored: boolean;
}
