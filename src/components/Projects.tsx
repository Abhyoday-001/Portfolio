import React, { useRef, useEffect, useState } from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'fullstack' | 'aiml'>('fullstack');

  // Categorize projects
  const aiProjects = projects.filter(p => 
    p.category.includes('AI/ML') || 
    p.category.includes('AI/Ops') || 
    p.category.includes('Employment') || 
    p.category.includes('Healthcare')
  );
  const fullStackProjects = projects.filter(p => !aiProjects.includes(p));

  const currentProjects = activeTab === 'fullstack' ? fullStackProjects : aiProjects;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    // We must reset the refs array length to match the current projects
    cardRefs.current = cardRefs.current.slice(0, currentProjects.length);

    const ctx = gsap.context(() => {
      if (activeTab === 'fullstack') {
        // 1. Full Stack Animations: slide from alternating sides with 3D perspective tilt (rotateY)
        cardRefs.current.forEach((el, index) => {
          if (!el) return;
          const isEven = index % 2 === 0;
          gsap.fromTo(el,
            { 
              x: isEven ? -150 : 150, 
              opacity: 0, 
              rotateY: isEven ? -30 : 30 
            },
            {
              x: 0, 
              opacity: 1, 
              rotateY: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      } else {
        // 2. AI/ML Animations: scale + blur to focus
        cardRefs.current.forEach((el, index) => {
          if (!el) return;
          gsap.fromTo(el,
            { 
              scale: 0.6, 
              filter: "blur(15px)", 
              opacity: 0, 
              rotation: index % 2 === 0 ? -5 : 5 
            },
            {
              scale: 1, 
              filter: "blur(0px)", 
              opacity: 1, 
              rotation: 0,
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }
    }, containerRef);

    // Refresh ScrollTrigger to account for the new DOM elements and heights
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, [activeTab, currentProjects.length]);

  return (
    <motion.section 
      ref={containerRef} 
      id="projects" 
      className="w-full relative z-10 pt-24 pb-24 overflow-hidden bg-black"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-200px" }}
    >
      
      {/* Title */}
      <div className="px-8 md:px-24 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">Projects</span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 px-8 md:px-24 mb-16 relative z-20 flex-wrap">
        <button 
          onClick={() => setActiveTab('fullstack')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'fullstack' 
              ? 'bg-cyan text-black shadow-[0_0_20px_rgba(0,242,255,0.4)] scale-105' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Full Stack Development
        </button>
        <button 
          onClick={() => setActiveTab('aiml')}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === 'aiml' 
              ? 'bg-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          AI/ML
        </button>
      </div>

      {/* Projects List */}
      <div className="px-8 md:px-24" style={{ perspective: activeTab === 'fullstack' ? '1200px' : 'none' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {currentProjects.map((project, i) => (
            <div 
              key={`${activeTab}-${project.id}`} 
              ref={el => cardRefs.current[i] = el}
              className="w-full max-w-[340px]"
              style={{ transformStyle: activeTab === 'fullstack' ? 'preserve-3d' : 'flat' }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

    </motion.section>
  );
};

export default Projects;
