import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experience } from '../data';

const AssemblyText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const characters = text.split('');
  return (
    <span className="inline-block">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 0.4, 
            delay: delay + i * 0.02,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 px-8 max-w-5xl mx-auto relative z-10" ref={containerRef}>
      <div className="mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 mono uppercase tracking-[0.3em]">
          Timeline
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple/50 to-transparent mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Animated Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-cyan via-purple to-cyan shadow-[0_0_15px_#00f2ff]"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-16">
          {experience.map((exp, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center justify-between w-full group ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-cyan shadow-[0_0_15px_rgba(0,242,255,0.6)] -translate-x-1/2 z-10 group-hover:bg-cyan transition-colors duration-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan group-hover:bg-black transition-colors duration-500 animate-pulse" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`p-6 md:p-8 rounded-2xl glass-card border border-white/5 group-hover:border-cyan/30 transition-all duration-500 relative overflow-hidden ${
                    isEven ? 'group-hover:shadow-[-20px_0_30px_-10px_rgba(0,242,255,0.1)]' : 'group-hover:shadow-[20px_0_30px_-10px_rgba(0,242,255,0.1)]'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan/0 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className={`mb-3 flex flex-wrap items-center gap-4 text-xs mono text-zinc-500 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="flex items-center gap-1.5 font-bold text-cyan">
                        <Briefcase size={14} />
                        <AssemblyText text={exp.company} delay={0.2} />
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-cyan transition-colors">
                      {exp.role}
                    </h3>

                    <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
                      {exp.description}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      {exp.tech.map((t) => (
                        <span 
                          key={t} 
                          className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] mono text-zinc-400 group-hover:border-cyan/30 group-hover:text-cyan transition-colors cursor-default"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
