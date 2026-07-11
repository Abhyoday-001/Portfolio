import React, { useRef, useEffect, useState } from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';
import CylinderCarousel from './CylinderCarousel';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import LiquidMetalButton from './LiquidMetalButton';

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

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'fullstack' | 'aiml'>('fullstack');

  // Categorize projects
  const aiProjects = projects.filter(p => 
    p.category.includes('AI/ML') || 
    p.category.includes('AI/Ops')
  );
  const fullStackProjects = projects.filter(p => !aiProjects.includes(p));

  const currentProjects = activeTab === 'fullstack' ? fullStackProjects : aiProjects;

  useEffect(() => {
    // Only refresh ScrollTrigger for the container if needed
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [activeTab, currentProjects.length]);

  return (
    <motion.section 
      ref={containerRef} 
      id="projects" 
      className="w-full relative z-10 pt-24 pb-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-200px" }}
    >
      
      {/* Title */}
      <div className="mb-16 text-center z-10">
        <AnimatedTitle text="Projects" />
        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-cyan/50 to-transparent mx-auto mt-6" />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 px-8 md:px-24 mb-16 relative z-20 flex-wrap">
        <LiquidMetalButton 
          onClick={() => setActiveTab('fullstack')}
          borderWidth={2}
          metalConfig={{ 
            colorTint: activeTab === 'fullstack' ? "#00f2ff" : "#888888", 
            speed: activeTab === 'fullstack' ? 0.6 : 0.2 
          }}
          className={activeTab === 'fullstack' ? 'shadow-[0_0_20px_rgba(0,242,255,0.4)] scale-105' : ''}
        >
          <span className={`font-bold ${activeTab === 'fullstack' ? 'text-cyan drop-shadow-md' : 'text-zinc-400'}`}>
            Full Stack Development
          </span>
        </LiquidMetalButton>
        
        <LiquidMetalButton 
          onClick={() => setActiveTab('aiml')}
          borderWidth={2}
          metalConfig={{ 
            colorTint: activeTab === 'aiml' ? "#a855f7" : "#888888", 
            speed: activeTab === 'aiml' ? 0.6 : 0.2 
          }}
          className={activeTab === 'aiml' ? 'shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105' : ''}
        >
          <span className={`font-bold ${activeTab === 'aiml' ? 'text-purple drop-shadow-md' : 'text-zinc-400'}`}>
            AI/ML
          </span>
        </LiquidMetalButton>
      </div>

      {/* Projects List */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 overflow-visible mt-20">
        <CylinderCarousel 
          key={activeTab} 
          projects={currentProjects} 
        />
      </div>

    </motion.section>
  );
};

export default Projects;
