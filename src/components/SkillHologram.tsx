import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Cpu, Smartphone, Layout, Database, Terminal, Zap, Globe, Server, Settings, Cloud } from 'lucide-react';
import { skills as skillData } from '../data';

const icons: Record<string, any> = {
  python: <Code size={18} />,
  'gen-ai': <Brain size={18} />,
  llms: <Terminal size={18} />,
  langchain: <Zap size={18} />,
  numpy: <Settings size={18} />,
  sklearn: <Brain size={18} />,
  react: <Layout size={18} />,
  nextjs: <Globe size={18} />,
  nodejs: <Server size={18} />,
  flask: <Cpu size={18} />,
  rest: <Cloud size={18} />,
  firebase: <Database size={18} />,
  mongodb: <Database size={18} />,
  git: <Code size={18} />,
  github: <Terminal size={18} />
};

const calculateSkillPos = (index: number, total: number) => {
  // Balanced multi-ring distribution factor
  let ringIndex = 0;
  let indexInRing = index;
  let nodesInRing = 6;
  
  if (index >= 6) {
    ringIndex = 1;
    indexInRing = index - 6;
    nodesInRing = 10;
  }
  if (index >= 16) {
    ringIndex = 2;
    indexInRing = index - 16;
    nodesInRing = 12;
  }
  if (index >= 28) {
    ringIndex = 3;
    indexInRing = index - 28;
    nodesInRing = total - 28;
  }

  const radius = 240 + ringIndex * 180; 
  const angleOffset = (ringIndex * (Math.PI / nodesInRing));
  const angle = (indexInRing / nodesInRing) * Math.PI * 2 + angleOffset;
  
  // Elliptical distribution (Compressed Y) + Downward shift
  const x = Math.cos(angle) * (radius * 1.2); 
  const y = (Math.sin(angle) * (radius * 0.7)) + 200; 
  
  // Orthogonal path from center (0,0) to card (x,y)
  const pathData = `M 0 0 L 0 ${y * 0.4} L ${x} ${y * 0.4} L ${x} ${y}`;
  
  return { x, y, angle, radius, pathData };
};

const SkillWire = ({ 
  skill, 
  index, 
  total, 
  isFocused, 
  isExpanded 
}: { 
  skill: any, 
  index: number, 
  total: number, 
  isFocused: boolean,
  isExpanded: boolean
}) => {
  const { pathData } = calculateSkillPos(index, total);

  return (
    <g className="pointer-events-none">
      <defs>
        <filter id={`glow-${skill.id}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Glow path */}
      <motion.path
        d={pathData}
        stroke="#00f2ff"
        strokeWidth={isFocused || isExpanded ? "2.5" : "1"}
        fill="none"
        strokeOpacity={isFocused || isExpanded ? "0.8" : "0.15"}
        filter={`url(#glow-${skill.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: index * 0.05 }}
      />
      {/* Sharp path */}
      <motion.path
        d={pathData}
        stroke={isFocused || isExpanded ? "#ffffff" : "rgba(0, 242, 255, 0.3)"}
        strokeWidth={isFocused || isExpanded ? "1" : "0.5"}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: index * 0.05 }}
      />
      {(isFocused || isExpanded) && (
        <motion.circle
          r="3"
          fill="#ffffff"
          animate={{ offsetDistance: "100%" }}
          style={{ 
            offsetPath: `path("${pathData}")`, 
            offsetDistance: "0%", 
            boxShadow: '0 0 10px #00f2ff'
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </g>
  );
};

const SkillModule = ({ 
  skill, 
  index, 
  total, 
  isFocused, 
  onFocus, 
  isExpanded, 
  onExpand 
}: { 
  skill: any, 
  index: number, 
  total: number, 
  isFocused: boolean, 
  onFocus: (id: string | null) => void,
  isExpanded: boolean,
  onExpand: (id: string | null) => void
}) => {
  const { x, y } = calculateSkillPos(index, total);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, borderColor: '#00f2ff' }}
      animate={isExpanded ? {
        x: 0,
        y: 0,
        zIndex: 500,
        scale: 1.4,
        width: 250,
      } : {
        x,
        y,
        zIndex: isFocused ? 50 : 10,
        scale: isFocused ? 1.05 : 1,
        width: 140,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onHoverStart={() => onFocus(skill.id)}
      onHoverEnd={() => onFocus(null)}
      onPointerDown={(e) => {
        e.stopPropagation();
        onExpand(isExpanded ? null : skill.id);
      }}
      className={`absolute cursor-pointer glass-card p-4 scanline border ${
        isExpanded ? 'bg-black/95 border-cyan shadow-[0_0_40px_rgba(0,242,255,0.5)]' : 
        isFocused ? 'border-cyan shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'border-cyan/10'
      }`}
      style={{ 
        left: '50%', 
        top: '50%', 
        x: '-50%', 
        y: '-50%' 
      }}
    >
      <div className="flex flex-col gap-2 relative z-10 w-full">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-md transition-colors ${isFocused || isExpanded ? 'bg-cyan text-black' : 'bg-cyan/10 text-cyan'}`}>
            {icons[skill.id] || <Cpu size={18} />}
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="text-[6px] uppercase tracking-tighter text-cyan/60 mono">Node_{skill.id.substring(0, 4).toUpperCase()}</div>
            <div className="text-[10px] font-bold text-white mono truncate">{skill.name}</div>
          </div>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-cyan/20"
          >
            <p className="text-[12px] mono text-zinc-300 leading-snug text-center italic">
              "{skill.description || 'System module initialized. Awaiting further directive...'}"
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const SkillHologram = () => {
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const skills = useMemo(() => skillData, []);

  return (
    <section id="skills" className="relative h-[150vh] bg-black" onClick={() => setExpandedSkill(null)}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Section Title - Moved to a top-level sticky child with absolute priority */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[2000] text-center w-full pointer-events-none">
          <h2 className="text-4xl font-bold mb-4 mono uppercase tracking-[0.3em] text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">Skills</h2>
          <p className="text-cyan mono text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_15px_#00f2ff]" />
            Neural skill modules in system resonance
          </p>
        </div>

        <AnimatePresence>
          {expandedSkill && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[1000] backdrop-blur-2xl"
            />
          )}
        </AnimatePresence>

        {/* Main Constellation Wrapper - This ensures everything stays synced */}
        <div className="relative w-full h-full flex items-center justify-center z-[100]">
          {/* Background Circuit Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #00f2ff 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />

          {/* Global Circuit Wires (SVG layer behind modules) */}
          <svg className="absolute pointer-events-none overflow-visible z-10" style={{ left: '50%', top: '50%' }}>
            {skills.map((skill, i) => (
              <SkillWire 
                key={skill.id}
                skill={skill}
                index={i}
                total={skills.length}
                isFocused={focusedSkill === skill.id}
                isExpanded={expandedSkill === skill.id}
              />
            ))}
          </svg>

        {/* Central Core (Iconic CPU) */}
        <motion.div
          animate={{
            y: 200, // Offset to stay in center of nodes
            scale: expandedSkill ? 0.4 : 1,
            opacity: expandedSkill ? 0.3 : 1,
            rotate: 0, // Stop rotation as requested
            boxShadow: [
              '0 0 40px rgba(0, 242, 255, 0.2)',
              '0 0 70px rgba(0, 242, 255, 0.4)',
              '0 0 40px rgba(0, 242, 255, 0.2)'
            ]
          }}
          transition={{ 
            rotate: { duration: 0 },
            boxShadow: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="w-40 h-40 rounded-xl bg-black border-2 border-cyan/40 flex items-center justify-center relative z-20 shadow-[inset_0_0_30px_rgba(0,242,255,0.2)]"
        >
          <div className="absolute inset-4 border border-cyan/20 rounded-lg flex flex-col items-center justify-center overflow-hidden">
             <Cpu className="text-cyan animate-pulse" size={48} strokeWidth={1} />
             <div className="mt-3 flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      height: [12, 24, 12],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ delay: i * 0.4, repeat: Infinity, duration: 2 }}
                    className="w-1.5 bg-cyan rounded-full shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                  />
                ))}
             </div>
          </div>
          
          {/* Terminals / Pins */}
          {[0, 90, 180, 270].map((rot) => (
            <React.Fragment key={rot}>
               <div className="absolute w-10 h-0.5 bg-cyan/40" style={{ transform: `rotate(${rot}deg) translateX(25px)` }} />
               <div className="absolute w-10 h-0.5 bg-cyan/40" style={{ transform: `rotate(${rot}deg) translateX(25px) translateY(8px)` }} />
               <div className="absolute w-10 h-0.5 bg-cyan/40" style={{ transform: `rotate(${rot}deg) translateX(25px) translateY(-8px)` }} />
            </React.Fragment>
          ))}
        </motion.div>

        {/* Global Filter Definitions */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="circuitGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>

        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-all duration-500"
          style={{ 
            opacity: expandedSkill ? 0.3 : 1,
            filter: expandedSkill ? 'blur(4px)' : 'none'
          }}
        >
          {skills.map((skill, i) => (
            <div 
              key={skill.id} 
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
              style={{ 
                zIndex: expandedSkill === skill.id ? 1000 : 10,
                // Override the parent blur/opacity for the expanded one
                opacity: expandedSkill && expandedSkill !== skill.id ? 0 : 1,
                display: expandedSkill && expandedSkill !== skill.id ? 'none' : 'block'
              }}
            >
              <SkillModule
                skill={skill}
                index={i}
                total={skills.length}
                isFocused={focusedSkill === skill.id}
                onFocus={setFocusedSkill}
                isExpanded={expandedSkill === skill.id}
                onExpand={setExpandedSkill}
              />
            </div>
          ))}
        </div>

        {/* Re-render the expanded skill outside the dimmed container for full prominence */}
        {expandedSkill && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            {skills.filter(s => s.id === expandedSkill).map((skill) => (
              <SkillModule
                key={`expanded-${skill.id}`}
                skill={skill}
                index={skills.findIndex(s => s.id === expandedSkill)}
                total={skills.length}
                isFocused={true}
                onFocus={() => {}}
                isExpanded={true}
                onExpand={setExpandedSkill}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </section>
  );
};

export default SkillHologram;
