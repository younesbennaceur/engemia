import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prizes } from '../../data'; // Assurez-vous d'avoir exporté 'prizes' depuis data.js

gsap.registerPlugin(ScrollTrigger);

function PrizeCard({ prize, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    // Animation d'entrée : les cartes apparaissent en cascade
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, rotateX: -15, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        delay: index * 0.15, // Effet cascade
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%', // Se déclenche quand la carte arrive près du bas
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-enigmia-gold/10 bg-enigmia-dark/60 p-8 text-center backdrop-blur-lg transition-all duration-500 hover:-translate-y-3 hover:border-enigmia-gold/50 hover:bg-enigmia-gold/5 hover:shadow-[0_20px_50px_-10px_rgba(225,193,153,0.3)]"
      style={{ perspective: '1000px' }} // Nécessaire pour l'effet 3D au hover
    >
      {/* ── Effets Visuels de Fond ── */}
      {/* Lueur diffuse dorée au survol (Glow) */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-enigmia-gold/10 blur-[40px] transition-all duration-500 group-hover:bg-enigmia-gold/25" />
      
      {/* Ligne lumineuse en haut qui se trace */}
      <div className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-enigmia-gold to-white transition-transform duration-500 group-hover:scale-x-100" />

      {/* ── Contenu de la Carte ── */}
      {/* Numéro stylisé style "Machine" (Remplace l'émoji) */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        {/* Anneau rotatif en fond (décoratif) */}
        <div className="absolute inset-0 rounded-full border border-enigmia-gold/10 transition-transform duration-1000 group-hover:rotate-180 group-hover:border-enigmia-gold/30" />
        
        {/* Le numéro */}
        <span className="font-poppins text-6xl font-black text-enigmia-gold/10 transition-colors duration-300 group-hover:text-enigmia-gold/80 group-hover:drop-shadow-[0_0_10px_rgba(225,193,153,0.5)]">
          {index + 1}
        </span>
      </div>

      {/* Nom du Prix */}
      <h3 className="mb-4 font-poppins text-lg font-bold text-white transition-colors duration-300 group-hover:text-enigmia-gold md:text-xl">
        {prize.name}
      </h3>

      {/* Montant (Style Terminal) */}
      <div className="mt-auto inline-flex items-center gap-2 rounded-full border border-enigmia-gold/20 bg-[#151514] px-5 py-2 font-inter text-xs font-bold tracking-[0.15em] text-enigmia-gold shadow-inner">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-enigmia-gold" />
        {prize.amount}
      </div>
    </div>
  );
}

export default function PrizesSection() {
  const sectionRef = useRef(null);

  return (
    <section id="prizes" ref={sectionRef} className="relative bg-[#1a1a18] px-6 py-24 md:px-[60px] md:py-[120px]">
      {/* ── Background Elements ── */}
      {/* Halo lumineux diffuse de fond */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <div className="h-[40vw] w-[40vw] rounded-full bg-enigmia-gold/5 blur-[120px]" />
      </div>
      
      {/* Grille technique fine */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(var(--color-enigmia-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-enigmia-gold) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 90%)'
        }}
      />

      {/* Ligne séparatrice supérieure animée */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-enigmia-gold to-transparent opacity-40" />


      {/* ── Contenu ── */}
      <div className="relative z-10 mx-auto max-w-[1200px]">
        
        {/* En-tête de section */}
        <div className="mb-16 text-center md:mb-24">
          <p className="inline-flex items-center gap-4 font-inter text-[0.7rem] uppercase tracking-[0.3em] text-enigmia-gold opacity-80 before:h-px before:w-10 before:bg-enigmia-gold after:h-px after:w-10 after:bg-enigmia-gold">
            Récompenses
          </p>
          <h2 className="mt-4 font-poppins text-4xl font-black text-white md:text-6xl">
            Les Trophées EnigmIA
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-gray-400">
            Cinq prix prestigieux pour récompenser l'excellence technique, l'innovation et la collaboration. Chaque équipe gagnante repartira avec une dotation financière.
          </p>
        </div>

        {/* Grille des Prix (Responsive) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {prizes.map((prize, i) => (
            <PrizeCard key={prize.id} prize={prize} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}