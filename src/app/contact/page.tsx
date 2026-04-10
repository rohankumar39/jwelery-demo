import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageCircle, Phone, Instagram, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Aura Jewels via WhatsApp, phone, or visit our store.',
};

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999'}?text=${encodeURIComponent("Hello! I'd like to know more about your jewellery collections.")}`;

const CONTACTS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 99999 99999',
    sub: 'Fastest response — usually within minutes',
    href: WA,
    color: 'hover:text-green-400 hover:border-green-400/30',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    sub: 'Mon–Sat, 10am–8pm IST',
    href: 'tel:+919999999999',
    color: 'hover:text-blue-400 hover:border-blue-400/30',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@aurajewels.in',
    sub: 'DMs, stories, and new arrivals',
    href: 'https://instagram.com',
    color: 'hover:text-pink-400 hover:border-pink-400/30',
  },
  {
    icon: MapPin,
    label: 'Store',
    value: 'Connaught Place, New Delhi',
    sub: 'By appointment preferred',
    href: 'https://maps.google.com',
    color: 'hover:text-amber-400 hover:border-amber-400/30',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory-DEFAULT">
      <Navbar />

      <section className="pt-32 pb-10 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="divider-gold w-8" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Reach Us</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-obsidian-900 mb-4" style={{ fontWeight: 300 }}>
            Get in Touch
          </h1>
          <p className="font-body font-light text-[rgba(10,10,10,0.55)] text-lg max-w-md">
            Questions about a piece, customisation requests, or just want to say hello — we&apos;re here.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-5 p-6 card-light rounded-sm border border-[rgba(0,0,0,0.08)] transition-all duration-300 ${c.color}`}
              >
                <div className="w-10 h-10 rounded-sm bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(201,168,76,0.4)] transition-all">
                  <c.icon className="w-4.5 h-4.5 text-gold-500" />
                </div>
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.45)] mb-1">{c.label}</p>
                  <p className="font-body font-medium text-sm text-obsidian-900 mb-0.5">{c.value}</p>
                  <p className="font-body font-light text-xs text-[rgba(10,10,10,0.5)]">{c.sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Store hours card */}
          <div className="mt-10 p-7 card-light border border-[rgba(201,168,76,0.1)] rounded-sm max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <Clock className="w-4 h-4 text-gold-500" />
              <h3 className="font-display text-lg text-obsidian-900" style={{ fontWeight: 400 }}>Store Hours</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              {[
                ['Monday – Friday', '10:00 am – 8:00 pm'],
                ['Saturday', '10:00 am – 7:00 pm'],
                ['Sunday', '11:00 am – 5:00 pm'],
                ['Public Holidays', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between py-2 border-b border-[rgba(0,0,0,0.04)]">
                  <span className="font-body font-light text-xs text-[rgba(10,10,10,0.55)]">{day}</span>
                  <span className="font-body font-light text-xs text-[rgba(10,10,10,0.8)]">{time}</span>
                </div>
              ))}
            </div>
            <p className="font-body font-light text-xs text-[rgba(10,10,10,0.4)] mt-5 italic">
              WhatsApp is available beyond store hours for enquiries.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
