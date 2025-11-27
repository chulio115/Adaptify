import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ThemeWave v4 - THE Signature Animation (Elegant Edition)
 * 
 * Slow, smooth, mesmerizing. People will click it 2-3 times
 * just to watch the magic happen again.
 * 
 * Duration: 1.4 seconds - slow enough to appreciate, fast enough to not annoy
 */

// Custom easing for that buttery smooth feel
const ELEGANT_EASE = [0.4, 0, 0.2, 1];
const DURATION = 1.4; // Slow and elegant

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
  const isGoingLight = waveState.targetTheme === 'light';

  return (
    <AnimatePresence>
      {waveState.isAnimating && (
        <>
          {/* ═══════════════════════════════════════════════════════════
              LAYER 1: The New Theme Layer (Revealed by diagonal wipe)
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
                duration: DURATION,
                ease: ELEGANT_EASE,
              },
              opacity: { duration: 0.2, delay: DURATION - 0.2 }
            }}
          />

          {/* ═══════════════════════════════════════════════════════════
              LAYER 2: The Beautiful Glowing Edge
              Wide, soft, and absolutely mesmerizing
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Outer glow - wide and soft */}
            <motion.div
              className="absolute"
              style={{
                width: diagonal,
                height: '200px',
                background: waveState.targetTheme === 'dark'
                  ? `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(6, 182, 212, 0.05) 15%,
                      rgba(6, 182, 212, 0.15) 30%,
                      rgba(124, 58, 237, 0.25) 50%,
                      rgba(6, 182, 212, 0.15) 70%,
                      rgba(6, 182, 212, 0.05) 85%,
                      transparent 100%
                    )`
                  : `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(251, 146, 60, 0.05) 15%,
                      rgba(251, 146, 60, 0.15) 30%,
                      rgba(249, 115, 22, 0.25) 50%,
                      rgba(251, 146, 60, 0.15) 70%,
                      rgba(251, 146, 60, 0.05) 85%,
                      transparent 100%
                    )`,
                filter: 'blur(40px)',
                transformOrigin: 'center center',
                rotate: isGoingLight ? '45deg' : '-135deg',
              }}
              initial={{
                x: isGoingLight ? -diagonal : windowSize.width + 100,
                y: isGoingLight ? windowSize.height + 100 : -diagonal / 2,
              }}
              animate={{
                x: isGoingLight ? windowSize.width + 100 : -diagonal,
                y: isGoingLight ? -diagonal / 2 : windowSize.height + 100,
              }}
              transition={{
                duration: DURATION,
                ease: ELEGANT_EASE,
              }}
            />

            {/* Core glow - the bright center line */}
            <motion.div
              className="absolute"
              style={{
                width: diagonal,
                height: '80px',
                background: waveState.targetTheme === 'dark'
                  ? `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(6, 182, 212, 0.3) 20%,
                      rgba(6, 182, 212, 0.6) 40%,
                      rgba(124, 58, 237, 0.8) 50%,
                      rgba(6, 182, 212, 0.6) 60%,
                      rgba(6, 182, 212, 0.3) 80%,
                      transparent 100%
                    )`
                  : `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(251, 191, 36, 0.3) 20%,
                      rgba(251, 146, 60, 0.6) 40%,
                      rgba(249, 115, 22, 0.8) 50%,
                      rgba(251, 146, 60, 0.6) 60%,
                      rgba(251, 191, 36, 0.3) 80%,
                      transparent 100%
                    )`,
                filter: 'blur(20px)',
                transformOrigin: 'center center',
                rotate: isGoingLight ? '45deg' : '-135deg',
              }}
              initial={{
                x: isGoingLight ? -diagonal : windowSize.width + 100,
                y: isGoingLight ? windowSize.height + 100 : -diagonal / 2,
              }}
              animate={{
                x: isGoingLight ? windowSize.width + 100 : -diagonal,
                y: isGoingLight ? -diagonal / 2 : windowSize.height + 100,
              }}
              transition={{
                duration: DURATION,
                ease: ELEGANT_EASE,
              }}
            />

            {/* Sharp highlight - the crisp edge */}
            <motion.div
              className="absolute"
              style={{
                width: diagonal,
                height: '4px',
                background: waveState.targetTheme === 'dark'
                  ? 'linear-gradient(90deg, transparent 10%, rgba(6, 182, 212, 0.9) 30%, rgba(255, 255, 255, 1) 50%, rgba(124, 58, 237, 0.9) 70%, transparent 90%)'
                  : 'linear-gradient(90deg, transparent 10%, rgba(251, 191, 36, 0.9) 30%, rgba(255, 255, 255, 1) 50%, rgba(249, 115, 22, 0.9) 70%, transparent 90%)',
                filter: 'blur(1px)',
                transformOrigin: 'center center',
                rotate: isGoingLight ? '45deg' : '-135deg',
              }}
              initial={{
                x: isGoingLight ? -diagonal : windowSize.width + 100,
                y: isGoingLight ? windowSize.height + 100 : -diagonal / 2,
              }}
              animate={{
                x: isGoingLight ? windowSize.width + 100 : -diagonal,
                y: isGoingLight ? -diagonal / 2 : windowSize.height + 100,
              }}
              transition={{
                duration: DURATION,
                ease: ELEGANT_EASE,
              }}
            />
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              LAYER 3: Subtle Sparkle Particles
              Fewer, slower, more elegant
              ═══════════════════════════════════════════════════════════ */}
          {[...Array(6)].map((_, i) => {
            const startX = isGoingLight ? 0 : windowSize.width;
            const startY = isGoingLight ? windowSize.height : 0;
            const endX = isGoingLight ? windowSize.width : 0;
            const endY = isGoingLight ? 0 : windowSize.height;
            
            // Spread particles across the wave
            const offset = (i / 6) * 300 - 150;
            const delay = 0.2 + (i * 0.08);
            
            return (
              <motion.div
                key={i}
                className="fixed z-[9999] pointer-events-none"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: waveState.targetTheme === 'dark'
                    ? '0 0 8px #06B6D4, 0 0 16px #7C3AED'
                    : '0 0 8px #FBBF24, 0 0 16px #F97316',
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
                  scale: [0, 1, 0.5, 0],
                  opacity: [0, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: DURATION * 0.8,
                  delay,
                  ease: ELEGANT_EASE,
                }}
              />
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
}
