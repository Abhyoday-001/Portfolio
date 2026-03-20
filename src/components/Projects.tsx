import React from 'react';
import { projects } from '../data';
import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-4xl font-bold mb-4 mono">Projects</h2>
        <p className="text-zinc-500 mono text-sm flex items-center justify-center md:justify-start gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          Autonomous implementations and research nodes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
