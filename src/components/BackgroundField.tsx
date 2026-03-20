import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Grid = () => {
  useThree();
  const meshRef = useRef<THREE.Points>(null);

  const [positions, initialPositions] = useMemo(() => {
    const size = 100;
    const gap = 1.5;
    const pos = new Float32Array(size * size * 3);
    const initialPos = new Float32Array(size * size * 3);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = (i - size / 2) * gap;
        const y = (j - size / 2) * gap;
        const idx = (i * size + j) * 3;
        pos[idx] = x;
        pos[idx + 1] = y;
        pos[idx + 2] = 0;
        initialPos[idx] = x;
        initialPos[idx + 1] = y;
        initialPos[idx + 2] = 0;
      }
    }
    return [pos, initialPos];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const attr = meshRef.current.geometry.attributes.position;
    
    // Target mouse position in world space
    const targetX = (state.mouse.x * state.viewport.width) / 2;
    const targetY = (state.mouse.y * state.viewport.height) / 2;

    for (let i = 0; i < attr.count; i++) {
      const ix = i * 3;
      const x = initialPositions[ix];
      const y = initialPositions[ix + 1];
      
      const dx = x - targetX;
      const dy = y - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Distortion effect
      const force = Math.max(0, 1 - dist / 5);
      const mag = force * 1.5;
      
      if (dist > 0.1) {
        attr.array[ix] = x + (dx / dist) * mag;
        attr.array[ix + 1] = y + (dy / dist) * mag;
        attr.array[ix + 2] = mag * 2;
      } else {
        attr.array[ix] = x;
        attr.array[ix + 1] = y;
        attr.array[ix + 2] = mag * 2;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f2ff"
        transparent
        opacity={0.2}
        sizeAttenuation
      />
    </points>
  );
};

const BackgroundField = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <React.Suspense fallback={null}>
          <Grid />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundField;
