import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { 
  Code, Brain, Cpu, Smartphone, Layout, Database, 
  Terminal, Globe, Server, Settings, Cloud,
  GitBranch, Github, Layers, Binary
} from 'lucide-react';
import { skills as skillData } from '../data';

const icons: Record<string, any> = {
  python: <Code size={24} />,
  'gen-ai': <Binary size={24} />,
  llms: <Brain size={24} />,
  langchain: <Layers size={24} />,
  numpy: <Settings size={24} />,
  sklearn: <Terminal size={24} />,
  react: <Layout size={24} />,
  nextjs: <Globe size={24} />,
  nodejs: <Server size={24} />,
  flask: <Smartphone size={24} />,
  rest: <Cloud size={24} />,
  firebase: <Database size={24} />,
  mongodb: <Database size={24} />,
  git: <GitBranch size={24} />,
  github: <Github size={24} />
};

const defaultTiltOptions = {
  reverse: false,
  max: 10,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  glare: true,
  "max-glare": 0.1,
};

const AnimatedTitle = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <div className="overflow-hidden flex justify-center gap-4 mb-6">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-6xl font-bold mono uppercase tracking-[0.4em] text-white inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const SkillHologram = () => {
  const categories = useMemo(() => Array.from(new Set(skillData.map(s => s.category))), []);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || 'AI/ML');

  const filteredSkills = useMemo(() => {
    return skillData.filter(skill => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="relative min-h-screen py-32 flex flex-col items-center px-8 z-10">
      
      {/* Title */}
      <div className="mb-16 text-center z-10">
        <AnimatedTitle text="Skill Matrix" />
        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan/50 to-transparent mx-auto mt-6" />
      </div>

      {/* Tabs / Switcher */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="relative px-6 py-2 rounded-full mono text-xs md:text-sm tracking-widest uppercase transition-colors"
          >
            {activeCategory === cat ? (
              <span className="relative z-10 text-black font-bold">{cat}</span>
            ) : (
              <span className="relative z-10 text-zinc-400 hover:text-cyan transition-colors">{cat}</span>
            )}
            
            {activeCategory === cat && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan rounded-full shadow-[0_0_15px_#00f2ff]"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt options={defaultTiltOptions} className="h-full">
                  <div className="h-full glass-card p-6 border border-white/5 hover:border-cyan/50 transition-colors duration-500 group flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-zinc-400 group-hover:text-cyan group-hover:bg-cyan/10 group-hover:glow-cyan transition-all duration-300">
                        {icons[skill.id] || <Cpu size={24} />}
                      </div>
                      <h3 className="text-xl font-bold mono text-white mb-2 group-hover:text-cyan transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                        {skill.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] mono text-cyan/50 uppercase tracking-widest">{skill.category}</span>
                      <span className="text-xs font-bold mono text-white group-hover:text-cyan">{skill.level}%</span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillHologram;
