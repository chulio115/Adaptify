# Adaptify Website – Optimierung: Fortschritt & Pläne

*Letzte Aktualisierung: März 2026*

---

## Status: Plan A (Text & Wording) ✅ UMGESETZT

### Was wurde geändert

### Lokaler Zwischenstand: Projekt-Showcase auf Startseite ✅

- **Projektsektion verschoben**: "Was wir bisher gebaut haben" wurde von `Über uns` auf die **Landing Page** verschoben
- **Neue Position**: Direkt **unter dem Tech-Stack** und **über dem finalen CTA**
- **Echte Projekte statt Platzhalter**:
  - **Easy Living Katamaran** mit echtem Logo und belastbarer Projektbeschreibung
  - **BISS App Landing Page** mit echtem Logo und belastbarer Projektbeschreibung
- **CTA-Card bleibt erhalten**: "Euer Projekt könnte hier stehen"
- **Über-uns Seite entschlackt**: Doppelte Projektsektion dort entfernt
- **Brand Assets lokal übernommen**:
  - `public/project-logos/easy-living-logo.png`
  - `public/project-logos/biss-logo.png`
- **Verifikation**:
  - Produktions-Build läuft fehlerfrei
  - Dev-Server lokal gestartet zur visuellen Prüfung

- **Wichtig**: Diese Änderungen sind aktuell **nur lokal zur Verifikation** gedacht und wurden noch **nicht gepusht/deployed**.

#### 1. Hero Section (Landing Page)
- **Headline**: "Euer kompletter Digitalisierungspartner" → **"Wir bauen, was euer Business digital nach vorne bringt"**
- **Badge**: "Digitalisierung aus einer Hand – für ambitionierte Mittelständler" → **"Digitalagentur für den Mittelstand"**
- **Subtitle**: Benefit-fokussiert umgeschrieben (schneller, günstiger, besser als klassische Agenturen)
- **CTA**: "Kostenloses Erstgespräch" → **"In 30 Min. zeigen, was möglich ist"**
- **Demo-Button**: Komplett entfernt (signalisierte "unfertiges Produkt")

#### 2. Pain Points
- Headlines von Fragen zu konkreten Aussagen umgeschrieben:
  - "Veraltete oder keine Webseite?" → **"Eure Website kostet euch Kunden"**
  - "Manuelle Prozesse überall?" → **"Euer Team verschwendet Stunden pro Woche"**
  - "Keine Automatisierung?" → **"Die Konkurrenz automatisiert – ihr nicht"**

#### 3. Services
- Titel: "Wir digitalisieren euer komplettes Business" → **"Ein Partner für euer gesamtes Digital-Projekt"**
- Subtitle: "Alles aus einer Hand" → **"Kein Flickwerk aus fünf Freelancern"**
- Alle 6 Service-Cards: Nutzen-orientiert umgetextet, Tool-Namen (Webflow, Shopify, Jira, Confluence) entfernt
- Beispiel: "Moderne Webseiten & Shops" → **"Websites, die verkaufen"**

#### 4. Tech Stack
- Titel: "Unser moderner Tech-Stack 2025" → **"Unser Tech-Stack – euer Vorsprung"** (zeitlos, kein Jahresbezug)
- **"Codium AI / Windsurf"** → **"AI-Accelerated Dev"** (keine spezifischen IDE-Tools mehr)
- Alle Card-Texte: Tool-Namen durch Nutzen-Beschreibungen ersetzt
  - "Make, Zapier, n8n + eigene KI-Agents" → **"Maßgeschneiderte Workflows und KI-Agenten"**
  - "Jira, Confluence, Bitbucket" → **"Strukturierte Prozesse, Echtzeit-Einblicke"**

#### 5. Final CTA
- "Bereit für die komplette Digitalisierung?" → **"Euer nächster Schritt? Ein Gespräch."**
- Button: "Kostenloses Strategiegespräch buchen" → **"Kostenlos beraten lassen"**

#### 6. Stats
- "schnellere Prozesse" → **"weniger manuelle Arbeit"**
- "Wochen Setup" → **"Wochen bis zum Launch"**
- "maßgeschneidert" → **"persönlicher Ansprechpartner"**

#### 7. Footer
- Tagline: "Die moderne Digitalisierungsagentur für KMUs" → **"Digitale Lösungen für den Mittelstand. Schnell. Persönlich. Nachhaltig."**
- "Made with ❤️ & AI in Germany" → **"Engineered with AI in Germany"**

#### 8. Über-uns Seite
- Hero: "von Menschen, die verstehen" → **"pragmatisch, persönlich, wirksam"**
- Julius-Quote: Grammatik korrigiert ("nicht das geschehen hat, was er sehen wollte" → klarer Satz)
- **Placeholder Case Studies ([Projekt 2], [Projekt 3]) entfernt** → durch "Euer Projekt könnte hier stehen"-CTA-Card ersetzt
- CTA: "Klingt gut? Dann lasst uns reden." → **"Klingt nach dem, was ihr braucht?"**

#### 9. Strukturelle Änderung
- **Reality Check Sektion von der Landing Page entfernt** (war Duplikat von Über-uns, machte die Seite zu lang)
- Navigation: "Realität"-Link aus Desktop- und Mobile-Navigation entfernt

#### 10. Alle Änderungen auch in EN durchgeführt
- Konsistente englische Übersetzungen für alle oben genannten Punkte

---

## Status: Plan B (Visuelle & UX Updates) 🔲 NOCH NICHT BEGONNEN

### Priorisierte Maßnahmen für Plan B

#### Hohe Priorität
1. **Hero-Visual hinzufügen** – Mockup/Browser-Window mit Beispiel-Website neben dem Hero-Text
2. **Social Proof Sektion** auf Landing Page – Sobald Easy Living + App-Projekt fertig sind:
   - Testimonial/Zitat vom Easy Living Kunden
   - Vorher/Nachher Screenshots
   - Ergebnis-Metriken (Buchungen, Traffic, etc.)
3. **Team-Foto** von Julius auf Über-uns Seite einbauen (statt "JS"-Initialen)
4. **"Wie wir arbeiten"-Sektion** – 3-4 Schritte als Timeline (Erstgespräch → Analyse → Umsetzung → Launch)

#### Mittlere Priorität
5. **Bento-Grid Layout** für Services statt gleichförmige 3×2 Cards
6. **Scroll-Animationen** mit Framer Motion (bereits installiert, kaum genutzt)
7. **Stats-Sektion visuell aufwerten** oder durch Testimonial ersetzen
8. **Footer: Echte Social-Profile** verlinken (LinkedIn, etc.)
9. **Sticky Mobile CTA** – Kleiner "Gespräch buchen"-Button, immer sichtbar

#### Niedrige Priorität
10. **Tech-Logo Carousel** – Logos größer, Namen entfernen
11. **Pain Points** – Asymmetrisches Layout statt 3 gleiche Cards
12. **Contact Modal** – Linke Spalte mit Social Proof bei Desktop
13. **Page Transitions** zwischen Seiten (Framer Motion)

---

## Offene Social-Proof-Assets (sobald verfügbar)

| Asset | Status | Einbau-Ort |
|-------|--------|------------|
| Easy Living – Testimonial/Zitat | ⏳ Noch offen | Landing Page Social Proof Sektion |
| Easy Living – Vorher/Nachher Screenshots | ⏳ Noch offen | Landing Page Projektsektion + Social Proof |
| Easy Living – Ergebnis-Metriken | ⏳ Daten sammeln | Landing Page Stats oder Social Proof |
| BISS – echte Produkt-Screenshots | ⏳ Noch offen | Landing Page Projektsektion |
| BISS – Launch-/Waitlist-Metriken | ⏳ Noch offen | Landing Page Projektsektion / Social Proof |
| Julius – Professionelles Foto | ⏳ Noch nicht vorhanden | Über-uns Team-Sektion |

---

## Technische Hinweise

- **Tech Stack**: React 19, Tailwind 3, Framer Motion, i18next, React Router 7
- **Deployment**: Netlify (netlify.toml konfiguriert)
- **i18n**: Alle Texte in `src/i18n/locales/de.json` und `en.json`
- **Hauptkomponenten**: `LandingPage.jsx` (~1020 Zeilen), `UeberUns.jsx` (~700 Zeilen)
- **Theme System**: Dark/Light mit View Transitions API ("Friss-Effekt")

---

## Wettbewerbs-Benchmarks

Orientierung an:
- **Linear, Vercel, Stripe** – Klares, selbstbewusstes Messaging
- **Ueno, Fantasy, Locomotive** – Starker Agentur-Auftritt mit Visuals
- **McKinsey Digital** – Professionelle B2B-Positionierung

Kernprinzip: **Zeigen statt beschreiben** – sobald Visuals/Social Proof verfügbar sind, ist das der größte Hebel.
