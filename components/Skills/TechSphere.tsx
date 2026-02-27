
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Fix Three.js intrinsic element errors by using PascalCase constants cast to any.
const Group = 'group' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PointLight = 'pointLight' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;

const SphereContent = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = time * 0.1;
  });

  return (
    <Group>
      <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 0.5 : 1}>
        <Sphere args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#0ea5e9"
            attach="material"
            distort={isMobile ? 0.2 : 0.4}
            speed={isMobile ? 1 : 2}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      {/* Visual core */}
      <Sphere args={[0.5, isMobile ? 16 : 32, isMobile ? 16 : 32]}>
        <MeshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
      </Sphere>
      
      <PointLight position={[10, 10, 10]} intensity={1} />
      <PointLight position={[-10, -10, -10]} color="#4facfe" intensity={0.5} />
    </Group>
  );
};

const TechSphere: React.FC = () => {
  return (
    <div className="w-full h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <AmbientLight intensity={0.2} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <SphereContent />
      </Canvas>
    </div>
  );
};

export default TechSphere;
