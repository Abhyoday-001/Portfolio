import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const Char = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"]
  });

  const chars = text.split("");

  return (
    <p ref={container} className={className}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + (1 / chars.length);
        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </p>
  );
};

export default AnimatedText;
