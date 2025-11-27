import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * LanguageToggle - Premium Language Switcher
 * 
 * Features:
 * - Rotating globe icon with glow
 * - Smooth text crossfade (250ms)
 * - Headlines get blur → sharp effect
 * - Easter Egg: Alt+Click = Konfetti
 * - Mobile optimized
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

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [confetti, setConfetti] = useState([]);
  
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef(null);

  const currentLang = i18n.language?.substring(0, 2) || 'de';
  const isGerman = currentLang === 'de';

  // Subtle glow after 1s
  useEffect(() => {
    const timer = setTimeout(() => setShowGlow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Spawn confetti for Easter Egg
  const spawnConfetti = useCallback(() => {
    const emojis = ['🇪🇺', '🇺🇸', '⛵', '🌍', '✨', '🚀', '💻'];
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 0.5,
      x: Math.random() * 100,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 4000);
  }, []);

  // Add blur effect to headlines during transition
  const triggerHeadlineEffect = useCallback(() => {
    const headlines = document.querySelectorAll('h1, h2, h3');
    headlines.forEach((el) => {
      el.style.transition = 'filter 150ms ease-out, opacity 150ms ease-out';
      el.style.filter = 'blur(2px)';
      el.style.opacity = '0.7';
      
      setTimeout(() => {
        el.style.filter = 'blur(0)';
        el.style.opacity = '1';
      }, 150);
    });
  }, []);

  // Handle language toggle
  const toggleLanguage = useCallback((e) => {
    // Easter Egg: Alt+Click
    if (e.altKey) {
      setShowEasterEgg(true);
      spawnConfetti();
      setTimeout(() => setShowEasterEgg(false), 4000);
      return;
    }

    // Easter Egg: Triple click detection
    clickCountRef.current += 1;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    
    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setShowEasterEgg(true);
      spawnConfetti();
      setTimeout(() => setShowEasterEgg(false), 4000);
      return;
    }
    
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 400);

    // Rotate globe
    setIsRotating(true);
    
    // Trigger headline blur effect
    triggerHeadlineEffect();
    
    // Switch language after rotation starts
    setTimeout(() => {
      const newLang = isGerman ? 'en' : 'de';
      i18n.changeLanguage(newLang);
    }, 150);
    
    // Stop rotation
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  }, [isGerman, i18n, spawnConfetti, triggerHeadlineEffect]);

  return (
    <>
      {/* Main Toggle Button - Mobile optimized */}
      <button
        onClick={toggleLanguage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 150)}
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-95 transition-transform touch-manipulation"
        aria-label={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
        title={isGerman ? 'Switch to English' : 'Auf Deutsch wechseln'}
      >
        {/* Outer glow ring */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-700 ${
            showGlow ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
            transform: showGlow ? 'scale(1.6)' : 'scale(1)',
            animation: showGlow ? 'glow-pulse 3s ease-in-out infinite' : 'none',
          }}
        />
        
        {/* Inner container with globe */}
        <div 
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all duration-300 flex items-center justify-center overflow-hidden ${
            isGerman
              ? 'border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900 light-mode-globe' 
              : 'border-violet-500/30 bg-gradient-to-br from-slate-800 to-slate-900 light-mode-globe'
          }`}
          style={{
            transform: isRotating 
              ? 'rotateY(360deg)' 
              : isHovered 
                ? 'scale(1.08) rotateY(15deg)' 
                : 'scale(1)',
            transformStyle: 'preserve-3d',
            transition: isRotating 
              ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' 
              : 'transform 300ms ease',
            boxShadow: isHovered 
              ? '0 0 20px rgba(6,182,212,0.35), inset 0 0 10px rgba(6,182,212,0.1)' 
              : 'inset 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Globe SVG */}
          <svg 
            viewBox="0 0 24 24" 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 globe-icon ${
              isGerman ? 'text-cyan-400' : 'text-violet-400'
            }`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            style={{
              filter: isHovered ? 'drop-shadow(0 0 4px currentColor)' : 'none',
            }}
          >
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="4" ry="10" />
            <path d="M2 12h20" />
            <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" />
            <path d="M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10" />
          </svg>
          
          {/* Language indicator */}
          <div 
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all duration-300 ${
              isGerman 
                ? 'bg-cyan-500 text-white' 
                : 'bg-violet-500 text-white'
            }`}
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {isGerman ? 'DE' : 'EN'}
          </div>
        </div>
      </button>

      {/* Easter Egg Message */}
      {showEasterEgg && (
        <div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] px-6 sm:px-8 py-4 rounded-2xl text-white font-bold text-base sm:text-lg shadow-2xl animate-scaleIn text-center"
          style={{
            background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #FF6B6B 100%)',
            boxShadow: '0 0 60px rgba(6,182,212,0.5), 0 0 120px rgba(139,92,246,0.3)',
          }}
        >
          {t('language.easter')}
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
