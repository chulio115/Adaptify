import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CookieBanner from './components/CookieBanner';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';

/**
 * Main App Component
 * Uses BrowserRouter for Netlify (clean URLs without #)
 * Netlify handles SPA routing via netlify.toml redirects
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
      </Routes>
      {/* Cookie Banner appears on all pages */}
      <CookieBanner />
    </Router>
  );
}

export default App;
