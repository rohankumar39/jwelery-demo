'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryFilter from '@/components/product/CategoryFilter';
import ProductGrid from '@/components/product/ProductGrid';
import { products } from '@/data/products';
import type { JewelleryCategory } from '@/types/product';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('cat') ?? 'all') as JewelleryCategory | 'all';
  const [activeCategory, setActiveCategory] = useState<JewelleryCategory | 'all'>(initialCat);

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory),
    [activeCategory],
  );

  const counts = useMemo(() => {
    const c: Partial<Record<JewelleryCategory | 'all', number>> = { all: products.length };
    for (const p of products) {
      c[p.category] = (c[p.category] ?? 0) + 1;
    }
    return c;
  }, []);

  return (
    <main className="min-h-screen bg-ivory-DEFAULT">
      <Navbar />

      {/* Page header */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="divider-gold w-8" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Our Work</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-obsidian-900 mb-4" style={{ fontWeight: 300 }}>
              Collections
            </h1>
            <p className="font-body font-light text-[rgba(10,10,10,0.55)] max-w-md text-lg">
              Handcrafted pieces for every occasion — from daily wear to heirloom celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-ivory-DEFAULT/90 backdrop-blur-md border-b border-[rgba(201,168,76,0.1)] py-4">
        <div className="container-site">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} counts={counts} />
        </div>
      </div>

      {/* Products */}
      <section className="container-site py-12 pb-20">
        <ProductGrid products={filtered} />
      </section>

      <Footer />
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory-DEFAULT" />}>
      <CollectionsContent />
    </Suspense>
  );
}
