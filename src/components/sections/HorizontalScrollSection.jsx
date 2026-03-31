import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineItems } from '../../data';

gsap.registerPlugin(ScrollTrigger);

function TimelineCard({ item, index }) {
  return (
    <div className="timeline-card group relative w-[300px] md:w-[450px] shrink-0 px-8 md:px-16 border-r border-enigmia-gold/10 last:border-r-0">
      {/* Numéro en arrière-plan */}
      <span className="absolute -top-10 left-10 text-9xl font-black text-enigmia-gold/5 select-none transition-colors duration-500 group-hover:text-enigmia-gold/10">
        0{index + 1}
      </span>

      {/* Point sur la timeline */}
      <div className="absolute top-[52px] left-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-enigmia-gold bg-enigmia-dark z-20 transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:shadow-[0_0_20px_rgba(225,193,153,0.8)] group-hover:bg-enigmia-gold" />

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
        <h3 className="mb-6 font-poppins text-2xl md:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-enigmia-gold">
          {item.title}
        </h3>

        {/* Liste détaillée */}
        <ul className="space-y-4">
          {item.items.map((text, i) => (
            <li key={i} className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-enigmia-gold/40 group-hover:bg-enigmia-gold transition-colors duration-300" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HorizontalScrollSection() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null); // Ref pour le wrapper total
  const scrollWrapperRef = useRef(null); // Ref pour les éléments qui bougent

  // On utilise useLayoutEffect pour s'assurer que le DOM est prêt avant les calculs GSAP
  useLayoutEffect(() => {
    // Nettoyage de sécurité
    let ctx = gsap.context(() => {
      
      const elementsWidth = scrollWrapperRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = elementsWidth - windowWidth;

      // 1. L'Animation de défilement horizontal principal
      gsap.to(scrollWrapperRef.current, {
        x: -scrollDistance,
        ease: "none", // Indispensable pour lier le mouvement au scroll
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top", // Dès que la section touche le haut de l'écran
          end: `+=${scrollDistance}`, // La hauteur du scroll correspond à la largeur à parcourir
          scrub: 1.5, // 👈 Le secret de la fluidité : 1.5 sec de décalage (inertie)
          pin: true,
          anticipatePin: 1, // Prépare le pin pour éviter les à-coups
          invalidateOnRefresh: true,
        }
      });

      // 2. Animation d'entrée des cartes
      gsap.from(".timeline-card", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%", // Commence avant le pinning
        }
      });

    }, containerRef); // Scope de gsap.context

    return () => ctx.revert(); // Nettoyage propre au démontage
  }, []);

  return (
    <section id="programme" ref={containerRef} className="bg-enigmia-dark overflow-hidden">
      {/* triggerRef est l'élément qui va être épinglé (pin) */}
      <div ref={triggerRef} className="relative h-screen flex flex-col justify-center">
        
        {/* EN-TÊTE STATIQUE (Reste fixe pendant le scroll horizontal) */}
        <div className="absolute top-20 left-6 md:left-[60px] z-30 pointer-events-none">
          <div className="flex items-center gap-4 font-inter text-[0.7rem] uppercase tracking-[0.3em] text-enigmia-gold mb-4">
            <span className="h-px w-8 bg-enigmia-gold" />
            Programme
          </div>
          <h2 className="font-poppins text-4xl md:text-6xl font-black text-white drop-shadow-lg">
            L'Odyssée <span className="text-enigmia-gold">EnigmIA</span>
          </h2>
          <p className="mt-4 text-gray-500 font-inter text-sm animate-pulse">
            ↓ Scrollez vers le bas pour avancer dans le temps
          </p>
        </div>

        {/* ZONE DE DÉFILEMENT (Ce qui bouge vers la gauche) */}
        <div ref={scrollWrapperRef} className="relative flex flex-nowrap items-center h-full pl-[60px] md:pl-[20vw] will-change-transform">
          
          {/* Ligne de fond (Timeline) - Reste liée aux cartes */}
          <div className="absolute top-1/2 left-0 w-[150%] h-[1px] bg-gradient-to-r from-enigmia-gold/0 via-enigmia-gold/30 to-enigmia-gold/0" />

          {timelineItems.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}

          {/* Espace vide final pour une sortie douce */}
          <div className="w-[40vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}