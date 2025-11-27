import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ThemeToggle - Premium Dark/Light Mode Toggle
 * 
 * Features:
 * - Shows SUN in dark mode (click to go light)
 * - Shows MOON in light mode (click to go dark)
 * - Wave transition (Cyan → Coral) sweeping across screen
 * - Mobile optimized with touch feedback
 * - Easter Egg: Alt+Click oder 3x schneller Klick
 * - Subtle "invitation" animation on first load
 */

// Konfetti Particle Component
const ConfettiParticle = ({ emoji, delay, x }) => (
  <div
    className="fixed pointer-events-none text-xl sm:text-2xl z-[9999]"
    style={{
      left: `${x}%`,
      top: '-50px',
      animation: `confetti-fall 3s ease-out ${delay}s forwards`,
    }}
  >
    {emoji}
  </div>
);

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [showInvite, setShowInvite] = useState(false); // Subtle "try me" animation
  
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);
  const toggleRef = useRef(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('adaptify-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    
    if (!shouldBeDark) {
      document.documentElement.classList.add('light');
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('adaptify-theme')) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('light', !e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Subtle glow after 0.8s
  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Subtle "invitation" effect after 2s - only once per session
  useEffect(() => {
    const hasSeenInvite = sessionStorage.getItem('adaptify-theme-invite');
    if (!hasSeenInvite) {
      const timer = setTimeout(() => {
        setShowInvite(true);
        sessionStorage.setItem('adaptify-theme-invite', 'true');
        setTimeout(() => setShowInvite(false), 1500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Spawn confetti for Easter Egg
  const spawnConfetti = useCallback(() => {
    const emojis = ['⚛️', '🚀', '⛵', '✨', '💎', '🎯', '⚡'];
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 0.5,
      x: Math.random() * 100,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4000);
  }, []);

  // Handle the actual theme toggle with wave animation
  const toggleTheme = useCallback((e) => {
    // Easter Egg: Alt+Click
    if (e.altKey) {
      setShowEasterEgg(true);
      spawnConfetti();
      setTimeout(() => setShowEasterEgg(false), 3000);
      return;
    }

    // Easter Egg: Triple click detection
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setShowEasterEgg(true);
      spawnConfetti();
      setTimeout(() => setShowEasterEgg(false), 3000);
      return;
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 400);

    // Wave transition animation
    setIsTransitioning(true);
    
    // Create wave overlay
    const wave = document.createElement('div');
    wave.className = 'theme-wave-overlay';
    document.body.appendChild(wave);

    // Toggle theme after wave starts
    setTimeout(() => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      document.documentElement.classList.toggle('light', !newIsDark);
      localStorage.setItem('adaptify-theme', newIsDark ? 'dark' : 'light');
    }, 150);
    
    // Clean up wave
    setTimeout(() => {
      wave.remove();
      setIsTransitioning(false);
    }, 600);
  }, [isDark, spawnConfetti]);

  return (
    <>
      {/* Main Toggle Button - Mobile optimized */}
      <button
        ref={toggleRef}
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 150)}
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-95 transition-transform touch-manipulation"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title="Toggle theme (Alt+Click for surprise)"
      >
        {/* Outer glow ring - appears after 0.8s */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            showGlow ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(148,163,184,0.2) 0%, transparent 70%)',
            transform: showGlow ? 'scale(1.8)' : 'scale(1)',
            animation: showGlow ? 'glow-pulse 2.5s ease-in-out infinite' : 'none',
          }}
        />

        {/* Invitation pulse ring - once per session */}
        {showInvite && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${isDark ? 'rgba(251,146,60,0.6)' : 'rgba(148,163,184,0.5)'}`,
              animation: 'invite-pulse 1.5s ease-out forwards',
            }}
          />
        )}
        
        {/* Inner container */}
        <div 
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
            isDark 
              ? 'border-amber-400/30 bg-gradient-to-br from-slate-800 to-slate-900' 
              : 'border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200'
          }`}
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            boxShadow: isHovered 
              ? isDark 
                ? '0 0 24px rgba(251,146,60,0.4), inset 0 0 12px rgba(251,146,60,0.1)' 
                : '0 0 24px rgba(100,116,139,0.3), inset 0 0 12px rgba(100,116,139,0.1)'
              : isDark
                ? 'inset 0 2px 4px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* DARK MODE shows: Glowing Sun (click to go light) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
            }`}
          >
            {/* Sun core */}
            <div 
              className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-red-400"
              style={{
                boxShadow: isHovered 
                  ? '0 0 16px rgba(251,146,60,0.9), 0 0 32px rgba(255,107,107,0.5)' 
                  : '0 0 10px rgba(251,146,60,0.6)',
              }}
            />
            
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 origin-center transition-all duration-300"
                style={{
                  width: '2px',
                  height: isHovered ? '5px' : '3px',
                  background: `linear-gradient(to top, rgba(251,146,60,${isHovered ? 1 : 0.7}), transparent)`,
                  borderRadius: '2px',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${isHovered ? '-10px' : '-8px'})`,
                  transitionDelay: `${i * 20}ms`,
                }}
              />
            ))}
          </div>

          {/* LIGHT MODE shows: Shadow Moon (click to go dark) */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              !isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
            }`}
          >
            {/* Moon body */}
            <div 
              className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-slate-400 to-slate-500"
              style={{
                boxShadow: isHovered 
                  ? '0 0 12px rgba(100,116,139,0.5), inset -2px -2px 4px rgba(0,0,0,0.15)' 
                  : 'inset -2px -2px 4px rgba(0,0,0,0.15)',
              }}
            >
              {/* Moon craters */}
              <div className="absolute top-1 right-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-500/50" />
              <div className="absolute bottom-1.5 left-1 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500/40" />
              
              {/* Moon shadow (crescent effect) */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, transparent 30%, rgba(51,65,85,0.6) 100%)',
                }}
              />
            </div>
            
            {/* Stars around moon - appear on hover */}
            <div 
              className="absolute w-1 h-1 rounded-full bg-slate-400 transition-all duration-300"
              style={{
                top: '5px',
                right: '7px',
                opacity: isHovered ? 0.8 : 0,
                transform: isHovered ? 'scale(1)' : 'scale(0)',
              }}
            />
            <div 
              className="absolute w-0.5 h-0.5 rounded-full bg-slate-400 transition-all duration-300"
              style={{
                bottom: '7px',
                left: '6px',
                opacity: isHovered ? 0.6 : 0,
                transform: isHovered ? 'scale(1)' : 'scale(0)',
                transitionDelay: '50ms',
              }}
            />
          </div>
        </div>
        
        {/* Transition shimmer effect */}
        {isTransitioning && (
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              background: isDark 
                ? 'linear-gradient(90deg, transparent, rgba(255,107,107,0.6), rgba(6,182,212,0.4), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(100,116,139,0.5), rgba(148,163,184,0.3), transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 0.4s linear',
            }}
          />
        )}
      </button>

      {/* Easter Egg Message */}
      {showEasterEgg && (
        <div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl animate-scaleIn"
          style={{
            background: 'linear-gradient(135deg, #06B6D4 0%, #FF6B6B 100%)',
            boxShadow: '0 0 60px rgba(6,182,212,0.5), 0 0 120px rgba(255,107,107,0.3)',
          }}
        >
          Wir wissen, dass du's gecheckt hast 😉
        </div>
      )}

      {/* Confetti */}
      {confetti.map((particle) => (
        <ConfettiParticle
          key={particle.id}
          emoji={particle.emoji}
          delay={particle.delay}
          x={particle.x}
        />
      ))}
    </>
  );
}
