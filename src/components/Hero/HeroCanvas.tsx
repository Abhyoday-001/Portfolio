import { useRef, useEffect, useCallback, memo } from 'react';
import { drawCoverImage } from '../../utils/drawCoverImage';

interface HeroCanvasProps {
  images: HTMLImageElement[];
  currentFrame: number;
  mouseX: number; // -1 to 1
  mouseY: number; // -1 to 1
}

/**
 * Renders the current frame of the image sequence onto an HTML5 Canvas.
 * Supports Retina/HiDPI displays and object-fit:cover behavior.
 */
const HeroCanvas = memo(({ images, currentFrame, mouseX, mouseY }: HeroCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || images.length === 0) return;

    const frameIndex = Math.max(0, Math.min(currentFrame, images.length - 1));
    const image = images[frameIndex];
    if (!image) return;

    // Only redraw if frame actually changed
    if (frameIndex === lastFrameRef.current) return;
    lastFrameRef.current = frameIndex;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Resize canvas if needed
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, width, height);
    drawCoverImage(ctx, image, width, height);
  }, [images, currentFrame]);

  // Draw on frame change
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      lastFrameRef.current = -1; // Force redraw
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [draw]);

  // Subtle parallax transform based on mouse position
  const parallaxX = mouseX * 8;
  const parallaxY = mouseY * 5;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.03)`,
        willChange: 'transform',
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
});

HeroCanvas.displayName = 'HeroCanvas';
export default HeroCanvas;
