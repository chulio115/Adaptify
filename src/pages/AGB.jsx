import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

/**
 * AGB Page
 * Standard German Terms and Conditions for IT Services
 * Replace placeholders with actual data
 */
export default function AGB() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-gray-400 mb-12">Stand: 28.11.2025</p>
          
          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* § 1 Geltungsbereich */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen 
                Adaptify Labs, Poststraße 7, 21227 Bendestorf (nachfolgend "Anbieter") und dem Kunden über 
                Dienstleistungen im Bereich der Digitalisierung, IT-Beratung und Softwareentwicklung.
              </p>
              <p className="mt-4">
                (2) Die AGB gelten ausschließlich. Abweichende, entgegenstehende oder ergänzende 
                Allgemeine Geschäftsbedingungen des Kunden werden nur dann Vertragsbestandteil, 
                wenn und soweit der Anbieter ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
              </p>
              <p className="mt-4">
                (3) Diese AGB gelten sowohl gegenüber Verbrauchern als auch gegenüber Unternehmern, 
                es sei denn, in der jeweiligen Klausel wird eine Differenzierung vorgenommen.
              </p>
            </section>

            {/* § 2 Vertragsschluss */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 2 Vertragsschluss</h2>
              <p>
                (1) Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich 
                bindendes Angebot, sondern eine Aufforderung zur Angebotsabgabe dar.
              </p>
              <p className="mt-4">
                (2) Der Kunde kann eine unverbindliche Anfrage über das Kontaktformular, per 
                E-Mail oder telefonisch stellen. Auf Basis dieser Anfrage erstellt der Anbieter 
                ein individuelles Angebot.
              </p>
              <p className="mt-4">
                (3) Der Vertrag kommt durch die schriftliche Annahme des Angebots durch den Kunden 
                zustande. Die Annahme kann auch durch Auftragserteilung per E-Mail erfolgen.
              </p>
              <p className="mt-4">
                (4) Die Vertragssprache ist Deutsch.
              </p>
            </section>

            {/* § 3 Leistungsumfang */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 3 Leistungsumfang</h2>
              <p>
                (1) Der Umfang der vom Anbieter zu erbringenden Leistungen ergibt sich aus dem 
                jeweiligen Angebot bzw. der Auftragsbestätigung.
              </p>
              <p className="mt-4">
                (2) Der Anbieter erbringt folgende Dienstleistungen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Webdesign und Webentwicklung</li>
                <li>App-Entwicklung</li>
                <li>IT-Beratung und Prozessoptimierung</li>
                <li>Implementierung von Software-Lösungen (z.B. Atlassian-Produkte)</li>
                <li>KI-gestützte Automatisierung</li>
                <li>Design und Branding</li>
                <li>Wartung und Support</li>
              </ul>
              <p className="mt-4">
                (3) Der Anbieter ist berechtigt, sich zur Erfüllung seiner Verpflichtungen 
                Dritter zu bedienen.
              </p>
            </section>

            {/* § 4 Mitwirkungspflichten des Kunden */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 4 Mitwirkungspflichten des Kunden</h2>
              <p>
                (1) Der Kunde stellt dem Anbieter alle für die Durchführung des Projekts 
                erforderlichen Informationen, Unterlagen und Zugänge rechtzeitig zur Verfügung.
              </p>
              <p className="mt-4">
                (2) Der Kunde benennt einen Ansprechpartner, der berechtigt ist, für den Kunden 
                verbindliche Entscheidungen zu treffen oder unverzüglich herbeizuführen.
              </p>
              <p className="mt-4">
                (3) Der Kunde prüft und genehmigt Zwischenergebnisse innerhalb einer angemessenen 
                Frist (in der Regel 5 Werktage).
              </p>
            </section>

            {/* § 5 Vergütung und Zahlungsbedingungen */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 5 Vergütung und Zahlungsbedingungen</h2>
              <p>
                (1) Die Vergütung richtet sich nach dem individuellen Angebot. Alle Preise 
                verstehen sich zuzüglich der gesetzlichen Mehrwertsteuer, sofern nicht anders 
                angegeben.
              </p>
              <p className="mt-4">
                (2) Sofern nicht anders vereinbart, gilt folgende Zahlungsweise:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>50% bei Auftragserteilung</li>
                <li>50% nach Fertigstellung und Abnahme</li>
              </ul>
              <p className="mt-4">
                (3) Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug fällig.
              </p>
              <p className="mt-4">
                (4) Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 
                9 Prozentpunkten über dem Basiszinssatz (bei Unternehmern) bzw. 5 Prozentpunkten 
                über dem Basiszinssatz (bei Verbrauchern) zu verlangen.
              </p>
            </section>

            {/* § 6 Abnahme */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 6 Abnahme</h2>
              <p>
                (1) Nach Fertigstellung der vereinbarten Leistungen fordert der Anbieter den 
                Kunden zur Abnahme auf.
              </p>
              <p className="mt-4">
                (2) Der Kunde ist verpflichtet, die Leistungen innerhalb von 14 Tagen nach 
                Aufforderung abzunehmen, sofern keine wesentlichen Mängel vorliegen.
              </p>
              <p className="mt-4">
                (3) Die Abnahme gilt als erfolgt, wenn der Kunde die Leistungen nicht innerhalb 
                von 14 Tagen nach Aufforderung abnimmt und auch keine wesentlichen Mängel rügt.
              </p>
            </section>

            {/* § 7 Gewährleistung */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 7 Gewährleistung</h2>
              <p>
                (1) Der Anbieter gewährleistet, dass die erbrachten Leistungen den vereinbarten 
                Anforderungen entsprechen und frei von Mängeln sind, die den Wert oder die 
                Tauglichkeit aufheben oder mindern.
              </p>
              <p className="mt-4">
                (2) Bei Mängeln hat der Anbieter das Recht zur Nachbesserung. Schlägt die 
                Nachbesserung zweimal fehl, kann der Kunde vom Vertrag zurücktreten oder die 
                Vergütung mindern.
              </p>
              <p className="mt-4">
                (3) Die Gewährleistungsfrist beträgt 12 Monate ab Abnahme, sofern nicht anders 
                vereinbart oder gesetzlich vorgeschrieben.
              </p>
            </section>

            {/* § 8 Haftung */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 8 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p className="mt-4">
                (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer 
                wesentlichen Vertragspflicht (Kardinalpflicht) und nur auf den vorhersehbaren, 
                typischerweise eintretenden Schaden.
              </p>
              <p className="mt-4">
                (3) Die vorstehenden Haftungsbeschränkungen gelten nicht bei Verletzung von 
                Leben, Körper oder Gesundheit.
              </p>
              <p className="mt-4">
                (4) Eine weitergehende Haftung des Anbieters ist ausgeschlossen.
              </p>
            </section>

            {/* § 9 Nutzungsrechte */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 9 Nutzungsrechte</h2>
              <p>
                (1) Mit vollständiger Bezahlung erhält der Kunde die für den vereinbarten Zweck 
                erforderlichen Nutzungsrechte an den erstellten Werken.
              </p>
              <p className="mt-4">
                (2) Sofern nicht anders vereinbart, erwirbt der Kunde ein einfaches, zeitlich 
                und räumlich unbeschränktes Nutzungsrecht.
              </p>
              <p className="mt-4">
                (3) Der Anbieter ist berechtigt, die erbrachten Leistungen zu Referenzzwecken 
                (z.B. Portfolio, Website) zu verwenden, sofern der Kunde nicht widerspricht.
              </p>
            </section>

            {/* § 10 Vertraulichkeit */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 10 Vertraulichkeit</h2>
              <p>
                (1) Die Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen 
                vertraulichen Informationen geheim zu halten und nicht an Dritte weiterzugeben.
              </p>
              <p className="mt-4">
                (2) Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses fort.
              </p>
            </section>

            {/* § 11 Laufzeit und Kündigung */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 11 Laufzeit und Kündigung</h2>
              <p>
                (1) Bei einmaligen Projekten endet der Vertrag mit der Abnahme und vollständigen 
                Bezahlung.
              </p>
              <p className="mt-4">
                (2) Dauerschuldverhältnisse (z.B. Wartungsverträge) können mit einer Frist von 
                3 Monaten zum Monatsende gekündigt werden, sofern nicht anders vereinbart.
              </p>
              <p className="mt-4">
                (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
            </section>

            {/* § 12 Schlussbestimmungen */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">§ 12 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des 
                UN-Kaufrechts.
              </p>
              <p className="mt-4">
                (2) Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit 
                gesetzlich zulässig, [Ort].
              </p>
              <p className="mt-4">
                (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt 
                die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
              <p className="mt-4">
                (4) Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform. Dies 
                gilt auch für die Abbedingung dieses Schriftformerfordernisses.
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
