import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * ThemeWave v10 - CLEAN TRANSITION
 * 
 * PHILOSOPHY: The View Transitions API does the heavy lifting.
 * We only provide Easter Eggs - NO distracting rings or overlays.
 * 
 * The dark/light transition is SEAMLESS - one theme "eats" the other
 * via a clean clip-path circle animation.
 */

export default function ThemeWave() {
  const { easterEgg } = useTheme();
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  ));

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Current theme (for Matrix visibility tuning)
  const isLightTheme =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('light');

  // waveState from context for Easter Egg positioning
  const { waveState } = useTheme();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          NO RING - The View Transitions API handles the seamless transition!
          Dark "eats" light (or vice versa) with a clean clip-path circle.
          ════════════════════════════════════════════════════════════════ */}

      {/* ════════════════════════════════════════════════════════════════
          EASTER EGGS
          ════════════════════════════════════════════════════════════════ */}
      
      {/* 3x Click: Lighthouse Mode - PERFORMANCE OPTIMIZED */}
      <AnimatePresence>
        {easterEgg === 'lighthouse' && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Rotating beam - simplified for mobile */}
            <motion.div
              className="absolute"
              style={{
                left: waveState.originX,
                top: waveState.originY,
                width: '200vmax',
                height: isMobile ? '3px' : '5px',
                marginLeft: '-100vmax',
                marginTop: isMobile ? '-1.5px' : '-2.5px',
                background: isMobile 
                  ? 'linear-gradient(90deg, transparent 0%, #FBBF24 45%, white 50%, #FBBF24 55%, transparent 100%)'
                  : 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.3) 20%, rgba(251,191,36,1) 48%, white 50%, rgba(251,191,36,1) 52%, rgba(251,191,36,0.3) 80%, transparent 100%)',
                // Simplified shadow on mobile
                boxShadow: isMobile ? 'none' : '0 0 20px rgba(251,191,36,0.5)',
                willChange: 'transform',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: 'linear' }}
            />
            
            {/* Pulsing core - smaller and simpler on mobile */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: waveState.originX,
                top: waveState.originY,
                width: isMobile ? 30 : 50,
                height: isMobile ? 30 : 50,
                marginLeft: isMobile ? -15 : -25,
                marginTop: isMobile ? -15 : -25,
                background: '#FBBF24',
                boxShadow: isMobile ? '0 0 15px #FBBF24' : '0 0 30px rgba(251,191,36,0.8)',
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.3, repeat: 3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5x Click: Matrix Rain - HEAVILY OPTIMIZED FOR MOBILE */}
      <AnimatePresence>
        {easterEgg === 'matrix' && (
          <motion.div
            className="fixed inset-0 z-[10000] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              // Simple dark overlay - NO blur on mobile (performance killer)
              background: isLightTheme
                ? 'rgba(0,0,0,0.5)'
                : 'rgba(0,0,0,0.7)',
              // Only use backdrop blur on desktop
              backdropFilter: isMobile ? 'none' : 'blur(2px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(2px)',
            }}
          >
            {/* Matrix rain columns - DRASTICALLY reduced on mobile */}
            {[...Array(isMobile ? 8 : 40)].map((_, i) => {
              const columnCount = isMobile ? 8 : 40;
              const speed = 2 + Math.random() * 1.5;
              const delay = Math.random() * 1.5;
              // Shorter strings on mobile
              const chars = [...Array(isMobile ? 12 : 25)].map(() => 
                String.fromCharCode(0x30A0 + Math.random() * 96)
              ).join('');
              
              return (
                <motion.div
                  key={i}
                  className="absolute font-mono whitespace-pre leading-none"
                  style={{
                    left: `${(i / columnCount) * 100}%`,
                    fontSize: isMobile ? '10px' : '14px',
                    color: '#06B6D4',
                    // SIMPLIFIED text-shadow on mobile (single shadow vs multiple)
                    textShadow: isMobile
                      ? '0 0 8px #06B6D4'
                      : '0 0 10px #06B6D4, 0 0 20px #06B6D4',
                    writingMode: 'vertical-rl',
                    opacity: 0.6 + Math.random() * 0.3,
                    willChange: 'transform',
                  }}
                  initial={{ y: '-100%' }}
                  animate={{ y: '120vh' }}
                  transition={{
                    duration: speed,
                    delay: delay,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {chars}
                </motion.div>
              );
            })}
            
            {/* Lead characters - MUCH fewer on mobile */}
            {!isMobile && [...Array(15)].map((_, i) => (
              <motion.div
                key={`lead-${i}`}
                className="absolute font-mono text-lg font-bold"
                style={{
                  left: `${(i / 15) * 100 + Math.random() * 2}%`,
                  color: '#8B5CF6',
                  textShadow: '0 0 15px #8B5CF6, 0 0 30px #8B5CF6',
                  willChange: 'transform',
                }}
                initial={{ y: -50 }}
                animate={{ y: '120vh' }}
                transition={{
                  duration: 2.5 + Math.random(),
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </motion.div>
            ))}
            
            {/* Center glow - only on desktop */}
            {!isMobile && (
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 50%)',
                }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Vignette - simplified */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.5) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7x Click: Katamaran - NUR Animation, KEIN Text */}
      <AnimatePresence>
        {easterEgg === 'katamaran' && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ocean gradient */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #87CEEB 0%, #4A90C2 30%, #1E6091 60%, #0D3B66 100%)',
              }}
            />
            
            {/* Sun with rays */}
            <motion.div
              className="absolute top-16 right-16 sm:top-20 sm:right-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            >
              <div 
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #FFE066 0%, #FFD700 50%, #FFA500 100%)',
                  boxShadow: '0 0 80px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.4)',
                }}
              />
            </motion.div>
            
            {/* Sailboat - polished, stylized */}
            <motion.div
              className="relative z-10"
              initial={{ x: '-100vw' }}
              animate={{ 
                x: '0vw',
                y: [0, -15, 0, -10, 0],
              }}
              transition={{ 
                x: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <div className="relative w-32 h-24 sm:w-44 sm:h-32">
                {/* Hull */}
                <div
                  className="absolute bottom-0 rounded-full"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '24px',
                    background: 'linear-gradient(90deg, #0f172a, #1e293b)',
                    boxShadow: '0 12px 28px rgba(15,23,42,0.7)',
                  }}
                />

                {/* Mast */}
                <div
                  className="absolute bg-slate-100/90"
                  style={{
                    left: '50%',
                    bottom: '24px',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '72px',
                    boxShadow: '0 0 10px rgba(255,255,255,0.9)',
                  }}
                />

                {/* Main sail */}
                <div
                  className="absolute"
                  style={{
                    left: '50%',
                    bottom: '24px',
                    transform: 'translateX(-6px)',
                    width: 0,
                    height: 0,
                    borderLeft: '0 solid transparent',
                    borderRight: '60px solid transparent',
                    borderBottom: '110px solid rgba(248,250,252,0.98)',
                    filter: 'drop-shadow(0 0 16px rgba(248,250,252,0.9))',
                  }}
                />

                {/* Accent sail */}
                <div
                  className="absolute"
                  style={{
                    left: '50%',
                    bottom: '24px',
                    transform: 'translateX(-40px)',
                    width: 0,
                    height: 0,
                    borderLeft: '40px solid transparent',
                    borderRight: '0 solid transparent',
                    borderBottom: '85px solid rgba(56,189,248,0.9)',
                    filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.8))',
                  }}
                />

                {/* Subtle reflection on waterline */}
                <div
                  className="absolute rounded-full bg-white/50 blur-sm"
                  style={{
                    left: '50%',
                    bottom: '0px',
                    transform: 'translateX(-50%)',
                    width: '72%',
                    height: '8px',
                  }}
                />
              </div>
            </motion.div>
            
            {/* Animated waves */}
            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 overflow-hidden">
              <motion.div
                className="absolute bottom-0 w-[200%] h-full"
                style={{
                  background: `
                    repeating-linear-gradient(
                      90deg,
                      rgba(255,255,255,0.1) 0px,
                      rgba(255,255,255,0.3) 50px,
                      rgba(255,255,255,0.1) 100px
                    )
                  `,
                }}
                animate={{ x: [0, -100] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute bottom-0 w-full h-20"
                style={{
                  background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15))',
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            
            {/* Subtle clouds */}
            <motion.div
              className="absolute top-10 left-10 w-32 h-12 rounded-full bg-white/20 blur-xl"
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-24 left-1/3 w-24 h-8 rounded-full bg-white/15 blur-lg"
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
