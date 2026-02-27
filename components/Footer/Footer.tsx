import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Activity, Globe, Terminal, Cpu, ArrowUp } from 'lucide-react';
import Magnetic from '../Common/Magnetic';

const Footer: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);
  
  // Spotlight effect for background glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    
    // Subtle 3D tilt
    setRotate({ x: -x * 8, y: y * 8 });
    
    // Update spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <footer 
      ref={containerRef}
      className="w-full py-8 border-t border-white/5 relative overflow-hidden bg-slate-950 perspective-2000"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      {/* Global Background Spotlight (Full Width) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(6,182,212,0.2), transparent 80%)`
          )
        }}
      />

      {/* Edge-to-Edge Top Scanning Beam (Full Width) */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="w-1/5 h-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_8px_#06b6d4]"
        />
      </div>

      {/* Centered Compact Content Container with 3D Float Animation */}
      <motion.div 
        animate={{ 
          y: [0, -4, 0],
          rotateX: [rotate.x, rotate.x + 0.5, rotate.x],
          rotateY: [rotate.y, rotate.y - 0.5, rotate.y]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ 
          rotateX: rotate.x, 
          rotateY: rotate.y,
          transformStyle: 'preserve-3d',
          z: 50
        }}
        className="max-w-4xl mx-auto w-full px-6 relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          
          {/* Identity Block (Left) */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center font-black text-cyan-500 relative overflow-hidden transition-all group-hover:border-cyan-500/40 shadow-xl">
              <span className="text-[10px] relative z-10">TK</span>
              <motion.div 
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xs font-display font-black tracking-tight text-white uppercase italic leading-none mb-1">Taha Khalid.</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500/40 animate-pulse" />
                <p className="text-[5px] font-mono text-slate-700 uppercase tracking-[0.4em]">SYS_STABLE</p>
              </div>
            </div>
          </div>

          {/* Central Branding Text */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-slate-800" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.5em]">
                ALL RIGHTS RESERVED — TAHA KHALID
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-800" />
            </div>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Status HUD & Scroll Utility (Right) */}
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex flex-col items-end opacity-20">
                <span className="text-[5px] font-mono text-slate-700 uppercase tracking-widest">Global_Sync</span>
                <div className="flex items-center gap-2 text-[7px] font-bold text-slate-400">
                  <Globe size={9} className="text-cyan-500 animate-spin-slow" /> ASIA_NODAL
                </div>
             </div>

             <div className="flex items-center gap-3 opacity-10">
                <Terminal size={12} className="text-slate-400" />
                <Cpu size={12} className="text-slate-400" />
             </div>

             <Magnetic strength={0.4}>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group/top hover:border-cyan-500/30 transition-all bg-slate-900/40 shadow-2xl"
                >
                  <ArrowUp size={16} className="text-slate-700 group-hover/top:text-cyan-500 transition-all" />
                </button>
             </Magnetic>
          </div>
        </div>

        {/* Minimal Branding Strip */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[7px] font-mono text-slate-800 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-4">
            <span className="text-slate-600 font-bold">DIGITAL ARCHIVE v12</span>
            <span className="opacity-20 hidden md:inline">© {new Date().getFullYear()} — STRATEGIC_CORE</span>
          </div>
          
          <div className="flex items-center gap-6 opacity-15">
            <div className="flex items-center gap-1.5">
              <Activity size={8} className="text-emerald-500/50 animate-pulse" />
              <span>NOMINAL</span>
            </div>
            <div className="w-8 h-[1px] bg-slate-800" />
            <span>0x7F2A_UPLINK</span>
          </div>
        </div>
      </motion.div>
      
      {/* Expanded Power Surge Visuals (Full Width Background) */}
      <motion.div 
        animate={{ opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-cyan-500/5 blur-[40px] pointer-events-none"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 {
          perspective: 2000px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}} />
    </footer>
  );
};

export default Footer;