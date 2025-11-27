import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  Anchor,
  Sparkles,
  TrendingUp,
  Heart,
  Target,
  Shield,
  Zap,
  CheckCircle2,
  Quote,
  Calendar,
  Compass,
  Ship,
  Hammer
} from 'lucide-react';
import logo from '../assets/logo.png';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useTranslation } from 'react-i18next';

/**
 * Fade In Animation Hook
 */
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
 * Über Uns Page - Komplett überarbeitet
 * SEO: Digitalisierung KMU Deutschland, Digitalisierungsagentur Mittelstand
 * Tonfall: Schwäbischer Handwerksmeister - nahbar, ehrlich, bodenständig
 */
export default function UeberUns() {
  const { t } = useTranslation();
  const heroFade = useFadeIn();
  const realityFade = useFadeIn();
  const storyFade = useFadeIn();
  const missionFade = useFadeIn();
  const teamFade = useFadeIn();
  const casesFade = useFadeIn();
  const quoteFade = useFadeIn();
  const ctaFade = useFadeIn();
  
  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [jobFormSubmitted, setJobFormSubmitted] = useState(false);
  
  // Contact form state (like LandingPage)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.target);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      setSubmitStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303] text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg border border-white/20 bg-white/5 group-hover:border-white/40 transition-all">
              <img src={logo} alt="Adaptify" className="h-7 w-auto brightness-0 invert" />
            </div>
            <span className="text-xl font-bold tracking-tight">Adaptify</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/" className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('nav.backToHome')}</span>
            </Link>
            <Link to="/" className="sm:hidden flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('nav.back')}</span>
            </Link>
            {/* Language Toggle - dezent rechts */}
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section 
        ref={heroFade.ref}
        className={`pt-32 pb-20 md:pt-40 md:pb-28 px-6 relative transition-all duration-1000 ${
          heroFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-sm text-cyan-400 mb-6 border border-cyan-500/20 rounded-full px-4 py-2 bg-cyan-500/5">
            <Heart className="w-4 h-4" />
            <span>{t('about.badge')}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t('about.hero.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              {t('about.hero.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* REALITÄT - Zahlen */}
      <section 
        ref={realityFade.ref}
        className={`py-20 px-6 transition-all duration-1000 delay-200 ${
          realityFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4 block">{t('about.reality.badge')}</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {t('about.reality.title')}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {t('about.reality.subtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '63%', label: 'haben keine klare Digitalstrategie', source: 'Bitkom 2025' },
              { value: '78%', label: 'wissen nicht, wo sie anfangen sollen', source: 'BMWK 2025' },
              { value: '41%', label: 'haben eine Website älter als 5 Jahre', source: 'Statista 2025' },
              { value: '2,6×', label: 'schneller wachsen digitale KMUs', source: 'Google/Bitkom 2025', highlight: true }
            ].map((stat, i) => (
              <div 
                key={i}
                className={`rounded-2xl p-6 text-center ${
                  stat.highlight 
                    ? 'bg-gradient-to-b from-emerald-500/20 to-transparent border border-emerald-500/30' 
                    : 'bg-gradient-to-b from-white/5 to-transparent border border-white/10'
                }`}
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.highlight ? 'text-emerald-400' : 'text-white'}`}>
                  {stat.value}
                </div>
                <p className="text-gray-300 text-sm mb-2">{stat.label}</p>
                <p className="text-xs text-gray-600">Quelle: {stat.source}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-semibold mb-6 text-white">Warum's so schwer ist – und warum das völlig normal ist</h3>
            <div className="grid md:grid-cols-2 gap-8 text-gray-400">
              <div className="space-y-4">
                <p>
                  <strong className="text-white">Ihr habt ein Geschäft zu führen.</strong> Kunden zu betreuen. 
                  Mitarbeiter zu managen. Rechnungen zu schreiben. Wer hat da noch Zeit, sich in 
                  React, SEO und DSGVO einzuarbeiten?
                </p>
                <p>
                  <strong className="text-white">Die großen Agenturen?</strong> Wollen 50.000€ für eine Website. 
                  Und dann habt ihr immer noch kein Buchungssystem.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <strong className="text-white">Die Baukästen?</strong> Klar, Wix und Jimdo gibt's. 
                  Aber nach 3 Abenden Rumklicken sieht das immer noch aus wie „Webseite Baujahr 2015".
                </p>
                <p>
                  <strong className="text-white">Das ist kein Versagen</strong> – das ist einfach nicht euer Job. 
                  Genau dafür gibt's uns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY - Easy Living */}
      <section 
        ref={storyFade.ref}
        className={`py-20 md:py-28 px-6 bg-gradient-to-b from-cyan-500/5 to-transparent transition-all duration-1000 delay-200 ${
          storyFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 block">Unsere Geschichte</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Wie alles mit einem selbstgebauten Katamaran begann
            </h2>
          </div>
          
          {/* Die große Story */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-6 text-gray-300 leading-relaxed">
                <div className="flex items-center gap-3 mb-6">
                  <Ship className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Easy Living – ein Lebenswerk</h3>
                </div>
                
                <p className="text-lg">
                  <strong className="text-white">Mein Vater hat über 10 Jahre lang einen 44-Fuß-Segelkatamaran gebaut.</strong> Mit 
                  den eigenen Händen. Jede Planke, jedes Segel, jede Schraube. Wer so etwas macht, 
                  der weiß, was Durchhaltevermögen bedeutet.
                </p>
                
                <p>
                  Seit 2016 ist er damit im Charter-Geschäft – <strong className="text-white">Karibik, Mittelmeer, 
                  Ostsee-Törns von Travemünde aus</strong>. Ein Ein-Mann-Unternehmen, aufgebaut mit nichts außer 
                  Können, Leidenschaft und verdammt viel Arbeit.
                </p>
                
                <p>
                  <strong className="text-white">Sein Geschäft? Läuft.</strong> Die Stammkunden schwärmen. Die Bewertungen sind 
                  erstklassig. Wer einmal mit ihm gesegelt ist, kommt wieder.
                </p>
                
                <p className="text-lg text-white">
                  Aber die Website? Die war von 2012.
                </p>
                
                <p>
                  Kein Responsive Design. Keine Online-Buchung. Kein SEO. Während neue Kunden bei Google 
                  nach „Katamaran Charter Ostsee" suchten, fanden sie die Konkurrenz – nicht meinen Vater.
                </p>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sticky top-28">
                  <div className="flex items-center gap-3 mb-4">
                    <Hammer className="w-6 h-6 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">10 Jahre Handarbeit</span>
                  </div>
                  
                  <Anchor className="w-16 h-16 text-cyan-400 mb-4" />
                  <h4 className="text-xl font-bold mb-2">Easy Living</h4>
                  <p className="text-gray-500 text-sm mb-4">44-Fuß-Katamaran • Heimathafen Travemünde</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Compass className="w-4 h-4 text-cyan-400" />
                      <span>Karibik, Mittelmeer, Ostsee</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span>Im Charter seit 2016</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart className="w-4 h-4 text-cyan-400" />
                      <span>Ein-Mann-Unternehmen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Problem + Lösung */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <span className="text-2xl">🤔</span> Das Problem
              </h4>
              <p className="text-gray-400 leading-relaxed">
                „Ich bin Segler, kein IT-Mensch", hat mein Vater immer gesagt. Und er hatte völlig recht. 
                <strong className="text-white"> Warum sollte jemand, der einen Katamaran von Hand bauen kann, 
                auch noch wissen, wie man React-Apps programmiert?</strong>
              </p>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Er hatte schlicht keine Zeit und keine Lust, sich monatelang mit Code, SEO, DSGVO und 
                Zahlungssystemen zu beschäftigen. Er wollte segeln und seine Gäste glücklich machen.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-2xl p-8">
              <h4 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                <span className="text-2xl">💡</span> Die Lösung
              </h4>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Also haben wir es 2024 für ihn gemacht.</strong> Eine komplett 
                neue Plattform: Moderne React-Website, Echtzeit-Buchungskalender, 
                automatisierte E-Mails, 100% mobil-optimiert, SEO-stark.
              </p>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Alles, was er brauchte – ohne selbst eine Zeile Code anfassen zu müssen.
              </p>
            </div>
          </div>
          
          {/* Erkenntnis */}
          <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-2xl p-8 md:p-10 text-center">
            <Sparkles className="w-10 h-10 text-violet-400 mx-auto mb-6" />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Und dann haben wir's kapiert:</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Wenn mein Vater – <strong className="text-white">ein erfolgreicher Unternehmer, der einen verdammten 
              Katamaran mit eigenen Händen gebaut hat</strong> – bei der Digitalisierung Hilfe braucht...
            </p>
            <p className="text-xl text-white mt-6 font-semibold">
              ...wie viele andere Unternehmer da draußen stehen vor dem gleichen Problem?
            </p>
            <p className="text-gray-400 mt-4">
              Tausende? Zehntausende? Der gesamte deutsche Mittelstand?
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section 
        ref={missionFade.ref}
        className={`py-20 px-6 transition-all duration-1000 delay-200 ${
          missionFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4 block">{t('about.mission.badge')}</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">{t('about.mission.title')}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('about.mission.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, titleKey: 'about.mission.values.custom.title', descKey: 'about.mission.values.custom.desc', gradient: 'from-cyan-500 to-cyan-600' },
              { icon: Shield, titleKey: 'about.mission.values.honest.title', descKey: 'about.mission.values.honest.desc', gradient: 'from-violet-500 to-violet-600' },
              { icon: Zap, titleKey: 'about.mission.values.fast.title', descKey: 'about.mission.values.fast.desc', gradient: 'from-fuchsia-500 to-fuchsia-600' },
              { icon: Heart, titleKey: 'about.mission.values.partner.title', descKey: 'about.mission.values.partner.desc', gradient: 'from-emerald-500 to-emerald-600' }
            ].map((value, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(value.titleKey)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section 
        ref={teamFade.ref}
        className={`py-20 px-6 bg-gradient-to-b from-violet-500/5 to-transparent transition-all duration-1000 delay-200 ${
          teamFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4 block">{t('about.team.badge')}</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t('about.team.title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('about.team.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-6 text-2xl font-bold">JS</div>
              <h3 className="text-xl font-bold mb-1">Julius Schulze</h3>
              <p className="text-cyan-400 text-sm mb-4">Gründer & Entwicklung</p>
              <p className="text-gray-400 italic mb-6">
                „Ich hab gesehen, wie mein Vater – ein Mann, der einen Katamaran mit eigenen Händen gebaut hat – 
                bei einer Website nicht das geschehen hat, was er sehen wollte. Das darf nicht sein. Genau dafür machen wir das hier."
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Automatisierung', 'Atlassian'].map((skill, j) => (
                  <span key={j} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 flex items-center justify-center mb-6 text-2xl font-bold">+1</div>
              <h3 className="text-xl font-bold mb-1">Verstärkung gesucht</h3>
              <p className="text-cyan-400 text-sm mb-4">Wir wachsen</p>
              <p className="text-gray-400 italic mb-6">
                „Du hast Bock auf Mittelstand statt Konzern? Auf echte Projekte statt Powerpoint? 
                Dann meld dich – wir suchen Leute mit Macher-Mentalität."
              </p>
              <button 
                onClick={() => setJobModalOpen(true)}
                className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                → Jetzt bewerben
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section 
        ref={casesFade.ref}
        className={`py-20 px-6 transition-all duration-1000 delay-200 ${
          casesFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-4 block">Erfolgsgeschichten</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Was wir bisher gebaut haben</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Easy Living Katamaran', industry: 'Charter & Tourismus', result: 'Komplett-Digitalisierung',
                desc: 'Von der 2005er-Website zur modernen Buchungsplattform. Online-Kalender, automatische Mails – alles aus einem Guss.',
                metrics: ['Echtzeit-Buchungen', 'Atlassian-Integration', 'SEO-optimiert'], highlight: true
              },
              { 
                title: '[Projekt 2]', industry: '[Branche]', result: '[Ergebnis]',
                desc: '[Dein nächstes Projekt könnte hier stehen. Wir dokumentieren jedes Projekt als Case Study.]',
                metrics: ['[Metrik 1]', '[Metrik 2]', '[Metrik 3]'], highlight: false
              },
              { 
                title: '[Projekt 3]', industry: '[Branche]', result: '[Ergebnis]',
                desc: '[Platz für weitere Erfolgsgeschichten – sobald wir sie gemeinsam geschrieben haben.]',
                metrics: ['[Metrik 1]', '[Metrik 2]', '[Metrik 3]'], highlight: false
              }
            ].map((c, i) => (
              <div key={i} className={`relative rounded-2xl p-8 ${c.highlight ? 'bg-gradient-to-b from-cyan-500/20 to-transparent border-2 border-cyan-500/30' : 'bg-white/5 border border-white/10'}`}>
                {c.highlight && <div className="absolute -top-3 left-6 px-3 py-1 bg-cyan-500 text-xs font-semibold rounded-full">Unser erstes Projekt</div>}
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{c.industry}</p>
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-cyan-400 font-semibold mb-4">{c.result}</p>
                <p className="text-gray-400 text-sm mb-6">{c.desc}</p>
                <div className="space-y-2">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />{m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZITAT */}
      <section 
        ref={quoteFade.ref}
        className={`py-20 px-6 transition-all duration-1000 delay-200 ${
          quoteFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-violet-400 mx-auto mb-8 opacity-50" />
          <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
            „Digitalisierung muss kein Hexenwerk sein. Und sie muss nicht 50.000 Euro kosten. 
            Wir wollen, dass jeder Handwerksbetrieb, jedes Familienunternehmen die gleichen Chancen hat 
            wie die großen Player – nur eben passend zum eigenen Budget."
          </blockquote>
          <p className="text-gray-500">– Julius Schulze, Gründer Adaptify</p>
        </div>
      </section>

      {/* CTA */}
      <section 
        ref={ctaFade.ref}
        className={`py-20 md:py-28 px-6 relative transition-all duration-1000 delay-200 ${
          ctaFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-violet-500/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Klingt gut? Dann lasst uns reden.</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            30 Minuten, unverbindlich, kostenlos. Wir schauen uns gemeinsam an, wo ihr steht – 
            und ob wir euch helfen können. <strong className="text-white">Kein Verkaufsgespräch, versprochen.</strong>
          </p>
          
          <button 
            onClick={() => setContactModalOpen(true)}
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105"
          >
            Kostenloses Erstgespräch buchen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="mt-6 text-sm text-gray-600">
            ✓ Unverbindlich · ✓ Keine versteckten Kosten · ✓ Antwort innerhalb 24h
          </p>
        </div>
      </section>

      {/* KONTAKT MODAL (wie LandingPage) */}
      {contactModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn" 
          onClick={() => setContactModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div 
            className="relative bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/10 rounded-2xl sm:rounded-3xl w-full max-w-lg p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl" />
            
            <button 
              onClick={() => setContactModalOpen(false)} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <span className="text-xl">✕</span>
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
                <p className="text-sm">Bitte versuche es erneut.</p>
              </div>
            )}
            
            {/* Form - hidden when success */}
            {submitStatus !== 'success' && (
              <form 
                name="contact-ueber-uns"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className="space-y-4 relative z-10"
              >
                <input type="hidden" name="form-name" value="contact-ueber-uns" />
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

      {/* BEWERBUNG MODAL */}
      {jobModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Bei Adaptify bewerben</h3>
              <button onClick={() => { setJobModalOpen(false); setJobFormSubmitted(false); }} className="text-gray-500 hover:text-white">✕</button>
            </div>
            
            {jobFormSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold mb-2">Bewerbung eingegangen!</h4>
                <p className="text-gray-400">Wir schauen uns deine Nachricht an und melden uns zeitnah.</p>
              </div>
            ) : (
              <form 
                name="bewerbung" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(new FormData(form)).toString()
                  }).then(() => setJobFormSubmitted(true)).catch(() => alert('Fehler beim Senden'));
                }}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="bewerbung" />
                <p className="hidden"><label>Nicht ausfüllen: <input name="bot-field" /></label></p>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name *</label>
                  <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">E-Mail *</label>
                  <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Telefon</label>
                  <input type="tel" name="phone" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Erfahrung / Skills</label>
                  <input type="text" name="experience" placeholder="z.B. React, Node.js, Design..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Erzähl was über dich *</label>
                  <textarea name="about" rows={5} required placeholder="Was treibt dich an? Warum Mittelstand? Was kannst du gut?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 py-4 rounded-xl font-semibold transition-all">
                  Bewerbung abschicken
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#030303]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Adaptify" className="h-8 w-auto brightness-0 invert" />
            <span className="font-bold">Adaptify Labs</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Startseite</Link>
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
          </div>
          
          <p className="text-sm text-gray-600">Made with ❤️ & AI in Germany</p>
        </div>
      </footer>
    </div>
  );
}
