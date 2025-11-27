import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/**
 * ThemeContext - The brain behind the magic
 * 
 * Features:
 * - localStorage persistence
 * - prefers-color-scheme detection
 * - Wave animation state management
 * - No FOUC (Flash of Unstyled Content)
 */

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // SSR safety - default to dark
    if (typeof window === 'undefined') return true;
    
    const stored = localStorage.getItem('adaptify-theme');
    if (stored) return stored === 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [waveState, setWaveState] = useState({
    isAnimating: false,
    origin: { x: 0, y: 0 },
    targetTheme: null,
  });
  
  const waveTimeoutRef = useRef(null);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    localStorage.setItem('adaptify-theme', isDark ? 'dark' : 'light');
    
    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0a0a0a' : '#FAFBFC');
    }
  }, [isDark]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set preference
      const stored = localStorage.getItem('adaptify-theme');
      if (!stored) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle with wave animation
  const toggleTheme = useCallback((event) => {
    // Get click position for wave origin
    const rect = event?.currentTarget?.getBoundingClientRect();
    const origin = rect 
      ? { 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Clear any existing timeout
    if (waveTimeoutRef.current) {
      clearTimeout(waveTimeoutRef.current);
    }

    // Start wave animation
    setWaveState({
      isAnimating: true,
      origin,
      targetTheme: isDark ? 'light' : 'dark',
    });

    // Toggle theme at the right moment (when wave covers ~50% of screen)
    waveTimeoutRef.current = setTimeout(() => {
      setIsDark(prev => !prev);
    }, 200);

    // End animation
    setTimeout(() => {
      setWaveState(prev => ({
        ...prev,
        isAnimating: false,
      }));
    }, 600);
  }, [isDark]);

  // Direct set without animation (for initialization)
  const setTheme = useCallback((theme) => {
    setIsDark(theme === 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      setTheme,
      waveState,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
