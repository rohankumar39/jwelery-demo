import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import TryLiveCTA from '@/components/home/TryLiveCTA';
import Testimonials from '@/components/home/Testimonials';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999'}`;

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCollections />
      <TryLiveCTA />
      <Testimonials />

      {/* Final CTA */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
        <div className="container-site relative z-10 text-center">
          <h2 className="font-display text-2xl md:text-4xl text-obsidian-900 mb-4" style={{ fontWeight: 300 }}>
            Questions? We&apos;re Right Here.
          </h2>
          <p className="font-body font-light text-[rgba(10,10,10,0.6)] mb-8 max-w-sm mx-auto">
            Chat with us on WhatsApp for sizing, customisation, or anything else.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
