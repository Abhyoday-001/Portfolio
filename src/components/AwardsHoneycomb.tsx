import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Trophy, Target } from 'lucide-react';
import { certificates, achievements } from '../data';

const HexagonModule = ({ 
  data, 
  side, 
  index, 
  onHover 
}: { 
  data: any, 
  side: 'left' | 'right', 
  index: number,
  onHover: (side: 'left' | 'right' | null) => void
}) => {
  const isLeft = side === 'left';
  const accentColor = isLeft ? 'cyan' : 'purple';
  const Icon = isLeft ? (index % 2 === 0 ? Award : ShieldCheck) : (index % 2 === 0 ? Trophy : Target);
  const glowHex = isLeft ? '#00f2ff' : '#7000ff';

  // Animation variants
  const variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.08 
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => onHover(side)}
      onMouseLeave={() => onHover(null)}
      className="relative group cursor-default"
      style={{
        width: '160px',
        height: '180px',
        margin: '0 -10px -30px -10px'
      }}
    >
      <div 
        className="w-full h-full hexagon-clip bg-[#050505] transition-all duration-500 relative flex flex-col items-center justify-center p-6 text-center hex-pulse group-hover:!opacity-100 group-hover:shadow-none group-hover:!border-transparent"
        style={{ color: glowHex }}
      >
        {/* On hover solid border and background tint */}
        <div 
          className="absolute inset-0 hexagon-clip opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0 border-[2px]"
          style={{ borderColor: glowHex, backgroundColor: isLeft ? 'rgba(0,242,255,0.05)' : 'rgba(112,0,255,0.05)' }}
        />
        
        {/* Decorative Scanneline */}
        <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-20 transition-opacity z-10" />
        
        <div className="relative mb-3 z-20">
          <motion.div
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group-hover:rotate-180 transition-transform duration-500"
            style={{ color: isLeft ? 'rgba(0,242,255,0.5)' : 'rgba(112,0,255,0.5)' }}
          >
            <div className="group-hover:!text-current transition-colors duration-300">
              <Icon size={28} />
            </div>
          </motion.div>
          {/* Radar Sweep for right side icons */}
          {!isLeft && (
             <div className="absolute inset-[-10px] rounded-full border border-purple/10 radar-sweep pointer-events-none">
               <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-b from-purple/30 to-transparent origin-bottom" />
             </div>
          )}
        </div>
        
        <h3 className="text-[10px] font-bold text-white mono leading-tight mb-1 uppercase tracking-tighter relative z-20">
          {data.title}
        </h3>
        <p className="text-[8px] text-zinc-500 mono uppercase tracking-widest leading-none relative z-20">
          {data.org}
        </p>
      </div>
      
      {/* Strong Outer Glow on Hover */}
      <div 
        className="absolute inset-0 hexagon-clip blur-2xl transition-all duration-500 -z-10 opacity-0 group-hover:opacity-30"
        style={{ backgroundColor: glowHex }}
      />
    </motion.div>
  );
};

const AwardsHoneycomb = () => {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null);

  const leftCertificates = certificates.slice(0, 8);
  const rightAchievements = achievements.slice(0, 8);

  const renderGrid = (items: any[], side: 'left' | 'right') => {
    return (
      <div className="flex flex-col items-center py-8">
        <div className="flex gap-2">
          {items.slice(0, 2).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i} onHover={setActiveSide} />
          ))}
        </div>
        <div className="flex gap-2 mt-[-10px]">
          {items.slice(2, 5).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i + 2} onHover={setActiveSide} />
          ))}
        </div>
        <div className="flex gap-2 mt-[-10px]">
          {items.slice(5, 7).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i + 5} onHover={setActiveSide} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="awards" className="py-32 relative overflow-hidden min-h-screen flex flex-col items-center justify-center z-10">
      
      <div className="mb-16 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 mono uppercase tracking-widest text-white">
          Dual-Core Achievement Matrix
        </h2>
      </div>

      {/* Main Content Area - Side by Side layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-[500px]">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-24 w-full px-4">
          
          {/* Left Core */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="text-center relative inline-block">
              <h3 className="text-cyan font-bold mono text-sm uppercase tracking-[0.2em] mb-1">
                Certificates_Grid
              </h3>
              <div className="h-[2px] w-full bg-cyan sweep-line shadow-[0_0_8px_#00f2ff]" />
            </div>
            {renderGrid(leftCertificates, 'left')}
          </div>

          {/* Right Core */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="text-center relative inline-block">
              <h3 className="text-purple font-bold mono text-sm uppercase tracking-[0.2em] mb-1">
                Achievement_Core
              </h3>
              <div className="h-[2px] w-full bg-purple sweep-line shadow-[0_0_8px_#7000ff]" />
            </div>
            {renderGrid(rightAchievements, 'right')}
          </div>

        </div>
      </div>

    </section>
  );
};

export default AwardsHoneycomb;
