import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

/**
 * ThemeWave v5 - THE VIRAL ANIMATION
 * 
 * "I have no idea how they did that... but I need to work with them."
 * 
 * Key insight: Theme switches IMMEDIATELY, wave is pure visual magic.
 * Everything animates together because CSS transitions handle the colors.
 * The wave is just the cherry on top - a radial glow that expands.
 * 
 * Single element. No layers. No bugs. Pure cinema.
 */

export default function ThemeWave() {
  const { waveState, easterEgg } = useTheme();
  const [maxRadius, setMaxRadius] = useState(2000);
  
  // Calculate max radius needed to cover screen from origin
  useEffect(() => {
    if (!waveState.isAnimating) return;
    
    const { origin } = waveState;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Distance to each corner
    const distances = [
      Math.hypot(origin.x, origin.y),                    // top-left
      Math.hypot(w - origin.x, origin.y),                // top-right
      Math.hypot(origin.x, h - origin.y),                // bottom-left
      Math.hypot(w - origin.x, h - origin.y),            // bottom-right
    ];
    
    setMaxRadius(Math.max(...distances) * 1.1);
  }, [waveState.isAnimating, waveState.origin]);

  // Current radius based on progress (with easing applied in render)
  const currentRadius = waveState.progress * maxRadius;
  
  // Colors based on target theme
  const colors = useMemo(() => {
    const isDark = waveState.targetTheme === 'dark';
    return {
      primary: isDark ? 'rgba(6, 182, 212, 0.6)' : 'rgba(251, 146, 60, 0.6)',
      secondary: isDark ? 'rgba(124, 58, 237, 0.4)' : 'rgba(249, 115, 22, 0.4)',
      glow: isDark ? 'rgba(6, 182, 212, 0.3)' : 'rgba(251, 191, 36, 0.3)',
      white: 'rgba(255, 255, 255, 0.9)',
    };
  }, [waveState.targetTheme]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          THE AURORA WAVE - A single, beautiful radial expansion
          ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {waveState.isAnimating && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* OUTER GLOW - wide, soft, visible */}
            <div
              className="absolute rounded-full"
              style={{
                left: waveState.origin.x,
                top: waveState.origin.y,
                width: currentRadius * 2,
                height: currentRadius * 2,
                transform: 'translate(-50%, -50%)',
                background: `
                  radial-gradient(
                    circle,
                    transparent 0%,
                    transparent 75%,
                    ${colors.glow} 82%,
                    ${colors.primary} 90%,
                    ${colors.white} 95%,
                    ${colors.secondary} 98%,
                    transparent 100%
                  )
                `,
                filter: 'blur(12px)',
                opacity: waveState.progress < 0.85 ? 1 : 1 - (waveState.progress - 0.85) * 6.67,
              }}
            />
            
            {/* SHARP CORE - the crisp bright line */}
            <div
              className="absolute rounded-full"
              style={{
                left: waveState.origin.x,
                top: waveState.origin.y,
                width: currentRadius * 2,
                height: currentRadius * 2,
                transform: 'translate(-50%, -50%)',
                background: `
                  radial-gradient(
                    circle,
                    transparent 0%,
                    transparent 92%,
                    ${colors.primary} 95%,
                    ${colors.white} 97%,
                    ${colors.primary} 99%,
                    transparent 100%
                  )
                `,
                opacity: waveState.progress < 0.8 ? 1 : 1 - (waveState.progress - 0.8) * 5,
              }}
            />
            
            {/* INNER FILL - subtle color wash following the wave */}
            <div
              className="absolute rounded-full"
              style={{
                left: waveState.origin.x,
                top: waveState.origin.y,
                width: currentRadius * 2,
                height: currentRadius * 2,
                transform: 'translate(-50%, -50%)',
                background: `
                  radial-gradient(
                    circle,
                    ${colors.glow} 0%,
                    ${colors.glow} 70%,
                    transparent 100%
                  )
                `,
                opacity: waveState.progress < 0.7 ? 0.15 : 0.15 - (waveState.progress - 0.7) * 0.5,
              }}
            />

            {/* Sparkle particles along the ring */}
            {waveState.progress > 0.05 && waveState.progress < 0.95 && (
              [...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 + waveState.progress * Math.PI;
                const x = waveState.origin.x + Math.cos(angle) * currentRadius;
                const y = waveState.origin.y + Math.sin(angle) * currentRadius;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: x,
                      top: y,
                      width: 6,
                      height: 6,
                      transform: 'translate(-50%, -50%)',
                      background: colors.white,
                      boxShadow: `0 0 12px ${colors.primary}, 0 0 24px ${colors.secondary}`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 0.8],
                      opacity: [0, 1, 0.6],
                    }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                  />
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          EASTER EGGS
          ════════════════════════════════════════════════════════════════ */}
      
      {/* 3x Click: Confetti */}
      <AnimatePresence>
        {easterEgg === 'confetti' && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                }}
                initial={{ y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 720 - 360,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: 'easeIn',
                }}
              >
                {['🎉', '✨', '🌟', '⭐', '🎊', '💫'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5x Click: Katamaran Easter Egg */}
      <AnimatePresence>
        {easterEgg === 'katamaran' && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Beautiful ocean gradient background */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #87CEEB 0%, #1E90FF 40%, #006994 100%)',
              }}
            />
            
            {/* Sun */}
            <motion.div
              className="absolute top-20 right-20 w-24 h-24 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FFD700, #FFA500)',
                boxShadow: '0 0 60px rgba(255, 215, 0, 0.8)',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Sailboat emoji as placeholder - in production use actual image */}
            <motion.div
              className="relative z-10 text-9xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
              transition={{ 
                x: { duration: 0.8 },
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              ⛵
            </motion.div>
            
            {/* The tribute text */}
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-white text-2xl font-light tracking-wide drop-shadow-lg">
                Er hat's möglich gemacht.
              </p>
              <p className="text-white/60 text-sm mt-2">
                In loving memory ❤️
              </p>
            </motion.div>

            {/* Waves at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-full"
                style={{
                  background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3))',
                }}
                animate={{ x: [0, -50, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
