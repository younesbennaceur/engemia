import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Animation d'apparition des boutons en cascade au scroll
    gsap.fromTo(
      '.cta-card',
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const choices = [
    { text: "Je suis partant", icon: "🚀", color: "hover:border-enigmia-gold" },
    { text: "J'ai envie", icon: "🔥", color: "hover:border-enigmia-orange" },
    { text: "Je veux participer", icon: "💡", color: "hover:border-enigmia-blue" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-enigmia-dark py-24 md:py-32">
      {/* Éléments de fond : Grille et Halo [cite: 18, 22] */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[size:60px_60px] bg-[linear-gradient(to_right,#e1c199_1px,transparent_1px),linear-gradient(to_bottom,#e1c199_1px,transparent_1px)]" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-enigmia-gold/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <h2 className="mb-16 font-poppins text-4xl font-black text-white md:text-6xl">
          Prêt à relever le <span className="text-enigmia-gold italic">défi ?</span>
        </h2>

        <div className="flex flex-col items-center gap-8">
          {/* Grille de micro-choix interactifs */}
          <div className="flex flex-wrap justify-center gap-4">
            {choices.map((choice, idx) => (
              <div
                key={idx}
                className={`cta-card group flex cursor-pointer items-center gap-3 border border-enigmia-gold/20 bg-[#1a1a18] px-6 py-4 transition-all duration-300 ${choice.color} hover:bg-enigmia-gold/5`}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125">{choice.icon}</span>
                <span className="font-inter text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">
                  {choice.text}
                </span>
              </div>
            ))}
          </div>

          {/* Le bouton d'action principal vers la page d'inscription */}
          <Link
            to="/inscription"
            className="cta-card group relative mt-8 overflow-hidden bg-enigmia-gold px-12 py-5 font-poppins text-lg font-black uppercase tracking-[0.2em] text-enigmia-dark transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(225,193,153,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              👉 Je m'inscris au hackathon
            </span>
            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  );
}