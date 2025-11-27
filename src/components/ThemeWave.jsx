import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * ThemeWave v8 - THE REDDIT KARMA ANIMATION
 * 
 * KEY INSIGHT: No solid overlay! Just the GLOWING RING.
 * 
 * The magic:
 * 1. Theme switches IMMEDIATELY (CSS class change)
 * 2. All elements have CSS transitions on their colors (in index.css)
 * 3. The glowing ring EXPANDS from the toggle - pure visual candy
 * 4. Ring = the "wavefront" of the color change
 * 
 * Content stays 100% visible. Colors transition smoothly via CSS.
 * The ring is just the cherry on top - the "wow" factor.
 */

export default function ThemeWave() {
  const { waveState, easterEgg, WAVE_DURATION } = useTheme();
  const [ringProgress, setRingProgress] = useState(0);

  // Animate the ring expanding outward
  useEffect(() => {
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
  }, [waveState.isAnimating, WAVE_DURATION]);

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

  // Fade out near the end
  const ringOpacity = ringProgress > 150 
    ? Math.max(0, 1 - (ringProgress - 150) / 30)
    : ringProgress < 5 
      ? ringProgress / 5 
      : 1;

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
            {/* Wide outer glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(
                  circle at ${waveState.originX}% ${waveState.originY}px,
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
                  circle at ${waveState.originX}% ${waveState.originY}px,
                  transparent 0%,
                  transparent ${Math.max(0, ringProgress - 1)}%,
                  ${colors.bright} ${ringProgress}%,
                  transparent ${ringProgress + 1}%
                )`,
                opacity: ringOpacity * 0.8,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          EASTER EGGS
          ════════════════════════════════════════════════════════════════ */}
      
      {/* 3x Click: Lighthouse Mode */}
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
                left: `${waveState.originX}%`,
                top: waveState.originY,
                width: '200vmax',
                height: '6px',
                marginLeft: '-100vmax',
                marginTop: '-3px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.3) 20%, rgba(251,191,36,1) 48%, white 50%, rgba(251,191,36,1) 52%, rgba(251,191,36,0.3) 80%, transparent 100%)',
                boxShadow: '0 0 30px rgba(251,191,36,0.6)',
                borderRadius: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
            
            {/* Pulsing core */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: `${waveState.originX}%`,
                top: waveState.originY,
                width: 60,
                height: 60,
                marginLeft: -30,
                marginTop: -30,
                background: 'radial-gradient(circle, #FBBF24, #F59E0B)',
                boxShadow: '0 0 40px rgba(251,191,36,0.8)',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.4, repeat: 3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5x Click: Matrix Rain */}
      <AnimatePresence>
        {easterEgg === 'matrix' && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0, 0, 0, 0.9)' }}
          >
            {/* Matrix rain columns */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 text-green-500 font-mono text-sm whitespace-pre leading-tight"
                style={{
                  left: `${(i / 30) * 100}%`,
                  textShadow: '0 0 8px #00ff00, 0 0 16px #00ff00',
                  writingMode: 'vertical-rl',
                }}
                initial={{ y: '-100%' }}
                animate={{ y: '100vh' }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 1,
                  repeat: 2,
                  ease: 'linear',
                }}
              >
                {[...Array(20)].map(() => 
                  String.fromCharCode(0x30A0 + Math.random() * 96)
                ).join('')}
              </motion.div>
            ))}
            
            {/* Center glow */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,0,0.1) 0%, transparent 50%)',
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
            
            {/* Sailboat - larger, more detailed */}
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
              <span className="text-[120px] sm:text-[180px] filter drop-shadow-2xl">⛵</span>
            </motion.div>
            
            {/* Animated waves */}
            <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
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
