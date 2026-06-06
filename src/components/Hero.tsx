import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity } from 'lucide-react';
import { stats } from '../data';
import gsap from 'gsap';
import { Tilt } from 'react-tilt';

const ROLES = [
  "AI-ML Engineer ✦",
  "Full Stack Developer ✦",
  "Generative AI Builder ✦",
  "Python Developer ✦"
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: any;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="text-xl md:text-2xl font-mono text-cyan/90 h-8 mb-6">
      {text}
      <span className="typewriter-cursor" />
    </div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function outExpo
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const current = start + (value - start) * easeOutExpo;
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  const isDecimal = value % 1 !== 0;
  return (
    <span ref={ref}>
      {isDecimal ? displayValue.toFixed(3) : Math.floor(displayValue)}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLDivElement>(null);
  const name2Ref = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const firstName = "ABHYODAY".split('');
  const lastName = "KUMAR".split('');

  useEffect(() => {
    const tl = gsap.timeline();

    // GSAP Entrance Animation
    tl.to('body', { opacity: 1, duration: 0.1 }) // Just in case
      // "ABHYODAY"
      .fromTo('.char-first', 
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)' },
        "+=0.5"
      )
      // "KUMAR"
      .fromTo('.char-last',
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'back.out(1.7)' },
        "-=0.4"
      )
      // Typewriter
      .fromTo(typewriterRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.2"
      )
      // Bio
      .fromTo(bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "+=0.2" // Fades in after names
      )
      // Buttons
      .fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.4"
      )
      // Photo Card
      .fromTo(photoRef.current,
        { opacity: 0, x: 100, rotateY: 15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' },
        "-=1"
      );

  }, []);

  const defaultTiltOptions = {
    reverse: false,
    max: 8,
    perspective: 1000,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: true,
    "max-glare": 0.2,
  };

  return (
    <section className="min-h-screen flex items-center relative px-8 pt-32 pb-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div className="z-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-tight leading-none flex flex-col">
            <div ref={name1Ref} className="flex overflow-hidden pb-2">
              {firstName.map((char, i) => (
                <span key={i} className="char-first inline-block text-white">{char}</span>
              ))}
            </div>
            <div ref={name2Ref} className="flex overflow-hidden pb-4">
              {lastName.map((char, i) => (
                <span key={i} className="char-last inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple animate-gradient-text">{char}</span>
              ))}
            </div>
          </h1>

          <div ref={typewriterRef}>
            <Typewriter />
          </div>

          <p ref={bioRef} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
            Computer Science student at Jain University (2024–2028) with a strong background in Full Stack Web Development and Backend APIs. Currently pivoting focus toward Machine Learning and Generative AI, with experience in building real-time applications and AI-driven solutions. Seeking internship opportunities that bridge the gap between Modern Web Architecture and Generative AI integration.
          </p>

          <div ref={buttonRef} className="flex flex-wrap gap-4 mb-14">
            <motion.a
              href="/AK.pdf"
              download="AK_CV.pdf"
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-black/50 text-white font-bold mono text-sm rounded-lg flex items-center gap-3 border border-cyan/40 hover:border-cyan hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 via-cyan/10 to-purple/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <Activity size={18} className="rotate-90 text-cyan group-hover:animate-pulse" />
              <span className="relative z-10">Download My CV</span>
            </motion.a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 relative">
            {stats.map((stat, i) => (
              <div key={i} className="mono relative group">
                <div className="absolute top-[-33px] left-0 w-full h-[2px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left shadow-[0_0_10px_#00f2ff]" />
                <div className="text-3xl font-bold text-cyan group-hover:glow-cyan transition-all duration-300">
                  <AnimatedNumber value={stat.target} />
                  {stat.label === 'Projects' ? '+' : ''}
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-2 group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative group perspective-1000 w-full max-w-md mx-auto" ref={photoRef}>
          <div className="absolute inset-0 bg-cyan/10 blur-[100px] rounded-full group-hover:bg-purple/10 transition-all duration-1000 z-0" />
          
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Tilt options={defaultTiltOptions} className="w-full aspect-square rounded-[30px] p-[2px] aurora-border glass-card !overflow-visible shadow-[0_0_40px_rgba(0,200,255,0.15)] bg-white/5 backdrop-blur-xl">
              <div className="w-full h-full rounded-[28px] overflow-hidden relative">
                <img 
                  src="pfp.jpeg" 
                  alt="Abhyoday Kumar" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 mono">
                  <div className="text-cyan font-bold text-sm tracking-widest glow-cyan">ABHYODAY_KUMAR</div>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute -top-6 -right-6 w-14 h-14 glass-card border-cyan/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.2)] animate-float-slow group-hover:rotate-180 transition-transform duration-700 delay-100">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-8 h-8 opacity-80" />
              </div>
              
              <div className="absolute top-1/4 -left-8 w-12 h-12 glass-card border-purple/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(112,0,255,0.2)] animate-float-medium group-hover:rotate-180 transition-transform duration-700 delay-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="w-6 h-6 opacity-80" />
              </div>
              
              <div className="absolute -bottom-4 right-10 w-16 h-16 glass-card border-yellow-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-float-fast group-hover:rotate-180 transition-transform duration-700 delay-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" alt="Gemini" className="w-10 h-10 opacity-80" />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
