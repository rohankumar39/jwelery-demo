import { cn } from '@/lib/utils';
interface BadgeProps { children: React.ReactNode; variant?: 'gold'|'outline'|'tryon'|'dim'; className?: string; }
export default function Badge({ children, variant='dim', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-body font-medium text-[0.6rem] tracking-widest uppercase px-2 py-0.5',
      variant==='gold'    && 'bg-gold-500 text-obsidian-900',
      variant==='outline' && 'border border-[rgba(201,168,76,0.45)] text-gold-400',
      variant==='tryon'   && 'border border-[rgba(201,168,76,0.4)] text-gold-400 bg-[rgba(10,10,10,0.75)]',
      variant==='dim'     && 'bg-[rgba(0,0,0,0.08)] text-[rgba(10,10,10,0.6)]',
      className,
    )}>{children}</span>
  );
}