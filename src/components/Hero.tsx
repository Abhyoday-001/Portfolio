import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from './Magnet';
import TextParticles from './TextParticles';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [typedP, setTypedP] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const name1Full = "Abhyoday";
  const name2Full = "Kumar";
  const pFull = "Computer Science student at Jain University (2024–2028) with a strong background in Full Stack Web Development and Backend APIs. Currently pivoting focus toward Machine Learning and Generative AI, with experience in building real-time applications and AI-driven solutions.";

  useEffect(() => {
    let currentP = 0;
    let tP: any;

    // Delay paragraph typing until particles settle
    const timeout = setTimeout(() => {
      tP = setInterval(() => {
        setTypedP(pFull.slice(0, currentP + 1));
        currentP++;
        if (currentP >= pFull.length) {
          clearInterval(tP);
          setIsTyping(false);
        }
      }, 15);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearInterval(tP);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.warn("Autoplay was blocked", e);
      });
    }
  }, []);

  // Avatar ScrollTrigger
  useEffect(() => {
    const prefersReducedMotionBrowser = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    if (prefersReducedMotionBrowser || !sectionRef.current || !avatarCardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(avatarCardRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", 
          pin: true,
          scrub: 1,
        },
        xPercent: 15,
        yPercent: -10,
        scale: 0.75,
        rotationZ: 3,
        ease: "power2.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center">
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
        
        {/* Left Column: Text */}
        <div className="max-w-2xl w-full md:w-1/2 z-10 relative">
          
          {/* Invisible placeholder for height reservation to prevent layout shift */}
          <div className="invisible" aria-hidden="true">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-none">
              {name1Full} <br />
              {name2Full}
            </h1>
            <p className="text-lg md:text-xl max-w-xl leading-relaxed">
              {pFull}
            </p>
          </div>

          {/* Typing Content */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col pt-2 md:pt-4">
            
            {/* Interactive Particle Name */}
            <div className="w-full aspect-[2.5/1] relative z-20 cursor-crosshair">
                <TextParticles text1={name1Full} text2={name2Full} className="w-full h-full" />
            </div>

            <p className="text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed mt-2 md:-mt-4 relative z-10 pointer-events-none pr-4 md:pr-0">
              {typedP}
              {isTyping && typedP.length > 0 && (
                <span className="inline-block w-[3px] h-[0.75em] bg-zinc-300 ml-1 animate-pulse align-baseline" />
              )}
            </p>
          </div>
        </div>

        {/* Right Column: Avatar Video */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-20">
          <div ref={avatarCardRef} className="relative w-[280px] md:w-[360px] aspect-[4/5]">
            <Magnet className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/40 to-purple/40 rounded-[2rem] blur-[60px] scale-105 -z-10" />
              
              <video
                ref={videoRef}
                src="/leo.mp4"
                autoPlay
                loop
                muted={true}
                playsInline
                className="w-full h-full object-cover rounded-[2rem] shadow-[0_0_40px_rgba(0,242,255,0.2)] border border-white/10"
              />
            </Magnet>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
