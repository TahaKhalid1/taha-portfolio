import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SKILLS } from '../../constants';
import { Activity, Cpu } from 'lucide-react';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const ecosystemX = useTransform(smoothProgress, [0, 1], [-200, 200]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative py-24">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          style={{ x: ecosystemX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] md:opacity-[0.04]"
        >
          <span className="text-[30vw] font-display font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
            ECOSYSTEM
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col items-center text-center mb-40 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase"
        >
          <Activity size={14} className="animate-pulse" /> TECHNICAL_ECOSYSTEM_v9.2
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[11rem] font-display font-black tracking-tighter text-white uppercase leading-[0.8] italic"
        >
          Full-Stack <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-white animate-gradient-x">Arsenal.</span>
        </motion.h2>
        
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-slate-400 max-w-2xl font-light text-lg md:text-xl leading-relaxed"
        >
          A battle-tested technology stack refined through 7+ years of building secure, scalable, and complex enterprise ecosystems.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative z-10">
        {SKILLS.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03, type: "spring", stiffness: 300, damping: 20 }}
            className="group relative p-6 glass rounded-[2rem] border border-white/5 flex flex-col items-center justify-between text-center min-h-[200px] overflow-hidden"
          >
            {/* Spotlight Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-indigo-500/0 group-hover:from-cyan-500/5 group-hover:to-indigo-500/5 transition-all duration-500" />
            
            <div className="relative z-10 space-y-4 flex flex-col items-center w-full">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center p-3 group-hover:bg-white/10 transition-all duration-500 shadow-inner">
                {skill.logo ? (
                  <img 
                    src={skill.logo} 
                    alt={`${skill.name} logo`} 
                    className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-cyan-400 text-xs font-mono">LOGO</div>
                )}
              </div>
              <div className="w-full">
                <h3 className="font-display font-bold text-white text-sm md:text-base tracking-tight group-hover:text-cyan-400 transition-colors truncate">
                  {skill.name}
                </h3>
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{skill.category}</span>
              </div>
            </div>

            <div className="w-full space-y-1.5 relative z-10 pt-4">
              <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                <span>Expertise</span>
                <span className="text-cyan-500/70">{skill.level}%</span>
              </div>
              <div className="w-full h-[1.5px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 group-hover:shadow-[0_0_10px_#06b6d4] transition-shadow"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;