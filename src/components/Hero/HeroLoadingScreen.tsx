import { motion } from 'framer-motion';

interface HeroLoadingScreenProps {
  progress: number; // 0–1
}

/**
 * Minimal, premium loading screen shown while image frames preload.
 * Displays a thin progress bar and percentage counter.
 */
const HeroLoadingScreen = ({ progress }: HeroLoadingScreenProps) => {
  const percent = Math.round(progress * 100);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Name hint */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12 font-light"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Abhyoday Kumar
      </motion.p>

      {/* Progress bar track */}
      <div className="relative w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/60 rounded-full"
          style={{ width: `${percent}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* Percentage */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-[11px] text-white/30 mt-4 tabular-nums tracking-widest"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {percent}%
      </motion.p>
    </motion.div>
  );
};

export default HeroLoadingScreen;
