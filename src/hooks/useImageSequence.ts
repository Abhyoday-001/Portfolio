import { useState, useEffect, useRef } from 'react';

interface UseImageSequenceResult {
  images: HTMLImageElement[];
  progress: number;      // 0–1
  isLoaded: boolean;
  totalFrames: number;
}

/**
 * Preloads an image sequence from /public/ani/.
 * Automatically detects all .webp frames, avoiding hardcoded names or counts.
 */
export function useImageSequence(): UseImageSequenceResult {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [totalFrames, setTotalFrames] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadSequence = async () => {
      // Use Vite's import.meta.glob to automatically discover all .webp files in the directory at build time.
      // This eliminates hardcoding and allows dynamic addition/removal of frames.
      const webpFiles = import.meta.glob('/public/ani/*.webp', { eager: true });
      
      // Extract the paths, sort them naturally, and map to their public URL equivalent (remove '/public' prefix)
      const discovered = Object.keys(webpFiles)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map(key => key.replace(/^\/public/, ''));

      if (cancelled || discovered.length === 0) return;

      const total = discovered.length;
      setTotalFrames(total);

      // Now preload all discovered frames
      let loadedCount = 0;
      const loadedImages: HTMLImageElement[] = new Array(total);

      const loadImage = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = discovered[index];
          img.onload = () => {
            if (cancelled) return resolve();
            loadedImages[index] = img;
            loadedCount++;
            setProgress(loadedCount / total);
            resolve();
          };
          img.onerror = () => {
            // Still count it to avoid hanging
            loadedCount++;
            setProgress(loadedCount / total);
            resolve();
          };
        });
      };

      // Load in parallel batches of 6 for speed
      const BATCH_SIZE = 6;
      for (let i = 0; i < total; i += BATCH_SIZE) {
        if (cancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, total); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }

      if (cancelled) return;

      imagesRef.current = loadedImages.filter(Boolean);
      setIsLoaded(true);
    };

    loadSequence();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    images: imagesRef.current,
    progress,
    isLoaded,
    totalFrames,
  };
}

