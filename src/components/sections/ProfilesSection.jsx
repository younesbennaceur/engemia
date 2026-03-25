import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profiles } from '../../data';

gsap.registerPlugin(Draggable, ScrollTrigger);

/* ── Badge de Profil Typographique (Ancien Style Pur) ── */
function ProfileChip({ profile }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Dispersion organique initiale
    gsap.set(el, {
      x: () => Math.random() * (window.innerWidth > 768 ? 500 : 250) - (window.innerWidth > 768 ? 250 : 125),
      y: () => Math.random() * 160 - 80,
      rotation: () => Math.random() * 12 - 6,
    });

    const [d] = Draggable.create(el, {
      type: 'x,y',
      bounds: '#profiles-playground',
      inertia: true,
      edgeResistance: 0.75,
      onPress() {
        gsap.set(el, { zIndex: 50 });
        gsap.to(el, { scale: 1.1, duration: 0.2, ease: "power2.out" });
      },
      onRelease() {
        gsap.set(el, { zIndex: 10 });
        gsap.to(el, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      },
    });

    return () => d.kill();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab select-none rounded-none border border-enigmia-gold/30 bg-[#1a1a18]/80 px-8 py-4 backdrop-blur-md transition-all duration-300 hover:border-enigmia-gold hover:bg-enigmia-gold/10 active:cursor-grabbing shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
    >
      <span className="font-inter text-[0.75rem] font-black uppercase tracking-[0.25em] text-enigmia-gold">
        {profile.name}
      </span>
      {/* Petite barre technique sous le texte */}
      <div className="mt-2 h-[1px] w-full bg-gradient-to-r from-transparent via-enigmia-gold/40 to-transparent scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

export default function ProfilesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".profiles-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".profiles-header",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="profiles" className="relative bg-enigmia-dark px-6 py-24 md:px-[60px] md:py-[120px] overflow-hidden">
      
      {/* Background technique */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[size:50px_50px] bg-[linear-gradient(to_right,#e1c199_1px,transparent_1px),linear-gradient(to_bottom,#e1c199_1px,transparent_1px)]" />

      <div className="mx-auto max-w-[1200px] relative z-10">
        
        {/* En-tête */}
        <div className="profiles-header mb-16 text-center">
          <p className="mb-4 font-inter text-[0.7rem] uppercase tracking-[0.4em] text-enigmia-gold opacity-80 flex items-center justify-center gap-4">
             <span className="h-px w-10 bg-enigmia-gold/30"></span>
             Casting
             <span className="h-px w-10 bg-enigmia-gold/30"></span>
          </p>
          <h2 className="font-poppins text-4xl font-black text-white md:text-6xl">
            L'Intelligence <span className="text-enigmia-gold">Collective.</span>
          </h2>
          <p className="mt-8 mx-auto max-w-2xl font-inter text-gray-400 text-sm leading-relaxed md:text-base">
            EnigmIA est ouvert à tous les profils passionnés par l’innovation. La diversité des compétences permet de créer des équipes complémentaires et créatives.
          </p>
        </div>

        {/* ── ZONE PLAYGROUND INTERACTIF ── */}
        <div className="relative flex flex-col items-center">
          <div 
            id="profiles-playground"
            className="relative h-[400px] w-full overflow-hidden border border-enigmia-gold/10 bg-[#151514] shadow-inner"
          >
            {/* Décoration de fond (Grand texte transparent) */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.02] select-none">
              <span className="font-poppins text-[15vw] font-black text-white">ENIGMA</span>
            </div>

            {/* Grille de points technique */}
            <div className="pointer-events-none absolute inset-0 opacity-5 bg-[radial-gradient(#e1c199_1px,transparent_1px)] [background-size:25px_25px]" />

            {/* Badges interactifs */}
            {profiles.map((profile) => (
              <ProfileChip key={profile.id} profile={profile} />
            ))}
            
            {/* Label d'instruction discret */}
            <div className="absolute bottom-6 right-6 font-inter text-[0.6rem] uppercase tracking-[0.2em] text-enigmia-gold/30">
              Interactive_Area // Drag_to_sort
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}