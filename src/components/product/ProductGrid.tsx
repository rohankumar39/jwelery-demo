'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

interface Props { products: Product[]; }

export default function ProductGrid({ products }: Props) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="font-display text-5xl text-gold-400 opacity-20 mb-4">◇</div>
        <p className="font-body font-light text-[rgba(10,10,10,0.5)] text-sm tracking-wide">
          No pieces found in this category.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-body font-light text-xs text-[rgba(10,10,10,0.5)] tracking-wide">
          {products.length} {products.length === 1 ? 'piece' : 'pieces'}
        </p>
        <div className="flex items-center gap-1 p-1 border border-[rgba(0,0,0,0.08)] rounded-sm">
          <button
            onClick={() => setLayout('grid')}
            className={cn(
              'p-1.5 rounded-sm transition-all duration-200',
              layout === 'grid'
                ? 'bg-[rgba(201,168,76,0.15)] text-gold-400'
                : 'text-[rgba(10,10,10,0.4)] hover:text-[rgba(10,10,10,0.7)]',
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={cn(
              'p-1.5 rounded-sm transition-all duration-200',
              layout === 'list'
                ? 'bg-[rgba(201,168,76,0.15)] text-gold-400'
                : 'text-[rgba(10,10,10,0.4)] hover:text-[rgba(10,10,10,0.7)]',
            )}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={layout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            layout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
              : 'flex flex-col gap-3',
          )}
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} layout={layout} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
