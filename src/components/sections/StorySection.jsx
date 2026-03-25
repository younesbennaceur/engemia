import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const paragraphs = useRef([]);

  useEffect(() => {
    // Animation d'apparition des paragraphes
    paragraphs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Animation spécifique pour la citation
    gsap.to('#story-quote', {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#story-quote', start: 'top 80%' },
    });
  }, []);

  const addRef = (i) => (el) => {
    paragraphs.current[i] = el;
  };

  return (
    <section id="story" className="relative mx-auto max-w-[1100px] px-6 py-20 md:px-[60px] md:py-[120px]">
      {/* Kicker / Label */}
      <div className="mb-12 flex items-center gap-4 font-inter text-[0.7rem] uppercase tracking-[0.3em] text-enigmia-gold before:block before:h-px before:w-[60px] before:bg-enigmia-gold">
        L'histoire
      </div>

      {/* Paragraphes animés */}
      <p ref={addRef(0)} className="mb-8 font-poppins text-[clamp(1.3rem,2.5vw,1.8rem)] leading-relaxed text-white opacity-0" style={{ transform: 'translateY(20px)' }}>
        En <strong className="font-normal text-enigmia-gold">1936</strong>, Alan Turing imagine une machine capable de résoudre n'importe quel problème logique. Cette idée{' '}
        <span className="inline-block border-b border-enigmia-gold/40">pose les bases de l'informatique moderne.</span>
      </p>

      <p ref={addRef(1)} className="mb-8 font-poppins text-[clamp(1.3rem,2.5vw,1.8rem)] italic leading-relaxed text-gray-400 opacity-0" style={{ transform: 'translateY(20px)' }}>
        Quelques années plus tard, pendant la Seconde Guerre Mondiale, des équipes de chercheurs parviennent à décrypter les messages de la <strong className="font-normal text-enigmia-gold">machine Enigma</strong>. Une avancée majeure pour l'histoire de l'humanité…
      </p>

      <blockquote id="story-quote" className="relative my-20 pl-10 font-poppins text-[clamp(2rem,5vw,4rem)] font-black leading-[1.1] text-enigmia-gold opacity-0 before:absolute before:-top-2.5 before:left-0 before:font-serif before:text-[5rem] before:leading-none before:text-enigmia-gold/15 before:content-['\22']" style={{ transform: 'translateX(-20px)' }}>
        Qui a commencé par une énigme.
      </blockquote>

      <p ref={addRef(2)} className="mb-8 font-poppins text-[clamp(1.3rem,2.5vw,1.8rem)] leading-relaxed text-white opacity-0" style={{ transform: 'translateY(20px)' }}>
        Aujourd'hui, les défis ont changé. Les technologies aussi.
        <br />
        Mais <strong className="font-normal text-enigmia-gold">l'esprit reste le même</strong> : des équipes qui collaborent, des idées qui émergent, un temps limité pour créer.
      </p>

      <p ref={addRef(3)} className="mb-8 font-poppins text-[clamp(1.3rem,2.5vw,1.8rem)] leading-relaxed text-white opacity-0" style={{ transform: 'translateY(20px)' }}>
        C'est l'esprit d'<strong className="font-normal text-enigmia-gold">EnigmIA</strong>.
      </p>
    </section>
  );
}