
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Terminal, Activity, ShieldCheck, Cpu, Zap, Radio, Database } from 'lucide-react';

// Fix Three.js intrinsic element errors by using PascalCase constants cast to any.
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const IcosahedronGeometry = 'icosahedronGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const SphereGeometry = 'sphereGeometry' as any;
const PointLight = 'pointLight' as any;
const AmbientLight = 'ambientLight' as any;

// Enhanced 3D Core with multiple layers
const NeuralCore = ({ progress }: { progress: number }) => {
  const innerRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotationSpeed = 0.5 + (progress / 100); // Speeds up as it loads
    
    innerRef.current.rotation.y = time * rotationSpeed;
    outerRef.current.rotation.z = time * (rotationSpeed * 0.5);
    outerRef.current.rotation.x = Math.sin(time) * 0.2;
    
    ringRef.current.rotation.y = -time * 2;
    ringRef.current.rotation.x = Math.PI / 4;
  });

  return (
    <Group>
      {/* Inner Energy Core */}
      <Sphere ref={innerRef} args={[0.8, 32, 32]}>
        <MeshDistortMaterial 
          color="#06b6d4" 
          speed={4} 
          distort={0.4} 
          emissive="#06b6d4" 
          emissiveIntensity={2} 
        />
      </Sphere>

      {/* Wireframe Shell */}
      <Mesh ref={outerRef}>
        <IcosahedronGeometry args={[2.2, 1]} />
        <MeshStandardMaterial 
          wireframe 
          color="#4f46e5" 
          transparent 
          opacity={0.3} 
          emissive="#4f46e5" 
          emissiveIntensity={1}
        />
      </Mesh>

      {/* Orbital Data Ring */}
      <Group ref={ringRef}>
        <Torus args={[3, 0.02, 16, 100]}>
          <MeshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={5} />
        </Torus>
        {/* Ring data points */}
        {[0, 1, 2, 3].map((i) => (
          <Mesh key={i} position={[Math.cos(i * Math.PI/2) * 3, Math.sin(i * Math.PI/2) * 3, 0]}>
            <SphereGeometry args={[0.08, 16, 16]} />
            <MeshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={10} />
          </Mesh>
        ))}
      </Group>

      <PointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
      <PointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
    </Group>
  );
};

// Moving particle field with "warp" effect on exit
function WarpField({ isExiting }: { isExiting: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y += 0.001;
    if (isExiting) {
      pointsRef.current.position.z += 0.5; // Fly-through effect
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("LOADING_MODULES");
  const [isExiting, setIsExiting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const statusMessages = [
    "BOOTING_CORE_OS",
    "ESTABLISHING_NEURAL_LINK",
    "ALLOCATING_VIRTUAL_MEMORY",
    "DECRYPTING_ASSETS",
    "RECONSTRUCTING_3D_MESH",
    "OPTIMIZING_RENDER_PIPELINE",
    "HANDSHAKE_COMPLETE"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          return 100;
        }
        const step = prev < 80 ? Math.random() * 4 : 0.8;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statusIndex = Math.min(Math.floor((progress / 100) * statusMessages.length), statusMessages.length - 1);
    setStatusText(statusMessages[statusIndex]);
    
    if (progress % 12 < 1 && progress > 5 && progress < 95) {
      const hex = Math.random().toString(16).substr(2, 6).toUpperCase();
      setLogs(prev => [...prev.slice(-3), `0x${hex} -> SYNC_SUCCESS`]);
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "brightness(2) blur(20px)",
        transition: { duration: 0.8, ease: "circIn" }
      }}
      className="fixed inset-0 z-[1000] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Kinetic Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <AmbientLight intensity={0.2} />
          <NeuralCore progress={progress} />
          <WarpField isExiting={isExiting} />
        </Canvas>
      </div>

      {/* Laser Scanning Beam Overlay */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-cyan-500/40 shadow-[0_0_20px_#06b6d4] z-50 pointer-events-none"
      />

      {/* HUD Elements */}
      <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center">
        
        {/* Tactical Corner Brackets */}
        <div className="absolute -top-20 -left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20" />
        <div className="absolute -top-20 -right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-500/20" />
        <div className="absolute -bottom-20 -left-10 w-20 h-20 border-b-2 border-l-2 border-cyan-500/20" />
        <div className="absolute -bottom-20 -right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-500/20" />

        {/* System ID Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16 opacity-40"
        >
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-[9px] tracking-[0.4em] uppercase">
            <Radio size={12} className="animate-pulse" /> Uplink Status: Nominal
          </div>
          <div className="w-12 h-[1px] bg-white/10" />
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-[9px] tracking-[0.4em] uppercase">
            <Database size={12} /> Buffer: {Math.floor(progress * 124)}KB
          </div>
        </motion.div>

        {/* Identity with Glitch staggered effect */}
        <div className="text-center mb-16 space-y-4">
          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter uppercase italic flex justify-center"
            >
              {"TAHA".split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="w-4 md:w-8" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 animate-gradient-x flex">
                {"KHALID".split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="text-[10px] font-mono text-cyan-400 tracking-[0.8em] uppercase"
          >
            Tactical Systems Architecture
          </motion.p>
        </div>

        {/* Progress Matrix */}
        <div className="w-full max-w-lg space-y-8">
          <div className="flex justify-between items-center px-2">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Process Signal</span>
              <motion.div 
                key={statusText}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white font-mono text-[11px] font-bold tracking-widest flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                {statusText}
              </motion.div>
            </div>
            <div className="text-right">
              <span className="text-5xl font-display font-black text-cyan-500 tabular-nums">
                {Math.floor(progress)}<span className="text-white text-lg">%</span>
              </span>
            </div>
          </div>

          {/* Segmented Grid Progress */}
          <div className="grid grid-cols-10 gap-2 h-1.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="relative bg-white/5 rounded-full overflow-hidden h-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: progress > (i * 10) ? '100%' : '0%' }}
                  className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                />
              </div>
            ))}
          </div>

          {/* Side Logs HUD */}
          <div className="flex justify-between items-start gap-8">
            <div className="flex-grow glass rounded-xl border border-white/5 p-4 bg-slate-900/40 font-mono text-[8px] text-slate-500 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-cyan-500/40">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="text-cyan-400 flex items-center gap-2">
                <span className="animate-pulse">{'>'}</span> EXECUTING_RESOURCES...
              </div>
            </div>
            
            <div className="flex flex-col gap-4 opacity-30">
              <div className="flex items-center gap-2">
                <Cpu size={12} className="text-white" />
                <span className="text-[7px] font-mono text-white tracking-widest">MEM_STABLE</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-white" />
                <span className="text-[7px] font-mono text-white tracking-widest">SEC_VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Binary Streams */}
      <div className="absolute left-6 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent flex flex-col items-center justify-between py-10 opacity-20">
        {[1,0,1,1,0].map((v, i) => <span key={i} className="text-[10px] font-mono text-cyan-400">{v}</span>)}
      </div>
      <div className="absolute right-6 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent flex flex-col items-center justify-between py-10 opacity-20">
        {[0,1,0,0,1].map((v, i) => <span key={i} className="text-[10px] font-mono text-cyan-400">{v}</span>)}
      </div>
    </motion.div>
  );
};

export default Preloader;
