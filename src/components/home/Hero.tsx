'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-ivory-DEFAULT" />
      <Image 
        src="https://images.unsplash.com/photo-1515562141207-7a8efd92d47c?auto=format&fit=crop&q=80&w=2070" 
        alt="Jewellery Background" 
        fill 
        className="object-cover opacity-20" 
        sizes="100vw"
        priority 
      />
      <div className="absolute inset-0 bg-hero-radial" />

      {/* Decorative gold orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #C9A84C, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #E8C560, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Thin grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Content */}
      <div className="container-site relative z-10 text-center pt-24 pb-16">
        {/* Pre-headline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="divider-gold w-10" />
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">
            Virtual Try-On Enabled
          </span>
          <div className="divider-gold w-10" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl text-obsidian-900 mb-3"
          style={{ fontWeight: 300 }}
        >
          Where Gold Meets
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-display text-5xl md:text-7xl text-gold-shimmer mb-8"
          style={{ fontWeight: 400 }}
        >
          Your Story
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-body font-light text-[rgba(10,10,10,0.65)] text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Try on earrings, necklaces & rings live — right from your browser.
          No app. No account. Just you and your perfect jewellery.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/try-on" className="btn btn-gold">
            <Sparkles className="w-3.5 h-3.5" />
            Try Live Now
          </Link>
          <Link href="/collections" className="btn btn-outline-gold">
            Browse Collections
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-20 flex flex-wrap justify-center gap-12 md:gap-20"
        >
          {[
            { value: '500+', label: 'Designs' },
            { value: '10k+', label: 'Happy Customers' },
            { value: '22kt', label: 'Gold Standard' },
            { value: 'Live', label: 'Try-On' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-gold-400 mb-1" style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
              <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.45)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, #FAF7F0)' }} />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-[rgba(10,10,10,0.35)]">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gold-gradient"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
