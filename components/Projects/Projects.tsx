
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { ArrowUpRight, Shield, Box, Activity, Globe, Cpu, ChevronRight, MessageSquare, Terminal, Zap, Layers } from 'lucide-react';

const IntroSlide: React.FC<{ progress: any; segment: number }> = ({ progress, segment }) => {
  const start = 0;
  const end = segment;
  const center = (start + end) / 2;

  const opacity = useTransform(progress, [start, end - 0.05, end], [1, 1, 0]);
  const scale = useTransform(progress, [start, center, end], [1, 1.02, 0.98]);
  const y = useTransform(progress, [start, end], [0, -40]);
  
  const textX = useTransform(progress, [start, end], [0, -80]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        position: 'absolute',
        inset: 0,
        zIndex: useTransform(progress, (v) => ((v as number) < end ? 60 : 0)),
        pointerEvents: useTransform(progress, (v) => ((v as number) < end ? 'auto' : 'none')),
      }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div 
        style={{ x: textX }}
        className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.04] pointer-events-none"
      >
        <span className="text-[30vw] md:text-[25vw] font-display font-black text-white italic tracking-tighter select-none">
          SYSTEM
        </span>
      </motion.div>

      <div className="relative z-10 space-y-6 md:space-y-8 max-w-5xl">
        <div className="flex items-center justify-center gap-4 text-cyan-500 font-mono text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] uppercase">
          <Layers size={18} className="animate-pulse hidden md:block" /> DECRYPTING_DATABASE_NODES
        </div>
        
        <h2 className="text-6xl md:text-[11rem] font-display font-black text-white uppercase tracking-tighter leading-[0.8] italic">
          PROJECT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-indigo-500">ARCHIVE.</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-3xl font-light max-w-3xl mx-auto leading-relaxed px-4">
          High-performance enterprise architectures and fintech delivery ecosystems.
        </p>

        <div className="pt-12 md:pt-16 flex flex-col items-center gap-6">
           <div className="flex items-center gap-4 md:gap-8 text-slate-700 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em]">
              <div className="w-8 md:w-12 h-[1px] bg-slate-800" />
              SCROLL_TO_INITIATE
              <div className="w-8 md:w-12 h-[1px] bg-slate-800" />
           </div>
           <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-cyan-500 to-transparent"
           />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSlide: React.FC<{ project: Project; index: number; progress: any; segment: number; total: number }> = ({ project, index, progress, segment, total }) => {
  const start = (index + 1) * segment;
  const end = (index + 2) * segment;
  const center = (start + end) / 2;

  const opacity = useTransform(progress, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, center, end], [0.97, 1, 0.97]);
  const yOffset = useTransform(progress, [start, center, end], [25, 0, -25]);

  const textX = useTransform(progress, [start, end], [120, -120]);
  const textOpacity = useTransform(progress, [start, center, end], [0, 0.08, 0]);

  const category = project.tags.includes('Fintech') ? 'FINTECH' : 
                   project.tags.includes('Azure') ? 'CLOUD' : 
                   project.tags.includes('Microservices') ? 'UTILITY' : 'SYSTEM';

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y: yOffset,
        position: 'absolute',
        inset: 0,
        zIndex: useTransform(progress, (v) => ((v as number) >= start && (v as number) < end ? 50 : 10)),
        pointerEvents: useTransform(progress, (v) => ((v as number) >= start && (v as number) < end ? 'auto' : 'none')),
      }}
      className="flex items-center justify-center p-4 md:p-8 overflow-hidden"
    >
      <motion.div 
        style={{ x: textX, opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[25vw] md:text-[22vw] font-display font-black text-white whitespace-nowrap italic tracking-tighter select-none">
          {category}
        </span>
      </motion.div>

      <div className="w-full max-w-5xl grid lg:grid-cols-[1.2fr_1fr] gap-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] relative z-10">
        
        <div className="p-6 md:p-14 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-black relative">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="space-y-6 md:space-y-10 relative z-10">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 text-cyan-500 font-mono text-[8px] md:text-[9px] tracking-[0.5em] md:tracking-[0.6em] uppercase">
                <Shield size={14} className="animate-pulse hidden md:block" /> MISSION_CORE // 0{index + 1}
              </div>
              <h3 className="text-3xl md:text-6xl font-display font-black text-white leading-[0.9] uppercase tracking-tighter italic">
                {project.title}
              </h3>
              <div className="flex items-center gap-3 text-indigo-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] pt-1">
                <Globe size={16} className="hidden md:block" /> {project.company}
              </div>
            </div>

            <p className="text-slate-300 text-sm md:text-lg font-light leading-relaxed max-w-lg">
              {project.longDescription || project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 md:px-3 py-1 md:py-1.5 bg-white/5 rounded-lg text-[8px] md:text-[9px] font-mono text-slate-500 uppercase tracking-widest border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8 md:pt-12 relative z-[100]">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full px-6 md:px-8 py-4 md:py-5 bg-white text-slate-950 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all hover:bg-cyan-500 hover:text-white hover:scale-[1.03] cursor-pointer active:scale-95 shadow-xl"
            >
              <span>Initialize Uplink</span>
              <div className="flex items-center gap-4">
                <div className="w-[1px] h-6 bg-slate-950/20 group-hover:bg-white/40 hidden md:block" />
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </div>
            </a>
          </div>
        </div>

        <div className="relative h-[30vh] md:h-[40vh] lg:h-auto overflow-hidden bg-black border-l border-white/5">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover brightness-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent opacity-90" />
          
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none">
             <div className="flex justify-between items-start">
                <div className="px-3 md:px-5 py-1.5 md:py-2.5 glass rounded-lg md:rounded-xl border border-white/20 flex items-center gap-2 md:gap-4">
                   <Zap size={14} className="text-cyan-400" />
                   <span className="text-[8px] md:text-[10px] font-mono text-white tracking-widest uppercase">Secure</span>
                </div>
                <div className="text-right">
                   <div className="text-[10px] md:text-[12px] font-black text-white uppercase tracking-widest flex items-center justify-end gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      ACTIVE
                   </div>
                </div>
             </div>

             <div className="space-y-2 md:space-y-4">
                <div className="flex items-center gap-3">
                   <Activity size={16} className="text-cyan-500" />
                   <div className="h-[1px] flex-grow bg-gradient-to-r from-cyan-500/60 to-transparent" />
                </div>
                <div className="flex justify-between text-[7px] md:text-[8px] font-mono text-slate-500 uppercase tracking-[0.4em] md:tracking-[0.6em]">
                   <span>Node: 0{index + 1}</span>
                   <span className="hidden md:block">Hardware_Sync_Optimized</span>
                </div>
             </div>
          </div>

          <motion.div 
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent skew-x-12 pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 30 });
  const totalSegments = PROJECTS.length + 2;
  const segmentSize = 1 / totalSegments;

  return (
    <div ref={containerRef} className="relative h-[1100vh] bg-slate-950">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_80%)]" />
          <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.15, 0.25, 0.15]) }}
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:90px_90px]" 
          />
          <div className="absolute left-[12%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block" />
          <div className="absolute right-[12%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent hidden md:block" />
        </div>

        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-[150] flex flex-col gap-10 items-center hidden 2xl:flex">
          <div className="h-40 w-[1px] bg-gradient-to-b from-transparent to-cyan-500/40" />
          {Array.from({ length: totalSegments - 1 }).map((_, i) => {
            const step = segmentSize;
            const isActive = useTransform(smoothProgress, [i * step, (i + 0.5) * step, (i + 1) * step], [0.15, 1, 0.15]);
            return (
              <motion.div key={i} style={{ opacity: isActive, scale: isActive }} className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-mono text-cyan-400 font-black tracking-widest">0{i}</span>
                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />
              </motion.div>
            );
          })}
          <div className="h-40 w-[1px] bg-gradient-to-t from-transparent to-cyan-500/40" />
        </div>

        <div className="relative w-full h-full">
          <IntroSlide progress={smoothProgress} segment={segmentSize} />

          {PROJECTS.map((project, index) => (
            <ProjectSlide 
              key={project.id} 
              project={project} 
              index={index} 
              progress={smoothProgress}
              segment={segmentSize}
              total={PROJECTS.length}
            />
          ))}

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [1 - segmentSize, 1 - (segmentSize / 2), 1], [0, 1, 1]),
              scale: useTransform(smoothProgress, [1 - segmentSize, 1], [0.96, 1]),
              y: useTransform(smoothProgress, [1 - segmentSize, 1], [30, 0]),
              pointerEvents: useTransform(smoothProgress, (v) => (v >= 1 - segmentSize ? 'auto' : 'none')),
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-[200]"
          >
            <div className="space-y-8 md:space-y-12 max-w-5xl relative">
               <div className="absolute -top-40 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none hidden md:block">
                  <Terminal size={450} />
               </div>
               
               <div className="flex items-center justify-center gap-6 text-cyan-500 font-mono text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] uppercase">
                  <ChevronRight size={24} className="animate-bounce rotate-90 hidden md:block" /> SEQUENCE_COMPLETE
               </div>

               <h4 className="text-5xl md:text-[10rem] font-display font-black text-white uppercase tracking-tighter leading-[0.8] italic">
                 LET'S BUILD <br />
                 <span className="text-cyan-500 underline underline-offset-[15px] md:underline-offset-[25px] decoration-white/10">TOGETHER.</span>
               </h4>

               <p className="text-slate-400 text-base md:text-3xl font-light max-w-3xl mx-auto leading-relaxed">
                 Engineering standards confirmed. Ready to initialize your next mission-critical enterprise solution.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 pt-8 md:pt-12">
                 <button 
                   onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                   className="group relative px-12 md:px-20 py-6 md:py-8 bg-white text-slate-950 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-6 md:gap-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] active:scale-95"
                 >
                   Send Message <MessageSquare size={24} className="group-hover:translate-x-3 transition-transform hidden md:block" />
                 </button>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Global HUD Header - Hidden on mobile to prevent overlapping */}
        <div className="absolute top-8 md:top-12 left-8 md:left-12 right-8 md:right-12 flex justify-between items-start z-[250] pointer-events-none">
          <div className="space-y-2 hidden md:block">
             <div className="flex items-center gap-3 text-cyan-500 font-mono text-[9px] tracking-[0.6em] uppercase">
               <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
               SECURE_ARCHIVE_ACTIVE
             </div>
             <h2 className="text-5xl font-display font-black text-white uppercase italic tracking-tighter drop-shadow-2xl">PROJECTS.</h2>
          </div>
          <div className="text-right hidden md:block">
             <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest mb-1">Architecture_v9.2_Core</div>
             <div className="text-[12px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-end gap-3">
               <Globe size={14} className="text-cyan-500" /> GLOBAL_RELAY_UPLINK
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
