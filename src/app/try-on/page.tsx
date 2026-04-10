import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TryOnPageContent from './TryOnPageContent';

export const metadata: Metadata = {
  title: 'Virtual Try-On',
  description: 'Try on earrings, necklaces, rings and bracelets live using your browser camera. No app needed.',
};

export default function TryOnPage() {
  return (
    <main className="min-h-screen bg-ivory-DEFAULT">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-ivory-DEFAULT" />}>
        <TryOnPageContent />
      </Suspense>
      <Footer />
    </main>
  );
}
