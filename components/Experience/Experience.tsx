import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../../constants';
import ResumeOverlay from '../Resume/ResumeOverlay';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Activity, 
  Cpu,
  Layers,
  ExternalLink,
  Target,
  FileText
} from 'lucide-react';

const ExperienceBlock: React.FC<{ exp: any, index: number }> = ({ exp, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-fit lg:min-h-screen mb-32 lg:mb-64"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
        <div className="w-full lg:w-1/3 relative z-30">
          <div className="sticky top-20 lg:top-32 pt-4 lg:pt-0 space-y-4 md:space-y-8 bg-slate-950/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none pb-6 lg:pb-0">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-widest uppercase"
              >
                <Briefcase size={12} /> Mission Profile 0{index + 1}
              </motion.div>
              
              <h3 className="text-2xl md:text-5xl lg:text-6xl font-display font-black text-white leading-none uppercase tracking-tighter">
                {exp.company}
              </h3>
              
              <div className="flex flex-col gap-1 md:gap-2">
                <p className="text-base md:text-xl lg:text-2xl font-bold text-cyan-400 uppercase tracking-wide">
                  {exp.role}
                </p>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-slate-500 text-[9px] md:text-xs font-mono uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><MapPin size={10} /> {exp.location}</span>
                  <span className="flex items-center gap-1.5 text-indigo-400/80"><Calendar size={10} /> {exp.period}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-sm hidden md:block">
              {exp.description[0]}
            </p>

            <div className="hidden lg:block pt-8 space-y-4">
               <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                  <span>Project Load</span>
                  <span>{exp.projects.length} Segments</span>
               </div>
               <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    style={{ scaleX: scrollYProgress }}
                    className="h-full bg-cyan-500 origin-left shadow-[0_0_10px_#06b6d4]"
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 space-y-8 md:space-y-16 lg:space-y-32 relative z-10 pt-4 lg:pt-0">
          {exp.projects.map((project: any, pIdx: number) => (
            <ProjectCard key={pIdx} project={project} pIdx={pIdx} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: any, pIdx: number }> = ({ project, pIdx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        rotateX, 
        scale,
        opacity,
        y,
        transformStyle: "preserve-3d"
      }}
      className="group relative"
    >
      <div className="p-6 md:p-10 lg:p-12 glass rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-700 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <Layers size={200} />
        </div>

        <div className="relative z-10 space-y-4 md:space-y-6 lg:space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Target size={14} />
                 </div>
                 <h4 className="text-lg md:text-2xl lg:text-3xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
                   {project.name}
                 </h4>
              </div>
              {project.domain && (
                <span className="inline-block text-[8px] md:text-[9px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-2 py-0.5 md:py-1 rounded-full border border-indigo-500/10">
                  {project.domain}
                </span>
              )}
            </div>
            <div className="text-[8px] md:text-[9px] font-mono text-slate-600 uppercase tracking-tighter">
              SEGMENT_ID: 0{pIdx + 1}
            </div>
          </div>

          <p className="text-slate-400 text-xs md:text-base lg:text-lg leading-relaxed font-light">
            {project.details}
          </p>

          <div className="space-y-4">
            <div className="h-[1px] w-10 md:w-12 bg-cyan-500/30" />
            <ul className="grid gap-2.5 md:gap-3">
              {project.bulletPoints.map((bp: string, i: number) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[11px] md:text-sm lg:text-base text-slate-500 flex items-start gap-3 md:gap-4 group/item"
                >
                  <ChevronRight size={14} className="mt-1 text-cyan-500 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                  <span className="group-hover/item:text-slate-200 transition-colors leading-relaxed">{bp}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const [showResume, setShowResume] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const careerX = useTransform(smoothProgress, [0, 1], [-200, 200]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative">
      <AnimatePresence>
        {showResume && <ResumeOverlay onClose={() => setShowResume(false)} />}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center opacity-[0.015]">
           <Cpu size={800} strokeWidth={0.5} />
        </div>
        
        <motion.div 
          style={{ x: careerX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] md:opacity-[0.04]"
        >
          <span className="text-[30vw] font-display font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
            CAREER
          </span>
        </motion.div>
      </div>

      <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-40 space-y-6 md:space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase"
        >
          <Activity size={14} className="animate-pulse" /> Mission History // SDLC_V.9
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-[11rem] font-display font-black tracking-tighter text-white uppercase leading-[0.8] italic"
        >
          Professional <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-white animate-gradient-x">Experience.</span>
        </motion.h2>
        
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-slate-400 max-w-2xl font-light text-sm md:text-xl leading-relaxed"
        >
          A proven track record of architecting enterprise solutions for global markets.
        </motion.p>
      </div>

      <div className="relative z-10">
        {EXPERIENCES.map((exp, index) => (
          <ExperienceBlock key={exp.id} exp={exp} index={index} />
        ))}
      </div>

      {/* FOOTER CTA BOX - FIXED ACTION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 md:mt-40 p-12 md:p-16 glass rounded-[3rem] md:rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 bg-slate-900/40 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
        
        <div className="space-y-6 text-center md:text-left relative z-10">
           <div className="flex justify-center md:justify-start mb-2">
              <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              </div>
           </div>

           <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-none tracking-tight">
              READY FOR THE NEXT <br />
              <span className="text-cyan-400">CHALLENGE?</span>
           </h3>
           <p className="text-slate-400 max-w-md text-sm md:text-lg font-light leading-relaxed">
              My technical architecture is optimized for high-impact enterprise delivery. View my digital CV schematic right.
           </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button 
            onClick={() => setShowResume(true)}
            className="group px-8 md:px-12 py-5 md:py-6 bg-white text-slate-950 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-4 transition-all hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] shadow-2xl active:scale-95"
          >
             <span>ACCESS DIGITAL RESUME</span>
             <FileText size={18} className="transition-transform group-hover:scale-110" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;