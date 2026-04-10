'use client';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "I tried on three earring sets before deciding — all from my living room. The placement was surprisingly accurate. Ordered the Kundan jhumkas and they're perfect.",
    name: "Priya Sharma",
    location: "Mumbai",
    initials: "PS",
  },
  {
    quote: "The virtual try-on helped me choose the right necklace for my wedding lehenga. Saved me three trips to the store. Absolutely brilliant feature.",
    name: "Ananya Reddy",
    location: "Hyderabad",
    initials: "AR",
  },
  {
    quote: "I was skeptical at first, but the ring try-on was actually really helpful. My mother and I tried it together on a video call and picked out her anniversary gift.",
    name: "Kavya Nair",
    location: "Bangalore",
    initials: "KN",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-ivory-DEFAULT">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="divider-gold w-8" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-gold-500">Testimonials</span>
            <div className="divider-gold w-8" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-obsidian-900" style={{ fontWeight: 300 }}>
            Loved by Thousands
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-7 card-light rounded-sm border border-[rgba(201,168,76,0.1)] relative"
            >
              {/* Quote mark */}
              <div className="font-display text-5xl text-gold-400 leading-none mb-4 opacity-40" style={{ fontWeight: 300 }}>
                "
              </div>
              <p className="font-body font-light text-[rgba(10,10,10,0.75)] text-sm leading-relaxed mb-6 italic">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                  <span className="font-body text-[0.6rem] font-medium text-obsidian-900">{t.initials}</span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-obsidian-900">{t.name}</p>
                  <p className="font-body font-light text-xs text-[rgba(10,10,10,0.45)]">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
