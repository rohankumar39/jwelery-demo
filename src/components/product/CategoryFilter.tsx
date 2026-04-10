'use client';
import { motion } from 'framer-motion';
import { cn, CATEGORY_LABELS } from '@/lib/utils';
import type { JewelleryCategory } from '@/types/product';

const ALL_CATS = [
  { id: 'all' as const,              label: 'All',       glyph: '✦' },
  { id: 'earrings' as JewelleryCategory, label: 'Earrings',  glyph: '◇' },
  { id: 'necklace' as JewelleryCategory, label: 'Necklaces', glyph: '○' },
  { id: 'ring'     as JewelleryCategory, label: 'Rings',     glyph: '◻' },
  { id: 'bracelet' as JewelleryCategory, label: 'Bracelets', glyph: '⬡' },
  { id: 'pendant'  as JewelleryCategory, label: 'Pendants',  glyph: '✦' },
];

interface Props {
  active: JewelleryCategory | 'all';
  onChange: (c: JewelleryCategory | 'all') => void;
  counts?: Partial<Record<JewelleryCategory | 'all', number>>;
}

export default function CategoryFilter({ active, onChange, counts }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_CATS.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              'relative btn text-[0.65rem] tracking-[0.15em] px-4 py-2.5 rounded-sm transition-all duration-300',
              isActive
                ? 'border border-[rgba(201,168,76,0.55)] text-gold-300'
                : 'border border-[rgba(0,0,0,0.1)] text-[rgba(10,10,10,0.55)] hover:border-[rgba(201,168,76,0.3)] hover:text-[rgba(10,10,10,0.85)]',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="cat-active"
                className="absolute inset-0 bg-[rgba(201,168,76,0.1)] rounded-sm"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.glyph}</span>
              {cat.label}
              {counts && counts[cat.id] !== undefined && (
                <span className={cn('text-[0.55rem]', isActive ? 'text-gold-500' : 'text-[rgba(250,247,240,0.28)]')}>
                  {counts[cat.id]}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
