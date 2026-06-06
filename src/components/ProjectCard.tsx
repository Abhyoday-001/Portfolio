import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, Timer, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      className={`relative group rounded-[20px] transition-all duration-500 w-full h-[480px] p-[1px] bg-white/5 border border-cyan/10 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] ${
        isHovered ? '-translate-y-2' : ''
      }`}
    >
      <div 
        className="relative h-full glass-card hover-shimmer overflow-hidden flex flex-col p-6 rounded-[19px] bg-black/60 backdrop-blur-xl"
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)', transition: 'transform 0.5s ease-out' }}
      >
        {/* Project Image */}
        <div 
          className="relative h-48 mb-6 rounded-xl overflow-hidden border border-white/10"
          style={{ transform: "translateZ(40px)" }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-cyan/10 transition-colors" />
          
          {/* Status Dot */}
          <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <div className={`w-2 h-2 rounded-full ${project.id === 'legalyze' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            <span className="text-[9px] mono text-white/80 uppercase font-bold tracking-widest">
              {project.id === 'legalyze' ? 'System Live' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ transform: "translateZ(30px)" }} className="flex-1 flex flex-col pointer-events-none">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[10px] text-cyan/70 uppercase tracking-widest mono mb-1">{project.category}</div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan transition-colors duration-300">{project.title}</h3>
            </div>
          </div>

          <p className="text-sm text-zinc-400 line-clamp-3 mb-6 font-mono leading-relaxed group-hover:text-zinc-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
            {project.tech.map((t: string) => (
              <span 
                key={t} 
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] mono text-zinc-300 hover:text-cyan hover:border-cyan/50 hover:bg-cyan/10 hover:shadow-[0_0_10px_rgba(0,242,255,0.3)] transition-all cursor-default"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10 pointer-events-auto">
            <div className="flex items-center gap-2 text-zinc-500 text-[10px] mono">
              <Timer size={14} className="text-cyan/50" />
              {project.timeline}
            </div>
            
            <div className="flex items-center gap-3">
              {project.links.github !== '#' && (
                <a 
                  href={project.links.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Github size={18} />
                </a>
              )}
              {project.links.external !== '#' && (
                <a 
                  href={project.links.external} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-cyan/10 border border-cyan/40 rounded-lg text-cyan text-xs font-bold mono uppercase tracking-wider hover:bg-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,242,255,0.5)] transition-all group/btn"
                >
                  <span>View Project</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
