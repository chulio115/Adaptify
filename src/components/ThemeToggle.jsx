import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeToggle v2 - THE VIRAL TOGGLE
 * 
 * Clean, simple, beautiful. The magic happens in ThemeWave.
 * Click it and watch the radial aurora expand across the screen.
 * 
 * Easter Eggs (3x, 7x, 11x clicks) are handled by ThemeContext.
 */

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const toggleRef = useRef(null);

  // Subtle invitation glow appears after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      ref={toggleRef}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] touch-manipulation"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-checked={!isDark}
      role="switch"
      title="Toggle theme (click 3x for surprise!)"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer glow ring - subtle invitation */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: showGlow ? 0.6 : 0, 
          scale: showGlow ? 1.6 : 1,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(251,146,60,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
        }}
      />
      
      {/* Inner container */}
      <motion.div 
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
          isDark 
            ? 'border-amber-400/30 bg-gradient-to-br from-slate-800 to-slate-900' 
            : 'border-cyan-400/30 bg-gradient-to-br from-slate-100 to-white'
        }`}
        animate={{
          boxShadow: isHovered 
            ? isDark 
              ? '0 0 24px rgba(251,146,60,0.5), inset 0 0 12px rgba(251,146,60,0.15)' 
              : '0 0 24px rgba(6,182,212,0.4), inset 0 0 12px rgba(6,182,212,0.1)'
            : isDark
              ? 'inset 0 2px 4px rgba(0,0,0,0.3)'
              : '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* SUN icon (visible in dark mode = "click me to get light") */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Sun core */}
          <motion.div 
            className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-orange-500"
            animate={{
              boxShadow: isHovered 
                ? '0 0 20px rgba(251,146,60,0.9), 0 0 40px rgba(255,107,107,0.4)' 
                : '0 0 10px rgba(251,146,60,0.5)',
            }}
          />
          
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute top-1/2 left-1/2 origin-center"
              style={{
                width: '2px',
                background: 'linear-gradient(to top, rgba(251,146,60,0.9), transparent)',
                borderRadius: '2px',
              }}
              animate={{
                height: isHovered ? '6px' : '4px',
                opacity: isHovered ? 1 : 0.6,
                x: '-50%',
                y: '-50%',
                rotate: angle,
                translateY: isHovered ? -12 : -10,
              }}
              transition={{ duration: 0.25, delay: i * 0.015 }}
            />
          ))}
        </motion.div>

        {/* MOON icon (visible in light mode = "click me to get dark") */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: !isDark ? 1 : 0,
            scale: !isDark ? 1 : 0.5,
            rotate: !isDark ? 0 : -180,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Moon body */}
          <motion.div 
            className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400"
            animate={{
              boxShadow: isHovered 
                ? '0 0 16px rgba(100,116,139,0.6), inset -2px -2px 4px rgba(0,0,0,0.2)' 
                : 'inset -2px -2px 4px rgba(0,0,0,0.15)',
            }}
          >
            {/* Moon craters */}
            <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-400/60" />
            <div className="absolute bottom-1.5 left-1 w-1 h-1 rounded-full bg-slate-400/50" />
            
            {/* Crescent shadow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(51,65,85,0.5) 100%)',
              }}
            />
          </motion.div>
          
          {/* Twinkling stars on hover */}
          {[
            { x: -8, y: -10, size: 3, delay: 0 },
            { x: 10, y: -6, size: 2, delay: 0.1 },
            { x: -6, y: 8, size: 2, delay: 0.2 },
          ].map((star, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400"
              style={{ width: star.size, height: star.size }}
              animate={{
                x: star.x,
                y: star.y,
                opacity: isHovered ? [0.3, 1, 0.3] : 0,
                scale: isHovered ? [0.6, 1.2, 0.6] : 0,
              }}
              transition={{
                duration: 1.2,
                delay: star.delay,
                repeat: isHovered ? Infinity : 0,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
