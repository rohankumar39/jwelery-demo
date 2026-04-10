'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, Zap, Download, MessageCircle } from 'lucide-react';

const STEPS = [
  { icon: Camera,         title: 'Open Camera',     desc: 'Click Try Live and allow camera access. Works in Chrome, Safari, and Firefox.' },
  { icon: Zap,            title: 'See It On You',   desc: 'Our AI places jewellery on your ears, neck or hands in real time.' },
  { icon: Download,       title: 'Capture & Share', desc: 'Take a photo, download it, or share directly to Instagram.' },
  { icon: MessageCircle,  title: 'Order via WhatsApp', desc: 'Love what you see? Send an enquiry to us instantly.' },
];

export default function TryLiveCTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="divider-gold w-8" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Virtual Try-On</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-obsidian-900 mb-6" style={{ fontWeight: 300, lineHeight: 1.05 }}>
              Try Before
              <br />
              <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>You Buy</span>
            </h2>
            <p className="font-body font-light text-[rgba(10,10,10,0.65)] text-lg leading-relaxed mb-10 max-w-md">
              Experience our jewellery live on your face, neck and hands — using just your browser camera.
              No app download. No signup. Completely free.
            </p>
            <Link href="/try-on" className="btn btn-gold">
              <Camera className="w-3.5 h-3.5" />
              Start Virtual Try-On
            </Link>
          </motion.div>

          {/* Right: steps */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-sm card-light border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.25)] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-sm bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-3">
                  <step.icon className="w-4 h-4 text-gold-400" />
                </div>
                <h4 className="font-body font-medium text-sm text-obsidian-900 mb-1.5 tracking-wide">
                  {step.title}
                </h4>
                <p className="font-body font-light text-xs text-[rgba(10,10,10,0.55)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
