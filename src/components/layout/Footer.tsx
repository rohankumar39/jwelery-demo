import Link from 'next/link';
import { Sparkles, MessageCircle, Instagram, Phone } from 'lucide-react';

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999'}`;

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.12)] bg-[rgba(18,18,16,0.6)]">
      <div className="container-site py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-obsidian-900" />
              </div>
              <span className="font-display text-lg tracking-widest text-obsidian-900" style={{fontWeight:400,letterSpacing:'0.1em'}}>
                AURA <span className="text-gold-gradient">JEWELS</span>
              </span>
            </div>
            <p className="text-[rgba(10,10,10,0.5)] text-sm leading-relaxed max-w-xs font-body font-light">
              Handcrafted luxury jewellery rooted in tradition, refined for the modern woman.
            </p>
            <div className="divider-gold w-20 mt-6" />
          </div>

          <div>
            <h4 className="font-body text-[0.65rem] tracking-widest uppercase text-gold-500 mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                ['/collections','All Collections'],
                ['/collections?cat=earrings','Earrings'],
                ['/collections?cat=necklace','Necklaces'],
                ['/collections?cat=ring','Rings'],
                ['/try-on','Virtual Try-On'],
              ].map(([href,label]) => (
                <li key={href}>
                  <Link href={href} className="text-[rgba(10,10,10,0.55)] hover:text-gold-400 text-sm transition-colors font-body font-light">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[0.65rem] tracking-widest uppercase text-gold-500 mb-5">Connect</h4>
            <div className="space-y-3.5">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-[rgba(10,10,10,0.55)] hover:text-green-400 transition-colors text-sm">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-body font-light">WhatsApp Us</span>
              </a>
              <a href="tel:+919999999999"
                className="flex items-center gap-3 text-[rgba(10,10,10,0.55)] hover:text-obsidian-900 transition-colors text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="font-body font-light">+91 99999 99999</span>
              </a>
              <a href="#"
                className="flex items-center gap-3 text-[rgba(10,10,10,0.55)] hover:text-pink-400 transition-colors text-sm">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span className="font-body font-light">@aurajewels.in</span>
              </a>
            </div>
            <div className="mt-5 p-3.5 border border-[rgba(201,168,76,0.15)] rounded-sm bg-[rgba(201,168,76,0.04)]">
              <p className="text-xs text-[rgba(10,10,10,0.45)] font-body font-light leading-relaxed">
                Store timings: Mon–Sat, 10am–8pm IST
              </p>
            </div>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[rgba(250,247,240,0.2)] text-xs font-body font-light">
            © {new Date().getFullYear()} Aura Jewels. All rights reserved.
          </p>
          <p className="text-[rgba(250,247,240,0.15)] text-xs font-body font-light">
            Crafted with care · Shipped across India
          </p>
        </div>
      </div>
    </footer>
  );
}
