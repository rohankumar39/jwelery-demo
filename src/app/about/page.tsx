import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata as Meta } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind Aura Jewels — handcrafted luxury jewellery rooted in Indian tradition.',
};

const VALUES = [
  { title: 'Craftsmanship',  desc: 'Every piece is handcrafted by master karigars with generations of experience in Rajasthani and South Indian jewellery-making traditions.' },
  { title: 'Authenticity',   desc: 'We use only BIS-hallmarked gold, IGI-certified diamonds, and ethically sourced gemstones. No compromises on quality.' },
  { title: 'Transparency',   desc: 'We believe you should know exactly what you\'re buying. Full material specs, weights, and certifications on every product.' },
  { title: 'Innovation',     desc: 'Our virtual try-on lets you experience jewellery before you buy it — combining traditional craft with modern technology.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory-DEFAULT">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div className="container-site relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="divider-gold w-8" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Our Story</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-obsidian-900 mb-8" style={{ fontWeight: 300 }}>
            Where Tradition Meets{' '}
            <span className="text-gold-gradient" style={{ fontStyle: 'italic' }}>Tomorrow</span>
          </h1>
          <p className="font-body font-light text-[rgba(10,10,10,0.65)] text-lg leading-relaxed mb-6">
            Aura Jewels was born from a simple belief: that extraordinary jewellery should be accessible, transparent, and experiential. Founded in Delhi NCR, we work directly with artisans across Rajasthan, Tamil Nadu, and Maharashtra to bring you handcrafted pieces that carry a story.
          </p>
          <p className="font-body font-light text-[rgba(10,10,10,0.55)] leading-relaxed">
            When we couldn't find a way for our customers to try jewellery without visiting the store, we built one. Our browser-based virtual try-on is India's first no-app, no-signup jewellery try-on experience — available to anyone, anywhere.
          </p>
        </div>
      </section>

      <div className="divider-gold" />

      {/* Values */}
      <section className="section-padding">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl md:text-4xl text-obsidian-900" style={{ fontWeight: 300 }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((v, i) => (
              <div key={v.title}
                className="p-7 card-light border border-[rgba(201,168,76,0.1)] rounded-sm hover:border-[rgba(201,168,76,0.25)] transition-all duration-300">
                <div className="font-display text-2xl text-gold-400 mb-1 opacity-40" style={{ fontWeight: 300 }}>
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl text-obsidian-900 mb-3" style={{ fontWeight: 400 }}>
                  {v.title}
                </h3>
                <p className="font-body font-light text-sm text-[rgba(250,247,240,0.52)] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <div className="bg-white py-14 border-y border-[rgba(201,168,76,0.1)]">
        <div className="container-site">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {[
              { value: '500+', label: 'Unique Designs' },
              { value: '10k+', label: 'Happy Customers' },
              { value: '50+',  label: 'Master Artisans' },
              { value: '5 yrs', label: 'Of Crafting' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl text-gold-400 mb-1" style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div className="font-body text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(10,10,10,0.45)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
