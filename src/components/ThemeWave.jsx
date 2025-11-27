import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * ThemeWave v9 - MOBILE OPTIMIZED
 * 
 * KEY INSIGHT: No solid overlay! Just the GLOWING RING.
 * 
 * Mobile optimizations:
 * - Fewer Matrix columns on mobile (25 vs 50)
 * - Smaller lighthouse core
 * - Performance-conscious animations
 */

export default function ThemeWave() {
  const { waveState, easterEgg, WAVE_DURATION } = useTheme();
  const [ringProgress, setRingProgress] = useState(0);
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

  // Animate the ring expanding outward (desktop only)
  useEffect(() => {
    if (isMobile) {
      setRingProgress(0);
      return;
    }
    if (!waveState.isAnimating) {
      setRingProgress(0);
      return;
    }
    
    const startTime = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / WAVE_DURATION, 1);
      // Smooth easing with slight overshoot
      const eased = progress < 1 
        ? 1 - Math.pow(1 - progress, 3)
        : 1;
      setRingProgress(eased * 180); // 180% to cover full screen from corner
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [waveState.isAnimating, WAVE_DURATION, isMobile]);

  // Glow colors based on which theme we're going TO
  const isGoingDark = waveState.previousTheme === 'light';
  
  // Cyan/teal for dark mode, warm orange for light mode
  const colors = isGoingDark ? {
    outer: 'rgba(6, 182, 212, 0.15)',
    mid: 'rgba(6, 182, 212, 0.4)',
    core: 'rgba(34, 211, 238, 0.8)',
    bright: 'rgba(255, 255, 255, 0.9)',
  } : {
    outer: 'rgba(251, 146, 60, 0.15)',
    mid: 'rgba(251, 146, 60, 0.4)',
    core: 'rgba(251, 191, 36, 0.8)',
    bright: 'rgba(255, 255, 255, 0.9)',
  };

  // Current theme (for Matrix visibility tuning)
  const isLightTheme =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('light');

  // Fade out near the end – slightly stronger on mobile so the effect reads better
  const baseRingOpacity = ringProgress > 150 
    ? Math.max(0, 1 - (ringProgress - 150) / 30)
    : ringProgress < 5 
      ? ringProgress / 5 
      : 1;
  const ringOpacity = isMobile
    ? Math.min(1, baseRingOpacity * 1.25)
    : baseRingOpacity;

  // On mobile we skip all custom visuals (no wave, no Easter Eggs) for performance and simplicity
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          THE GLOWING RING - Pure visual magic, no blocking overlay
          ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {waveState.isAnimating && ringProgress > 0 && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Subtle dimming on mobile so the wave is visible without blocking content */}
            {isMobile && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, transparent 80%)',
                  opacity: ringOpacity * 0.7,
                }}
              />
            )}

            {/* Wide outer glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(
                  circle at ${waveState.originX}px ${waveState.originY}px,
                  transparent 0%,
                  transparent ${Math.max(0, ringProgress - 15)}%,
                  ${colors.outer} ${Math.max(0, ringProgress - 8)}%,
                  ${colors.mid} ${Math.max(0, ringProgress - 3)}%,
                  ${colors.core} ${ringProgress}%,
                  ${colors.mid} ${ringProgress + 3}%,
                  ${colors.outer} ${ringProgress + 8}%,
                  transparent ${ringProgress + 15}%
                )`,
                opacity: ringOpacity,
              }}
            />
            
            {/* Sharp bright core line */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(
                  circle at ${waveState.originX}px ${waveState.originY}px,
                  transparent 0%,
                  transparent ${Math.max(0, ringProgress - 1)}%,
                  ${colors.bright} ${ringProgress}%,
                  transparent ${ringProgress + 1}%
                )`,
                opacity: ringOpacity * 0.85,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          EASTER EGGS
          ════════════════════════════════════════════════════════════════ */}
      
      {/* 3x Click: Lighthouse Mode - MOBILE OPTIMIZED */}
      <AnimatePresence>
        {easterEgg === 'lighthouse' && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Rotating beam from toggle position */}
            <motion.div
              className="absolute origin-center"
              style={{
                left: waveState.originX,
                top: waveState.originY,
                width: '200vmax',
                height: isMobile ? '4px' : '6px',
                marginLeft: '-100vmax',
                marginTop: isMobile ? '-2px' : '-3px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.3) 20%, rgba(251,191,36,1) 48%, white 50%, rgba(251,191,36,1) 52%, rgba(251,191,36,0.3) 80%, transparent 100%)',
                boxShadow: isMobile ? '0 0 20px rgba(251,191,36,0.5)' : '0 0 30px rgba(251,191,36,0.6)',
                borderRadius: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
            
            {/* Pulsing core - smaller on mobile */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: waveState.originX,
                top: waveState.originY,
                width: isMobile ? 40 : 60,
                height: isMobile ? 40 : 60,
                marginLeft: isMobile ? -20 : -30,
                marginTop: isMobile ? -20 : -30,
                background: 'radial-gradient(circle, #FBBF24, #F59E0B)',
                boxShadow: isMobile ? '0 0 25px rgba(251,191,36,0.7)' : '0 0 40px rgba(251,191,36,0.8)',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.4, repeat: 3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5x Click: Matrix Rain - MOBILE & THEME OPTIMIZED (Dark vs Light tuned) */}
      <AnimatePresence>
        {easterEgg === 'matrix' && (
          <motion.div
            className="fixed inset-0 z-[10000] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              // Semi-transparent, theme-friendly overlay so the page stays visible
              background: isLightTheme
                ? 'radial-gradient(circle at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.08) 85%)'
                : 'radial-gradient(circle at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 40%, transparent 85%)',
              backdropFilter: 'blur(2px)',
            }}
          >
            {/* Matrix rain columns - fewer on mobile for performance */}
            {[...Array(isMobile ? 20 : 50)].map((_, i) => {
              const columnCount = isMobile ? 20 : 50;
              const speed = 1.5 + Math.random() * 2;
              const delay = Math.random() * 2;
              const chars = [...Array(isMobile ? 20 : 30)].map(() => 
                String.fromCharCode(0x30A0 + Math.random() * 96)
              ).join('');
              
              return (
                <motion.div
                  key={i}
                  className="absolute font-mono text-[10px] sm:text-sm whitespace-pre leading-none"
                  style={{
                    left: `${(i / columnCount) * 100}%`,
                    // Use theme accent cyan instead of neon green
                    color: 'var(--accent-cyan)',
                    textShadow: isMobile
                      ? (isLightTheme
                          ? '0 0 10px rgba(6,182,212,0.9), 0 0 18px rgba(0,0,0,0.6)'
                          : '0 0 8px var(--accent-cyan), 0 0 15px rgba(0,0,0,0.8)')
                      : (isLightTheme
                          ? '0 0 14px rgba(6,182,212,1), 0 0 26px rgba(0,0,0,0.75)'
                          : '0 0 10px var(--accent-cyan), 0 0 22px var(--accent-cyan), 0 0 32px rgba(0,0,0,0.9)'),
                    writingMode: 'vertical-rl',
                    opacity: (isLightTheme ? 0.7 : 0.45) + Math.random() * (isLightTheme ? 0.25 : 0.35),
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
            
            {/* Brighter "lead" characters - fewer on mobile */}
            {[...Array(isMobile ? 10 : 20)].map((_, i) => {
              const leadCount = isMobile ? 10 : 20;
              return (
                <motion.div
                  key={`lead-${i}`}
                  className="absolute font-mono text-base sm:text-lg font-bold"
                  style={{
                    left: `${(i / leadCount) * 100 + Math.random() * 2}%`,
                    // Lead characters in secondary accent (maps to violet/coral in light mode)
                    color: 'var(--accent-violet)',
                    textShadow: isMobile
                      ? (isLightTheme
                          ? '0 0 18px rgba(124,58,237,0.95), 0 0 26px rgba(0,0,0,0.7)'
                          : '0 0 15px var(--accent-violet), 0 0 25px rgba(0,0,0,0.85)')
                      : (isLightTheme
                          ? '0 0 24px rgba(124,58,237,1), 0 0 44px rgba(0,0,0,0.85)'
                          : '0 0 22px var(--accent-violet), 0 0 42px rgba(0,0,0,0.9)'),
                  }}
                  initial={{ y: -50 }}
                  animate={{ y: '120vh' }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </motion.div>
              );
            })}
            
            {/* Center glow pulse */}
            <motion.div 
              className="absolute inset-0"
              style={{
                // Soft theme-colored center glow instead of hard green
                background:
                  'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 60%)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Scanline effect - subtle on mobile */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isMobile 
                  ? 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px)'
                  : 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              }}
            />
            
            {/* Vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                // Slightly softer vignette so content stays visible
                background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
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
