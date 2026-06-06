import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- Custom Star Shader Material ---
const StarShaderMaterial = {
  vertexShader: `
    uniform float time;
    uniform vec2 mousePos;
    
    attribute float size;
    attribute vec3 customColor;
    attribute float twinkleSpeed;
    attribute float twinkleOffset;
    
    varying vec3 vColor;
    varying float vOpacity;
    
    void main() {
      vColor = customColor;
      
      // Twinkle logic
      vOpacity = 0.6 + 0.4 * sin(time * twinkleSpeed + twinkleOffset);
      
      // Parallax calculation
      float parallaxFactor = (position.z + 100.0) / 150.0;
      vec3 pos = position;
      
      // Subtle mouse parallax shift
      pos.x += mousePos.x * parallaxFactor * 5.0;
      pos.y += mousePos.y * parallaxFactor * 5.0;
      
      // Slow global drift (right and up)
      pos.x += time * 0.5 * parallaxFactor;
      pos.y += time * 0.3 * parallaxFactor;
      
      // Wrap around logic (approximate boundary)
      pos.x = mod(pos.x + 150.0, 300.0) - 150.0;
      pos.y = mod(pos.y + 150.0, 300.0) - 150.0;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size attenuation
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vOpacity;
    
    void main() {
      // Circular particle
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float ll = length(xy);
      if (ll > 0.5) discard;
      
      // Soft edge
      float alpha = (0.5 - ll) * 2.0;
      
      gl_FragColor = vec4(vColor, vOpacity * alpha);
    }
  `
};

const StarField = () => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    mousePos: { value: new THREE.Vector2(0, 0) },
  }), []);

  const geometry = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    const colorWhite = new THREE.Color('#ffffff');
    const colorBlue = new THREE.Color('#aaddff');
    const colorYellow = new THREE.Color('#ffeeaa');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150 - 50;

      const randColor = Math.random();
      let c = colorWhite;
      if (randColor > 0.9) c = colorBlue;
      else if (randColor > 0.8) c = colorYellow;
      
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 1.7 + 0.3;
      twinkleSpeeds[i] = Math.random() * 2.0 + 1.0;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('twinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));
    geo.setAttribute('twinkleOffset', new THREE.BufferAttribute(twinkleOffsets, 1));
    return geo;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.mousePos.value.lerp(
        new THREE.Vector2(state.pointer.x, state.pointer.y),
        0.05
      );
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={StarShaderMaterial.vertexShader}
        fragmentShader={StarShaderMaterial.fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Planets = () => {
  const planet1Ref = useRef<THREE.Mesh>(null);
  const planet2Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const jupiterTexture = useTexture('/textures/jupiter.jpg');
  const saturnTexture = useTexture('/textures/saturn.jpg');
  const saturnRingTexture = useTexture('/textures/saturn_ring.png');

  // To ensure realistic colors
  jupiterTexture.colorSpace = THREE.SRGBColorSpace;
  saturnTexture.colorSpace = THREE.SRGBColorSpace;
  saturnRingTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (planet1Ref.current) {
      planet1Ref.current.rotation.y += delta * 0.05;
      planet1Ref.current.position.x = -35 + state.pointer.x * 2;
      planet1Ref.current.position.y = -20 + state.pointer.y * 2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.02;
    }
    if (planet2Ref.current) {
      planet2Ref.current.rotation.y += delta * 0.033;
      planet2Ref.current.position.x = 25 + state.pointer.x * 1.5;
      planet2Ref.current.position.y = 15 + state.pointer.y * 1.5;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[20, 10, 10]} intensity={2.0} color="#ffffff" />
      
      {/* Planet 1: Jupiter */}
      <group position={[-35, -20, -60]}>
        <mesh ref={planet1Ref}>
          <sphereGeometry args={[18, 64, 64]} />
          <meshStandardMaterial map={jupiterTexture} roughness={0.6} metalness={0.1} />
        </mesh>
      </group>

      {/* Planet 2: Saturn */}
      <group position={[25, 15, -80]} rotation={[0.4, -0.2, 0]}>
        <mesh ref={planet2Ref}>
          <sphereGeometry args={[10, 64, 64]} />
          <meshStandardMaterial map={saturnTexture} roughness={0.5} metalness={0.1} />
        </mesh>
        
        {/* Saturn's Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.1, 0, 0]}>
          <ringGeometry args={[13, 22, 64]} />
          <meshStandardMaterial 
            map={saturnRingTexture} 
            alphaMap={saturnRingTexture} 
            transparent 
            opacity={0.9} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Outer Atmospheric Glow */}
        <mesh>
          <sphereGeometry args={[11, 32, 32]} />
          <meshBasicMaterial color="#aaddff" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  );
};

const NebulaWashes = () => {
  return (
    <group position={[0, 0, -100]}>
      <mesh position={[-40, 30, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[40, -30, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshBasicMaterial color="#aa00ff" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
};

const ShootingStar = () => {
  const [active, setActive] = useState(false);
  const meshRef = useRef<THREE.Line>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    return geo;
  }, []);
  
  const state = useRef({
    x: 0,
    y: 0,
    length: 15,
    speed: 150,
    progress: 0
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      const wait = 4000 + Math.random() * 4000;
      timeout = setTimeout(() => {
        state.current.x = Math.random() * 100 + 20;
        state.current.y = Math.random() * 60 + 20;
        state.current.progress = 0;
        setActive(true);
      }, wait);
    };
    
    if (!active) {
      trigger();
    }
    
    return () => clearTimeout(timeout);
  }, [active]);

  useFrame((_, delta) => {
    if (!active || !meshRef.current) return;
    
    state.current.progress += delta;
    const distance = state.current.speed * state.current.progress;
    
    const currentX = state.current.x - distance;
    const currentY = state.current.y - distance;
    
    const posAttr = meshRef.current.geometry.attributes.position;
    if (posAttr) {
      posAttr.array[0] = currentX;
      posAttr.array[1] = currentY;
      posAttr.array[2] = -20;
      posAttr.array[3] = currentX + state.current.length;
      posAttr.array[4] = currentY + state.current.length;
      posAttr.array[5] = -20;
      posAttr.needsUpdate = true;
    }

    if (materialRef.current) {
       materialRef.current.opacity = Math.max(0, 1 - (state.current.progress / 0.6));
    }

    if (state.current.progress > 0.6) {
      setActive(false);
    }
  });

  if (!active) return null;

  return (
    <line ref={meshRef} geometry={geometry}>
      <lineBasicMaterial ref={materialRef} color="#ffffff" transparent opacity={1} blending={THREE.AdditiveBlending} />
    </line>
  );
};

const CanvasBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020818]">
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        frameloop="demand"
      >
        <React.Suspense fallback={null}>
          <StarField />
          <Planets />
          <NebulaWashes />
          <ShootingStar />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasBackground;
