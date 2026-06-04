# Adaptify Corporate Identity — Brand & Style Guide

> Single Source of Truth für unseren visuellen Auftritt. Bei jeder Design-Entscheidung erst hier reinschauen, bevor etwas Neues definiert wird. Bei Änderungen: dieses Dokument zusammen mit dem Code committen.

**Stand**: Juni 2026

---

## 1. Farben

### Brand Primary — Signature Gradient

| Token | Dark Mode | Light Mode | Verwendung |
|---|---|---|---|
| **Brand Cyan** | `#06B6D4` (cyan-500) | `#06B6D4` → `#0891B2` | Primärfarbe, CTAs, Accents |
| **Brand Violet** | `#7C3AED` (violet-500) | wird zu **`#FF6B6B`** (Coral!) | Sekundäre Akzentfarbe, Gradient-Ende |
| **Brand Emerald** | oklch(65% 0.2 160) | `#059669` | Erfolg, Bestätigung, "Kundenprojekt"-Badge |
| **Signature Gradient** | `from-cyan-500 to-violet-500` (135deg) | `#06B6D4 → #FF6B6B` (135deg) | Hauptbutton, Hero-Headline, Header-Linie |

> **Wichtig**: Im Light Mode wird Violet **konsequent durch Coral** ersetzt. Diese Cyan→Coral-Gradient ist die DNA des Light Modes.

### Backgrounds

|  | Dark Mode | Light Mode |
|---|---|---|
| Primary BG | `#030303` (oklch 8%) | `#FAFBFC` (warm cream) |
| Surface | `#0a0a0a` | `#FFFFFF` |
| Elevated | oklch(15%) | `#F8F9FA` |

### Text

|  | Dark Mode | Light Mode |
|---|---|---|
| Primary | `#FAFAFA` (oklch 98%) | `#1A1D21` |
| Secondary | gray-400 (oklch 65%) | `#5C6370` |
| Muted | gray-500 (oklch 45%) | oklch 50% |

### Borders

|  | Dark Mode | Light Mode |
|---|---|---|
| Subtle | `white/10` | `#E5E7EB` |
| Default | `white/20` | oklch 88% |

### Section-Akzentfarben (Eyebrow-Badges)

| Section | Akzentfarbe |
|---|---|
| Problem | `red-400` |
| Services | `cyan-400` |
| Tech-Stack | `violet-400` (coral in light) |
| Portfolio/Cases | `cyan-400` |
| CTA | `cyan-400` |

### Projekt-Karten Farbcoding (Cases-Section)

| Projekt | Border-Color |
|---|---|
| Easy Living | `cyan-500/30` |
| BISS | `sky-500/30` |
| SpotMap | `violet-500/30` |
| Haushaltsapp | `emerald-500/30` |
| Congress Tracker | `orange-500/30` |

---

## 2. Typografie

### Font Family

- **Primary**: `Inter` (über Google Fonts CDN)
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Fallback-Stack**: `system-ui, sans-serif`
- **Anti-Aliasing**: `-webkit-font-smoothing: antialiased`

### Schrift-Hierarchie

| Element | Klassen | Pixel (desktop) |
|---|---|---|
| Hero H1 | `text-5xl md:text-7xl font-bold` | 48 → 72px |
| Section H2 | `text-3xl md:text-5xl font-bold` | 30 → 48px |
| Subsection H3 | `text-2xl font-bold` | 24px |
| Body Large | `text-lg` | 18px |
| Body | `text-base` / `text-sm` | 16 / 14px |
| Footer H4 | `text-xs font-semibold uppercase` | 12px |
| Section Eyebrow | `text-xs uppercase tracking-[0.3em]` | 12px |

### Letter-Spacing (wichtig für Markenanmutung)

- **Section Eyebrows** ("DAS PROBLEM", "UNSER PORTFOLIO"): `tracking-[0.3em]` (sehr weit gespreizt)
- **Footer Headers & CTA-Badge**: `tracking-[0.2em]`
- **Body**: default (0)

### Signature Pattern: Section-Eyebrow

```jsx
<span className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
  UNSER PORTFOLIO
</span>
```

Wiederkehrende Optik in jeder Section — sehr wiedererkennbar.

---

## 3. Spacing & Layout

### Container

- Standard-Sections: `max-w-6xl mx-auto` (1152px)
- Stats-Section: `max-w-5xl` (1024px)
- CTA-Section: `max-w-4xl` (896px)
- Horizontales Padding: `px-6`

### Section-Padding

- Desktop: `py-32` (128px top/bottom)
- Mobile ≤640px: 4rem (64px) — automatisch reduziert via CSS
- Kleinere Sections: `py-20` → 3rem mobile

### Grid-Patterns

| Anwendung | Klassen |
|---|---|
| Stats | `grid grid-cols-2 md:grid-cols-4 gap-8` |
| Services | `grid md:grid-cols-2 lg:grid-cols-3` |
| Cases | `grid md:grid-cols-2 xl:grid-cols-3 gap-6` |

### Border-Radius-Hierarchie

| Element | Klasse |
|---|---|
| Buttons & Pills | `rounded-full` |
| Cards klein | `rounded-xl` (12px) |
| Cards medium | `rounded-2xl` (16px) |
| Cards groß | `rounded-3xl` (24px) |

---

## 4. Shadows & Elevation (Light Mode)

```css
/* Card resting state */
0 1px 3px rgba(0,0,0,0.04),
0 4px 12px rgba(0,0,0,0.03),
inset 0 1px 0 rgba(255,255,255,0.8)

/* Card hover */
0 4px 12px rgba(0,0,0,0.08),
0 8px 24px rgba(0,0,0,0.04)
+ translateY(-1px)

/* CTA Button */
0 4px 14px rgba(6,182,212,0.25),   /* Cyan glow */
0 2px 6px rgba(255,107,107,0.2)    /* Coral glow */
```

Im Dark Mode werden Shadows minimal eingesetzt — dort übernimmt der Cyan-Glow (`shadow-cyan-500/25`) die Arbeit.

---

## 5. Animations & Motion

### Timing

| Anwendung | Duration / Easing |
|---|---|
| Buttons / Links hover | `200ms ease` |
| Card hover | `300ms ease` |
| Section Fade-in | `1000ms` |
| Theme-Switch | `400ms cubic-bezier(0.4, 0, 0.2, 1)` |
| Counter Animation | `2000ms` (IntersectionObserver-getriggert) |

### Signature Effects

- **Counter-Animation** (`useCountUp`): zählt hoch wenn sichtbar — initialisiert mit Endwert, animiert beim ersten Sichtbarwerden
- **Section Fade-in** (`useFadeIn`): `opacity 0 → 1` + `translateY(40px → 0)`
- **Tech-Stack Marquee**: 60s linear infinite, hover pausiert
- **Theme-Toggle "Friss-Effekt"**: View Transitions API, radial clip-path
- **Glow-Pulse**: 2s infinite für besondere Akzente

---

## 6. Iconography

- **Library**: `lucide-react` (MIT, kostenlos)
- **Standard-Größen**: `w-4 h-4` (inline), `w-8 h-8` (feature icons in cards)
- **Stroke-based**, durchgängig dünn-elegant
- **Farbe**: erbt Text-Color, Akzentfarben für Hervorhebung

---

## 7. Logo

- **Asset**: `/src/assets/logo.png` (140 KB)
- **Dark Mode Treatment**: `brightness-0 invert` (Weiß)
- **Light Mode Treatment**: Originalfarben, `filter: none`

> **TODO**: `/src/assets/logo.svg` ist aktuell leer (0 Bytes) und sollte regeneriert werden — für skalierbare, performante Darstellung.

---

## 8. Voice & Tone

| Eigenschaft | Beispiel |
|---|---|
| Anrede | **Du / Ihr** (informell-direkt) |
| Stil | Direkt, ehrlich, keine Marketing-Phrasen |
| Sprache 1 | Deutsch (Primary, `de_DE`) |
| Sprache 2 | Englisch (`en`) |
| Typische Phrasen | "Schluss mit Excel-Chaos", "alles aus einer Hand", "schneller, günstiger und besser" |
| Zielgruppe | KMU / Mittelstand |

### Was wir NICHT machen

- Keine Superlative ohne Beleg ("der beste", "die einzige Agentur, die…")
- Keine erfundenen Kundenzahlen oder Referenzen
- Keine versteckten Preisanker oder Rabatte auf der Website (Rabatte gehören ins Gespräch)
- Keine "Jahre Erfahrung"-Claims, die zur jungen Firma nicht passen

---

## 9. Meta / SEO

- **Title-Pattern**: `Adaptify – [Topic] | [Detail]`
- **Theme-Color** (Browser-Chrome): `#030303`
- **Open Graph Image**: 1024×1024px
- **Locale**: `de_DE`
- **Schema.org**: `Organization` + `AggregateOffer` strukturiert

---

## 10. Tech-Stack Quellen

| Asset / Konfiguration | Datei |
|---|---|
| Tailwind-Tokens & Custom-Colors | `tailwind.config.js` |
| CSS-Variablen (oklch), Light-Mode-Overrides | `src/index.css` |
| Übersetzungen (Voice & Tone Master) | `src/i18n/locales/de.json`, `en.json` |
| Logo-Asset | `src/assets/logo.png` |
| SEO / Meta-Tags | `public/index.html` |
| Showcase-Konfiguration (Cases) | `src/components/LandingPage.jsx` |

---

## Workflow bei Brand-Änderungen

1. **Diskutieren**: Änderung im Team abstimmen
2. **Tokens zuerst**: Erst `tailwind.config.js` und `src/index.css` anpassen
3. **Komponenten danach**: Anwendung in Komponenten aktualisieren
4. **Doku aktualisieren**: Dieses Dokument im selben Commit mitziehen
5. **Visuelle Verifikation**: Sowohl Dark als auch Light Mode prüfen
6. **i18n prüfen**: Sind beide Sprachen konsistent?
