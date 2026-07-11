import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Returns the current window dimensions, debounced to avoid excessive re-renders.
 */
export function useWindowSize(debounceMs = 100): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceMs]);

  return size;
}
