"use client";

import React, { useEffect, useState, useMemo } from "react";

interface PerspectiveGridProps {
    className?: string;
    gridSize?: number;
    showOverlay?: boolean;
    fadeRadius?: number;
}

export function PerspectiveGrid({
    className,
    gridSize = 24, // reduced for better performance
    showOverlay = true,
    fadeRadius = 75,
}: PerspectiveGridProps) {
    const [mounted, setMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setMounted(true);
        
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized mouse position (-1 to 1)
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            // Limit the parallax amount so it's very subtle
            setMousePos({ x: x * 10, y: y * 10 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Memoize tiles array to prevent unnecessary re-renders
    const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

    return (
        <div
            className={`relative w-full h-full overflow-hidden bg-[#020202] [--fade-stop:#020202] ${className || ''}`}
            style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
            }}
        >
            <div
                className="absolute w-[120rem] aspect-square grid origin-center transition-transform duration-[400ms] ease-out"
                style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px)) rotateX(55deg) rotateY(0deg) rotateZ(0deg) scale(1.5)`,
                    transformStyle: "preserve-3d",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {/* Tiles */}
                {mounted &&
                    tiles.map((_, i) => (
                        <div
                            key={i}
                            className="tile min-h-[1px] min-w-[1px] border border-white/[0.04] bg-transparent"
                        />
                    ))}
            </div>

            {/* Radial Gradient Mask (Overlay) */}
            {showOverlay && (
                <div
                    className="absolute inset-0 pointer-events-none z-10 transition-transform duration-[400ms] ease-out"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.02) 0%, transparent 40%), radial-gradient(circle at 50% 50%, transparent 20%, var(--fade-stop) ${fadeRadius}%)`,
                        transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                    }}
                />
            )}
            
            {/* Top and Bottom fades to ensure seamless integration */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#020202] to-transparent z-20 pointer-events-none" />
        </div>
    );
}

export default PerspectiveGrid;
