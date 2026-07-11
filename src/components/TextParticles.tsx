import React, { useEffect, useState, useRef } from "react";
import InteractiveParticles from "./InteractiveParticles";

interface TextParticlesProps {
  text1: string;
  text2: string;
  className?: string;
}

export default function TextParticles({ text1, text2, className }: TextParticlesProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    // Wait for the font to load so we don't draw with a fallback font
    document.fonts.ready.then(() => {
      if (!isMounted) return;
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Match the canvas aspect ratio (2.5) exactly with the DOM container (aspect-[2.5/1])
      // This mathematically guarantees the 3D plane perfectly fits the container without cropping or margins!
      canvas.width = 2500;
      canvas.height = 1000;
      
      // Fill with black background so antialiasing blends to black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Use a very clean, bold modern sans-serif font (Montserrat or Inter)
      // Massively increased font size to 360px so it's HUGE!
      ctx.font = "bold 360px 'Montserrat', 'Inter', 'Helvetica Neue', sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      
      // Draw centered on canvas
      ctx.fillText(text1, canvas.width / 2, 320);
      ctx.fillText(text2, canvas.width / 2, 720);
      
      setDataUrl(canvas.toDataURL("image/png"));
    });

    return () => {
      isMounted = false;
    };
  }, [text1, text2]);

  if (!dataUrl) return null;

  return (
    <div className={className}>
      <InteractiveParticles
        src={dataUrl}
        allowUpload={false}
        background="transparent"
        color="#00f2ff" // Cyan color to match the theme
        size={0.7} // Smaller particles for clearer text
        randomness={0.5} // Less randomness so text is legible
        depth={10}
        touchRadius={0.2}
        maxDimension={1600} // High resolution sampling grid
        className="w-full h-full"
      />
    </div>
  );
}
