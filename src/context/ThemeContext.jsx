import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * ThemeContext v5 - SEAMLESS THEME TRANSITIONS
 * 
 * THE MAGIC: View Transitions API + CSS Fallback
 * 
 * How it works:
 * 1. Browser takes a "screenshot" of current state
 * 2. We change the theme (DOM update)
 * 3. Browser takes a "screenshot" of new state
 * 4. CSS clip-path circle animation reveals the new theme
 * 
 * FALLBACK: For browsers without View Transitions (Safari, Firefox),
 * we use a CSS-only approach with a pseudo-element overlay.
 * 
 * Easter Eggs: 3x = Lighthouse, 5x = Matrix, Language after Matrix = Boat
 */

const ThemeContext = createContext(null);

// Animation duration - synced with CSS (0.8s)
// Sweet spot: Responsive start + elegant finish
const WAVE_DURATION = 800;

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
  const [matrixWasShown, setMatrixWasShown] = useState(false); // Unlocks boat on language click
  const [toggleCounter, setToggleCounter] = useState(0); // Count all successful theme toggles
  const clickResetTimer = useRef(null);
  // View Transitions supported check
  const [supportsViewTransitions] = useState(() => 
    typeof document !== 'undefined' && 'startViewTransition' in document
  );

  // Apply theme to DOM immediately
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('adaptify-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // No browser exclusions - View Transitions work in all modern Chromium browsers
  // Safari/Firefox will use the CSS fallback automatically

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
    } else if (clickCount === 5) {
      setEasterEgg('matrix');
      setMatrixWasShown(true); // Unlock the boat!
      setTimeout(() => setEasterEgg(null), 4000);
    }
  }, [clickCount]);

  // Also trigger Matrix every 5th successful toggle (5,10,15,...) so it appears in both themes over time
  useEffect(() => {
    if (toggleCounter > 0 && toggleCounter % 5 === 0) {
      setEasterEgg('matrix');
      setMatrixWasShown(true);
      setTimeout(() => setEasterEgg(null), 4000);
    }
  }, [toggleCounter]);

  // Function to trigger boat (called from LanguageToggle after matrix)
  const triggerBoat = useCallback(() => {
    if (matrixWasShown) {
      setEasterEgg('katamaran');
      setMatrixWasShown(false); // Only works once
      setTimeout(() => setEasterEgg(null), 5000);
      return true; // Boat was shown
    }
    return false; // Boat not unlocked
  }, [matrixWasShown]);

  // THE toggle function - uses View Transitions API for magic!
  const toggleTheme = useCallback(async (event) => {
    // Click counting for Easter eggs - ALWAYS count, even during animation!
    setClickCount(prev => prev + 1);
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    clickResetTimer.current = setTimeout(() => setClickCount(0), 3000); // 3 seconds to reach 7 clicks

    // Don't toggle during animation (but clicks are still counted above!)
    if (waveState.isAnimating) return;
    
    // Get click origin for wave
    const rect = event?.currentTarget?.getBoundingClientRect();
    let x = window.innerWidth - 80;
    let y = 40;
    
    if (rect) {
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const previousTheme = isDark ? 'dark' : 'light';
    const newIsDark = !isDark;
    
    // Set CSS custom properties for the animation origin
    document.documentElement.style.setProperty('--wave-x', `${x}px`);
    document.documentElement.style.setProperty('--wave-y', `${y}px`);

    // Check if View Transitions API is supported
    if (supportsViewTransitions) {
      // THE MAGIC: View Transitions API - seamless clip-path animation
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      
      try {
        const transition = document.startViewTransition(() => {
          // This runs during the transition - update the DOM
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(newIsDark ? 'dark' : 'light');
          setIsDark(newIsDark);
          setToggleCounter(prev => prev + 1);
        });

        // Wait for transition to finish
        await transition.finished;
      } catch (e) {
        // Fallback if View Transition fails
        setIsDark(newIsDark);
        setToggleCounter(prev => prev + 1);
      }
      
      setWaveState(prev => ({ ...prev, isAnimating: false }));
      
    } else {
      // OPTIMIZED FALLBACK for Safari/Firefox (especially Mobile Safari)
      // Instead of animating ALL elements, we use a simple overlay fade
      // This is WAY more GPU-friendly on mobile devices
      
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      
      // Create a temporary overlay for smooth visual transition
      const overlay = document.createElement('div');
      overlay.className = 'theme-fallback-overlay';
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        pointer-events: none;
        background: ${newIsDark ? '#030303' : '#fafafa'};
        opacity: 0;
        transition: opacity 300ms ease-out;
        will-change: opacity;
      `;
      document.body.appendChild(overlay);
      
      // Trigger fade in
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });
      
      // After fade in, switch theme and fade out
      setTimeout(() => {
        setIsDark(newIsDark);
        setToggleCounter(prev => prev + 1);
        
        // Fade out
        overlay.style.opacity = '0';
        
        // Remove overlay after fade out
        setTimeout(() => {
          overlay.remove();
          setWaveState(prev => ({ ...prev, isAnimating: false }));
        }, 300);
      }, 300);
    }
    
  }, [isDark, waveState.isAnimating, supportsViewTransitions]);

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
      triggerBoat, // For language toggle to trigger boat after matrix
      matrixWasShown,
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
