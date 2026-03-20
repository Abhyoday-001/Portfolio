import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import { stats } from '../data';

const SystemWelcome = ({ onComplete }: { onComplete: () => void }) => {
  const [status, setStatus] = useState('INITIALIZING...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      'CALIBRATING NEURAL ARCH...',
      'SYNCHRONIZING MODULES...',
      'ESTABLISHING NEXUS...',
      'SYSTEM_READY'
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStatus(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 800);

    const progInterval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono"
    >
      <div className="w-64 h-64 relative mb-12">
        {/* Tech Wheel Effects */}
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i}
            animate={{ 
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              rotate: { duration: 8 + i * 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0 border-t border-b border-cyan/40 rounded-full shadow-[0_0_30px_rgba(0,242,255,0.1)]"
            style={{ 
              margin: `${i * 20}px`,
              borderWidth: i === 0 ? '2px' : '1px'
            }}
          />
        ))}
        
        {/* Pulsating Hexagon Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [0.9, 1.1, 0.9],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-cyan/10 border border-cyan flex items-center justify-center rounded-2xl rotate-45"
          >
            <Activity className="w-10 h-10 text-cyan glow-cyan -rotate-45" />
          </motion.div>
        </div>

        {/* Radar Scanning Line */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 origin-center"
        >
          <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-t from-cyan to-transparent shadow-[0_0_10px_#00f2ff]" />
        </motion.div>
      </div>
      
      <div className="text-cyan text-sm tracking-[0.4em] mb-2 uppercase font-bold">
        [SYSTEM_READY: WELCOME]
      </div>
      <div className="text-white/40 text-[10px] tracking-widest mb-6 h-4">{status}</div>
      
      {/* Progress Tube */}
      <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan via-white to-purple shadow-[0_0_15px_#00f2ff]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

const RollingNumber = ({ target, duration = 2 }: { target: number, duration?: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const totalFrames = duration * 60;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = start + (end - start) * progress;
      setDisplay(current);

      if (frame >= totalFrames) {
        setDisplay(end);
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  const isDecimal = target % 1 !== 0;
  return <span>{isDecimal ? display.toFixed(3) : Math.floor(display)}</span>;
};

const Hero = () => {
  const [booted, setBooted] = useState(false);

  return (
    <section className="min-h-screen flex items-center relative px-8">
      <AnimatePresence>
        {!booted && <SystemWelcome onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={booted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-6 mono text-cyan/60">
            <Activity size={16} />
            <span className="text-sm tracking-widest uppercase">System Online</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-none">
            <span className="block text-white">ABHYODAY</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">
              KUMAR
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-8 max-w-xl leading-relaxed">
            Computer Science student at Jain University (2024–2028) with a strong background in Full Stack Web Development and Backend APIs. Currently pivoting focus toward Machine Learning and Generative AI, with experience in building real-time applications and AI-driven solutions. Seeking internship opportunities that bridge the gap between Modern Web Architecture and Generative AI integration.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <motion.a
              href="/AK.pdf"
              download="AK_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-cyan text-black font-bold mono text-sm rounded-lg flex items-center gap-2 hover:glow-cyan transition-all"
            >
              <Activity size={18} className="rotate-90" />
              Download My CV
            </motion.a>
          </div>


          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="mono">
                <div className="text-2xl font-bold text-cyan">
                  {booted ? <RollingNumber target={stat.target} /> : '0'}
                  {stat.label === 'Projects' ? '+' : ''}
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={booted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-cyan/10 blur-[100px] rounded-full group-hover:bg-purple/10 transition-all duration-1000" />
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 glass-card">
             <img 
               src="pfp.jpeg" 
               alt="Abhyoday Kumar" 
               className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
             <div className="absolute bottom-6 left-6 mono">
               <div className="text-[10px] text-cyan uppercase tracking-[0.3em] mb-1">Authorization</div>
               <div className="text-lg font-bold">ABHYODAY_KUMAR</div>
             </div>
             
             {/* Scanning Line Animation */}
             <motion.div 
               animate={{ top: ['0%', '100%', '0%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
               className="absolute left-0 right-0 h-[2px] bg-cyan/50 shadow-[0_0_15px_#00f2ff] z-10"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
