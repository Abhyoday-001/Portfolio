import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Trophy, Target, ExternalLink } from 'lucide-react';
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

  const handleClick = () => {
    if (data.link) {
      window.open(data.link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ 
        x: isLeft ? -100 : 100, 
        opacity: 0,
        rotate: isLeft ? -10 : 10
      }}
      whileInView={{ 
        x: 0, 
        opacity: 1,
        rotate: 0
      }}
      viewport={{ once: true }}
      transition={{ 
        x: { type: 'spring', stiffness: 100, damping: 20, delay: index * 0.1 },
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: {
          duration: 3 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      animate={{ 
        y: [0, -10, 0] 
      }}
      onMouseEnter={() => onHover(side)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      className="relative group cursor-pointer"
      style={{
        width: '160px',
        height: '180px',
        margin: '0 -10px -30px -10px' // Negative margins for interlocking
      }}
    >
      <div className={`
        w-full h-full hexagon-clip bg-zinc-900 border border-${accentColor}/20 
        group-hover:border-${accentColor} group-hover:bg-${accentColor}/5 
        transition-all duration-500 relative flex flex-col items-center justify-center p-6 text-center
      `}>
        {/* Decorative Scanneline */}
        <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-20 transition-opacity" />
        
        <div className={`mb-3 text-${accentColor}/50 group-hover:text-${accentColor} transition-colors duration-500`}>
          <Icon size={28} />
        </div>
        
        <h3 className="text-[10px] font-bold text-white mono leading-tight mb-1 uppercase tracking-tighter">
          {data.title}
        </h3>
        <p className="text-[8px] text-zinc-500 mono uppercase tracking-widest leading-none">
          {data.org}
        </p>

        {isLeft && data.link && (
          <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={12} className="text-cyan animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Outer Glow */}
      <div className={`
        absolute inset-0 hexagon-clip bg-${accentColor}/0 group-hover:bg-${accentColor}/10 
        blur-xl transition-all duration-500 -z-10
      `} />
    </motion.div>
  );
};

const AwardsHoneycomb = () => {
  const [activeSide, setActiveSide] = useState<'left' | 'right' | null>(null);

  // Grouping into rows for honeycomb effect
  // Row structure: [3, 2, 3] for each side
  const leftCertificates = certificates.slice(0, 8);
  const rightAchievements = achievements.slice(0, 8);

  const renderGrid = (items: any[], side: 'left' | 'right') => {
    return (
      <div className="flex flex-col items-center">
        {/* Row 1 */}
        <div className="flex gap-2">
          {items.slice(0, 2).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i} onHover={setActiveSide} />
          ))}
        </div>
        {/* Row 2 (Staggered) */}
        <div className="flex gap-2 mt-[-10px]">
          {items.slice(2, 5).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i + 2} onHover={setActiveSide} />
          ))}
        </div>
        {/* Row 3 */}
        <div className="flex gap-2 mt-[-10px]">
          {items.slice(5, 7).map((item, i) => (
            <HexagonModule key={item.id} data={item} side={side} index={i + 5} onHover={setActiveSide} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="awards" className="py-32 bg-black relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-24 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-4 mono uppercase tracking-widest">
          Dual-Core Achievement Matrix
        </h2>
        <div className="flex items-center justify-center gap-6 text-[10px] mono uppercase tracking-[0.3em] text-zinc-500">
          <span className={activeSide === 'left' ? 'text-cyan shadow-[0_0_10px_#00f2ff]' : ''}>Credentials</span>
          <div className="w-1 h-1 rounded-full bg-zinc-800" />
          <span className={activeSide === 'right' ? 'text-purple shadow-[0_0_10px_#7000ff]' : ''}>Milestones</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 px-8 w-full max-w-7xl">
        {/* Left Side: Certificates */}
        <div className="flex-1">
          <div className="mb-8 text-center md:text-right">
            <h3 className="text-cyan font-bold mono text-sm mb-1 uppercase tracking-tighter">Certificates_Grid</h3>
            <div className="h-[1px] w-24 bg-gradient-to-l from-cyan/50 to-transparent inline-block" />
          </div>
          {renderGrid(leftCertificates, 'left')}
        </div>

        {/* Central Data Spine */}
        <div className="relative h-[2px] md:h-[500px] w-full md:w-[1px] bg-white/5 flex items-center justify-center">
          <motion.div 
            animate={{ 
              backgroundColor: activeSide === 'left' ? '#00f2ff' : activeSide === 'right' ? '#7000ff' : 'rgba(255,255,255,0.05)',
              boxShadow: activeSide === 'left' ? '0 0 20px #00f2ff' : activeSide === 'right' ? '0 0 20px #7000ff' : '0 0 0px transparent',
              scaleY: activeSide ? 1.2 : 1
            }}
            className="absolute inset-0 w-full h-full md:w-[2px] shadow-lg transition-all duration-300"
          />
          {/* Central Pulsating Node */}
          <div className={`absolute w-3 h-3 rounded-full border border-white/20 bg-black z-20 transition-all duration-500 ${
            activeSide === 'left' ? 'border-cyan' : activeSide === 'right' ? 'border-purple' : ''
          }`}>
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className={`absolute inset-0 rounded-full ${
                 activeSide === 'left' ? 'bg-cyan' : activeSide === 'right' ? 'bg-purple' : 'bg-white/20'
               }`} 
             />
          </div>
        </div>

        {/* Right Side: Achievements */}
        <div className="flex-1">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-purple font-bold mono text-sm mb-1 uppercase tracking-tighter">Achievement_Core</h3>
            <div className="h-[1px] w-24 bg-gradient-to-r from-purple/50 to-transparent inline-block" />
          </div>
          {renderGrid(rightAchievements, 'right')}
        </div>
      </div>
    </section>
  );
};

export default AwardsHoneycomb;
