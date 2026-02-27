import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  Cpu, 
  Globe, 
  Zap, 
  MousePointer2, 
  Eye, 
  Activity,
  Share2
} from 'lucide-react';
import Background3D from './Background3D';
import Magnetic from '../Common/Magnetic';

// Custom SVG Brand Icons for maximum accuracy
const BrandIcons = {
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
};

const Hero: React.FC = () => {
  const roles = [
    "Senior Full Stack Engineer",
    "Python & TypeScript Architect",
    "Azure-Certified Solutions Developer",
    "Fintech Systems Specialist",
    "Microservices Expert",
    "React & Node.js Innovator"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [viewCount, setViewCount] = useState<number | string>("...");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const statsX = useSpring(useTransform(mouseX, [-500, 500], [-10, 10]), springConfig);
  const statsY = useSpring(useTransform(mouseY, [-500, 500], [-10, 10]), springConfig);

  useEffect(() => {
    const syncGlobalCounter = async () => {
      try {
        const namespace = 'taha_khalid_portfolio_v24';
        const key = 'visits';
        const localFlag = 'taha_portfolio_visited_v24';
        const hasVisited = localStorage.getItem(localFlag);
        
        // Use a public reliable API that works on all hosting platforms (Vercel, Netlify, etc.)
        const endpoint = !hasVisited 
          ? `https://api.counterapi.dev/v1/${namespace}/${key}/up`
          : `https://api.counterapi.dev/v1/${namespace}/${key}`;

        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (data && data.value !== undefined) {
          // Add a base offset to match your current count if needed, 
          // or just use the raw value from the fresh namespace.
          const count = parseInt(data.value);
          setViewCount(count);
          
          if (!hasVisited) {
            localStorage.setItem(localFlag, 'true');
          }
        } else {
          setViewCount("14"); // Fallback to your last known count
        }
      } catch (error) {
        console.error("Counter Uplink Error:", error);
        setViewCount("14"); // Fallback to your last known count
      }
    };

    syncGlobalCounter();

    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [roles.length, mouseX, mouseY]);

  const socialLinks = [
    { 
      id: 'github',
      icon: <BrandIcons.GitHub />, 
      href: "https://github.com/TahaKhalid1", 
      label: "GitHub", 
      color: "hover:border-white hover:bg-white/5",
    },
    { 
      id: 'linkedin',
      icon: <BrandIcons.LinkedIn />, 
      href: "https://www.linkedin.com/in/taha-khalid1/", 
      label: "LinkedIn", 
      color: "hover:border-[#0077b5] hover:bg-[#0077b5]/10",
    },
    { 
      id: 'email',
      icon: <BrandIcons.Mail />, 
      href: "mailto:iamtahaalikhalid@gmail.com", 
      label: "Email", 
      color: "hover:border-[#ea4335] hover:bg-[#ea4335]/10",
    },
    { 
      id: 'whatsapp',
      icon: <BrandIcons.WhatsApp />, 
      href: "https://wa.me/923298378093", 
      label: "Chat", 
      color: "hover:border-[#25d366] hover:bg-[#25d366]/10",
    }
  ];

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-slate-950">
      <Background3D />

      {/* DESKTOP SOCIAL STRIP (LEFT SIDE) */}
      <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-[150] hidden xl:flex flex-col items-center gap-4">
        {socialLinks.map((link, idx) => (
          <Magnetic key={link.id} strength={0.4}>
            <motion.a 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (idx * 0.1), duration: 0.8 }}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-14 h-14 flex items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 pointer-events-auto bg-slate-950/20 backdrop-blur-sm group/link ${link.color}`}
              aria-label={link.label}
            >
              {link.icon}
              <div className="absolute left-20 px-4 py-2 bg-slate-900 border border-white/10 rounded-xl opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">{link.label}</span>
              </div>
            </motion.a>
          </Magnetic>
        ))}
      </div>

      {/* MOBILE SOCIAL HUB (BOTTOM RIGHT) */}
      <div className="fixed right-6 bottom-10 z-[150] flex flex-col items-center xl:hidden">
        <div className="relative flex flex-col-reverse items-center gap-4">
          <motion.button
            layout
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl z-[20] border border-white/10 backdrop-blur-3xl ${
              isMobileExpanded ? 'bg-white text-slate-950 rotate-90' : 'bg-slate-900/60 text-white'
            }`}
          >
             {isMobileExpanded ? <X size={24} strokeWidth={3} /> : <Share2 size={24} />}
          </motion.button>

          <AnimatePresence>
            {isMobileExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.8 }}
                className="flex flex-col gap-3 p-2 glass rounded-full border border-white/5 bg-slate-950/40"
              >
                {socialLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white bg-slate-900/40"
                  >
                    {link.icon}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col items-center text-center pt-24 pb-12">
        {/* Identity Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-4 px-7 py-3.5 rounded-full border border-cyan-500/30 bg-slate-950/40 backdrop-blur-xl text-cyan-400 text-[10px] md:text-[11px] font-mono tracking-[0.4em] uppercase relative overflow-hidden shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_12px_#06b6d4]"></span>
            </span>
            <span className="relative z-10">Global Ready — Available for New Opportunities</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 px-5 py-2 glass rounded-full border border-white/5 text-slate-400 font-mono text-[9px] tracking-widest uppercase"
          >
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-cyan-400" />
              <span className="text-white font-bold">{typeof viewCount === 'number' ? viewCount.toLocaleString() : viewCount}</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10 mx-1" />
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-emerald-400 animate-pulse" />
              <span className="text-[8px] opacity-60">LIVE_GLOBAL_UPLINK</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div className="relative mb-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[11rem] font-display font-black leading-[0.85] tracking-tighter text-white select-none relative z-10"
          >
            TAHA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-500 animate-gradient-x">
              KHALID
            </span>
          </motion.h1>
        </motion.div>

        {/* Roles */}
        <div className="space-y-6 mb-16 flex flex-col items-center">
          <motion.div className="h-10 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-3xl font-mono font-bold text-cyan-400 flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                {roles[roleIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light"
          >
            Orchestrating <span className="text-white font-medium border-b border-cyan-500/30 pb-1">complex ecosystems</span> with 
            7+ years of architectural excellence in global Fintech and Cloud infrastructure.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-8 items-center mb-24"
        >
          <Magnetic strength={0.4}>
            <button 
              onClick={handleScrollToProjects}
              className="group relative px-10 py-5 md:px-12 md:py-6 bg-white text-slate-950 rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] overflow-hidden shadow-2xl hover:shadow-cyan-500/40 transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                PROJECTS <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </span>
            </button>
          </Magnetic>
          
          <Magnetic strength={0.4}>
            <button 
              onClick={handleScrollToContact}
              className="px-10 py-5 md:px-12 md:py-6 glass rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] border border-white/10 text-white hover:bg-white/5 transition-all shadow-xl"
            >
              Contact Engineer
            </button>
          </Magnetic>
        </motion.div>

        {/* Stats */}
        <motion.div 
          style={{ x: statsX, y: statsY }}
          className="hidden lg:grid grid-cols-3 gap-1 relative p-1.5 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl overflow-hidden group/stats"
        >
          {[
            { value: "07+", label: "Years Experience", icon: <Cpu className="w-4 h-4" /> },
            { value: "50+", label: "Enterprise Deploys", icon: <Zap className="w-4 h-4" /> },
            { value: "100%", label: "Uptime Commitment", icon: <Globe className="w-4 h-4" /> }
          ].map((stat, i) => (
            <div key={i} className={`p-10 text-left min-w-[240px] relative group overflow-hidden ${i !== 2 ? 'border-r border-white/10' : ''}`}>
              <div className="relative z-10 space-y-4">
                <div className="text-cyan-500 opacity-60 flex justify-between items-center">
                  {stat.icon}
                  <span className="text-[9px] font-mono opacity-40">SYS_MOD_{i+1}</span>
                </div>
                <p className="text-4xl font-display font-black text-white group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.5em] font-mono text-cyan-400">System_Active</span>
          <MousePointer2 className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="w-[1.5px] h-16 bg-gradient-to-b from-cyan-500 via-cyan-500/20 to-transparent rounded-full"></div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-60"></div>
    </div>
  );
};

export default Hero;