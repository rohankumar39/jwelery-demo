'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/collections', label: 'Collections' },
  { href: '/try-on',      label: 'Try Live', highlight: true },
  { href: '/about',       label: 'About' },
  { href: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastScrollY.current && y > 250);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-ivory-DEFAULT/95 backdrop-blur-md border-b border-[rgba(201,168,76,0.12)] shadow-card-light'
            : 'bg-transparent',
        )}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-obsidian-900" />
              </div>
              <span className="font-display text-xl text-obsidian-900" style={{ fontWeight: 400, letterSpacing: '0.1em' }}>
                AURA
                <span className="text-gold-gradient ml-1.5">JEWELS</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'btn btn-ghost text-xs tracking-widest',
                    link.highlight &&
                      'text-gold-500 border border-[rgba(201,168,76,0.3)] rounded-sm hover:border-[rgba(201,168,76,0.7)] hover:bg-[rgba(201,168,76,0.06)]',
                    !link.highlight && pathname === link.href && 'text-obsidian-900',
                    !link.highlight && pathname !== link.href && 'text-[rgba(10,10,10,0.6)] hover:text-obsidian-900',
                  )}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-gold" />
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 text-[rgba(10,10,10,0.7)] hover:text-obsidian-900 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory-DEFAULT/98 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'font-display text-4xl font-light tracking-wider transition-colors',
                      link.highlight ? 'text-gold-shimmer' : 'text-[rgba(10,10,10,0.7)] hover:text-obsidian-900',
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="divider-gold w-24 mt-2"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
