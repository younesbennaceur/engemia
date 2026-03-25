import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineItems } from '../../data';

gsap.registerPlugin(ScrollTrigger);

function TimelineCard({ item, index }) {
  return (
    <div className="timeline-card group relative w-[300px] md:w-[450px] shrink-0 px-8 md:px-16 border-r border-enigmia-gold/10 last:border-r-0">
      {/* Numéro en arrière-plan */}
      <span className="absolute -top-10 left-10 text-9xl font-black text-enigmia-gold/5 select-none transition-colors group-hover:text-enigmia-gold/10">
        0{index + 1}
      </span>

      {/* Point sur la timeline */}
      <div className="absolute top-[52px] left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-enigmia-gold bg-enigmia-dark z-20 transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(225,193,153,0.8)]" />

      <div className="relative z-10 pt-20">
        {/* Jour et Date */}
        <div className="mb-6 flex items-center gap-3 font-inter text-[0.7rem] uppercase tracking-[0.3em] text-enigmia-gold">
          {item.dayLabel && (
            <span className="bg-enigmia-gold px-3 py-1 text-[0.65rem] font-black text-enigmia-dark">
              {item.dayLabel}
            </span>
          )}
          <span className="opacity-60">{item.date}</span>
        </div>

        {/* Titre */}
        <h3 className="mb-6 font-poppins text-2xl md:text-3xl font-bold text-white transition-colors group-hover:text-enigmia-gold">
          {item.title}
        </h3>

        {/* Liste détaillée */}
        <ul className="space-y-4">
          {item.items.map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-enigmia-gold/40" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: 0 },
      {
        x: () => -(sectionRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${sectionRef.current.scrollWidth}`,
          scrub: 1, // Vitesse de suivi du scroll (1 = fluide)
          pin: true, // Bloque la section verticalement
          invalidateOnRefresh: true, // Recalcule si on redimensionne la fenêtre
        },
      }
    );

    // Animation d'entrée des cartes (opacité et montée)
    gsap.from(".timeline-card", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 80%",
        }
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-enigmia-dark">
      <div className="relative h-screen flex flex-col justify-center">
        
        {/* En-tête statique (Optionnel : si tu veux qu'il défile aussi, mets le dans sectionRef) */}
        <div className="absolute top-20 left-6 md:left-[60px] z-30">
           <div className="flex items-center gap-4 font-inter text-[0.7rem] uppercase tracking-[0.3em] text-enigmia-gold">
             <span className="h-px w-8 bg-enigmia-gold" />
             Programme
           </div>
           <h2 className="mt-4 font-poppins text-4xl md:text-6xl font-black text-white">
             L'Odyssée <span className="text-enigmia-gold">EnigmIA</span>
           </h2>
           <p className="mt-4 text-gray-500 font-inter text-sm animate-pulse">
             ↓ Scrollez vers le bas pour avancer dans le temps
           </p>
        </div>

        {/* Conteneur de défilement horizontal */}
        <div ref={sectionRef} className="relative flex flex-nowrap items-center h-full pl-[60px] md:pl-[20vw]">
          
          {/* Ligne de fond (Timeline) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-enigmia-gold/0 via-enigmia-gold/20 to-enigmia-gold/0" />

          {timelineItems.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}

          {/* Espace vide final pour une sortie fluide */}
          <div className="w-[30vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}