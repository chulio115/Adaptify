import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * ThemeContext v4 - VIEW TRANSITIONS API
 * 
 * THE REAL MAGIC: Browser's native View Transitions API
 * 
 * How it works:
 * 1. Browser takes a "screenshot" of current state
 * 2. We change the theme (DOM update)
 * 3. Browser takes a "screenshot" of new state
 * 4. Browser animates between them with clip-path!
 * 
 * This is how the Reddit/Twitter dark mode toggles work.
 * The circle LITERALLY reveals the new theme underneath.
 * 
 * Easter Eggs: 3x = Lighthouse, 7x = Katamaran
 */

const ThemeContext = createContext(null);

// Animation duration
const WAVE_DURATION = 1200; // Slower for more drama

export function ThemeProvider({ children }) {
  // Theme state - true = dark
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('adaptify-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Wave state for the clip-path animation
  const [waveState, setWaveState] = useState({
    isAnimating: false,
    originX: 92,      // % from left (toggle position)
    originY: 40,      // px from top
    previousTheme: 'dark', // The theme we're transitioning FROM
  });
  
  // Easter eggs
  const [clickCount, setClickCount] = useState(0);
  const [easterEgg, setEasterEgg] = useState(null);
  const clickResetTimer = useRef(null);

  // Apply theme to DOM immediately
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('adaptify-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // System theme listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (!localStorage.getItem('adaptify-theme')) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Easter egg triggers
  useEffect(() => {
    if (clickCount === 3) {
      setEasterEgg('lighthouse');
      setTimeout(() => setEasterEgg(null), 1500);
    } else if (clickCount === 7) {
      setEasterEgg('katamaran');
      setTimeout(() => setEasterEgg(null), 5000);
    }
  }, [clickCount]);

  // THE toggle function - uses View Transitions API for magic!
  const toggleTheme = useCallback(async (event) => {
    // Get click origin for wave
    const rect = event?.currentTarget?.getBoundingClientRect();
    let x = window.innerWidth - 80;
    let y = 40;
    
    if (rect) {
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    // Click counting for Easter eggs
    setClickCount(prev => prev + 1);
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    clickResetTimer.current = setTimeout(() => setClickCount(0), 2000);

    // Don't toggle during animation
    if (waveState.isAnimating) return;

    const previousTheme = isDark ? 'dark' : 'light';
    const newIsDark = !isDark;
    
    // Set CSS custom properties for the animation origin
    document.documentElement.style.setProperty('--wave-x', `${x}px`);
    document.documentElement.style.setProperty('--wave-y', `${y}px`);

    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      // THE MAGIC: View Transitions API
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      
      const transition = document.startViewTransition(() => {
        // This runs during the transition - update the DOM
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newIsDark ? 'dark' : 'light');
        setIsDark(newIsDark);
      });

      // Wait for transition to finish
      await transition.finished;
      setWaveState(prev => ({ ...prev, isAnimating: false }));
      
    } else {
      // Fallback for browsers without View Transitions
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      setIsDark(newIsDark);
      
      setTimeout(() => {
        setWaveState(prev => ({ ...prev, isAnimating: false }));
      }, WAVE_DURATION);
    }
    
  }, [isDark, waveState.isAnimating]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      waveState,
      easterEgg,
      WAVE_DURATION,
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
