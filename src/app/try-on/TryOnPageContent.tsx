'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import TryOnCanvas from '@/components/tryon/TryOnCanvas';
import { products } from '@/data/products';

export default function TryOnPageContent() {
  const searchParams = useSearchParams();
  const productId    = searchParams.get('product');

  const initialProduct = useMemo(
    () => products.find(p => p.id === productId && p.tryOnSupported) ?? null,
    [productId],
  );

  return (
    <section className="pt-24 pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="divider-gold w-8" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">
              AR Powered · No App Needed
            </span>
            <div className="divider-gold w-8" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-obsidian-900 mb-3" style={{ fontWeight: 300 }}>
            Virtual Try-On
          </h1>
          <p className="font-body font-light text-[rgba(10,10,10,0.55)] max-w-sm mx-auto text-sm">
            Allow camera access, select a piece, and see it on you — live.
          </p>
        </motion.div>

        {/* Tips row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            { tip: 'Good lighting works best', cat: 'all' },
            { tip: 'Face the camera directly for earrings', cat: 'earrings' },
            { tip: 'Show your full hand for rings & bangles', cat: 'ring' },
          ].map(({ tip }) => (
            <div key={tip} className="flex items-center gap-1.5">
              <span className="text-gold-500 text-[0.65rem]">◆</span>
              <span className="font-body font-light text-[0.68rem] text-[rgba(10,10,10,0.5)]">{tip}</span>
            </div>
          ))}
        </motion.div>

        {/* Main AR canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TryOnCanvas initialProduct={initialProduct} />
        </motion.div>
      </div>
    </section>
  );
}
