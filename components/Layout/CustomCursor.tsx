
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [role="button"], .hover-effect');
      setIsHovering(!!hoverable);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="relative flex items-center justify-center"
      >
        {/* Outer Ring */}
        <motion.div
          animate={{
            width: isHovering ? 80 : 32,
            height: isHovering ? 80 : 32,
            borderColor: isHovering ? 'rgba(56, 189, 248, 0.4)' : 'rgba(56, 189, 248, 1)',
            backgroundColor: isHovering ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 0)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="rounded-full border-[1.5px] transition-colors duration-300 backdrop-blur-[2px]"
        />
        
        {/* Inner Dot */}
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          className="absolute w-1.5 h-1.5 bg-primary-400 rounded-full"
        />

        {/* Dynamic Shadow/Glow */}
        <div className="absolute inset-0 blur-xl opacity-20 bg-primary-400 rounded-full w-full h-full scale-150" />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
