import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConceptSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animation du titre
      gsap.from(".concept-header", {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: ".concept-header",
          start: "top 85%",
        }
      });

      // Animation des cartes piliers (Stagger)
      gsap.from(".pillar-card", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pillars-grid",
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    { title: "Défis techniques", desc: "Des problématiques complexes à résoudre sous pression." },
    { title: "Collaboration", desc: "Une expérience humaine et collective intense." },
    { title: "Sprint d'innovation", desc: "Un cycle ultra-rapide : imaginer, concevoir, prototyper." },
    { title: "Compétition", desc: "Une émulation saine pour repousser vos limites." }
  ];

  const solutions = [
    "Modèles d’intelligence artificielle",
    "Plateformes numériques",
    "Applications mobiles",
    "API et webservices"
  ];

  return (
    <section ref={sectionRef} id="concept" className="relative bg-[#1a1a18] py-24 md:py-32 overflow-hidden">
      {/* Grille technique subtile en fond */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#e1c199_1px,transparent_1px),linear-gradient(to_bottom,#e1c199_1px,transparent_1px)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* En-tête de section */}
        <div className="concept-header max-w-3xl mb-20">
          <p className="font-inter text-enigmia-gold text-[0.7rem] uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-enigmia-gold"></span> Le Concept
          </p>
          <h2 className="font-poppins text-4xl md:text-6xl font-black text-white mb-8">
            Transformer l'idée en <span className="text-enigmia-gold">réalité.</span>
          </h2>
          <p className="font-inter text-gray-400 text-lg leading-relaxed">
            EnigmIA est un hackathon immersif où des équipes se réunissent pour relever un défi technologique en un temps limité. [cite: 10] L’objectif : transformer une idée en prototype fonctionnel grâce à l’intelligence collective. [cite: 12]
          </p>
        </div>

        {/* Grille des 4 Piliers */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-24 bg-enigmia-gold/10 p-px">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card bg-[#1a1a18] p-10 group hover:bg-enigmia-gold/5 transition-colors duration-500">
              <div className="text-enigmia-gold font-poppins text-xs mb-6 opacity-30 group-hover:opacity-100 transition-opacity tracking-widest">0{idx + 1}</div>
              <h3 className="font-poppins text-xl font-bold text-white mb-4 group-hover:text-enigmia-gold transition-colors">{pillar.title}</h3>
              <p className="font-inter text-gray-500 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Section Livrables / Solutions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24 py-16 border-t border-enigmia-gold/10">
          <div className="lg:w-1/3">
            <h4 className="font-poppins text-2xl font-bold text-white mb-4">
              Ce que vous allez <br/> <span className="text-enigmia-gold italic">décoder :</span>
            </h4>
            <p className="font-inter text-gray-400 text-sm">
              Libérez votre créativité pour développer des solutions concrètes et innovantes.
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {solutions.map((sol, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-enigmia-dark/50 border border-enigmia-gold/5 p-6 hover:border-enigmia-gold/30 transition-all group">
                <div className="w-2 h-2 bg-enigmia-gold rotate-45 group-hover:scale-150 transition-transform"></div>
                <span className="font-inter text-gray-300 group-hover:text-white transition-colors">{sol}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}