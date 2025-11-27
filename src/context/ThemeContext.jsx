import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * ThemeContext v2 - The Viral Toggle
 * 
 * "I have no idea how they did that... but I need to work with them."
 * 
 * Features:
 * - Buttery smooth 1000ms wave animation
 * - Click counter for Easter Eggs (3x, 7x, 11x)
 * - Three wave variants: Aurora, Glass, Matrix
 * - prefers-color-scheme + localStorage
 * - Zero FOUC, 60fps guaranteed
 */

const ThemeContext = createContext(null);

// Animation config - the magic numbers
const WAVE_DURATION = 1000; // ms - the sweet spot

export function ThemeProvider({ children }) {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('adaptify-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Wave animation state
  const [waveState, setWaveState] = useState({
    isAnimating: false,
    origin: { x: 0, y: 0 },
    targetTheme: null,
    progress: 0,
    variant: 'aurora', // 'aurora' | 'glass' | 'matrix'
  });
  
  // Easter egg click counter
  const [clickCount, setClickCount] = useState(0);
  const [easterEgg, setEasterEgg] = useState(null); // 'confetti' | 'disco' | 'katamaran'
  
  const clickResetRef = useRef(null);
  const animationRef = useRef(null);

  // Apply theme class to document - INSTANT, no delay
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('adaptify-theme', isDark ? 'dark' : 'light');
    
    // Mobile browser chrome color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0a0a0a' : '#FAFBFC');
  }, [isDark]);

  // System preference listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('adaptify-theme')) setIsDark(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Easter egg handler
  useEffect(() => {
    if (clickCount === 3) {
      setEasterEgg('confetti');
      setTimeout(() => setEasterEgg(null), 3000);
    } else if (clickCount === 7) {
      setEasterEgg('disco');
      setTimeout(() => setEasterEgg(null), 2000);
    } else if (clickCount === 11) {
      setEasterEgg('katamaran');
      setTimeout(() => setEasterEgg(null), 4000);
    }
  }, [clickCount]);

  // The main toggle function
  const toggleTheme = useCallback((event) => {
    // Get origin from click/touch position
    const rect = event?.currentTarget?.getBoundingClientRect();
    const origin = rect 
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth - 80, y: 40 };

    // Increment click counter (reset after 2s of no clicks)
    setClickCount(prev => prev + 1);
    if (clickResetRef.current) clearTimeout(clickResetRef.current);
    clickResetRef.current = setTimeout(() => setClickCount(0), 2000);

    // Cancel any running animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const newTheme = isDark ? 'light' : 'dark';

    // START: Switch theme IMMEDIATELY so everything animates together
    setIsDark(prev => !prev);

    // Start wave animation
    setWaveState({
      isAnimating: true,
      origin,
      targetTheme: newTheme,
      progress: 0,
      variant: 'aurora',
    });

    // Animate progress from 0 to 1
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / WAVE_DURATION, 1);
      
      setWaveState(prev => ({ ...prev, progress }));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          setWaveState(prev => ({ ...prev, isAnimating: false, progress: 0 }));
        }, 100);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isDark]);

  // Set variant
  const setVariant = useCallback((variant) => {
    setWaveState(prev => ({ ...prev, variant }));
  }, []);

  // Direct set (no animation)
  const setTheme = useCallback((theme) => {
    setIsDark(theme === 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      setTheme,
      waveState,
      setVariant,
      easterEgg,
      clickCount,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export default ThemeContext;
