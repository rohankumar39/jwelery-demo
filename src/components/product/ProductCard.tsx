'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, ArrowRight } from 'lucide-react';
import { cn, CATEGORY_LABELS, formatPrice } from '@/lib/utils';
import { buildProductEnquiryURL } from '@/lib/whatsapp';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  index?: number;
  layout?: 'grid' | 'list';
}

export default function ProductCard({ product, index = 0, layout = 'grid' }: Props) {
  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        className="group flex gap-5 p-4 card-light rounded-sm border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.28)] transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-ivory-warm flex items-center justify-center">
          <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
          {product.isNew && (
            <span className="absolute top-1.5 left-1.5 font-body text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 bg-gold-500 text-obsidian-900">New</span>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-body text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.45)] mb-0.5">{CATEGORY_LABELS[product.category]}</p>
          <h3 className="font-display text-base text-obsidian-900 leading-tight mb-1" style={{fontWeight:400}}>{product.name}</h3>
          <p className="font-body font-light text-xs text-[rgba(10,10,10,0.55)] line-clamp-1 mb-2">{product.shortDescription}</p>
          <div className="flex items-center gap-3">
            <span className="font-display text-base text-gold-400" style={{fontWeight:300}}>{formatPrice(product.price)}</span>
            {product.tryOnSupported && (
              <span className="font-body text-[0.55rem] tracking-widest uppercase border border-[rgba(201,168,76,0.35)] text-gold-400 px-1.5 py-0.5">Try Live</span>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col gap-2 justify-center flex-shrink-0">
          {product.tryOnSupported && (
            <Link href={`/try-on?product=${product.id}`} className="btn btn-outline-gold text-[0.58rem] px-3 py-2">
              <Camera className="w-3 h-3" />
            </Link>
          )}
          <a href={buildProductEnquiryURL(product.name, product.price, product.whatsappMessageTemplate)}
            target="_blank" rel="noopener noreferrer"
            className="btn text-[0.58rem] px-3 py-2 border border-[rgba(0,0,0,0.1)] text-[rgba(10,10,10,0.55)] hover:text-obsidian-900 hover:border-[rgba(0,0,0,0.2)] rounded-sm">
            <MessageCircle className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group card-light rounded-sm overflow-hidden border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.32)] transition-all duration-350 hover:shadow-card-hover hover:-translate-y-1"
      style={{ transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)' }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ivory-warm flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,rgba(201,168,76,0.07) 0%,rgba(255,255,255,1) 100%)' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="font-body text-[0.55rem] font-medium tracking-widest uppercase px-2 py-0.5 bg-gold-500 text-obsidian-900">New</span>
          )}
          {product.tryOnSupported && (
            <span className="font-body text-[0.55rem] font-medium tracking-widest uppercase px-2 py-0.5 border border-[rgba(201,168,76,0.4)] text-gold-400 bg-white/90">Try Live</span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ivory-DEFAULT/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link href={`/product/${product.slug}`} className="btn btn-gold text-[0.62rem] px-4 py-2.5">
            View Details
          </Link>
          {product.tryOnSupported && (
            <Link href={`/try-on?product=${product.id}`} className="btn btn-outline-gold text-[0.62rem] px-3 py-2.5">
              <Camera className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-3">
          <p className="font-body text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.4)] mb-1">
            {CATEGORY_LABELS[product.category]} · {product.material}
          </p>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[1.1rem] text-obsidian-900 leading-tight" style={{fontWeight:400}}>
              {product.name}
            </h3>
            <span className="font-display text-base text-gold-400 flex-shrink-0 mt-0.5" style={{fontWeight:300}}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <p className="font-body font-light text-xs text-[rgba(10,10,10,0.5)] leading-relaxed mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-3 border-t border-[rgba(0,0,0,0.08)]">
          {product.tryOnSupported ? (
            <Link href={`/try-on?product=${product.id}`}
              className="btn btn-outline-gold text-[0.6rem] px-3 py-2 flex-1 justify-center rounded-sm">
              <Camera className="w-3 h-3" />
              Try Live
            </Link>
          ) : (
            <Link href={`/product/${product.slug}`}
              className="btn text-[0.6rem] px-3 py-2 flex-1 justify-center border border-[rgba(0,0,0,0.1)] text-[rgba(10,10,10,0.6)] hover:text-obsidian-900 hover:border-[rgba(0,0,0,0.18)] rounded-sm">
              <ArrowRight className="w-3 h-3" />
              View
            </Link>
          )}
          <a href={buildProductEnquiryURL(product.name, product.price, product.whatsappMessageTemplate)}
            target="_blank" rel="noopener noreferrer"
            className="btn text-[0.6rem] px-3 py-2 flex-1 justify-center border border-[rgba(0,0,0,0.1)] text-[rgba(10,10,10,0.6)] hover:text-green-400 hover:border-[rgba(74,222,128,0.25)] rounded-sm transition-all duration-200">
            <MessageCircle className="w-3 h-3" />
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  );
}
