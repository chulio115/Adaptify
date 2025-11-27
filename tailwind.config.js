/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light mode premium palette
        light: {
          bg: '#FAFBFC',
          surface: '#FFFFFF',
          'surface-elevated': '#F8F9FA',
          text: '#1A1D21',
          'text-secondary': '#5C6370',
          border: '#E5E7EB',
          accent: {
            cyan: '#0891B2',
            violet: '#7C3AED',
            teal: '#0D9488',
            coral: '#F97316',
          }
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'confetti-fall': 'confetti-fall 3s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}

