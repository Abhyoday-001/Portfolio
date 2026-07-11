import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';
import LiquidText from './LiquidText';
import LiquidMetalButton from './LiquidMetalButton';

gsap.registerPlugin(ScrollTrigger);

const WhatIDo = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  
  // ID Card refs
  const idCardWrapperRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotionBrowser = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    if (prefersReducedMotionBrowser || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          // Play once as section enters viewport
          toggleActions: "play none none none"
        }
      });

      // 1. Lanyard unspools downward
      tl.to(lanyardRef.current, {
        height: "120px", // Drops down into the section
        ease: "elastic.out(1, 0.6)",
        duration: 1.5
      }, 0);

      // 2. ID card swings (pendulum effect)
      tl.fromTo(idCardWrapperRef.current, 
        { rotationZ: 45 },
        {
          rotationZ: 0,
          ease: "elastic.out(1, 0.3)", // Damped rotational oscillations
          duration: 2.2
        }, 
      0);

      // 3. Show ID card as it drops
      tl.to(idCardRef.current, {
        opacity: 1,
        duration: 0.2
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-screen flex items-center px-8 py-20 relative z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left side ID Card Drop */}
        <div className="relative w-full h-[500px] flex justify-center items-start">
          
          <div 
            ref={idCardWrapperRef} 
            className="absolute -top-20 flex flex-col items-center" 
            style={{ transformOrigin: 'top center' }}
          >
            {/* Thick Lanyard Strap */}
            <div 
              ref={lanyardRef} 
              className="w-[18px] bg-zinc-800 shadow-xl rounded-t-full" 
              style={{ height: '0px' }} 
            />
            
            {/* ID Card */}
            <div ref={idCardRef} className="opacity-0 relative mt-2">
              <div 
                className="w-[340px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[20px] flex flex-col items-center p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative rotate-[-4deg]"
              >
                {/* Strap Attachment */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-20 h-7 bg-zinc-900 rounded-md flex justify-center items-center border border-zinc-700 shadow-inner z-10">
                   <div className="w-10 h-2.5 bg-zinc-950 rounded-full" />
                </div>
                
                {/* ID Photo */}
                <div className="w-full h-auto aspect-square rounded-xl overflow-hidden border-2 border-white/20 mb-5 shadow-lg p-1.5 bg-white/5">
                  <img 
                    src="/pfp.jpeg" 
                    alt="ID Profile" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Abhyoday Kumar</h3>
              </div>
            </div>
          </div>

        </div>

        {/* Right side content */}
        <div className="z-10 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">Me</span>
          </motion.h2>

          <div className="space-y-8">
            <div className="text-xl md:text-2xl leading-relaxed text-zinc-300">
              <LiquidText 
                text="Computer Science undergraduate (CGPA 9.025) at Jain University with demonstrated experience in full stack web development and artificial intelligence. Proficient in building scalable, production-ready applications using React.js, Node.js, Python, and MongoDB. Hands-on experience developing AI-powered solutions leveraging Generative AI, Large Language Models (LLMs), RAG pipelines, and NLP across Healthcare, LegalTech, FinTech, and GovTech domains. Internship experience in mobile application development and software quality assurance."
                fontSize={70}
                lightColor="#d4d4d8"
                darkColor="#d4d4d8"
                color="#d4d4d8"
                className="w-full min-h-[400px]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4"
            >
              <LiquidMetalButton 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Ak.pdf';
                  link.download = 'Ak.pdf';
                  link.click();
                }}
                borderWidth={2}
                metalConfig={{ 
                  colorTint: "#00f2ff", 
                  speed: 0.6 
                }}
                className="shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:scale-105 group"
              >
                <div className="flex items-center gap-3 font-bold mono uppercase tracking-wider text-cyan drop-shadow-md">
                  <span>Download Resume</span>
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </LiquidMetalButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
