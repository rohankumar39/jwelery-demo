'use client';
import { motion } from 'framer-motion';
import { cn, CATEGORY_LABELS, formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';

const GLYPHS: Record<string, string> = {
  earrings:'◇', necklace:'○', ring:'◻', bracelet:'⬡', pendant:'✦',
};

interface Props {
  products:        Product[];
  activeProductId: string | null;
  onSelect:        (product: Product) => void;
}

export default function TryOnProductSelector({ products, activeProductId, onSelect }: Props) {
  return (
    <div className="w-full">
      <p className="font-body text-[0.58rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.4)] mb-3 px-1">
        Select piece to try
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {products.map((product) => {
          const isActive = product.id === activeProductId;
          return (
            <motion.button
              key={product.id}
              onClick={() => onSelect(product)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex-shrink-0 w-[4.5rem] rounded-sm border transition-all duration-200 text-left',
                isActive
                  ? 'border-[rgba(201,168,76,0.7)] bg-[rgba(201,168,76,0.1)]'
                  : 'border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(201,168,76,0.3)]',
              )}
            >
              {/* Thumbnail */}
              <div className={cn(
                'aspect-square flex items-center justify-center rounded-t-sm',
                isActive ? 'bg-[rgba(201,168,76,0.08)]' : 'bg-[rgba(255,255,255,0.03)]',
              )}>
                <span className={cn(
                  'font-display text-xl transition-opacity duration-200',
                  isActive ? 'text-gold-400 opacity-70' : 'text-gold-400 opacity-20',
                )} style={{ fontWeight: 300 }}>
                  {GLYPHS[product.category]}
                </span>
              </div>

              {/* Label */}
              <div className="px-1.5 py-1.5">
                <p className={cn(
                  'font-body text-[0.5rem] truncate leading-tight',
                  isActive ? 'text-gold-300' : 'text-[rgba(10,10,10,0.5)]',
                )}>
                  {product.name}
                </p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="selector-active"
                  className="h-0.5 bg-gold-gradient w-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
