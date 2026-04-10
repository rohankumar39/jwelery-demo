import { Camera, CameraOff, WifiOff, AlertCircle, Loader2 } from 'lucide-react';
import type { TryOnStatus } from '@/types/tryon';

interface Props {
  status: TryOnStatus;
  errorMessage: string | null;
  onRetry: () => void;
}

const STATES: Partial<Record<TryOnStatus, {
  icon: React.ElementType;
  title: string;
  desc: string;
  action?: string;
  color: string;
}>> = {
  idle: {
    icon: Camera,
    title: 'Start Virtual Try-On',
    desc: 'Allow camera access to try on jewellery live. Your camera feed never leaves your device.',
    action: 'Allow Camera',
    color: 'text-gold-400',
  },
  'requesting-permission': {
    icon: Loader2,
    title: 'Requesting Camera',
    desc: 'Please allow camera access in the browser prompt above…',
    color: 'text-gold-400',
  },
  'loading-mediapipe': {
    icon: Loader2,
    title: 'Loading AR Engine',
    desc: 'Initialising landmark detection… this takes a few seconds on first load.',
    color: 'text-gold-400',
  },
  'permission-denied': {
    icon: CameraOff,
    title: 'Camera Access Denied',
    desc: 'Please enable camera permissions in your browser settings, then try again.',
    action: 'Try Again',
    color: 'text-red-400',
  },
  'no-camera': {
    icon: WifiOff,
    title: 'No Camera Detected',
    desc: 'We couldn\'t find a camera on your device. Try a phone or tablet.',
    color: 'text-amber-400',
  },
  'unsupported': {
    icon: AlertCircle,
    title: 'Browser Not Supported',
    desc: 'Please use Chrome, Safari, or Firefox to access the try-on feature.',
    color: 'text-amber-400',
  },
  'error': {
    icon: AlertCircle,
    title: 'Something Went Wrong',
    desc: 'An unexpected error occurred.',
    action: 'Try Again',
    color: 'text-red-400',
  },
  'tracking-lost': {
    icon: Camera,
    title: 'Position Your Face / Hand',
    desc: 'Move closer to the camera and ensure good lighting.',
    color: 'text-gold-400',
  },
};

export default function CameraPermissionUI({ status, errorMessage, onRetry }: Props) {
  const state = STATES[status];
  if (!state) return null;

  const Icon = state.icon;
  const isLoading = status === 'requesting-permission' || status === 'loading-mediapipe';

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-ivory-DEFAULT/80 backdrop-blur-sm">
      <div className="text-center px-8 max-w-sm">
        <div className={`w-14 h-14 rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.07)] flex items-center justify-center mx-auto mb-5 ${state.color}`}>
          <Icon className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
        </div>
        <h3 className="font-display text-xl text-obsidian-900 mb-2" style={{ fontWeight: 400 }}>
          {state.title}
        </h3>
        <p className="font-body font-light text-sm text-[rgba(10,10,10,0.6)] leading-relaxed mb-6">
          {errorMessage ?? state.desc}
        </p>
        {state.action && (
          <button onClick={onRetry} className="btn btn-gold">
            <Camera className="w-3.5 h-3.5" />
            {state.action}
          </button>
        )}
      </div>
    </div>
  );
}
