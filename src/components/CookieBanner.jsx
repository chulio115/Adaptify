import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

/**
 * Cookie Banner Component
 * - Appears at bottom of screen
 * - Saves preference to localStorage
 * - Smooth fade-in animation
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    closeBanner();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    closeBanner();
  };

  const closeBanner = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#111111] backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl">
          {/* Close button */}
          <button 
            onClick={handleDecline}
            className="absolute top-4 right-4 text-white hover:text-gray-500 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-6 h-6 text-cyan-400" />
            </div>

            {/* Text */}
            <div className="flex-1 pr-8 md:pr-0">
              <h3 className="font-semibold mb-1 text-white">Wir nutzen Cookies 🍪</h3>
              <p className="text-sm text-gray-300">
                Wir verwenden Cookies, um deine Erfahrung auf unserer Website zu verbessern.{' '}
                <Link 
                  to="/datenschutz" 
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                >
                  Mehr erfahren
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-sm font-medium hover:from-cyan-400 hover:to-violet-400 transition-all"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
