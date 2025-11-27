import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play,
  Globe, 
  FileSpreadsheet, 
  Workflow, 
  Sparkles,
  Bot,
  Palette,
  Headphones,
  Clock,
  Zap,
  CheckCircle2,
  X,
  Linkedin,
  Mail,
  Twitter,
  Code2,
  Layers,
  Cpu,
  Globe2,
  Calendar
} from 'lucide-react';
import logo from '../assets/logo.png';

// Counter Animation Hook
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);

  return { count, ref };
}

// Fade In Animation Hook
function useFadeIn() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { isVisible, ref };
}

/**
 * Tech Stack Tools with CDN logos
 * Using Simple Icons CDN for consistent, high-quality SVG logos
 */
const techStackTools = [
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/white' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/white' },
  { name: 'GitHub Copilot', logo: 'https://cdn.simpleicons.org/githubcopilot/white' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Netlify', logo: 'https://cdn.simpleicons.org/netlify/00C7B7' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/635BFF' },
  { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier/FF4A00' },
  { name: 'Notion', logo: 'https://cdn.simpleicons.org/notion/white' },
  { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack/4A154B' },
  { name: 'Jira', logo: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'Confluence', logo: 'https://cdn.simpleicons.org/confluence/172B4D' },
  { name: 'Trello', logo: 'https://cdn.simpleicons.org/trello/0052CC' },
  { name: 'Webflow', logo: 'https://cdn.simpleicons.org/webflow/4353FF' },
  { name: 'Zoho', logo: 'https://cdn.simpleicons.org/zoho/C8202B' },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  
  // Netlify Forms state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Fade in hooks for sections
  const heroFade = useFadeIn();
  const painFade = useFadeIn();
  const servicesFade = useFadeIn();
  const techFade = useFadeIn();
  const statsFade = useFadeIn();
  const ctaFade = useFadeIn();

  // Counter hooks for stats
  const stat1 = useCountUp(40);
  const stat2 = useCountUp(50);
  const stat3 = useCountUp(4);
  const stat4 = useCountUp(100);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  /**
   * Handle form submission to Netlify Forms
   * Uses fetch API to submit form data
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        
        // Close modal after 2.5 seconds
        setTimeout(() => {
          setModalOpen(false);
          setSubmitStatus(null);
        }, 2500);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303] text-white overflow-x-hidden">
      {/* Skip to main content - Accessibility */}
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      
      {/* ═══════════════════════════════════════════════════════════════
          HEADER - Sticky with blur
      ═══════════════════════════════════════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0c0c0c]/95 backdrop-blur-xl shadow-lg shadow-black/50' 
          : 'bg-[#0a0a0a]/80 backdrop-blur-md'
      }`}>
        {/* Gradient border glow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo with border and hover glow */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-violet-400/50 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 p-2 rounded-lg border border-white/20 bg-white/5 group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300">
                <img 
                  src={logo} 
                  alt="Adaptify" 
                  className="h-7 w-auto brightness-0 invert" 
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Adaptify
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#problem" className="text-sm text-gray-300 hover:text-white transition-colors">
                Problem
              </a>
              <a href="#leistungen" className="text-sm text-gray-300 hover:text-white transition-colors">
                Leistungen
              </a>
              <a href="#technologie" className="text-sm text-gray-300 hover:text-white transition-colors">
                Technologie
              </a>
            </nav>
            
            {/* Desktop CTA */}
            <button 
              onClick={() => setModalOpen(true)}
              className="hidden md:block relative group bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
            >
              <span className="relative z-10">Gespräch buchen</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
              aria-label="Menü öffnen"
            >
              <div className="space-y-1.5">
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Panel */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 shadow-2xl transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <nav className="flex flex-col p-6 gap-2">
            <a 
              href="#problem" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-white hover:text-cyan-400 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            >
              Problem
            </a>
            <a 
              href="#leistungen" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-white hover:text-cyan-400 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            >
              Leistungen
            </a>
            <a 
              href="#technologie" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg text-white hover:text-cyan-400 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            >
              Technologie
            </a>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button 
                onClick={() => { setModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-6 py-4 rounded-xl text-base font-semibold shadow-lg shadow-violet-500/20"
              >
                Gespräch buchen
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content">

      {/* ═══════════════════════════════════════════════════════════════
          HERO - Full screen with gradient
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        ref={heroFade.ref}
        className={`min-h-screen flex items-center justify-center px-6 relative transition-all duration-1000 ${
          heroFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Gradient Orbs - More colorful */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-fuchsia-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 text-sm text-gray-300 border border-white/10 rounded-full px-5 py-2.5 bg-white/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Digitalisierung aus einer Hand – für ambitionierte Mittelständler</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 tracking-tight">
            Euer kompletter{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                Digitalisierungspartner
              </span>
            </span>
            <br />
            <span className="text-gray-400 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
              von der Webseite bis zur KI
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            Keine halben Sachen. Wir bauen{' '}
            <span className="text-white">Webseiten, Apps, Automationen & KI-Workflows</span>{' '}
            – alles aus einer Hand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105"
            >
              <span className="hidden sm:inline">Kostenloses </span>Strategiegespräch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              disabled
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium border border-white/10 text-gray-500 cursor-not-allowed opacity-60"
            >
              <Play className="w-5 h-5 text-gray-500" />
              Demo (soon)
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-xs">Entdecken</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PAIN POINTS - First after Hero (Problem → Solution flow)
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="problem"
        ref={painFade.ref}
        className={`py-20 md:py-28 px-6 transition-all duration-1000 delay-200 ${
          painFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-red-400 mb-4 block">Das Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kommt euch das bekannt vor?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Die meisten KMUs verlieren täglich Zeit und Geld – weil niemand alles zusammenbringt.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Globe, 
                title: 'Veraltete oder keine Webseite?', 
                desc: 'Eure Konkurrenz hat moderne Seiten & Apps. Ihr verliert Kunden, bevor sie euch überhaupt finden.',
                gradient: 'from-red-500/20 to-orange-500/20'
              },
              { 
                icon: FileSpreadsheet, 
                title: 'Manuelle Prozesse überall?', 
                desc: 'Excel-Listen, Copy-Paste, E-Mail-Chaos. Jede Aufgabe dauert 3x so lang wie nötig.',
                gradient: 'from-orange-500/20 to-yellow-500/20'
              },
              { 
                icon: Workflow, 
                title: 'Keine Automatisierung?', 
                desc: 'Während andere KI nutzen, macht ihr alles von Hand. Ineffizienz kostet bares Geld.',
                gradient: 'from-yellow-500/20 to-red-500/20'
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-gradient-to-b from-white/5 to-transparent border border-red-500/20 rounded-2xl p-8 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.gradient} border border-red-500/20`}>
                  <item.icon className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TECH STACK SECTION - Solution with tools (after Problem)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden">
        <div className="text-center mb-10">
          {/* Badge */}
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 block">
            Unsere Lösung
          </span>
          
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Wir lösen das – mit den besten Tools
          </h2>
          
          {/* Subheading */}
          <p className="text-gray-400 max-w-2xl mx-auto px-6">
            Wir setzen die Tools ein, mit denen Tech-Startups und Konzerne arbeiten – für euer KMU.
          </p>
        </div>
        
        {/* Dual Row Scrolling Logos - contained width */}
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
          
          {/* Row 1 - scrolls left */}
          <div className="overflow-hidden mb-4">
            <div className="animate-scroll hover:[animation-play-state:paused]">
              {[...techStackTools, ...techStackTools].map((tool, i) => (
                <div 
                  key={`row1-${i}`} 
                  className="inline-flex items-center gap-3 mx-8 group"
                  title={tool.name}
                >
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-base text-gray-400 group-hover:text-white transition-colors whitespace-nowrap font-medium">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 2 - scrolls right (reverse) */}
          <div className="overflow-hidden">
            <div className="animate-scroll-reverse hover:[animation-play-state:paused]">
              {[...techStackTools.slice().reverse(), ...techStackTools.slice().reverse()].map((tool, i) => (
                <div 
                  key={`row2-${i}`} 
                  className="inline-flex items-center gap-3 mx-8 group"
                  title={tool.name}
                >
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="text-base text-gray-400 group-hover:text-white transition-colors whitespace-nowrap font-medium">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES - What we do (NEW!)
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="leistungen"
        ref={servicesFade.ref}
        className={`py-32 px-6 bg-gradient-to-b from-violet-500/5 to-transparent transition-all duration-1000 delay-200 ${
          servicesFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 block">Unsere Leistungen</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Wir digitalisieren euer komplettes Business
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Alles aus einer Hand – von der Webseite über Automatisierung bis zur KI. Kein Flickwerk, sondern ein System.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Globe2, 
                title: 'Moderne Webseiten & Shops', 
                desc: 'Webflow, Shopify oder Custom – schnell, schön und konvertierend.',
                color: 'cyan'
              },
              { 
                icon: Bot, 
                title: 'KI-gestützte Automatisierung', 
                desc: 'Workflows, die von selbst laufen – mehr Zeit fürs Kerngeschäft, weniger Routinearbeit.',
                color: 'violet'
              },
              { 
                icon: Code2, 
                title: 'Apps & Custom Software', 
                desc: 'Interne Tools, Kundenportale, individuelle Lösungen – professionell entwickelt, schnell geliefert.',
                color: 'fuchsia'
              },
              { 
                icon: Palette, 
                title: 'Design & Branding', 
                desc: 'Logo, CI, Design-System – alles damit ihr professionell ausseht.',
                color: 'pink'
              },
              { 
                icon: Layers, 
                title: 'Prozesse & Kollaboration', 
                desc: 'Jira, Confluence & Co. – strukturierte Abläufe für euer Team.',
                color: 'indigo'
              },
              { 
                icon: Headphones, 
                title: 'Laufender Support', 
                desc: 'Wir bleiben dran. Updates, Optimierung, Ansprechpartner – immer.',
                color: 'emerald'
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS - Animated counters
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        ref={statsFade.ref}
        className={`py-32 px-6 transition-all duration-1000 delay-200 ${
          statsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { ref: stat1.ref, value: stat1.count, suffix: '%', label: 'schnellere Prozesse', icon: Zap },
              { ref: stat2.ref, value: 5, suffix: '+', label: 'Jahre Erfahrung', icon: Calendar },
              { ref: stat3.ref, value: stat3.count, prefix: '2-', label: 'Wochen Setup', icon: Clock },
              { ref: null, value: 100, suffix: '%', label: 'maßgeschneidert', icon: CheckCircle2 }
            ].map((stat, i) => (
              <div 
                key={i} 
                ref={stat.ref}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TECH STACK - The showstopper (NEW!)
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="technologie"
        ref={techFade.ref}
        className={`py-32 px-6 transition-all duration-1000 delay-200 ${
          techFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4 block">Technologie</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Unser moderner Tech-Stack 2025
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Die besten Tools – perfekt kombiniert und KI-beschleunigt. Das macht uns zu eurem technologischen Vorsprung.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: Layers, 
                name: 'Atlassian Suite', 
                tagline: 'Prozesse & Kollaboration',
                desc: 'Jira, Confluence, Bitbucket – wir digitalisieren eure Prozesse damit und arbeiten transparent mit euch zusammen.',
                gradient: 'from-blue-500 to-blue-600',
                bgGradient: 'from-blue-500/10 to-blue-600/5'
              },
              { 
                icon: Sparkles, 
                name: 'Codium AI / Windsurf', 
                tagline: 'Entwicklung mit KI-Turbo',
                desc: 'Modernste KI-Tools beschleunigen unsere Entwicklung. Was sonst Monate braucht, liefern wir in Wochen.',
                gradient: 'from-cyan-400 to-teal-500',
                bgGradient: 'from-cyan-500/10 to-teal-500/5'
              },
              { 
                icon: Cpu, 
                name: 'Automation & AI Hub', 
                tagline: 'Intelligente Workflows',
                desc: 'Make, Zapier, n8n + eigene KI-Agents. Alle Prozesse automatisiert – damit Sie sich aufs Wesentliche konzentrieren können.',
                gradient: 'from-violet-500 to-purple-600',
                bgGradient: 'from-violet-500/10 to-purple-600/5'
              },
              { 
                icon: Globe2, 
                name: 'Web & App Builder', 
                tagline: 'Schnelle Umsetzung',
                desc: 'Webflow, Shopify, React, Next.js – performante Webseiten, Apps und Shops, maßgeschneidert für eure Marke.',
                gradient: 'from-fuchsia-500 to-pink-600',
                bgGradient: 'from-fuchsia-500/10 to-pink-600/5'
              }
            ].map((tech, i) => (
              <div 
                key={i}
                className={`group relative overflow-hidden bg-gradient-to-br ${tech.bgGradient} border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]`}
              >
                {/* Glow effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${tech.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <tech.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold">{tech.name}</h3>
                  </div>
                  
                  <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent`}>
                    {tech.tagline}
                  </p>
                  
                  <p className="text-gray-400 leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA - Bold with gradient
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        ref={ctaFade.ref}
        className={`py-32 px-6 relative transition-all duration-1000 delay-200 ${
          ctaFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Gradient - More colorful */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-cyan-500/5 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-cyan-400 mb-6">
            <Sparkles className="w-4 h-4" />
            Jetzt durchstarten
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Bereit für die komplette{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Digitalisierung?
            </span>
          </h2>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            In 30 Minuten zeigen wir euch live, wie euer Business 2025+ aussehen kann – 
            <span className="text-white"> mit Webseite, Automationen und KI.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-10 py-5 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-105"
            >
              Kostenloses Strategiegespräch buchen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <p className="mt-8 text-sm text-gray-600">
            ✓ Unverbindlich · ✓ Keine Kosten · ✓ Innerhalb von 24h Termin
          </p>
        </div>
      </section>

      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER - Extended with social links
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="py-16 px-6 border-t border-white/10 bg-[#030303]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg border border-white/20 bg-white/5">
                  <img src={logo} alt="Adaptify" className="h-7 w-auto brightness-0 invert" />
                </div>
                <span className="text-xl font-bold">Adaptify</span>
              </div>
              <p className="text-gray-500 mb-6 max-w-md">
                Die moderne Digitalisierungsagentur für KMUs. Webseiten, Apps, Automatisierung & KI – alles aus einer Hand.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:kontakt@adaptify.de" 
                  aria-label="E-Mail"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-violet-500/20 hover:border-violet-500/50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Leistungen</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#leistungen" className="hover:text-white transition-colors">Webseiten & Shops</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Apps & Software</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Automatisierung</a></li>
                <li><a href="#leistungen" className="hover:text-white transition-colors">Design & Branding</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-3 text-gray-500">
                <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
                <li><Link to="/agb" className="hover:text-white transition-colors">AGB</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 Adaptify. Alle Rechte vorbehalten.</p>
            <p className="text-sm text-gray-600">Made with ❤️ & AI in Germany</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn" 
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div 
            className="relative bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl sm:rounded-3xl w-full max-w-lg p-5 sm:p-8 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl" />
            
            <button 
              onClick={() => setModalOpen(false)} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8 relative z-10">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Kostenloses Strategiegespräch</h3>
              <p className="text-gray-400">30 Minuten, die euer Business verändern können.</p>
            </div>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="relative z-10 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center mb-4">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">Danke für deine Nachricht!</p>
                <p className="text-sm text-emerald-400/80">Wir melden uns innerhalb von 24 Stunden.</p>
              </div>
            )}
            
            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="relative z-10 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-center mb-4">
                <p className="font-medium">Fehler beim Senden</p>
                <p className="text-sm">Bitte schreibe uns direkt: <a href="mailto:kontakt@adaptify.de" className="underline">kontakt@adaptify.de</a></p>
              </div>
            )}
            
            {/* Form - hidden when success */}
            {submitStatus !== 'success' && (
              <form 
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-4 relative z-10"
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="Max Mustermann"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">E-Mail *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="max@firma.de"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Telefon (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="+49 123 456789"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Was ist eure größte Herausforderung? *</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                    placeholder="z.B. Wir brauchen eine moderne Webseite + Automatisierung..."
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    'Gespräch anfragen'
                  )}
                </button>
                <p className="text-center text-xs text-gray-600">
                  Wir melden uns innerhalb von 24 Stunden.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
