import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

/**
 * Datenschutzerklärung Page
 * Standard German Privacy Policy (DSGVO compliant)
 * Replace placeholders with actual data
 */
export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Datenschutzerklärung</h1>
          <p className="text-gray-400 mb-12">Stand: 28.11.2025</p>
          
          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* 1. Verantwortlicher */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Verantwortlicher</h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <strong className="text-white">Adaptify Labs</strong><br />
                Inhaber: Julius Schulze<br />
                Poststraße 7<br />
                21227 Bendestorf<br />
                E-Mail: info@adaptify-labs.de<br />
                Telefon: 0151 5630 3193
              </p>
            </section>

            {/* 2. Übersicht der Verarbeitungen */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Übersicht der Verarbeitungen</h2>
              <p>
                Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke 
                ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Arten der verarbeiteten Daten</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
                <li>Inhaltsdaten (z.B. Eingaben in Formularen)</li>
                <li>Nutzungsdaten (z.B. besuchte Seiten, Interesse an Inhalten)</li>
                <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
              </ul>
            </section>

            {/* 3. Kontaktformular */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Kontaktaufnahme</h2>
              <p>
                Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail oder Telefon) 
                werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung 
                gemäß Art. 6 Abs. 1 lit. b) DSGVO verarbeitet.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Verarbeitete Daten:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer (optional)</li>
                <li>Nachrichteninhalt</li>
              </ul>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Speicherdauer:</h3>
              <p>
                Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung 
                nicht mehr erforderlich sind. Dies ist in der Regel der Fall, wenn die jeweilige 
                Kommunikation abgeschlossen ist und keine gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </section>

            {/* 4. Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies</h2>
              <p>
                Unsere Website verwendet Cookies und vergleichbare Technologien (z.B. localStorage). 
                Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die 
                Ihr Browser speichert.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Technisch notwendige Cookies</h3>
              <p>
                Wir setzen technisch notwendige Cookies ein, um unsere Website nutzerfreundlicher zu 
                gestalten. Einige Elemente unserer Website erfordern es, dass der aufrufende Browser 
                auch nach einem Seitenwechsel identifiziert werden kann.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Speicherung deiner Cookie-Einwilligung (akzeptiert / abgelehnt)</li>
                <li>Speicherung deiner Spracheinstellung (z.B. Deutsch/Englisch)</li>
                <li>Speicherung deiner Theme-Einstellung (Hell-/Dunkelmodus)</li>
              </ul>
              <p className="mt-4">
                Wir setzen keine Tracking- oder Marketing-Cookies ein und nutzen keine Webanalyse-
                Dienste (z.B. Google Analytics, Facebook Pixel, Matomo, Plausible).
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cookie-Einstellungen</h3>
              <p>
                Wir speichern Ihre Cookie-Präferenz (Zustimmung oder Ablehnung) sowie bestimmte 
                Komfort-Einstellungen (Sprache und Theme) in Ihrem Browser (localStorage), um Ihnen 
                bei zukünftigen Besuchen die passenden Einstellungen anzuzeigen und das Cookie-Banner 
                nicht erneut einblenden zu müssen.
              </p>
              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Widerspruch und Opt-Out</h3>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies 
                informiert werden und Cookies nur im Einzelfall erlauben. Bei der Deaktivierung 
                von Cookies kann die Funktionalität unserer Website eingeschränkt sein.
              </p>
            </section>

            {/* 5. Hosting */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Hosting</h2>
              <p>
                Diese Website wird bei Netlify gehostet. Anbieter ist die Netlify, Inc.,
                2325 3rd Street, Suite 296, San Francisco, CA 94107, USA.
              </p>
              <p className="mt-4">
                Beim Besuch unserer Website erfasst Netlify automatisch Informationen in sogenannten 
                Server-Log-Files. Diese Informationen werden temporär in einem Logfile gespeichert. 
                Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
              <p className="mt-4">
                Weitere Informationen finden Sie in der Datenschutzerklärung von Netlify:{' '}
                <a 
                  href="https://www.netlify.com/privacy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  Netlify Privacy Policy
                </a>
              </p>
            </section>

            {/* 6. Ihre Rechte */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Ihre Rechte</h2>
              <p>
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden 
                personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 mt-4">
                <li>
                  <strong className="text-white">Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das 
                  Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten verarbeiten.
                </li>
                <li>
                  <strong className="text-white">Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben 
                  das Recht, die Berichtigung unrichtiger Daten zu verlangen.
                </li>
                <li>
                  <strong className="text-white">Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das 
                  Recht, die Löschung Ihrer Daten zu verlangen.
                </li>
                <li>
                  <strong className="text-white">Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie 
                  haben das Recht, die Einschränkung der Verarbeitung zu verlangen.
                </li>
                <li>
                  <strong className="text-white">Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben 
                  das Recht, Ihre Daten in einem strukturierten Format zu erhalten.
                </li>
                <li>
                  <strong className="text-white">Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das 
                  Recht, jederzeit Widerspruch gegen die Verarbeitung einzulegen.
                </li>
              </ul>
            </section>

            {/* 7. Beschwerderecht */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Beschwerderecht bei einer Aufsichtsbehörde</h2>
              <p>
                Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs 
                steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn Sie der Ansicht 
                sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
              </p>
              <p className="mt-4">
                Die für uns zuständige Aufsichtsbehörde ist:<br />
                Die Landesbeauftragte für den Datenschutz Niedersachsen (LfD Niedersachsen)<br />
                Prinzenstraße 5<br />
                30159 Hannover<br />
                Deutschland<br />
                Website: https://lfd.niedersachsen.de
              </p>
            </section>

            {/* 8. Aktualität */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 28.11.2025.
              </p>
              <p className="mt-4">
                Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher 
                beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung 
                zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite 
                abgerufen werden.
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
