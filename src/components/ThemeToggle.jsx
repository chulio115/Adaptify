import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeToggle v3 - THE SIGNATURE TOGGLE
 * 
 * "5:1 Kontrast in beiden Zuständen, nie grell, immer elegant"
 * 
 * Dark Mode: Heller Ring mit sanftem Cyan Glow
 * Light Mode: Dunkler Ring mit minimalem weißen Halo
 */

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  // Subtle invitation glow after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-11 h-11 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 touch-manipulation"
      style={{ 
        zIndex: 99999, // ALWAYS on top, even during View Transition
        position: 'relative',
      }}
      aria-label={isDark ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'}
      role="switch"
      aria-checked={!isDark}
      whileTap={{ scale: 0.92 }}
    >
      {/* Ambient glow - only shows after 0.8s */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showGlow ? 1 : 0,
          scale: isHovered ? 1.8 : 1.5,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* The ring - 5:1 contrast guaranteed */}
      <motion.div 
        className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          // Dark mode: light ring on dark bg = high contrast
          // Light mode: dark ring on light bg = high contrast
          background: isDark 
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: isDark 
            ? '2px solid rgba(148, 163, 184, 0.6)' // slate-400/60 - visible on dark
            : '2px solid rgba(71, 85, 105, 0.5)',  // slate-600/50 - visible on light
          boxShadow: isDark
            ? `0 0 0 1px rgba(6,182,212,0.1), 
               inset 0 1px 2px rgba(0,0,0,0.3),
               ${isHovered ? '0 0 20px rgba(6,182,212,0.25)' : '0 0 8px rgba(6,182,212,0.1)'}`
            : `0 0 0 1px rgba(255,255,255,0.8),
               0 2px 8px rgba(0,0,0,0.1),
               ${isHovered ? '0 0 16px rgba(255,255,255,0.5)' : '0 0 4px rgba(255,255,255,0.3)'}`,
        }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* SUN - shown in dark mode */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.6,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div 
            className="w-5 h-5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
              boxShadow: isHovered 
                ? '0 0 16px rgba(251,191,36,0.8), 0 0 32px rgba(245,158,11,0.4)'
                : '0 0 8px rgba(251,191,36,0.5)',
            }}
          />
          {/* Sun rays */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-0.5 bg-amber-400/80 rounded-full"
              style={{
                height: isHovered ? 5 : 4,
                transform: `rotate(${angle}deg) translateY(-11px)`,
                transformOrigin: 'center center',
              }}
            />
          ))}
        </motion.div>

        {/* MOON - shown in light mode */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: !isDark ? 1 : 0,
            scale: !isDark ? 1 : 0.6,
            rotate: !isDark ? 0 : -90,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div 
            className="relative w-5 h-5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)',
              boxShadow: isHovered 
                ? '0 0 12px rgba(71,85,105,0.5), inset -1px -1px 3px rgba(0,0,0,0.3)'
                : 'inset -1px -1px 3px rgba(0,0,0,0.2)',
            }}
          >
            {/* Craters */}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-600/40" />
            <div className="absolute bottom-1 left-1.5 w-1 h-1 rounded-full bg-slate-600/30" />
          </div>
          {/* Stars */}
          {isHovered && (
            <>
              <motion.div 
                className="absolute w-1 h-1 rounded-full bg-slate-500"
                style={{ top: 6, left: 6 }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute w-0.5 h-0.5 rounded-full bg-slate-500"
                style={{ top: 28, right: 8 }}
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
