import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CookieBanner from './components/CookieBanner';

// Lazy load legal pages for better initial bundle size
const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const AGB = lazy(() => import('./pages/AGB'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-[#030303] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Main App Component
 * Uses BrowserRouter for Netlify (clean URLs without #)
 * Netlify handles SPA routing via netlify.toml redirects
 * Legal pages are lazy loaded for performance
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impressum" element={
          <Suspense fallback={<PageLoader />}>
            <Impressum />
          </Suspense>
        } />
        <Route path="/datenschutz" element={
          <Suspense fallback={<PageLoader />}>
            <Datenschutz />
          </Suspense>
        } />
        <Route path="/agb" element={
          <Suspense fallback={<PageLoader />}>
            <AGB />
          </Suspense>
        } />
      </Routes>
      {/* Cookie Banner appears on all pages */}
      <CookieBanner />
    </Router>
  );
}

export default App;
