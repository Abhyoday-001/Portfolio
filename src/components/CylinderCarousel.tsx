import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import ProjectCard from "./ProjectCard";

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: any[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      projects,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 32,
      cardWidth = 340,
      ...props
    },
    ref
  ) => {
    const N = projects.length;
    
    // We compute the CSS variables here instead of polluting the global CSS
    // --n: number of cards
    // --w: card width
    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      // animation duration
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    // Calculate translateZ in JS to avoid browser issues with CSS tan()
    // 0.5 * w + 0.5em (8px) / tan(PI / N)
    const translateZ = Math.round((cardWidth / 2 + 8) / Math.tan(Math.PI / N));

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-[500px] grid place-items-center overflow-hidden",
          className
        )}
        style={{
          perspective: "1200px",
          maskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        }}
        {...props}
      >
        <div style={{ transform: `translateZ(-${translateZ}px)`, transformStyle: "preserve-3d" }}>
          <div
            className={cn(
              "grid place-items-center [transform-style:preserve-3d] group",
              containerClassName
            )}
            style={{
              ...customStyle,
              animation: "ry var(--anim-dur) linear infinite",
            }}
          >
            {/* We define the keyframes inline via a style block to ensure it works without global CSS config */}
          <style>
            {`
              @keyframes ry {
                to { transform: rotateY(1turn); }
              }
              
              /* Pause rotation on hover */
              .group:hover {
                animation-play-state: paused !important;
              }
            `}
          </style>
          
          {projects.map((project, i) => (
            <div
              key={project.id || i}
              className={cn(
                "[grid-area:1/1] w-full [backface-visibility:hidden] relative",
                cardClassName
              )}
              style={{
                width: "var(--w)",
                "--i": i,
                transform: `rotateY(calc(var(--i) * var(--ba))) translateZ(${translateZ}px)`,
              } as React.CSSProperties}
            >
              <ProjectCard project={project} index={i} inCarousel={true} />
            </div>
          ))}
          </div>
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";

export default CylinderCarousel;
