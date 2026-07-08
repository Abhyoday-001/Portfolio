import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const WhatIDo = () => {
  const prefersReducedMotion = useReducedMotion();

  const pfpVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: prefersReducedMotion ? "easeOut" : "backOut"
      }
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center px-8 py-20 relative z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left side profile picture */}
        <div className="relative w-full h-full flex justify-center items-center">
          <motion.div
            variants={pfpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,242,255,0.15)] border border-white/10"
          >
            <img 
              src="/pfp.jpeg" 
              alt="Abhyoday Kumar Profile" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right side content */}
        <div className="z-10 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 tracking-tight text-white"
          >
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple">Do</span>
          </motion.h2>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-cyan/50 hover:border-cyan transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">AI/ML Engineering</h3>
              <p className="text-zinc-400">Building intelligent systems, orchestrating LLMs with LangChain, and implementing Retrieval-Augmented Generation (RAG) pipelines for context-aware applications.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-purple/50 hover:border-purple transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">Full Stack Development</h3>
              <p className="text-zinc-400">Architecting scalable web applications using React, Next.js, and Node.js. Designing robust backend services and RESTful APIs with Flask and Express.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl border-l-4 border-yellow-500/50 hover:border-yellow-500 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">Cloud & Infrastructure</h3>
              <p className="text-zinc-400">Deploying and managing applications using Firebase, integrating real-time databases, and ensuring seamless continuous integration workflows.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
