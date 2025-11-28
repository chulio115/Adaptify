import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

/**
 * Impressum Page
 * Standard German Impressum for small businesses
 * Replace placeholders with actual data
 */
export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Adaptify" className="h-10 w-auto" />
            <span className="text-xl font-bold tracking-tight">Adaptify</span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Impressum</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Angaben gemäß § 5 TMG */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Angaben gemäß § 5 TMG</h2>
              <p>
                <strong className="text-white">Adaptify Labs</strong><br />
                Julius Schulze<br />
                Poststraße 7<br />
                21227 Bendestorf<br />
                Deutschland
              </p>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Kontakt</h2>
              <p>
                E-Mail: info@adaptify-labs.de<br />
                Telefon: 0151 5630 3193
              </p>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                [USt-IdNr. falls vorhanden, ansonsten diese Section entfernen]
              </p>
            </section>

            {/* Berufsbezeichnung und berufsrechtliche Regelungen */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Berufsbezeichnung</h2>
              <p>
                Berufsbezeichnung: IT-Dienstleister / Digitalisierungsberater<br />
                Zuständige Kammer: [falls zutreffend]<br />
                Verliehen in: Deutschland
              </p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>
                Julius Schulze<br />
                Poststraße 7<br />
                21227 Bendestorf
              </p>
            </section>

            {/* EU-Streitschlichtung */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="mt-4">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftung für Inhalte */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>
              <p className="mt-4">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
                der Seiten verantwortlich.
              </p>
              <p className="mt-4">
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße 
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. 
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p className="mt-4">
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch 
                gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden 
                die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche 
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, 
                bitten wir um einen entsprechenden Hinweis.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 Adaptify. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
