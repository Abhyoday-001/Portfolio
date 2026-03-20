import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data';

const AssemblyText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const characters = text.split('');
  return (
    <span className="inline-block">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -10, y: 10, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 0.4, 
            delay: delay + i * 0.01,
            ease: "easeOut" 
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-8 max-w-4xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold mb-4 mono">Professional Experience</h2>
        <p className="text-zinc-500 mono text-sm flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
          Tracing temporal performance vectors
        </p>
      </div>

      <div className="space-y-12">
        {experience.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative pl-8 border-l border-white/10 group"
          >
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20 group-hover:bg-cyan transition-colors" />
            
            <div className="mb-2 flex flex-wrap items-center gap-4 text-xs mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-cyan/70">
                <Briefcase size={14} />
                <AssemblyText text={exp.company} delay={0.2} />
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {exp.period}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan transition-colors">
              <AssemblyText text={exp.role} delay={0.5} />
            </h3>

            <p className="text-zinc-400 mb-6 leading-relaxed">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t, ti) => (
                <span 
                  key={t} 
                  className="px-3 py-1 glass-card border-white/5 text-[10px] mono text-cyan/60 hover:text-cyan transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
