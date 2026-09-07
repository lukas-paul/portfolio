import React from "react";
import Seo from "./Seo";
import "../Impressum.scss";

// Static legal page (§ 5 DDG / § 18 MStV). Mirrors the Impressum on the
// artist-portfolio site — same disclaimer / privacy boilerplate, adapted
// to this site's operator and hosting setup (Sanity + Netlify).
export default function Impressum() {
    return (
        <div className="impressum-page">
            <Seo title="Impressum" />
            <div className="title">
                <h1 className="headline">Impressum</h1>
            </div>

            <div className="impressum-text-container">
                <p>
                    Verantwortliche Person:
                    <br />
                    Lukas Frenzer
                    <br />
                    Niemetzstr. 13
                    <br />
                    12055 Berlin
                    <br />
                    <a href="mailto:lukas.frenzer@gmail.com">
                        lukas.frenzer@gmail.com
                    </a>
                </p>

                <h2>Haftungsausschluss Inhalte</h2>
                <p>
                    Der Inhalt dieser Seite wurde sorgfältig bearbeitet und
                    überprüft. Lukas Frenzer übernimmt jedoch keine Gewähr für
                    die Aktualität, Richtigkeit, Vollständigkeit oder Qualität
                    der bereitgestellten Informationen. Haftungsansprüche gegen
                    Lukas Frenzer, die sich auf Schäden materieller oder
                    ideeller Art beziehen, welche durch die Nutzung oder
                    Nichtnutzung der dargebotenen Informationen oder durch
                    fehlerhafte und unvollständige Informationen verursacht
                    wurden, sind grundsätzlich ausgeschlossen, sofern seitens
                    Lukas Frenzer kein nachweislich vorsätzliches oder grob
                    fahrlässiges Verschulden vorliegt. Lukas Frenzer behält
                    sich ausdrücklich das Recht vor, Teile der Seite oder das
                    gesamte Angebot ohne vorherige Ankündigung zu verändern, zu
                    ergänzen, zu löschen oder die Veröffentlichung einzustellen.
                </p>

                <h2>Verweise und Links</h2>
                <p>
                    Sofern Lukas Frenzer direkt oder indirekt auf fremde
                    Internetseiten verweist („Hyperlinks“), besteht eine Haftung
                    nur, sofern Kenntnis von den Inhalten besteht und es
                    technisch möglich und zumutbar ist, die Nutzung im Falle
                    rechtswidriger Inhalte zu verhindern. Lukas Frenzer erklärt
                    hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung die
                    verlinkten Seiten keine illegalen Inhalte enthalten haben.
                    Auf die aktuelle und zukünftige Gestaltung der verlinkten
                    Seiten besteht keinerlei Einfluss. Lukas Frenzer distanziert
                    sich daher hiermit ausdrücklich von allen inhaltlichen
                    Änderungen, die nach der Linksetzung auf den verlinkten
                    Seiten vorgenommen werden, und ist nicht verantwortlich für
                    den Inhalt, die Verfügbarkeit, die Richtigkeit und die
                    Genauigkeit der verlinkten Seiten, deren Angebote, Links und
                    Werbeanzeigen. Für illegale, fehlerhafte oder unvollständige
                    Inhalte und insbesondere für Schäden, die durch Nutzung oder
                    Nichtnutzung der auf den verlinkten Seiten angebotenen
                    Informationen entstehen, wird nicht gehaftet.
                </p>

                <h2>Urheberrechte</h2>
                <p>
                    Lukas Frenzer ist bestrebt, in allen Publikationen geltende
                    Urheberrechte zu beachten. Sollte es trotzdem zu einer
                    Urheberrechtsverletzung kommen, wird das entsprechende
                    Objekt nach Benachrichtigung aus der Publikation entfernt
                    bzw. mit dem entsprechenden Urheberrecht kenntlich gemacht.
                    Alle innerhalb des Internetangebots genannten und
                    gegebenenfalls durch Dritte geschützten Marken- und
                    Warenzeichen unterliegen uneingeschränkt den Bestimmungen
                    des jeweils gültigen Kennzeichenrechts und den Besitzrechten
                    der jeweiligen eingetragenen Eigentümer. Allein aufgrund der
                    bloßen Nennung ist nicht der Schluss zu ziehen, dass
                    Markenzeichen nicht durch Rechte Dritter geschützt sind. Das
                    Urheberrecht für die eigenen Inhalte dieser Website steht
                    allein Lukas Frenzer zu. Eine Vervielfältigung solcher
                    Grafiken oder Texte in anderen elektronischen oder
                    gedruckten Publikationen ist ohne ausdrückliche Zustimmung
                    von Lukas Frenzer nicht gestattet.
                </p>

                <h2>Rechtswirksamkeit</h2>
                <p>
                    Dieser Haftungsausschluss ist als Teil des Internetangebots
                    zu betrachten, von dem aus auf diese Seite verwiesen wurde.
                    Sofern Teile oder einzelne Formulierungen dieses Textes der
                    geltenden Rechtslage nicht, nicht mehr oder nicht vollständig
                    entsprechen sollten, bleiben die übrigen Teile des
                    Dokumentes in ihrem Inhalt und ihrer Gültigkeit hiervon
                    unberührt.
                </p>

                <h2>Datenschutzerklärung</h2>

                <p>
                    <strong>Kontaktaufnahme:</strong>
                    <br />
                    Bei der Kontaktaufnahme mit uns (z.B. per E-Mail, Telefon
                    oder über soziale Medien) werden die Angaben des Nutzers zur
                    Bearbeitung der Kontaktanfrage und deren Abwicklung gem.
                    Art. 6 Abs. 1 lit. b) DSGVO verarbeitet. Die Angaben der
                    Nutzer können in einem
                    Customer-Relationship-Management-System („CRM-System“) oder
                    einer vergleichbaren Anfragenorganisation gespeichert
                    werden. Wir löschen die Anfragen, sofern diese nicht mehr
                    erforderlich sind. Wir überprüfen die Erforderlichkeit alle
                    zwei Jahre; ferner gelten die gesetzlichen
                    Archivierungspflichten.
                </p>

                <p>
                    <strong>
                        Bereitstellung der Website und
                        Content-Delivery-Network (CDN)
                    </strong>
                    <br />
                    Unsere Website basiert auf React (Vite) und nutzt Sanity.io
                    (Sanity AS, Thorvald Meyers gate 11, 0555 Oslo, Norwegen)
                    als Cloud-basiertes Content-Management-System (CMS).
                    Sämtliche Inhalte der Website (Texte und Bilder) werden über
                    die Infrastruktur von Sanity geladen. Beim Aufruf unserer
                    Website stellt Ihr Browser automatisch Anfragen an das
                    Content Delivery Network (CDN) von Sanity, um die Bilder und
                    Inhalte auszuliefern. Bei diesem technischen Vorgang werden
                    standardmäßige Verbindungsdaten (Server-Logfiles)
                    verarbeitet, insbesondere Ihre IP-Adresse, Browsertyp,
                    Betriebssystem sowie Datum und Uhrzeit des Abrufs.
                </p>
                <p>
                    Die Verarbeitung dieser Daten erfolgt ausschließlich aus
                    technischen Gründen, um eine schnelle, stabile und sichere
                    Bereitstellung der Website-Inhalte zu gewährleisten. Die
                    Rechtsgrundlage für diese Verarbeitung ist unser
                    berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <p>
                    <strong>Drittstaatenübermittlung</strong>
                    <br />
                    Obwohl Sanity die primären Daten innerhalb der Europäischen
                    Union (Belgien) speichert, verfügt Sanity über ein globales
                    CDN-Netzwerk und Subunternehmer, wodurch Daten (wie Ihre
                    IP-Adresse im Rahmen der Serveranfrage) an Server außerhalb
                    des Europäischen Wirtschaftsraums (EWR) – insbesondere in
                    die USA – übertragen oder von dort aus eingesehen werden
                    können. Um ein angemessenes Datenschutzniveau bei einer
                    solchen Drittstaatenübermittlung sicherzustellen, haben wir
                    mit Sanity einen Auftragsverarbeitungsvertrag gemäß Art. 28
                    DSGVO (Data Processing Addendum, DPA) geschlossen, welcher
                    die EU-Standardvertragsklauseln (Standard Contractual
                    Clauses – SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO beinhaltet.
                    Diese verpflichten den Anbieter, das europäische
                    Datenschutzniveau auch bei der Datenverarbeitung außerhalb
                    der EU einzuhalten. Weitere Details finden Sie in den
                    Datenschutzbestimmungen von Sanity unter:{" "}
                    <a
                        href="https://www.sanity.io/legal/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.sanity.io/legal/privacy
                    </a>
                </p>

                <p>
                    <strong>
                        Hosting und Auslieferung der Website (Netlify)
                    </strong>
                    <br />
                    Diese Website wird bei Netlify gehostet. Anbieter ist die
                    Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA
                    94107, USA. Beim Aufruf der Website verarbeitet Netlify
                    technisch notwendige Zugriffsdaten in Server-Logfiles,
                    insbesondere Ihre IP-Adresse, Datum und Uhrzeit des
                    Zugriffs, die aufgerufene Datei, die übertragene Datenmenge,
                    Browsertyp und -version, Betriebssystem sowie die zuvor
                    besuchte Seite (Referrer). Zweck der Verarbeitung ist die
                    sichere, stabile und performante Bereitstellung der Website.
                    Rechtsgrundlage ist unser berechtigtes Interesse gemäß
                    Art. 6 Abs. 1 lit. f DSGVO.
                </p>
                <p>
                    Die Verarbeitung erfolgt auch in den USA. Mit Netlify haben
                    wir einen Auftragsverarbeitungsvertrag (Data Processing
                    Addendum) gemäß Art. 28 DSGVO geschlossen, der die
                    EU-Standardvertragsklauseln gemäß Art. 46 Abs. 2 lit. c
                    DSGVO einbezieht. Weitere Informationen finden Sie unter{" "}
                    <a
                        href="https://www.netlify.com/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.netlify.com/privacy/
                    </a>{" "}
                    und{" "}
                    <a
                        href="https://www.netlify.com/gdpr-ccpa/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.netlify.com/gdpr-ccpa/
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
