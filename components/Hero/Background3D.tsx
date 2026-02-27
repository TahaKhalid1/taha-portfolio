
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix Three.js intrinsic element errors by using PascalCase constants cast to any.
const Mesh = 'mesh' as any;
const TorusKnotGeometry = 'torusKnotGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;

function InteractiveShape() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  useFrame((state) => {
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.5, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
  });

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1.5} floatIntensity={isMobile ? 1 : 2}>
      <Mesh ref={meshRef}>
        <TorusKnotGeometry args={[1.5, 0.5, isMobile ? 64 : 256, isMobile ? 16 : 64]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          speed={isMobile ? 1.5 : 3}
          distort={isMobile ? 0.2 : 0.4}
          radius={1}
          metalness={0.9}
          roughness={0.1}
          emissive="#0369a1"
          emissiveIntensity={0.5}
        />
      </Mesh>
    </Float>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 400 : 1500;
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 15;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 25;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={isMobile ? 0.04 : 0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const Background3D: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true
        }}
      >
        <AmbientLight intensity={0.5} />
        <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <PointLight position={[-10, -10, -10]} color="#4facfe" intensity={1} />
        <InteractiveShape />
        <ParticleField />
      </Canvas>
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-80"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};

export default Background3D;
