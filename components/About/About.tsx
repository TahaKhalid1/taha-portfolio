import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Cloud, 
  Terminal, 
  Monitor, 
  Fingerprint, 
  Target, 
  Trophy, 
  Activity, 
  Database, 
  CircleDot 
} from 'lucide-react';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;
    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end);
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}{value.includes('+') ? '+' : (value.includes('%') ? '%' : '')}</>;
};

const ExpertiseModule = ({ 
  title, 
  id, 
  icon: Icon, 
  colorClass, 
  borderColor, 
  capabilities,
  children,
  index 
}: { 
  title: string, 
  id: string, 
  icon: any, 
  colorClass: string, 
  borderColor: string, 
  capabilities: string[],
  children?: React.ReactNode,
  index: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative p-6 md:p-8 glass rounded-[2.5rem] border-l-4 ${borderColor} bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-500 overflow-hidden shadow-2xl h-full flex flex-col`}
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">REF_{id}</span>
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className={`p-3.5 rounded-2xl bg-white/5 ${colorClass} group-hover:bg-white/10 transition-colors`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-display font-black text-white uppercase tracking-widest">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
             <div className={`h-1 w-8 rounded-full ${colorClass.replace('text-', 'bg-')} opacity-30`} />
             <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">{id}</span>
          </div>
        </div>
      </div>

      <div className="text-slate-300 text-[11px] md:text-xs lg:text-[13px] leading-relaxed font-light mb-6 flex-grow space-y-2">
        {children}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-6 border-t border-white/5">
        {capabilities.map((cap, i) => (
          <div key={i} className="flex items-center gap-2">
            <CircleDot size={6} className={`${colorClass} opacity-50 shrink-0`} />
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest truncate">{cap}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const overviewX = useTransform(smoothProgress, [0, 1], [-200, 200]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden pb-40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          style={{ x: overviewX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] md:opacity-[0.04]"
        >
          <span className="text-[30vw] font-display font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
            OVERVIEW
          </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cinematic Header */}
        <div className="flex flex-col items-center text-center mb-40 space-y-8 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-mono tracking-[0.5em] uppercase"
          >
            <Activity size={14} className="animate-pulse" /> CAREER_SPECIFICATION_v12.0
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[11rem] font-display font-black tracking-tighter text-white uppercase leading-[0.8] italic"
          >
            Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-white animate-gradient-x">Overview.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl font-light text-lg md:text-xl leading-relaxed"
          >
            A strategic deep-dive into a 7-year trajectory of technical leadership, architectural rigor, and complex system orchestration.
          </motion.p>
        </div>

        {/* Unified Symmetric Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch relative">
          
          {/* First Row: Core Narrative Module (Full Width) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 p-8 md:p-12 glass rounded-[3.5rem] border border-white/5 bg-slate-900/40 relative overflow-hidden flex flex-col gap-8 shadow-2xl"
          >
            <div className="space-y-8 relative max-w-5xl">
              <div className="absolute -left-12 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
              <h3 className="text-2xl md:text-4xl text-slate-100 font-light leading-tight">
                I am <span className="text-white font-bold">Taha Khalid</span>. A Senior Full Stack Engineer with <span className="text-cyan-400 font-bold underline underline-offset-8 decoration-cyan-400/20">07 Years</span> of excellence.
              </h3>
              <div className="space-y-4">
                <p className="text-base md:text-lg text-slate-400 leading-relaxed font-light">
                  I specialize in architecting and orchestrating high-performance enterprise ecosystems. My journey is defined by a deep commitment to engineering integrity, bridging robust backend services with sophisticated frontend architectures for global fintech and mortgage sectors.
                </p>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed font-light">
                  My professional ethos is centered on technical leadership and digital transformation. I drive innovation by aligning complex engineering requirements with strategic business objectives, ensuring that every deployment sets a benchmark for security, speed, and long-term maintainability. I thrive in high-stakes environments where reliability and architectural foresight are paramount, building scalable solutions that empower multi-million dollar industries.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
              <div className="group flex items-center gap-4 p-5 glass rounded-[1.5rem] border border-white/5 hover:border-cyan-500/20 transition-all bg-slate-950/20">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[8px] mb-1">Status</h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Azure Developer</p>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 p-5 glass rounded-[1.5rem] border border-white/5 hover:border-indigo-500/20 transition-all bg-slate-950/20">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[8px] mb-1">Leadership</h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Engineering Lead</p>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-1" />

              <div className="hidden lg:flex justify-end pr-4">
                 <div className="relative">
                    <Fingerprint size={80} className="text-cyan-500/10 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-cyan-500/15 font-mono text-[8px] tracking-[0.4em] uppercase rotate-90 translate-x-10">CORE_ACTIVE</span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Expanded Tech Cards with Detailed Stack Text */}
          <ExpertiseModule 
            index={0}
            id="MOD_BE_01" 
            title="Backend Architecture" 
            icon={Terminal} 
            colorClass="text-cyan-400" 
            borderColor="border-cyan-500/50"
            capabilities={[".NET 8 Core", "Node.js / Nest", "Python (Flask/Django)", "Java Spring", "PHP / Laravel", "Microservices", "Docker & K8s", "Event Sourcing"]}
          >
            I architect mission-critical systems using <span className="text-white font-bold">.NET 8, Node.js, and Java</span>. My focus is on high-concurrency and security for global fintech applications, utilizing <span className="text-white font-bold">Python (Flask, Django)</span> for data-heavy tasks and <span className="text-white font-bold">PHP (Laravel)</span> for rapid enterprise delivery. I leverage <span className="text-white font-bold">Microservices</span> and containerized <span className="text-white font-bold">Docker</span> environments to ensure absolute system reliability.
          </ExpertiseModule>

          <ExpertiseModule 
            index={1}
            id="MOD_FE_02" 
            title="Frontend Development" 
            icon={Monitor} 
            colorClass="text-emerald-400" 
            borderColor="border-emerald-500/50"
            capabilities={["Next.js / React", "Angular 17", "Vue.js SPA", "HTML5 / SCSS", "Tailwind CSS", "Bootstrap / MUI", "TypeScript Core", "Framer Motion"]}
          >
            I build high-performance interfaces using <span className="text-white font-bold">Next.js, Angular, and Vue.js</span>. I prioritize <span className="text-white font-bold">State Management (Redux/NgRx)</span> and seamless motion design. Every build is optimized with <span className="text-white font-bold">HTML5 / CSS3 / SCSS / Tailwind CSS</span>, featuring expert integration of &nbsp; <span className="text-white font-bold">Bootstrap / Material UI</span> &nbsp; to maintain architectural consistency across scalable design systems.
          </ExpertiseModule>

          <ExpertiseModule 
            index={2}
            id="MOD_CL_04" 
            title="Cloud Architecture" 
            icon={Cloud} 
            colorClass="text-blue-400" 
            borderColor="border-blue-500/50"
            capabilities={["Azure PaaS", "CI/CD Pipelines", "App Insights", "Azure Functions", "Key Vault", "Logic Apps", "Cloud Governance", "IaC (Bicep)"]}
          >
            As a <span className="text-white font-bold">Microsoft Certified Azure Developer</span>, I design and deploy resilient cloud-native solutions via <span className="text-white font-bold">Azure App Services, Functions, and Logic Apps</span>. I focus on automated <span className="text-white font-bold">CI/CD Pipelines (Azure DevOps)</span> and centralized security orchestration using <span className="text-white font-bold">Key Vault</span> to ensure zero-downtime operational agility.
          </ExpertiseModule>

          <ExpertiseModule 
            index={3}
            id="MOD_DT_03" 
            title="Data & Messaging" 
            icon={Database} 
            colorClass="text-purple-400" 
            borderColor="border-purple-500/50"
            capabilities={["MS SQL Server", "MongoDB Atlas", "Azure Cosmos DB", "RabbitMQ / Bus", "Redis Caching", "Entity Framework", "Data Auditing", "ElasticSearch"]}
          >
            Expertise in <span className="text-white font-bold">MS SQL Server, MongoDB Atlas, and Cosmos DB</span> paradigms. I optimize high-velocity data flows using <span className="text-white font-bold">RabbitMQ and Azure Service Bus</span>, leveraging <span className="text-white font-bold">Redis Caching</span> and <span className="text-white font-bold">Entity Framework Core</span> to ensure high data integrity and performance in complex multi-client fintech environments.
          </ExpertiseModule>

          <div className="lg:col-span-2">
            <ExpertiseModule 
              index={4}
              id="MOD_LD_05" 
              title="Leadership & Strategic Delivery" 
              icon={ShieldCheck} 
              colorClass="text-amber-400" 
              borderColor="border-amber-500/50"
              capabilities={["Technical Mentoring", "Agile Orchestration", "Code Integrity", "Strategic Planning", "Project Governance", "Client Relations", "Risk Mitigation", "SDLC Optimization"]}
            >
              I lead cross-functional teams to deliver <span className="text-white font-bold">End-to-End Enterprise Solutions</span>. My leadership spans <span className="text-white font-bold">Technical Mentorship</span>, <span className="text-white font-bold">Agile Orchestration (Scrum/Kanban)</span>, and high-level <span className="text-white font-bold">Strategic Planning</span>. I ensure technical excellence through rigorous <span className="text-white font-bold">Code Reviews</span> and <span className="text-white font-bold">SDLC Optimization</span> for multi-million dollar digital transformations.
            </ExpertiseModule>
          </div>

        </div>

        {/* Impact Summary Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative min-h-[400px] flex items-center justify-center mt-32"
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.01]">
            <Fingerprint size={600} strokeWidth={0.5} className="text-white animate-pulse" />
          </div>

          <div className="relative z-10 w-full max-w-6xl">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
              <div className="space-y-12">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border border-cyan-500/20 text-cyan-400 text-[10px] md:text-[11px] font-mono tracking-[0.5em] uppercase">
                    <Target size={16} /> Mission Integrity
                  </div>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.05] italic group">
                    "I transform business goals into <br />
                    <span className="relative inline-block text-cyan-400 overflow-hidden">
                      technical reality
                      <motion.span 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                      />
                    </span> <br />
                    through excellence."
                  </h3>
                </motion.div>
                <div className="flex items-center gap-8 text-slate-500 font-mono text-[11px] tracking-[0.3em] uppercase">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-950 bg-slate-900 flex items-center justify-center shadow-lg">
                         <ShieldCheck size={20} className="text-cyan-500" />
                       </div>
                     ))}
                   </div>
                   <span>Verified Enterprise Stack // Global Standards</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                 <motion.div 
                   whileHover={{ scale: 1.02, x: 8 }}
                   className="p-12 glass rounded-[3rem] border border-white/10 relative overflow-hidden group shadow-2xl"
                 >
                    <div className="absolute top-0 right-0 p-10 text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors">
                      <Trophy size={100} />
                    </div>
                    <div className="relative z-10 flex items-end gap-4 mb-6">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-white group-hover:text-cyan-400 transition-colors duration-500">
                        <Counter value="07+" />
                      </div>
                      <div className="mb-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-2">XP_CYCLES</div>
                        <div className="w-12 h-[2px] bg-cyan-500" />
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.3em] leading-relaxed">
                      Engineering Excellence <br /> across U.S. Markets
                    </p>
                 </motion.div>

                 <motion.div 
                   whileHover={{ scale: 1.02, x: 8 }}
                   className="p-12 glass rounded-[3rem] border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden group shadow-2xl"
                 >
                    <div className="absolute top-0 right-0 p-10 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors">
                      <Activity size={100} />
                    </div>
                    <div className="relative z-10 flex items-end gap-4 mb-6">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-white group-hover:text-indigo-400 transition-colors duration-500">
                        <Counter value="100%" />
                      </div>
                      <div className="mb-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mb-2">REQ_SUCCESS</div>
                        <div className="w-12 h-[2px] bg-indigo-500" />
                      </div>
                    </div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.3em] leading-relaxed">
                      Project Integrity & <br /> End-to-End Commitment
                    </p>
                 </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;