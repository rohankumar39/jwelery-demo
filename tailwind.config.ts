import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0A", "50":"#F5F5F3","100":"#E8E8E4","200":"#C8C8C0",
          "300":"#A0A090","400":"#707068","500":"#4A4A44","600":"#2E2E2A",
          "700":"#1C1C18","800":"#121210","900":"#0A0A0A",
        },
        gold: {
          DEFAULT: "#C9A84C","50":"#FDF8EC","100":"#FAF0D0","200":"#F2DB98",
          "300":"#E8C560","400":"#D9AE42","500":"#C9A84C","600":"#B8932A",
          "700":"#967618","800":"#715808","900":"#4A3900",
          light:"#E8C560",pale:"#FDF8EC",
        },
        ivory: { DEFAULT:"#FAF7F0",warm:"#F5EED8",cream:"#EDE4CC" },
      },
      fontFamily: {
        display:["var(--font-display)","serif"],
        body:["var(--font-body)","sans-serif"],
        accent:["var(--font-accent)","serif"],
      },
      backgroundImage: {
        "gold-gradient":"linear-gradient(135deg,#C9A84C 0%,#E8C560 50%,#C9A84C 100%)",
        "gold-gradient-h":"linear-gradient(90deg,#B8932A 0%,#E8C560 50%,#B8932A 100%)",
        "hero-radial":"radial-gradient(ellipse 80% 60% at 50% 40%,rgba(201,168,76,0.12) 0%,transparent 70%)",
      },
      boxShadow: {
        "gold-glow":"0 0 40px rgba(201,168,76,0.25),0 0 80px rgba(201,168,76,0.1)",
        "gold-subtle":"0 2px 20px rgba(201,168,76,0.15)",
        "card-light":"0 4px 32px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)",
        "card-hover":"0 8px 48px rgba(0,0,0,0.12),0 0 20px rgba(201,168,76,0.15)",
      },
      animation: {
        "shimmer":"shimmer 3s linear infinite",
        "float":"float 6s ease-in-out infinite",
        "pulse-gold":"pulseGold 3s ease-in-out infinite",
        "fade-up":"fadeUp 0.7s ease forwards",
      },
      keyframes: {
        shimmer:{"0%":{backgroundPosition:"200% center"},"100%":{backgroundPosition:"-200% center"}},
        float:{"0%,100%":{transform:"translateY(0px)"},"50%":{transform:"translateY(-12px)"}},
        pulseGold:{"0%,100%":{opacity:"0.6"},"50%":{opacity:"1"}},
        fadeUp:{"0%":{opacity:"0",transform:"translateY(24px)"},"100%":{opacity:"1",transform:"translateY(0)"}},
      },
    },
  },
  plugins: [],
};
export default config;
