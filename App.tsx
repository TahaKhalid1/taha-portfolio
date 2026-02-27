import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Layout/Navbar';
import Preloader from './components/Layout/Preloader';
import CustomCursor from './components/Layout/CustomCursor';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const SectionWrapper: React.FC<{ children: React.ReactNode, id: string, className?: string }> = ({ children, id, className = "" }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <motion.section
      id={id}
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.98 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: isMobile ? "-5% 0px" : "-10% 0px" }}
      transition={{ 
        duration: isMobile ? 0.8 : 1.2, 
        ease: [0.16, 1, 0.3, 1],
        delay: isMobile ? 0 : 0.1
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (loading) return;

    // Only initialize Lenis on desktop for better mobile performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const resizeTimer = setTimeout(() => {
      lenis.resize();
    }, 500);

    return () => {
      lenis.destroy();
      clearTimeout(resizeTimer);
    };
  }, [loading]);

  return (
    <div className="relative selection:bg-cyan-500/30">
      <CustomCursor />
      
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-500 origin-left z-[200] shadow-[0_0_10px_#06b6d4]"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-950 text-slate-100 min-h-screen w-full relative"
          >
            <Navbar />
            
            <SectionWrapper id="hero">
              <Hero />
            </SectionWrapper>

            <SectionWrapper id="about" className="py-20 lg:py-32">
              <About />
            </SectionWrapper>

            <SectionWrapper id="skills" className="py-20 relative overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-600/5 rounded-full blur-[120px] hidden md:block animate-blob"></div>
              <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-600/5 rounded-full blur-[120px] hidden md:block animate-blob animation-delay-2000"></div>
              <Skills />
            </SectionWrapper>

            <SectionWrapper id="experience" className="py-20 bg-slate-900/30">
              <Experience />
            </SectionWrapper>

            <div id="projects">
              <Projects />
            </div>

            <SectionWrapper id="education" className="py-20 relative">
              <Education />
            </SectionWrapper>

            <SectionWrapper id="certifications" className="py-20 bg-slate-900/30">
              <Certifications />
            </SectionWrapper>

            <SectionWrapper id="contact" className="py-20">
              <Contact />
            </SectionWrapper>

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;