import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useImageSequence } from '../../hooks/useImageSequence';
import HeroCanvas from './HeroCanvas';
import HeroOverlay from './HeroOverlay';
import HeroLoadingScreen from './HeroLoadingScreen';

/**
 * Cinematic scroll-driven Hero section.
 *
 * Architecture:
 * - A tall scroll container (~600vh) wraps a sticky viewport.
 * - The sticky container pins to the screen while the user scrolls.
 * - scrollYProgress (0→1) maps to the current frame index.
 * - Text overlays animate in/out based on scroll ranges.
 * - Seamlessly transitions into the next section (WhatIDo).
 */
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { images, progress, isLoaded, totalFrames } = useImageSequence();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Framer Motion scroll tracking on the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to frame index
  const currentFrame = useTransform(scrollYProgress, (v) => {
    if (totalFrames === 0) return 0;
    return Math.min(Math.floor(v * totalFrames), totalFrames - 1);
  });

  // Track the current frame as state for the canvas
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = currentFrame.on('change', (v) => {
      setFrameIndex(v);
    });
    return unsubscribe;
  }, [currentFrame]);

  // Subtle mouse parallax — only on desktop, not if reduced motion
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 to 1
    setMousePos({ x, y });
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // For reduced motion: show first frame as static
  if (prefersReducedMotion && isLoaded) {
    return (
      <section className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas
            images={images}
            currentFrame={0}
            mouseX={0}
            mouseY={0}
          />
        </div>
        {/* Static name overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white text-center leading-[0.9]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="block">ABHYODAY</span>
            <span className="block mt-1 md:mt-2">KUMAR</span>
          </h1>
          <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            {['Creative Developer', 'Full Stack Engineer', 'AI Builder'].map((label) => (
              <span
                key={label}
                className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/50 font-light"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        {/* Vignette */}
        <div className="hero-vignette" />
      </section>
    );
  }

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && <HeroLoadingScreen progress={progress} />}
      </AnimatePresence>

      {/* Scroll container — 600vh tall to create the scroll runway */}
      <section
        ref={containerRef}
        className="relative bg-[#0a0a0a]"
        style={{ height: '600vh' }}
      >
        {/* Sticky viewport — stays pinned while scrolling through the 600vh */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">

          {/* Canvas layer */}
          {isLoaded && (
            <HeroCanvas
              images={images}
              currentFrame={frameIndex}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
            />
          )}

          {/* Text overlay layer */}
          {isLoaded && (
            <HeroOverlay scrollProgress={scrollYProgress} />
          )}

          {/* Vignette overlay */}
          <div className="hero-vignette" />

          {/* Subtle film grain */}
          <div className="hero-grain" />

          {/* Bottom gradient for seamless transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />

        </div>
      </section>
    </>
  );
};

export default Hero;
