import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const BrandIcons = {
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'ABOUT', id: 'about' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'EXPERIENCE', id: 'experience' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'EDUCATION', id: 'education' },
    { name: 'CERTIFICATIONS', id: 'certifications' },
  ];

  const socialLinks = [
    { icon: <BrandIcons.GitHub />, href: "https://github.com/TahaKhalid1" },
    { icon: <BrandIcons.LinkedIn />, href: "https://www.linkedin.com/in/taha-khalid1/" },
    { icon: <BrandIcons.Mail />, href: "mailto:iamtahaalikhalid@gmail.com" },
    { icon: <BrandIcons.WhatsApp />, href: "https://wa.me/923298378093" }
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl px-4 md:px-6 py-2 rounded-full border border-white/10 transition-all duration-700 backdrop-blur-2xl shadow-2xl ${
          scrolled 
            ? 'bg-slate-950/95 border-white/20' 
            : 'bg-slate-950/50 border-white/5'
        }`}
      >
        {/* Logo Section */}
        <button 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-4 group shrink-0 outline-none"
        >
          <div className="relative w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-black text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:shadow-cyan-400/80 transition-all duration-500">
            <span className="text-sm">TK</span>
          </div>
          <span className="text-base font-display font-bold tracking-tight text-white hidden lg:block group-hover:text-cyan-400 transition-colors">
            TAHA KHALID
          </span>
        </button>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className="relative text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-slate-400 hover:text-white transition-all duration-300 py-2 group outline-none"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-cyan-500 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_#06b6d4]" />
            </button>
          ))}
        </div>

        {/* Action Button Section */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-cyan-500 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            HIRE ME <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>
          
          <button 
            aria-label="Toggle Menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950/98 backdrop-blur-3xl pointer-events-auto flex flex-col items-center justify-center p-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full text-center">
              {navLinks.map((link, idx) => (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-4xl font-display font-black text-white hover:text-cyan-400 transition-colors uppercase tracking-widest outline-none"
                >
                  {link.name}
                </motion.button>
              ))}
              
              <div className="w-20 h-[1px] bg-white/20 my-4" />
              
              {/* Mobile Socials in Menu */}
              <div className="flex gap-6">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="w-12 h-12 glass rounded-full flex items-center justify-center text-white"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full max-w-xs py-5 rounded-full bg-white text-slate-950 font-black text-center text-sm uppercase tracking-[0.2em] shadow-xl outline-none"
              >
                HIRE ME NOW
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;