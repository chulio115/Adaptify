import { useState, useEffect, useRef, useCallback } from 'react';
// Note: useEffect is also used by LighthouseBeam component below
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * ThemeToggle - THE Signature Kunstwerk
 * 
 * Features:
 * - Morphing Sun/Moon with ray animations
 * - Triggers the epic clip-path wave transition
 * - Lighthouse Easter Egg (hold for 1 second)
 * - Idle glow pulsing
 * - 60fps, fully accessible
 * 
 * "The one toggle to rule them all"
 */

// Konfetti Particle Component
const ConfettiParticle = ({ emoji, delay, x }) => (
  <motion.div
    className="fixed pointer-events-none text-xl sm:text-2xl z-[9999]"
    style={{ left: `${x}%`, top: -50 }}
    initial={{ y: 0, opacity: 1, rotate: 0 }}
    animate={{ 
      y: '100vh', 
      opacity: 0, 
      rotate: 720,
    }}
    transition={{ 
      duration: 3, 
      delay, 
      ease: 'easeOut' 
    }}
  >
    {emoji}
  </motion.div>
);

// Lighthouse beam component for Easter Egg
const LighthouseBeam = ({ isActive, buttonRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isActive && buttonRef?.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [isActive, buttonRef]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Lighthouse beams - positioned at the toggle */}
          <div 
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Main rotating beam */}
            <motion.div
              className="absolute origin-center"
              style={{
                width: '150vmax',
                height: '6px',
                left: '-75vmax',
                top: '-3px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.3) 20%, rgba(251,191,36,1) 48%, rgba(255,255,255,1) 50%, rgba(251,191,36,1) 52%, rgba(251,191,36,0.3) 80%, transparent 100%)',
                boxShadow: '0 0 30px rgba(251,191,36,0.8), 0 0 60px rgba(251,191,36,0.5)',
                borderRadius: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
            
            {/* Pulsing core glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '80px',
                height: '80px',
                left: '-40px',
                top: '-40px',
                background: 'radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(251,191,36,0.5) 30%, transparent 70%)',
                boxShadow: '0 0 40px rgba(251,191,36,0.9), 0 0 80px rgba(251,191,36,0.6)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 0.5,
                repeat: 3,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [showLighthouse, setShowLighthouse] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [holdProgress, setHoldProgress] = useState(0);
  
  const holdTimerRef = useRef(null);
  const holdStartRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const toggleRef = useRef(null);

  // Subtle glow after 0.8s
  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Spawn confetti for Easter Egg
  const spawnConfetti = useCallback(() => {
    const emojis = ['⚛️', '🚀', '⛵', '✨', '💎', '🎯', '⚡', '🔥'];
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 0.5,
      x: Math.random() * 100,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4000);
  }, []);

  // Long press handling for Lighthouse Easter Egg
  const handlePressStart = useCallback(() => {
    holdStartRef.current = Date.now();
    
    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min(elapsed / 1000, 1);
      setHoldProgress(progress);
    }, 16);
    
    // Trigger lighthouse after 1 second hold
    holdTimerRef.current = setTimeout(() => {
      setShowLighthouse(true);
      spawnConfetti();
      
      // Reset lighthouse after animation
      setTimeout(() => {
        setShowLighthouse(false);
      }, 1500);
    }, 1000);
  }, [spawnConfetti]);

  const handlePressEnd = useCallback((e) => {
    setHoldProgress(0);
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // If held less than 1 second, do normal toggle
    if (holdTimerRef.current) {
      const holdDuration = Date.now() - (holdStartRef.current || Date.now());
      clearTimeout(holdTimerRef.current);
      
      if (holdDuration < 1000 && !showLighthouse) {
        toggleTheme(e);
      }
    }
  }, [toggleTheme, showLighthouse]);

  return (
    <>
      {/* Main Toggle Button - Mobile optimized */}
      <motion.button
        ref={toggleRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); handlePressEnd(null); }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] touch-manipulation"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-checked={!isDark}
        role="switch"
        title="Toggle theme (hold 1s for surprise)"
        whileTap={{ scale: 0.95 }}
      >
        {/* Hold progress ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          style={{ opacity: holdProgress > 0 ? 1 : 0 }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={isDark ? 'rgba(251,191,36,0.6)' : 'rgba(100,116,139,0.5)'}
            strokeWidth="2"
            strokeDasharray={`${holdProgress * 100} 100`}
            style={{ transition: 'stroke-dasharray 0.05s linear' }}
          />
        </svg>

        {/* Outer glow ring - appears after 0.8s */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: showGlow ? 1 : 0, 
            scale: showGlow ? 1.8 : 1,
          }}
          transition={{ duration: 0.7 }}
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(148,163,184,0.2) 0%, transparent 70%)',
          }}
        />
        
        {/* Lighthouse Easter Egg */}
        <LighthouseBeam isActive={showLighthouse} buttonRef={toggleRef} />
        
        {/* Inner container with morphing effect */}
        <motion.div 
          className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center overflow-hidden ${
            isDark 
              ? 'border-amber-400/30 bg-gradient-to-br from-slate-800 to-slate-900' 
              : 'border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200'
          }`}
          animate={{
            scale: isHovered ? 1.08 : 1,
            boxShadow: isHovered 
              ? isDark 
                ? '0 0 24px rgba(251,146,60,0.4), inset 0 0 12px rgba(251,146,60,0.1)' 
                : '0 0 24px rgba(100,116,139,0.3), inset 0 0 12px rgba(100,116,139,0.1)'
              : isDark
                ? 'inset 0 2px 4px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* DARK MODE shows: Glowing Sun */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isDark ? 1 : 0,
              scale: isDark ? 1 : 0.75,
              rotate: isDark ? 0 : 90,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Sun core */}
            <motion.div 
              className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-red-400"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 20px rgba(251,146,60,0.9), 0 0 40px rgba(255,107,107,0.5)' 
                  : '0 0 12px rgba(251,146,60,0.6)',
              }}
            />
            
            {/* Sun rays - animate on hover */}
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
                  opacity: isHovered ? 1 : 0.7,
                  x: '-50%',
                  y: '-50%',
                  rotate: angle,
                  translateY: isHovered ? -12 : -10,
                }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              />
            ))}
          </motion.div>

          {/* LIGHT MODE shows: Crescent Moon */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: !isDark ? 1 : 0,
              scale: !isDark ? 1 : 0.75,
              rotate: !isDark ? 0 : -90,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Moon body */}
            <motion.div 
              className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-500"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 16px rgba(100,116,139,0.5), inset -2px -2px 4px rgba(0,0,0,0.15)' 
                  : 'inset -2px -2px 4px rgba(0,0,0,0.15)',
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-500/50" />
              <div className="absolute bottom-1.5 left-1 w-1 h-1 rounded-full bg-slate-500/40" />
              
              {/* Crescent shadow overlay */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, transparent 30%, rgba(51,65,85,0.6) 100%)',
                }}
              />
            </motion.div>
            
            {/* Twinkling stars */}
            {[
              { x: -8, y: -10, size: 3, delay: 0 },
              { x: 10, y: -6, size: 2, delay: 0.1 },
              { x: -6, y: 8, size: 2, delay: 0.2 },
            ].map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-slate-400"
                style={{ width: star.size, height: star.size }}
                animate={{
                  x: star.x,
                  y: star.y,
                  opacity: isHovered ? [0.4, 1, 0.4] : 0,
                  scale: isHovered ? [0.8, 1.2, 0.8] : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: star.delay,
                  repeat: isHovered ? Infinity : 0,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.button>

      {/* Lighthouse Easter Egg Message */}
      <AnimatePresence>
        {showLighthouse && (
          <motion.div 
            className="fixed top-1/2 left-1/2 z-[9999] px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              boxShadow: '0 0 60px rgba(251,191,36,0.5), 0 0 120px rgba(245,158,11,0.3)',
            }}
            initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            🔦 Lighthouse Mode aktiviert!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((particle) => (
          <ConfettiParticle
            key={particle.id}
            emoji={particle.emoji}
            delay={particle.delay}
            x={particle.x}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
