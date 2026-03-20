import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, Timer, Cpu, ShieldCheck, AlertCircle } from 'lucide-react';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="relative group p-[1px] rounded-2xl bg-white/5 h-[450px] border-beam transition-all duration-500 hover:glow-cyan"
    >
      <div className="relative h-full glass-card !rounded-2xl overflow-hidden flex flex-col p-6 scanline">
        {/* Project Image with Translate-Z */}
        <div 
          className="relative h-48 mb-6 rounded-xl overflow-hidden border border-white/10"
          style={{ transform: "translateZ(50px)" }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-dark/60 group-hover:bg-cyan/10 transition-colors" />
          
          {/* Status Dot */}
          <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${project.id === 'legalyze' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            <span className="text-[8px] mono text-white/80 uppercase">
              {project.id === 'legalyze' ? 'System Live' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Content with Translate-Z */}
        <div style={{ transform: "translateZ(30px)" }} className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[10px] text-cyan uppercase tracking-widest mono mb-1">{project.category}</div>
              <h3 className="text-xl font-bold group-hover:text-cyan transition-all duration-300">{project.title}</h3>
            </div>
          </div>

          <p className="text-xs text-zinc-500 line-clamp-3 mb-6 font-mono leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-cyan/5 border border-cyan/10 rounded text-[9px] mono text-cyan/70">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-zinc-500 text-[9px] mono">
              <Timer size={12} className="text-cyan/50" />
              {project.timeline}
            </div>
            <div className="flex items-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.1, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                href={project.links.github} 
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: "#00f2ff" }}
                href={project.links.external} 
                className="text-zinc-500 hover:text-cyan transition-colors"
              >
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
