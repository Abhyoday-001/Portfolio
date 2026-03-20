import { useEffect } from 'react';
import Lenis from 'lenis';
import BackgroundField from './components/BackgroundField';
import Hero from './components/Hero';
import SkillHologram from './components/SkillHologram';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AwardsHoneycomb from './components/AwardsHoneycomb';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan to-purple rounded-xl flex items-center justify-center font-bold text-black glow-cyan">
          AK
        </div>
      </div>
      
      <div className="flex items-center gap-8 pointer-events-auto">
        {['About', 'Skills', 'Projects', 'Awards', 'Experience', 'Contact'].map(item => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-cyan transition-all mono"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-zinc-500 text-sm mono">
          &copy; {new Date().getFullYear()} ABHYODAY_KUMAR. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/abhyoday-kumar-6aa715319/" target="_blank" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono">LinkedIn</a>
          <a href="https://github.com/Abhyoday-001" target="_blank" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono">Github</a>
          <a href="mailto:abhyodaysingh993@gmail.com" className="text-xs uppercase tracking-widest text-zinc-400 hover:text-cyan transition-colors mono">Email</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-black text-white selection:bg-cyan/30">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan to-purple z-50 origin-[0%]"
        style={{ scaleX }}
      />
      
      <BackgroundField />
      <Navbar />
      
      <main>
        <div id="home">
          <Hero />
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
    </div>
  );
}

export default App;
