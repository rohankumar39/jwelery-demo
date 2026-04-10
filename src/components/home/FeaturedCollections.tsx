'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Camera, MessageCircle } from 'lucide-react';
import { getFeaturedProducts, formatPrice } from '@/data/products';
import { buildProductEnquiryURL } from '@/lib/whatsapp';
import { CATEGORY_LABELS } from '@/lib/utils';

export default function FeaturedCollections() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <section className="section-padding bg-ivory-DEFAULT">
      <div className="container-site">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="divider-gold w-8" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Featured</span>
            <div className="divider-gold w-8" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-obsidian-900 mb-4" style={{ fontWeight: 300 }}>
            Curated Selections
          </h2>
          <p className="font-body font-light text-[rgba(10,10,10,0.55)] max-w-md mx-auto">
            Each piece is handpicked for its craftsmanship, material quality, and timeless beauty.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group card-light card-light-hover rounded-sm overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden bg-ivory-warm">
                {/* Product Image */}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  {product.isNew && (
                    <span className="font-body text-[0.6rem] tracking-widest uppercase px-2 py-0.5 bg-gold-500 text-obsidian-900">
                      New
                    </span>
                  )}
                  {product.tryOnSupported && (
                    <span className="font-body text-[0.6rem] tracking-widest uppercase px-2 py-0.5 border border-[rgba(201,168,76,0.4)] text-gold-400 bg-white/90">
                      Try Live
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ivory-DEFAULT/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Link
                    href={`/product/${product.slug}`}
                    className="btn btn-gold text-[0.65rem] px-4 py-2.5"
                  >
                    View Details
                  </Link>
                  {product.tryOnSupported && (
                    <Link
                      href={`/try-on?product=${product.id}`}
                      className="btn btn-outline-gold text-[0.65rem] px-4 py-2.5"
                    >
                      <Camera className="w-3 h-3" />
                      Try On
                    </Link>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.45)] mb-1">
                      {CATEGORY_LABELS[product.category]}
                    </p>
                    <h3 className="font-display text-lg text-obsidian-900 leading-tight" style={{ fontWeight: 400 }}>
                      {product.name}
                    </h3>
                  </div>
                  <div className="font-display text-lg text-gold-400 text-right flex-shrink-0 ml-3" style={{ fontWeight: 300 }}>
                    {formatPrice(product.price)}
                  </div>
                </div>

                <p className="font-body font-light text-sm text-[rgba(10,10,10,0.55)] leading-relaxed mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="flex items-center gap-2">
                  {product.tryOnSupported && (
                    <Link
                      href={`/try-on?product=${product.id}`}
                      className="btn btn-outline-gold text-[0.6rem] px-3 py-2 flex-1 justify-center"
                    >
                      <Camera className="w-3 h-3" />
                      Try Live
                    </Link>
                  )}
                  <a
                    href={buildProductEnquiryURL(product.name, product.price, product.whatsappMessageTemplate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost text-[0.6rem] px-3 py-2 border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.15)] flex-1 justify-center text-[rgba(10,10,10,0.6)]"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Enquire
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link href="/collections" className="btn btn-outline-gold">
            View All Collections
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
