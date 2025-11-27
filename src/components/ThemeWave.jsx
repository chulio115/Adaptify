import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ThemeWave v6 - THE SIGNATURE ANIMATION
 * 
 * "Der Kreis frisst buchstäblich den alten Modus weg"
 * 
 * How it works:
 * 1. Theme switches IMMEDIATELY (new theme visible underneath)
 * 2. This overlay shows the OLD theme with clip-path: circle(160%)
 * 3. Circle SHRINKS from 160% to 0% - revealing new theme
 * 4. Subtle glow trail at the edge (2px, 20% opacity)
 * 
 * Result: The wave "eats" the old mode as it expands outward.
 * Actually, we INVERT it - the overlay shrinks, revealing the new theme.
 * 
 * Wait no - let me re-read the spec...
 * "clip-path: circle(0% at 92% 40px) → circle(160% at 92% 40px)"
 * "Innerhalb des Kreises = Ziel-Theme"
 * 
 * So the INSIDE of the circle is the NEW theme. 
 * The overlay should be the NEW theme, expanding over the old.
 * 
 * Actually simplest: Theme switches, overlay with OLD theme colors 
 * has clip-path that goes from 160% -> 0% (shrinking away).
 * 
 * OR: Overlay with NEW theme colors, clip-path 0% -> 160% (expanding).
 * This is cleaner. Let's do this.
 */

export default function ThemeWave() {
  const { waveState, easterEgg, WAVE_DURATION } = useTheme();

  // Colors for the overlay based on what we're transitioning TO
  const isGoingDark = waveState.previousTheme === 'light';
  
  // The overlay shows the NEW theme
  const overlayBg = isGoingDark ? '#0a0a0a' : '#FAFBFC';
  const glowColor = isGoingDark 
    ? 'rgba(6, 182, 212, 0.2)' // cyan glow for dark
    : 'rgba(251, 146, 60, 0.2)'; // orange glow for light

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          THE CLIP-PATH WAVE
          One div. No layers. Pure cinema.
          ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {waveState.isAnimating && (
          <>
            {/* Main expanding circle - shows NEW theme */}
            <motion.div
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{
                backgroundColor: overlayBg,
                clipPath: `circle(0% at ${waveState.originX}% ${waveState.originY}px)`,
              }}
              animate={{
                clipPath: `circle(160% at ${waveState.originX}% ${waveState.originY}px)`,
              }}
              transition={{
                duration: WAVE_DURATION / 1000,
                ease: [0.4, 0.0, 0.2, 1.02], // slight overshoot
              }}
            />
            
            {/* Glow trail at the edge - 2px, 20% opacity */}
            <motion.div
              className="fixed inset-0 z-[9999] pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${waveState.originX}% ${waveState.originY}px, 
                  transparent 0%, 
                  transparent calc(var(--radius) - 4px),
                  ${glowColor} calc(var(--radius) - 2px),
                  white calc(var(--radius)),
                  ${glowColor} calc(var(--radius) + 2px),
                  transparent calc(var(--radius) + 4px)
                )`,
                '--radius': '0%',
              }}
              animate={{
                '--radius': '160%',
              }}
              transition={{
                duration: WAVE_DURATION / 1000,
                ease: [0.4, 0.0, 0.2, 1.02],
              }}
            />
          </>
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
