import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import PerspectiveGrid from './components/PerspectiveGrid';
import Hero from './components/Hero/index';
import WhatIDo from './components/WhatIDo';
import SkillHologram from './components/SkillHologram';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AwardsHoneycomb from './components/AwardsHoneycomb';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      dotX += (mouseX - dotX) * 0.2;
      dotY += (mouseY - dotY) * 0.2;
      
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference hidden md:block">
      <div 
        ref={ringRef} 
        className="absolute left-0 top-0 w-8 h-8 rounded-full border border-cyan/50 transition-transform duration-75 ease-out"
      />
      <div 
        ref={dotRef} 
        className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-cyan"
      />
    </div>
  );
};

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 px-8 transition-colors duration-500 flex justify-between items-center backdrop-blur-xl border-b border-cyan/10 ${
        scrolled ? 'py-4 bg-black/60' : 'py-6 bg-black/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white aurora-border">
          <div className="absolute inset-[1px] bg-black rounded-xl z-0" />
          <span className="relative z-10 glow-cyan">AK</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 hidden md:flex">
        {['About', 'Skills', 'Projects', 'Awards', 'Experience', 'Contact'].map(item => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="group relative text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-cyan transition-all hover:tracking-[0.25em] duration-300 mono"
          >
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-cyan transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t border-cyan/10 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-zinc-500 text-sm mono">
          &copy; {new Date().getFullYear()} ABHYODAY_KUMAR. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/abhyoday-kumar-6aa715319/" target="_blank" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono hover-shimmer">LinkedIn</a>
          <a href="https://github.com/Abhyoday-001" target="_blank" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono hover-shimmer">Github</a>
          <a href="mailto:abhyodaysingh993@gmail.com" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono hover-shimmer">Email</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-transparent text-white selection:bg-cyan/30 hide-cursor">
      <CustomCursor />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_#00f2ff] z-50 origin-[0%]"
        style={{ scaleX }}
      />
      
      <div className="fixed inset-0 z-[-1]">
        <PerspectiveGrid />
      </div>

      <Navbar scrolled={scrolled} />
      
      <main className="relative z-10 flex flex-col">
        <div id="home">
          <Hero />
        </div>
        
        <div id="whatido">
          <WhatIDo />
        </div>
        
        <div id="skills">
          <SkillHologram />
        </div>
        
        <div id="projects">
          <Projects />
        </div>

        <div id="awards">
          <AwardsHoneycomb />
        </div>
        
        <div id="experience">
          <Experience />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;

