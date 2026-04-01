import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Brain, Cpu, Smartphone, Layout, Database, 
  Terminal, Globe, Server, Settings, Cloud,
  GitBranch, Github, Layers, Binary
} from 'lucide-react';
import { skills as skillData } from '../data';

const icons: Record<string, any> = {
  python: <Code size={22} />,
  'gen-ai': <Binary size={22} />,
  llms: <Brain size={22} />,
  langchain: <Layers size={22} />,
  numpy: <Settings size={22} />,
  sklearn: <Terminal size={22} />,
  react: <Layout size={22} />,
  nextjs: <Globe size={22} />,
  nodejs: <Server size={22} />,
  flask: <Smartphone size={22} />,
  rest: <Cloud size={22} />,
  firebase: <Database size={22} />,
  mongodb: <Database size={22} />,
  git: <GitBranch size={22} />,
  github: <Github size={22} />
};

const categoryMap: Record<string, string> = {
  mongodb: 'DATA & INFRASTRUCTURE',
  firebase: 'DATA & INFRASTRUCTURE',
  langchain: 'DATA & INFRASTRUCTURE',
  rest: 'DATA & INFRASTRUCTURE',
  git: 'ENGINEERING',
  github: 'ENGINEERING',
  python: 'CORE AI/ML',
  'gen-ai': 'CORE AI/ML',
  llms: 'CORE AI/ML',
  numpy: 'CORE AI/ML',
  sklearn: 'CORE AI/ML',
  react: 'FRAMEWORKS',
  nextjs: 'FRAMEWORKS',
  nodejs: 'FRAMEWORKS',
  flask: 'FRAMEWORKS'
};

const getSkillNodeLabel = (id: string) => {
  const short = id.substring(0, 5).toUpperCase().replace('-', '');
  return `NODE.${short}`;
};

// Symmetrical Circle Layout Logic
const calculateSymmetricPos = (index: number, total: number) => {
  const radius = 420;
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // Start from top
  
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  // Create a organic curved path from center (0,0) to card (x,y)
  const cp1x = x * 0.2;
  const cp1y = y * 0.2;
  const cp2x = x * 0.4;
  const cp2y = y * 0.8;
  const pathData = `M 0,0 C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;

  return { x, y, pathData };
};

const SkillFiber = ({ 
  index, 
  total,
  isFocused, 
  isExpanded 
}: { 
  index: number, 
  total: number,
  isFocused: boolean,
  isExpanded: boolean
}) => {
  const { pathData } = calculateSymmetricPos(index, total);

  return (
    <g className="pointer-events-none">
      <motion.path
        d={pathData}
        stroke="#00f2ff"
        strokeWidth={isFocused || isExpanded ? "3" : "1"}
        fill="none"
        strokeOpacity={isFocused || isExpanded ? "0.6" : "0.1"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.1 }}
        style={{ filter: isFocused ? 'blur(2px)' : 'none' }}
      />
      {(isFocused || isExpanded) && (
        <motion.circle
          r="2"
          fill="#fff"
          animate={{ offsetDistance: "100%" }}
          style={{ offsetPath: `path("${pathData}")`, offsetDistance: "0%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </g>
  );
};

const SkillNode = ({ 
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
  const { x, y } = calculateSymmetricPos(index, total);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={isExpanded ? {
        x: 0, y: 0, zIndex: 100, scale: 1.2, width: 280,
      } : {
        x, y, zIndex: isFocused ? 50 : 10, scale: isFocused ? 1.05 : 1, width: 180,
      }}
      onClick={() => onExpand(isExpanded ? null : skill.id)}
      onMouseEnter={() => onFocus(skill.id)}
      onMouseLeave={() => onFocus(null)}
      className={`absolute cursor-pointer terminal-node p-4 border ${
        isExpanded ? 'border-cyan shadow-[0_0_40px_rgba(0,242,255,0.4)]' : 
        isFocused ? 'border-cyan/60' : 'border-cyan/10'
      }`}
      style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
    >
      <div className="flex flex-col gap-2 relative z-10 w-full overflow-hidden">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded bg-cyan/10 text-cyan transition-colors ${isFocused || isExpanded ? 'bg-cyan text-black' : ''}`}>
            {icons[skill.id] || <Cpu size={22} />}
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] mono text-cyan/50 tracking-widest leading-none mb-1">
              {getSkillNodeLabel(skill.id)}
            </span>
            <span className="text-xs font-bold text-white mono uppercase truncate">
              {skill.name}
            </span>
          </div>
        </div>
        
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-cyan/10">
            <p className="text-[10px] mono text-zinc-400 leading-relaxed italic">
              {skill.description}
            </p>
          </motion.div>
        )}
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/40" />
    </motion.div>
  );
};

const SkillHologram = () => {
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const skills = useMemo(() => {
    return [...skillData].sort((a, b) => {
      const catA = categoryMap[a.id] || '';
      const catB = categoryMap[b.id] || '';
      return catA.localeCompare(catB);
    });
  }, []);



  return (
    <section id="skills" className="relative min-h-[120vh] bg-black cosmic-bg py-32 flex flex-col items-center">
      
      {/* Heading - Symmetric & Clean */}
      <div className="mb-24 text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mono uppercase tracking-[0.4em] text-white"
        >
          Skills
        </motion.h2>
        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan/50 to-transparent mx-auto mt-6" />
      </div>

      <div className="relative w-full max-w-7xl h-[800px] flex items-center justify-center">
        
        <svg className="absolute pointer-events-none overflow-visible" style={{ left: '50%', top: '50%' }}>
          {skills.map((skill, i) => (
            <SkillFiber 
              key={`fiber-${skill.id}`} 
              index={i} 
              total={skills.length}
              isFocused={focusedSkill === skill.id} 
              isExpanded={expandedSkill === skill.id} 
            />
          ))}
        </svg>

        {/* Central Resonance Core */}
        <motion.div
          animate={{
            scale: expandedSkill ? 0.8 : 1,
            rotate: [0, 90, 180, 270, 360],
            boxShadow: [
              '0 0 50px rgba(0, 242, 255, 0.2)',
              '0 0 100px rgba(0, 242, 255, 0.4)',
              '0 0 50px rgba(0, 242, 255, 0.2)'
            ]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-48 h-48 rounded-2xl bg-black border border-cyan/30 flex items-center justify-center relative z-20 shadow-[inset_0_0_30px_rgba(0,242,255,0.1)]"
        >
          <div className="absolute inset-4 border border-cyan/10 rounded-xl flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cyan/5 to-transparent">
             <div className="relative">
               <Cpu className="text-cyan drop-shadow-[0_0_10px_#00f2ff]" size={64} strokeWidth={1} />
               <motion.div 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-cyan/20 blur-xl rounded-full"
               />
             </div>
          </div>
          
          {/* Peripheral Traces */}
          {[0, 90, 180, 270].map((rot) => (
            <div key={rot} className="absolute w-12 h-[1px] bg-cyan/20" style={{ transform: `rotate(${rot}deg) translateX(30px)` }}>
               <div className="absolute right-0 w-1 h-4 -top-2 bg-cyan/40" />
            </div>
          ))}
        </motion.div>

        {/* Skill Modules Layer */}
        {skills.map((skill, i) => (
          <SkillNode 
            key={skill.id} 
            skill={skill} 
            index={i} 
            total={skills.length}
            isFocused={focusedSkill === skill.id} 
            onFocus={setFocusedSkill}
            isExpanded={expandedSkill === skill.id} 
            onExpand={setExpandedSkill}
          />
        ))}

        {/* Categories (Background Guides) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[80px] left-[150px] text-cyan/30 mono text-[9px] tracking-widest uppercase border-l border-cyan/20 pl-4 py-1">Infrastructure_Matrix</div>
          <div className="absolute top-[80px] right-[150px] text-cyan/30 mono text-[9px] tracking-widest uppercase border-r border-cyan/20 pr-4 py-1 text-right">Engineering_Core</div>
          <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 text-cyan/30 mono text-[9px] tracking-widest uppercase border-b border-cyan/20 pb-4 w-32 text-center">Framework_Eco</div>
        </div>

      </div>

      <AnimatePresence>
        {expandedSkill && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[80] backdrop-blur-sm"
            onClick={() => setExpandedSkill(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SkillHologram;
