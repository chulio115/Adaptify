# Adaptify Labs - Design & Technical Documentation

## 🎨 Brand Identity

- **Primary Colors**: Cyan (#06B6D4) → Violet (#8B5CF6)
- **Light Mode Accent**: Cyan (#06B6D4) → Coral (#FF6B6B)
- **Typography**: Inter (400, 500, 600, 700)
- **Border Radius**: 2xl (16px) for cards, full for buttons

---

## ✨ Signature Feature: Dark/Light Mode Transition

### The "Friss-Effekt" (Eating Effect)

**Beschreibung**: Der neue Theme "frisst" das alte - ein expandierender Kreis vom Klickpunkt aus enthüllt das neue Theme nahtlos.

### Technische Umsetzung (v13 - Programmatic Animation)

**1. View Transitions API (Chrome, Edge, Brave, Safari 18+)**
```css
/* index.css - CSS deaktiviert Standard-Animation */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

**2. JavaScript Controller (ThemeContext.jsx) - PROGRAMMATIC ANIMATION**
```javascript
const WAVE_DURATION = 800; // 0.8s

// Start View Transition
const transition = document.startViewTransition(() => {
  root.classList.remove('light', 'dark');
  root.classList.add(newIsDark ? 'dark' : 'light');
});

// Wait for pseudo-elements to be ready
await transition.ready;

// Calculate radius to cover entire screen
const maxRadius = Math.hypot(
  Math.max(x, window.innerWidth - x),
  Math.max(y, window.innerHeight - y)
);

// Apply clip-path animation PROGRAMMATICALLY
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
```

**3. Fallback für Safari/Firefox (v11 - Mobile optimiert)**
```javascript
// Statt ALLE Elemente zu animieren (laggy auf Mobile),
// verwenden wir ein einziges GPU-beschleunigtes Overlay:
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed;
  inset: 0;
  background: ${newIsDark ? '#030303' : '#fafafa'};
  opacity: 0;
  transition: opacity 300ms ease-out;
  will-change: opacity;
  transform: translateZ(0); // GPU acceleration
`;
// Fade in → Switch theme → Fade out
```

### Parameter zum Anpassen

| Parameter | Datei | Aktueller Wert | Effekt |
|-----------|-------|----------------|--------|
| `animation` Duration | `index.css:145` | `0.8s` | Geschwindigkeit der Animation |
| `WAVE_DURATION` | `ThemeContext.jsx:24` | `800` | JS-seitige Sync |
| `cubic-bezier` | `index.css:145` | `(0.4, 0, 0.2, 1)` | Snappy Easing (Material Design) |
| `circle(150%)` | `index.css:158` | `150%` | Wie weit der Kreis expandiert |

### Performance-Optimierungen (v12 - Mobile Focus)

**Theme Transition:**
- **Keine globalen CSS-Transitions mehr** - War der Hauptgrund für Lag!
- **`will-change: clip-path`** - GPU-Beschleunigung
- **0.8s** - Sweet spot für snappy + elegant
- **Material Design Easing** - `cubic-bezier(0.4, 0, 0.2, 1)`

**Safari/Firefox Fallback:**
- **200ms Overlay-Fade** statt 600ms all-element transitions
- **`transform: translateZ(0)`** - Forciert GPU-Compositing
- **`backface-visibility: hidden`** - Weitere GPU-Optimierung

**Matrix Easter Egg (Mobile):**
- **8 Spalten** statt 20 (60% weniger Elemente)
- **Kein `backdrop-filter: blur`** auf Mobile
- **Einfache `text-shadow`** statt mehrfache
- **Keine Lead-Characters** auf Mobile
- **`will-change: transform`** auf allen animierten Elementen

**Lighthouse Easter Egg (Mobile):**
- **Kein `box-shadow`** auf Mobile
- **Vereinfachte Gradienten**
- **Kleinere Elemente** (30px statt 40px)

---

## 🐣 Easter Eggs

1. **3x Klick auf Toggle**: Lighthouse-Effekt (Lichtstrahl dreht sich)
2. **5x Klick auf Toggle**: Matrix-Regen (Katakana-Zeichen)
3. **Nach Matrix → Sprache wechseln**: Segelboot-Animation

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

---

## 🗂️ Dateistruktur

```
src/
├── components/
│   ├── LandingPage.jsx      # Hauptseite
│   ├── ThemeToggle.jsx      # Sonne/Mond Button
│   ├── ThemeWave.jsx        # Easter Eggs Container
│   └── LanguageToggle.jsx   # DE/EN Switch
├── context/
│   └── ThemeContext.jsx     # Theme State & View Transitions
├── pages/
│   ├── UeberUns.jsx
│   ├── Impressum.jsx
│   ├── Datenschutz.jsx
│   └── AGB.jsx
├── i18n/
│   ├── de.json              # Deutsche Übersetzungen
│   └── en.json              # Englische Übersetzungen
└── index.css                # Tailwind + Custom CSS
```

---

## 🔧 Wichtige CSS Custom Properties

```css
:root {
  --bg-primary: oklch(8% 0.01 250);
  --text-primary: oklch(98% 0 0);
  --accent-cyan: oklch(70% 0.15 195);
  --accent-violet: oklch(55% 0.25 300);
  --theme-transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --wave-x: calc(100vw - 80px);  /* Überschrieben bei Klick */
  --wave-y: 40px;                 /* Überschrieben bei Klick */
}

.light {
  --bg-primary: oklch(98.5% 0.003 80);
  --text-primary: oklch(13% 0.02 250);
  --accent-coral: oklch(60% 0.16 25);
}
```

---

## 📝 Changelog

### v10 (Aktuell)
- Dark/Light Animation: 1.5s mit Cyan-Glow am Rand
- Service-Cards: Sauberes vertikales Layout
- Footer: Kompakter, "Made with" neben Copyright
- Mobile: Touch-Targets 44px, reduzierte Blurs

### v9
- ThemeWave mit Glowing Ring (entfernt wegen "billigem" Look)

### v8
- View Transitions API Implementierung

---

## 🚀 Build & Deploy

```bash
# Development
npm start

# Production Build
npm run build

# Deploy to Netlify
npm run deploy
```

---

*Letzte Aktualisierung: November 2025*
