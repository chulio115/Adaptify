import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ThemeWave v3 - THE Signature Animation
 * 
 * "Live Color Wipe" - A luminous wave sweeps across the screen,
 * transforming colors in real-time while content stays visible.
 * 
 * Technical magic:
 * - Dual-layer rendering (both themes exist)
 * - Diagonal wave clip-path reveals new theme
 * - Glowing edge creates the "magic" feel
 * - Content is ALWAYS visible, only colors change
 */

export default function ThemeWave() {
  const { waveState } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate diagonal distance for full coverage
  const diagonal = Math.sqrt(
    windowSize.width * windowSize.width + 
    windowSize.height * windowSize.height
  ) * 1.5;

  // Wave direction based on theme change
  // Dark → Light: wave from bottom-left to top-right (sunrise feel)
  // Light → Dark: wave from top-right to bottom-left (sunset feel)
  const isGoingLight = waveState.targetTheme === 'light';

  return (
    <AnimatePresence>
      {waveState.isAnimating && (
        <>
          {/* ═══════════════════════════════════════════════════════════
              LAYER 1: The New Theme Layer
              This sits on top and gets revealed by the wave clip-path
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            className="fixed inset-0 z-[9997] pointer-events-none"
            style={{
              backgroundColor: waveState.targetTheme === 'dark' ? '#0a0a0a' : '#FAFBFC',
            }}
            initial={{ 
              clipPath: isGoingLight 
                ? 'polygon(0% 100%, 0% 100%, 0% 100%)' 
                : 'polygon(100% 0%, 100% 0%, 100% 0%)'
            }}
            animate={{ 
              clipPath: isGoingLight
                ? 'polygon(-50% 150%, 150% -50%, 150% 150%, -50% 150%)'
                : 'polygon(150% -50%, -50% 150%, -50% -50%, 150% -50%)'
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              clipPath: {
                duration: 0.8,
                ease: [0.45, 0, 0.15, 1], // Smooth, elegant easing
              },
              opacity: { duration: 0.15, delay: 0.7 }
            }}
          />

          {/* ═══════════════════════════════════════════════════════════
              LAYER 2: The Glowing Wave Edge
              This creates the magical "light passing through" effect
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {/* The glowing diagonal line */}
            <motion.div
              className="absolute"
              style={{
                width: diagonal,
                height: '120px',
                background: waveState.targetTheme === 'dark'
                  ? `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(6, 182, 212, 0.1) 20%,
                      rgba(6, 182, 212, 0.4) 40%,
                      rgba(124, 58, 237, 0.6) 50%,
                      rgba(6, 182, 212, 0.4) 60%,
                      rgba(6, 182, 212, 0.1) 80%,
                      transparent 100%
                    )`
                  : `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(251, 146, 60, 0.1) 20%,
                      rgba(251, 146, 60, 0.4) 40%,
                      rgba(249, 115, 22, 0.6) 50%,
                      rgba(251, 146, 60, 0.4) 60%,
                      rgba(251, 146, 60, 0.1) 80%,
                      transparent 100%
                    )`,
                filter: 'blur(30px)',
                transformOrigin: 'center center',
                rotate: isGoingLight ? '45deg' : '-135deg',
              }}
              initial={{
                x: isGoingLight ? -diagonal : windowSize.width,
                y: isGoingLight ? windowSize.height : -diagonal / 2,
              }}
              animate={{
                x: isGoingLight ? windowSize.width : -diagonal,
                y: isGoingLight ? -diagonal / 2 : windowSize.height,
              }}
              transition={{
                duration: 0.8,
                ease: [0.45, 0, 0.15, 1],
              }}
            />

            {/* Secondary glow for extra depth */}
            <motion.div
              className="absolute"
              style={{
                width: diagonal,
                height: '60px',
                background: waveState.targetTheme === 'dark'
                  ? 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), rgba(124, 58, 237, 0.9), rgba(6, 182, 212, 0.8), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.8), rgba(249, 115, 22, 0.9), rgba(251, 191, 36, 0.8), transparent)',
                filter: 'blur(8px)',
                transformOrigin: 'center center',
                rotate: isGoingLight ? '45deg' : '-135deg',
              }}
              initial={{
                x: isGoingLight ? -diagonal : windowSize.width,
                y: isGoingLight ? windowSize.height : -diagonal / 2,
              }}
              animate={{
                x: isGoingLight ? windowSize.width : -diagonal,
                y: isGoingLight ? -diagonal / 2 : windowSize.height,
              }}
              transition={{
                duration: 0.8,
                ease: [0.45, 0, 0.15, 1],
              }}
            />
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              LAYER 3: Sparkle Particles
              Small light particles that ride along the wave
              ═══════════════════════════════════════════════════════════ */}
          {[...Array(12)].map((_, i) => {
            const startX = isGoingLight ? 0 : windowSize.width;
            const startY = isGoingLight ? windowSize.height : 0;
            const endX = isGoingLight ? windowSize.width : 0;
            const endY = isGoingLight ? 0 : windowSize.height;
            
            // Distribute particles along the wave
            const offset = (i / 12) * 200 - 100;
            const delay = i * 0.03;
            
            return (
              <motion.div
                key={i}
                className="fixed z-[9999] pointer-events-none"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: waveState.targetTheme === 'dark' ? '#06B6D4' : '#FBBF24',
                  boxShadow: waveState.targetTheme === 'dark'
                    ? '0 0 12px #06B6D4, 0 0 24px #7C3AED, 0 0 36px #06B6D4'
                    : '0 0 12px #FBBF24, 0 0 24px #F97316, 0 0 36px #FBBF24',
                }}
                initial={{
                  x: startX + (isGoingLight ? offset : -offset),
                  y: startY + (isGoingLight ? -offset : offset),
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: endX + (isGoingLight ? offset : -offset),
                  y: endY + (isGoingLight ? -offset : offset),
                  scale: [0, 1.5, 1, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay,
                  ease: [0.45, 0, 0.15, 1],
                }}
              />
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
}
