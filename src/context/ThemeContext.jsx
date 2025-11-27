import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * ThemeContext v3 - THE SIGNATURE TOGGLE
 * 
 * "Entwickler schließen die Seite und öffnen sie wieder – nur um den Toggle noch einmal zu klicken."
 * 
 * Architecture:
 * - clip-path: circle() expandiert und "frisst" den alten Modus
 * - Ein einziges Overlay mit dem ALTEN Theme
 * - Darunter ist bereits das NEUE Theme sichtbar
 * - 980ms, butter-smooth, 60fps
 * 
 * Easter Eggs:
 * - 3x = Lighthouse Mode
 * - 7x = Katamaran (nur Animation, kein Text)
 */

const ThemeContext = createContext(null);

// THE magic numbers
const WAVE_DURATION = 980;
const EASING = 'cubic-bezier(0.4, 0.0, 0.2, 1)';

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

  // THE toggle function
  const toggleTheme = useCallback((event) => {
    // Get click origin for wave
    const rect = event?.currentTarget?.getBoundingClientRect();
    let originX = 92; // default: top right
    let originY = 40;
    
    if (rect) {
      originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      originY = rect.top + rect.height / 2;
    }

    // Click counting for Easter eggs
    setClickCount(prev => prev + 1);
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    clickResetTimer.current = setTimeout(() => setClickCount(0), 2000);

    // Don't toggle during animation
    if (waveState.isAnimating) return;

    // Remember current theme BEFORE switching
    const previousTheme = isDark ? 'dark' : 'light';
    
    // Start animation
    setWaveState({
      isAnimating: true,
      originX,
      originY,
      previousTheme,
    });

    // Switch theme IMMEDIATELY - the new theme is now visible
    // The overlay will show the OLD theme and shrink away
    setIsDark(!isDark);

    // End animation after duration
    setTimeout(() => {
      setWaveState(prev => ({ ...prev, isAnimating: false }));
    }, WAVE_DURATION + 50);
    
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
      EASING,
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
