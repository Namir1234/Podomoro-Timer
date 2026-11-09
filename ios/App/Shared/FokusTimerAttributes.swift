// Daten der Live Activity (Sperrbildschirm und Dynamic Island).
// Gehoert zu beiden Targets: Die App startet und aendert sie (FokusTimerPlugin.swift),
// die Widget-Erweiterung zeichnet sie (FokusWidget/FokusWidget.swift).

import ActivityKit
import Foundation

@available(iOS 16.2, *)
public struct FokusTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        /// Ueberschrift, z.B. "Fokus", "Kurze Pause" oder "Mehr gearbeitet"
        public var title: String
        /// Zweite Zeile, z.B. "Endet um 14:35" oder "Pausiert – noch 12:00"
        public var subtitle: String
        /// "focus", "short" oder "long" – bestimmt Symbol und Farbe
        public var phase: String
        /// Beginn der Phase (fuer den Balken) bzw. Beginn der Ueberzeit
        public var start: Date
        /// Ende der Phase
        public var end: Date
        public var paused: Bool
        /// Ueberzeit: die Uhr zaehlt ab `start` aufwaerts
        public var over: Bool
        /// Restzeit als Text, solange pausiert (iOS zaehlt dann nicht weiter)
        public var remaining: String
        /// Fortschritt 0…1, solange pausiert
        public var progress: Double
        /// Text, wenn die Zeit um ist und die App noch nicht weitergeschaltet hat
        public var doneText: String
        /// "coral" oder "original" – Farbe wie in der App
        public var design: String
    }

    public init() {}
}
