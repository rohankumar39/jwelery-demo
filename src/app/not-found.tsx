import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory-DEFAULT flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div>
          <div className="font-display text-[8rem] text-gold-400 leading-none mb-4 opacity-15"
            style={{ fontWeight: 300 }}>
            404
          </div>
          <div className="divider-gold w-24 mx-auto mb-8" />
          <h1 className="font-display text-2xl md:text-4xl text-obsidian-900 mb-4" style={{ fontWeight: 300 }}>
            Page Not Found
          </h1>
          <p className="font-body font-light text-[rgba(10,10,10,0.55)] mb-10 max-w-xs mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, or may have moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="btn btn-gold">
              Back to Home
            </Link>
            <Link href="/collections" className="btn btn-outline-gold">
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
