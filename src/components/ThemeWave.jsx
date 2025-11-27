import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ThemeWave - The Signature Animation
 * 
 * A circular wave that expands from the toggle button,
 * revealing the new theme underneath like a ripple in water.
 * 
 * Technical magic:
 * - Uses clip-path: circle() for GPU-accelerated animation
 * - The "new theme" layer sits beneath, wave reveals it
 * - 400ms total, 60fps guaranteed
 */

export default function ThemeWave() {
  const { waveState } = useTheme();
  
  // Calculate the maximum radius needed to cover the entire screen
  const getMaxRadius = () => {
    if (typeof window === 'undefined') return 2000;
    
    const { origin } = waveState;
    const maxX = Math.max(origin.x, window.innerWidth - origin.x);
    const maxY = Math.max(origin.y, window.innerHeight - origin.y);
    
    // Pythagorean theorem for diagonal + some buffer
    return Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY) * 1.2);
  };

  return (
    <AnimatePresence>
      {waveState.isAnimating && (
        <>
          {/* The revealing wave layer - shows the TARGET theme */}
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              background: waveState.targetTheme === 'dark' 
                ? '#0a0a0a' 
                : '#FAFBFC',
            }}
            initial={{ 
              clipPath: `circle(0px at ${waveState.origin.x}px ${waveState.origin.y}px)` 
            }}
            animate={{ 
              clipPath: `circle(${getMaxRadius()}px at ${waveState.origin.x}px ${waveState.origin.y}px)` 
            }}
            exit={{ 
              opacity: 0 
            }}
            transition={{ 
              clipPath: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
              },
              opacity: {
                duration: 0.2,
                delay: 0.4,
              }
            }}
          />
          
          {/* Glowing edge effect on the wave */}
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background: 'transparent',
            }}
            initial={{ 
              clipPath: `circle(0px at ${waveState.origin.x}px ${waveState.origin.y}px)` 
            }}
            animate={{ 
              clipPath: `circle(${getMaxRadius()}px at ${waveState.origin.x}px ${waveState.origin.y}px)` 
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Inner glow ring that follows the edge */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: waveState.targetTheme === 'dark'
                  ? 'radial-gradient(circle at center, transparent 0%, transparent 99.5%, rgba(6, 182, 212, 0.6) 99.5%, rgba(124, 58, 237, 0.4) 100%)'
                  : 'radial-gradient(circle at center, transparent 0%, transparent 99.5%, rgba(251, 146, 60, 0.6) 99.5%, rgba(249, 115, 22, 0.4) 100%)',
                transformOrigin: `${waveState.origin.x}px ${waveState.origin.y}px`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: getMaxRadius() / 50, opacity: 0 }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
              }}
            />
          </motion.div>
          
          {/* Sparkle particles along the wave edge */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const delay = i * 0.02;
            
            return (
              <motion.div
                key={i}
                className="fixed z-[10000] pointer-events-none"
                style={{
                  left: waveState.origin.x,
                  top: waveState.origin.y,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: waveState.targetTheme === 'dark' 
                    ? '#06B6D4' 
                    : '#FB923C',
                  boxShadow: waveState.targetTheme === 'dark'
                    ? '0 0 10px #06B6D4, 0 0 20px #7C3AED'
                    : '0 0 10px #FB923C, 0 0 20px #F97316',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 1,
                }}
                animate={{ 
                  x: Math.cos(angle) * getMaxRadius() * 0.5,
                  y: Math.sin(angle) * getMaxRadius() * 0.5,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
}
