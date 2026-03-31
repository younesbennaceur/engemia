import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const emailCardRef = useRef(null);
  const socialCardsRef = useRef([]);

  // Ajout des références au tableau
  const addToRefs = (el) => {
    if (el && !socialCardsRef.current.includes(el)) {
      socialCardsRef.current.push(el);
    }
  };

  useEffect(() => {
    // 1. Animation d'entrée globale
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(emailCardRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(socialCardsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      "-=0.4"
    );

    // 2. Animation continue du background (Grille qui bouge légèrement)
    gsap.to('.bg-grid-animate', {
      backgroundPosition: '50px 50px',
      duration: 20,
      repeat: -1,
      ease: 'linear'
    });
  }, []);

  const socials = [
    {
      name: 'LinkedIn',
      desc: 'Réseau Professionnel',
      url: 'https://linkedin.com', // À remplacer par ton vrai lien
      color: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      desc: 'Photos & Coulisses',
      url: 'https://instagram.com',
      color: 'hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      desc: 'Communauté',
      url: 'https://facebook.com',
      color: 'hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      desc: 'Défis & Vidéos',
      url: 'https://tiktok.com',
      color: 'hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.07-1.46.22-2.92.93-4.18 1.1-1.95 3.12-3.26 5.36-3.42 1.05-.08 2.11.02 3.11.3v4.16c-.96-.33-2.02-.45-3.02-.2-1.17.26-2.19 1.03-2.65 2.13-.3.68-.4 1.45-.2 2.17.22 1.05 1 1.9 1.96 2.26 1.1.4 2.37.28 3.32-.38.82-.55 1.35-1.43 1.5-2.4.07-.46.07-.94.07-1.41V.02h3.91z"/>
        </svg>
      )
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center py-24 px-4 overflow-hidden font-inter">
      
      {/* ── BACKGROUND ENIGMIA ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
        <div className="h-[40vw] w-[40vw] rounded-full bg-[#E1C199]/5 opacity-50 blur-[120px]" />
      </div>
      <div 
        className="bg-grid-animate pointer-events-none absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: 'linear-gradient(#E1C199 1px, transparent 1px), linear-gradient(90deg, #E1C199 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 80%)'
        }}
      />

     

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* TITRE */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-[#E1C199] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Canaux de transmission ouverts
          </p>
          <h1 className="text-white font-poppins text-4xl md:text-6xl font-black tracking-tight">
            Établir le <span className="text-[#E1C199] border-b-2 border-[#E1C199]">Contact</span>
          </h1>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8">
          
          {/* CARTE EMAIL PRINCIPALE (Style Terminal) */}
          <div 
            ref={emailCardRef}
            className="flex-1 bg-[#141414] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative group"
          >
            {/* Barre supérieure du terminal */}
            <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-[0.65rem] text-zinc-500 font-mono">contact.exe</span>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center h-[calc(100%-40px)]">
              <div className="w-16 h-16 bg-[#E1C199]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#E1C199]/20 group-hover:bg-[#E1C199]/20 transition-colors">
                <svg className="w-8 h-8 text-[#E1C199]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 font-poppins">Ligne Directe</h2>
              <p className="text-sm text-zinc-400 mb-8 max-w-sm">
                Une question sur le Hackathon ? Un partenariat à proposer ? Notre équipe déchiffrera votre message dans les plus brefs délais.
              </p>
              
              <a 
                href="mailto:enigmia@indevtech.dev"
                className="inline-flex items-center justify-between w-full p-4 bg-zinc-900/50 border border-zinc-700 rounded-xl hover:border-[#E1C199] hover:bg-black transition-all group/mail"
              >
                <span className="font-mono text-[#E1C199] text-sm md:text-base tracking-wider break-all">
                  enigmia@indevtech.dev
                </span>
                <span className="text-zinc-500 group-hover/mail:text-[#E1C199] transition-colors ml-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* GRILLE RÉSEAUX SOCIAUX */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                ref={addToRefs}
                className={`flex flex-col items-center justify-center p-8 bg-[#141414] border border-zinc-800 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${social.color}`}
              >
                <div className="text-zinc-400 mb-4 transition-colors duration-300">
                  {social.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-poppins">{social.name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2">{social.desc}</p>
              </a>
            ))}
          </div>

        </div>

     
      </div>
    </div>
  );
}