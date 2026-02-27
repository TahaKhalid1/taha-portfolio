
import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars, PerspectiveCamera } from '@react-three/drei';
import { EDUCATION } from '../../constants';
import { GraduationCap, Award, MapPin, Calendar, BookOpen, Trophy, Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';
import * as THREE from 'three';

// Fix Three.js intrinsic element errors by using PascalCase constants cast to any.
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const IcosahedronGeometry = 'icosahedronGeometry' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const BoxGeometry = 'boxGeometry' as any;
const PointLight = 'pointLight' as any;

const EducationCore = () => {
  const coreRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    coreRef.current.rotation.y = time * 0.2;
    ring1Ref.current.rotation.x = time * 0.4;
    ring1Ref.current.rotation.z = time * 0.2;
    ring2Ref.current.rotation.y = time * 0.5;
    ring2Ref.current.rotation.x = time * 0.3;
  });

  return (
    <Group ref={coreRef}>
      {/* Central Knowledge Core */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Mesh>
          <IcosahedronGeometry args={[1, 15]} />
          <MeshDistortMaterial
            color="#06b6d4"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            emissive="#083344"
            emissiveIntensity={2}
          />
        </Mesh>
      </Float>

      {/* Orbital Rings */}
      <Mesh ref={ring1Ref}>
        <TorusGeometry args={[1.8, 0.02, 16, 100]} />
        <MeshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={5} transparent opacity={0.6} />
      </Mesh>

      <Mesh ref={ring2Ref}>
        <TorusGeometry args={[2.2, 0.01, 16, 100]} />
        <MeshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={3} transparent opacity={0.4} />
      </Mesh>

      {/* Floating Data Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <Mesh position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}>
            <BoxGeometry args={[0.05, 0.05, 0.05]} />
            <MeshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={10} />
          </Mesh>
        </Float>
      ))}

      <PointLight position={[10, 10, 10]} intensity={3} color="#06b6d4" />
      <PointLight position={[-10, -10, -10]} intensity={2} color="#4f46e5" />
    </Group>
  );
};

const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const academiaX = useTransform(smoothProgress, [0, 1], [-300, 300]);
  const cardRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-5, 0, 5]);
  const cardTranslateX = useTransform(smoothProgress, [0, 0.5, 1], [-30, 0, 30]);

  return (
    <div ref={containerRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-slate-950">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
        <motion.div 
          style={{ x: academiaX }}
          className="absolute inset-0 flex items-center justify-center select-none"
        >
          <span className="text-[25vw] font-display font-black text-white/5 italic tracking-tighter uppercase whitespace-nowrap">
            KNOWLEDGE
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            <ShieldCheck size={16} className="animate-pulse" /> ACADEMIC_UPLINK_VERIFIED
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-white uppercase leading-[0.9] italic"
          >
            Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-500">EXCELLENCE.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Enhanced Digital Diploma Card - Scaled Down */}
          <motion.div
            style={{ 
              rotateY: cardRotateY,
              x: cardTranslateX,
              perspective: 1000
            }}
            className="relative"
          >
            <div className="p-8 md:p-12 lg:p-14 glass rounded-[3rem] border border-white/10 bg-slate-900/60 relative overflow-hidden group shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]">
              {/* Internal Scanlines */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,white_2px,white_3px)] bg-[size:100%_4px]" />
              
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-700" />

              <div className="space-y-10 relative z-10">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <GraduationCap size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-cyan-500 tracking-[0.3em] uppercase">Status: Conferred</span>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{EDUCATION.date}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-display font-black text-white leading-[1.1] uppercase tracking-tighter italic">
                    {EDUCATION.degree}
                  </h3>
                  
                  <div className="space-y-1">
                    <p className="text-lg md:text-xl font-light text-slate-300 uppercase tracking-wider max-w-lg">
                      {EDUCATION.institution}
                    </p>
                    <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-mono tracking-widest uppercase">
                       <MapPin size={12} /> {EDUCATION.location}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">Performance_Index</p>
                       <span className="text-[10px] font-bold text-cyan-400 uppercase">Top 2%</span>
                    </div>
                    <div className="flex items-end gap-3">
                       <span className="text-5xl md:text-6xl font-display font-black text-white">{EDUCATION.gpa}</span>
                       <span className="text-xl font-display font-bold text-slate-600 mb-2">/ 4.0</span>
                    </div>
                    <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '95%' }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                       />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">Accolades & Recognition</p>
                    <div className="space-y-2">
                      {EDUCATION.honors.map((honor, i) => (
                        <div key={i} className="flex items-center gap-3 group/item">
                           <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">
                              <Trophy size={12} />
                           </div>
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{honor}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3">
                         <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                            <Zap size={12} />
                         </div>
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">CS CORE SPECIALIST</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contextual Footer */}
                <div className="pt-6">
                   <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5 flex flex-col md:flex-row items-center gap-6 group/footer">
                      <div className="flex -space-x-2">
                         {[Cpu, BookOpen, Activity].map((Icon, i) => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-cyan-500 shadow-lg group-hover/footer:scale-110 transition-transform">
                              <Icon size={16} />
                           </div>
                         ))}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-light uppercase tracking-wider text-center md:text-left">
                        Curriculum focused on <span className="text-white font-bold">Systems Architecture</span>, <span className="text-white font-bold">Concurrent Programming</span>, and <span className="text-white font-bold">Enterprise Cloud Delivery</span>.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cinematic 3D Scene - Keeping same size to balance card */}
          <div className="relative h-[500px] lg:h-[700px] w-full">
            <div className="absolute inset-0 z-0">
               <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
                  <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1.5} />
                  <EducationCore />
                  <PerspectiveCamera makeDefault position={[0, 0, 8]} />
               </Canvas>
            </div>

            {/* Tactical HUD Overlays */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                 <div className="space-y-2">
                    <div className="px-5 py-1.5 glass rounded-full border border-white/10 text-[9px] font-mono text-cyan-400 tracking-[0.4em] uppercase">
                       KNOWLEDGE_STREAM_v9
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-mono text-[7px] tracking-[0.6em] uppercase ml-2">
                       <Activity size={8} /> ORBIT_STABLE
                    </div>
                 </div>
                 
                 <div className="text-right">
                    <div className="text-[9px] font-mono text-slate-500 tracking-[0.4em] uppercase mb-1">Archive_Ref</div>
                    <div className="text-base font-black text-white tracking-widest italic">PK_KIET_2019</div>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    <div className="w-2 h-2 rounded-full border border-cyan-500 animate-ping" />
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                 </div>
                 <div className="grid grid-cols-3 gap-6 text-[8px] font-mono text-slate-600 uppercase tracking-[0.5em] text-center">
                    <div className="space-y-1">
                       <div className="text-cyan-500/30">GEO</div>
                       <div>SINDH_PK</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-cyan-500/30">NODE</div>
                       <div>ACAD_01</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-cyan-500/30">CRED</div>
                       <div>VERIFIED</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
