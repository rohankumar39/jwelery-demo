'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, Share2, X, Check } from 'lucide-react';

interface Props {
  onCapture:     () => void;
  onDownload:    () => void;
  onShare:       () => void;
  onClear:       () => void;
  capturedImage: string | null;
  isCapturing:   boolean;
  canShare:      boolean;
}

export default function CaptureButton({
  onCapture, onDownload, onShare, onClear,
  capturedImage, isCapturing, canShare,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <AnimatePresence mode="wait">
        {!capturedImage ? (
          /* Capture button */
          <motion.button
            key="capture"
            onClick={onCapture}
            disabled={isCapturing}
            whileTap={{ scale: 0.92 }}
            className="relative w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C560)',
              boxShadow: '0 0 0 3px rgba(201,168,76,0.25), 0 0 30px rgba(201,168,76,0.3)',
            }}
          >
            {isCapturing ? (
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.25 }}
              />
            ) : null}
            <Camera className="w-6 h-6 text-obsidian-900" />
          </motion.button>
        ) : (
          /* Post-capture actions */
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex items-center gap-3"
          >
            {/* Clear */}
            <button
              onClick={onClear}
              className="w-11 h-11 rounded-full border border-[rgba(0,0,0,0.15)] flex items-center justify-center text-[rgba(10,10,10,0.6)] hover:text-obsidian-900 hover:border-[rgba(255,255,255,0.3)] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Download */}
            <button
              onClick={onDownload}
              className="flex items-center gap-2 btn btn-gold px-5 py-3"
            >
              <Download className="w-4 h-4" />
              Save Photo
            </button>

            {/* Share (if supported) */}
            {canShare && (
              <button
                onClick={onShare}
                className="w-11 h-11 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center text-gold-400 hover:bg-[rgba(201,168,76,0.1)] transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
