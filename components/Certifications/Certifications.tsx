import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CERTIFICATIONS } from '../../constants';
import { ShieldCheck, Award, Activity, Fingerprint, Zap } from 'lucide-react';

// Use React.FC to correctly handle component props in JSX, ensuring reserved props like 'key' are recognized by the TypeScript compiler.
const CertificationCard: React.FC<{ cert: any, index: number }> = ({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="p-8 md:p-10 glass rounded-[2.5rem] border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden shadow-2xl h-full flex flex-col">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          <Award size={120} strokeWidth={1} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px] font-mono text-cyan-500 uppercase tracking-[0.4em]">Verified</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>
              <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest">CREDENTIAL_0{index + 1}</h3>
            </div>
          </div>

          <div className="flex-grow space-y-4">
            <h4 className="text-2xl md:text-3xl font-display font-black text-white leading-tight uppercase italic group-hover:text-cyan-400 transition-colors">
              {cert.name}
            </h4>
            
            <div className="space-y-1">
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">
                {cert.issuer}
              </p>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                <Zap size={10} className="text-cyan-500/50" /> Issued: {cert.date}
              </div>
            </div>
          </div>

          <div className="pt-10 mt-auto flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />
               <span className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors uppercase tracking-widest">Status: active_uplink</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/5 group-hover:bg-cyan-500/30 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const certsX = useTransform(smoothProgress, [0, 1], [-200, 200]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden pb-40">
      {/* Parallax Background Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          style={{ x: certsX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] md:opacity-[0.04]"
        >
          <span className="text-[25vw] font-display font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
            CERTIFIED
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-32 space-y-8 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase shadow-[0_0_25px_rgba(6,182,212,0.1)]"
          >
            <Activity size={14} className="animate-pulse" /> CREDENTIAL_AUTHENTICATION_v.8
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-display font-black tracking-tighter text-white uppercase leading-[0.8] italic"
          >
            Verified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-white animate-gradient-x">Expertise.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl font-light text-lg md:text-xl leading-relaxed"
          >
            Global certifications validating specialized mastery in enterprise application ecosystems and modern engineering paradigms.
          </motion.p>
        </div>

        {/* Tactical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={cert.name} cert={cert} index={index} />
          ))}

          {/* Decorative Corner Brackets (Section Level) */}
          <div className="absolute -top-12 -left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-500/20 hidden lg:block" />
          <div className="absolute -bottom-12 -right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-500/20 hidden lg:block" />
        </div>

        {/* Global Security Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-10 glass rounded-[3rem] border border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-8 relative z-10">
            <div className="relative">
              <Fingerprint size={100} className="text-cyan-500/10 animate-pulse group-hover:text-cyan-500/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]" />
              </div>
            </div>
            <div className="space-y-2">
               <h4 className="text-xl md:text-3xl font-display font-black text-white uppercase tracking-tighter italic">Technical Integrity Verified</h4>
               <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-lg">All credentials confirmed via official third-party authorities including IBM and Udemy.</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 opacity-40">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Relay Uplink</span>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              <div className="w-24 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;