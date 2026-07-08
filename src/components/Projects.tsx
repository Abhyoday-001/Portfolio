import React, { useRef, useEffect } from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !sectionRef.current) return;
      const scrollAmount = containerRef.current.scrollWidth - window.innerWidth + 300; 
      
      gsap.to(containerRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="h-screen w-full overflow-hidden flex flex-col justify-center relative z-10 pt-20">
      
      {/* Title */}
      <div className="absolute top-24 left-8 md:left-24 z-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">Projects</span></h2>
        <p className="text-zinc-400 text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          Scroll to explore
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div ref={containerRef} className="flex gap-12 px-8 md:px-24 mt-20 items-center" style={{ width: 'max-content' }}>
        {projects.map((project, i) => (
          <div key={project.id} className="w-[320px] md:w-[450px] flex-shrink-0">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
