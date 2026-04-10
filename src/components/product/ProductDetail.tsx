'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, ArrowLeft, Check, Package, Shield, RefreshCw } from 'lucide-react';
import { formatPrice, CATEGORY_LABELS, cn } from '@/lib/utils';
import { buildProductEnquiryURL } from '@/lib/whatsapp';
import type { Product } from '@/types/product';

const TRUST_ITEMS = [
  { icon: Package,   text: 'Free shipping across India' },
  { icon: Shield,    text: 'BIS Hallmarked / Certified' },
  { icon: RefreshCw, text: '15-day easy returns' },
  { icon: Check,     text: 'Secure WhatsApp ordering' },
];

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen bg-ivory-DEFAULT pt-24 pb-20">
      <div className="container-site">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-10 text-[rgba(10,10,10,0.45)] text-xs font-body font-light"
        >
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-gold-400 transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/collections?cat=${product.category}`} className="hover:text-gold-400 transition-colors capitalize">
            {CATEGORY_LABELS[product.category]}
          </Link>
          <span>/</span>
          <span className="text-[rgba(10,10,10,0.7)]">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* ── Left: Image gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-sm overflow-hidden bg-ivory-warm mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.08) 0%,rgba(255,255,255,1) 100%)' }}>
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && (
                  <span className="font-body font-medium text-[0.6rem] tracking-widest uppercase px-2.5 py-1 bg-gold-500 text-obsidian-900">New Arrival</span>
                )}
                {product.tryOnSupported && (
                  <span className="font-body font-medium text-[0.6rem] tracking-widest uppercase px-2.5 py-1 border border-[rgba(201,168,76,0.5)] text-gold-400 bg-white/90">Try Live</span>
                )}
              </div>
            </div>

            {/* Thumbnails (shown even with 1 image as UI preview) */}
            <div className="flex gap-3">
              {(product.images.length > 0 ? product.images : [product.images[0], product.images[0]]).slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'w-16 h-16 rounded-sm flex items-center justify-center transition-all duration-200 flex-shrink-0',
                    'border',
                    activeImg === i
                      ? 'border-[rgba(201,168,76,0.6)] bg-[rgba(201,168,76,0.08)]'
                      : 'border-[rgba(0,0,0,0.08)] bg-ivory-warm hover:border-[rgba(201,168,76,0.25)]',
                  )}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={img}
                      alt={`${product.name} preview`}
                      className="absolute inset-0 w-full h-full object-cover rounded-sm"
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Product info ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category + name */}
            <div className="mb-6">
              <p className="font-body text-[0.62rem] tracking-[0.25em] uppercase text-gold-500 mb-2">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="font-display text-2xl md:text-4xl text-obsidian-900 mb-2" style={{ fontWeight: 300 }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="font-display text-3xl text-gold-400" style={{ fontWeight: 300 }}>
                  {formatPrice(product.price)}
                </span>
                <span className="font-body font-light text-xs text-[rgba(10,10,10,0.45)]">Incl. of all taxes</span>
              </div>
            </div>

            <div className="divider-gold mb-6" />

            {/* Description */}
            <p className="font-body font-light text-[rgba(10,10,10,0.65)] leading-relaxed mb-8 text-[0.95rem]">
              {product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Material', value: product.material },
                { label: 'Category', value: CATEGORY_LABELS[product.category] },
                ...(product.weight ? [{ label: 'Weight', value: product.weight }] : []),
                { label: 'Try-On', value: product.tryOnSupported ? 'Available' : 'Not available' },
              ].map((spec) => (
                <div key={spec.label} className="p-3.5 border border-[rgba(0,0,0,0.08)] rounded-sm">
                  <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.4)] mb-1">{spec.label}</p>
                  <p className="font-body font-light text-sm text-[rgba(10,10,10,0.85)]">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span key={tag}
                  className="font-body text-[0.58rem] tracking-widest uppercase px-2.5 py-1 border border-[rgba(0,0,0,0.08)] text-[rgba(10,10,10,0.45)] rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {product.tryOnSupported && (
                <Link
                  href={`/try-on?product=${product.id}`}
                  className="btn btn-gold flex-1 justify-center py-3.5"
                >
                  <Camera className="w-4 h-4" />
                  Try On Live
                </Link>
              )}
              <a
                href={buildProductEnquiryURL(product.name, product.price, product.whatsappMessageTemplate)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'btn flex-1 justify-center py-3.5',
                  product.tryOnSupported ? 'btn-outline-gold' : 'btn-gold',
                )}
              >
                <MessageCircle className="w-4 h-4" />
                Enquire on WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 pt-5 border-t border-[rgba(0,0,0,0.08)]">
              {TRUST_ITEMS.map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                  <span className="font-body font-light text-[0.68rem] text-[rgba(10,10,10,0.5)]">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link href="/collections"
            className="btn btn-ghost text-[rgba(10,10,10,0.5)] hover:text-gold-400 text-xs border border-[rgba(0,0,0,0.08)] rounded-sm">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
