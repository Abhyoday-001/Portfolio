import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Try to play if browser blocked autoplay with sound
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        // Autoplay with sound might be blocked, fallback to muted if necessary, or just leave it
        console.warn("Autoplay with sound was blocked", e);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Staggered variants for text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8, // Beat after video starts
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/hiro.mp4"
        poster="/pfp.jpeg"
        autoPlay
        muted={isMuted}
        playsInline
        // No loop, it will hold on the last frame
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'right center' }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-24">
        <motion.div
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          className="max-w-2xl"
        >
          {/* Name */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none"
          >
            Abhyoday <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">
              Kumar
            </span>
          </motion.h1>

          {/* Tagline / Bio (reused from previous) */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-300 max-w-xl leading-relaxed"
          >
            Computer Science student at Jain University (2024–2028) with a strong background in Full Stack Web Development and Backend APIs. Currently pivoting focus toward Machine Learning and Generative AI, with experience in building real-time applications and AI-driven solutions.
          </motion.p>
        </motion.div>
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        className="absolute bottom-[5%] right-[2%] md:bottom-[10%] md:right-[5%] lg:bottom-[12%] lg:right-[8%] z-20 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/70 hover:border-cyan/50 transition-all group"
        aria-label="Toggle Sound"
      >
        {isMuted ? (
          <VolumeX size={24} className="group-hover:text-cyan transition-colors" />
        ) : (
          <Volume2 size={24} className="text-cyan drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
        )}
      </button>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
