import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Aura Jewels — Luxury Jewellery & Virtual Try-On', template: '%s | Aura Jewels' },
  description: 'Discover handcrafted luxury jewellery. Try earrings, necklaces, rings and bracelets live using our browser-based virtual try-on. No download needed.',
  keywords: ['jewellery','virtual try-on','gold','diamond','kundan','bridal','india'],
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Aura Jewels' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
