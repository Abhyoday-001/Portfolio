import { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface HeroOverlayProps {
  scrollProgress: MotionValue<number>;
}

/**
 * Helper: creates a text block that fades in and out based on scroll range.
 */
function useScrollFade(progress: MotionValue<number>, enterStart: number, enterEnd: number, exitStart: number, exitEnd: number) {
  const opacity = useTransform(progress, [enterStart, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [enterStart, enterEnd, exitStart, exitEnd], [40, 0, 0, -40]);
  const blur = useTransform(progress, [enterStart, enterEnd, exitStart, exitEnd], [8, 0, 0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return { opacity, y, filter };
}

/**
 * All text overlays for the cinematic Hero scroll experience.
 * Four sections that appear/disappear as the user scrolls.
 */
const HeroOverlay = ({ scrollProgress }: HeroOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section 1: Name + subtitles (0% – 20%)
  const s1 = useScrollFade(scrollProgress, 0, 0.02, 0.15, 0.22);

  // Section 2: Tagline (25% – 48%)
  const s2 = useScrollFade(scrollProgress, 0.25, 0.30, 0.42, 0.48);

  // Section 3: Skills (52% – 73%)
  const s3 = useScrollFade(scrollProgress, 0.52, 0.57, 0.67, 0.73);

  // Section 4: CTA (78% – 95%)
  const s4 = useScrollFade(scrollProgress, 0.78, 0.83, 0.90, 0.96);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">

      {/* ── Section 1: Name + Subtitles ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: s1.opacity, y: s1.y, filter: s1.filter }}
      >
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white text-center leading-[0.9]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="block">ABHYODAY</span>
          <span className="block mt-1 md:mt-2">KUMAR</span>
        </h1>

        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          {['Creative Developer', 'Full Stack Engineer', 'AI Builder'].map((label, i) => (
            <span
              key={label}
              className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/50 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {i > 0 && <span className="hidden sm:inline mr-6 text-white/20">·</span>}
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Section 2: Tagline ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 lg:px-32"
        style={{ opacity: s2.opacity, y: s2.y, filter: s2.filter }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight max-w-3xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Building Digital Experiences
          <br />
          <span className="text-white/60">That Feel Effortless.</span>
        </h2>

        <p
          className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-light"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          I design and develop fast, interactive and scalable digital products
          that blend creativity with engineering.
        </p>
      </motion.div>

      {/* ── Section 3: Pillars ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-20 lg:px-32"
        style={{ opacity: s3.opacity, y: s3.y, filter: s3.filter }}
      >
        <div className="text-right">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="block">AI/ML Engineering.</span>
            <span className="block text-white/70">Full Stack Development.</span>
            <span className="block text-white/50">Cloud & Infrastructure.</span>
          </h2>

          <p
            className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-white/40 max-w-md leading-relaxed font-light text-right inline-block"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Creating premium digital experiences
            through scalable, modern technologies.
          </p>
        </div>
      </motion.div>

      {/* ── Section 4: CTA ── */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: s4.opacity, y: s4.y, filter: s4.filter }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Welcome to my
          <br />
          <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
            Portfolio.
          </span>
        </h2>
      </motion.div>

    </div>
  );
};

export default HeroOverlay;
