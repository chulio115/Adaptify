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
  const isTransitioning = useRef(false);

  // Apply theme to DOM - but NOT during View Transition (it handles DOM itself)
  useEffect(() => {
    // Skip if we're in the middle of a View Transition
    // The transition callback already updated the DOM
    if (isTransitioning.current) {
      isTransitioning.current = false;
      localStorage.setItem('adaptify-theme', isDark ? 'dark' : 'light');
      return;
    }
    
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
    // Don't do anything during animation
    if (waveState.isAnimating) return;
    
    // Click counting for Easter eggs - only count when NOT animating
    // This prevents accidental Easter Egg triggers when testing
    setClickCount(prev => prev + 1);
    if (clickResetTimer.current) clearTimeout(clickResetTimer.current);
    clickResetTimer.current = setTimeout(() => setClickCount(0), 3000); // 3 seconds to reach Easter Eggs
    
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

    // Check if View Transitions API is supported at runtime
    const canUseViewTransitions = typeof document !== 'undefined' && 
      typeof document.startViewTransition === 'function';
    
    // Debug log - remove after testing
    console.log('🎨 Theme Toggle:', {
      canUseViewTransitions,
      hasStartViewTransition: typeof document?.startViewTransition,
      waveX: x,
      waveY: y,
      newTheme: newIsDark ? 'dark' : 'light'
    });
    
    if (canUseViewTransitions) {
      // THE MAGIC: View Transitions API - seamless clip-path animation
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      
      // Mark that we're transitioning so useEffect doesn't interfere
      isTransitioning.current = true;
      
      try {
        // Start the view transition
        const transition = document.startViewTransition(() => {
          // Direct DOM manipulation for immediate visual change
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(newIsDark ? 'dark' : 'light');
        });
        
        // Update React state after transition starts (for consistency)
        setIsDark(newIsDark);
        setToggleCounter(prev => prev + 1);
        
        // Wait for the pseudo-elements to be ready, then apply programmatic animation
        await transition.ready;
        
        // Calculate the maximum radius needed to cover the entire screen
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        
        // Apply the clip-path animation programmatically
        // This is more reliable than CSS-only approach
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        // Wait for transition to finish
        await transition.finished;
      } catch (e) {
        // Fallback if View Transition fails
        console.warn('View Transition failed:', e);
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newIsDark ? 'dark' : 'light');
        setIsDark(newIsDark);
        setToggleCounter(prev => prev + 1);
      }
      
      setWaveState(prev => ({ ...prev, isAnimating: false }));
      
    } else {
      // ULTRA-OPTIMIZED FALLBACK for Safari/Firefox (especially Mobile Safari)
      // Simple, fast, GPU-accelerated overlay fade
      
      setWaveState({ isAnimating: true, originX: x, originY: y, previousTheme });
      
      // Create overlay with GPU acceleration
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        pointer-events: none;
        background: ${newIsDark ? '#030303' : '#fafafa'};
        opacity: 0;
        transition: opacity 200ms ease-out;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      `;
      document.body.appendChild(overlay);
      
      // Force browser to acknowledge the element before animating (reflow trick)
      void overlay.offsetHeight;
      
      // Fade in
      overlay.style.opacity = '1';
      
      // Switch theme at peak opacity, then fade out
      setTimeout(() => {
        setIsDark(newIsDark);
        setToggleCounter(prev => prev + 1);
        
        // Small delay to let React update, then fade out
        requestAnimationFrame(() => {
          overlay.style.opacity = '0';
          
          // Cleanup
          setTimeout(() => {
            if (overlay.parentNode) overlay.remove();
            setWaveState(prev => ({ ...prev, isAnimating: false }));
          }, 200);
        });
      }, 200);
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
