// Daten der Live Activity (Sperrbildschirm und Dynamic Island).
// Gehoert zu beiden Targets: Die App startet und aendert sie (FokusTimerPlugin.swift),
// die Widget-Erweiterung zeichnet sie (FokusWidget/FokusWidget.swift), und die Knoepfe
// darin aendern sie direkt (FokusTimerIntents.swift).

import ActivityKit
import Foundation

@available(iOS 16.2, *)
public struct FokusTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        /// Beschriftung neben der Zeit, z.B. "Fokus", "Kurze Pause" oder "Mehr gearbeitet"
        public var title: String
        /// "focus", "short" oder "long" – bestimmt die Farbe
        public var phase: String
        /// Beginn der Phase (fuer den Ring) bzw. Beginn der Ueberzeit
        public var start: Date
        /// Ende der Phase
        public var end: Date
        public var paused: Bool
        /// Ueberzeit: die Uhr zaehlt ab `start` aufwaerts
        public var over: Bool
        /// Restzeit in Sekunden, solange pausiert (iOS zaehlt dann nicht weiter)
        public var remainingSec: Double
        /// Laenge der ganzen Phase in Sekunden (fuer den Ring)
        public var total: Double
        /// Beschriftung, wenn die Zeit um ist und die App noch nicht weitergeschaltet hat
        public var doneText: String
        /// "coral" oder "original" – Farbe wie in der App
        public var design: String
    }

    public init() {}
}

@available(iOS 16.2, *)
extension FokusTimerAttributes.ContentState {
    /// Zeitspanne fuer Countdown und Ring (nie leer, sonst stuerzt Text(timerInterval:) ab)
    var range: ClosedRange<Date> { start...max(end, start.addingTimeInterval(1)) }
    /// Ueberzeit zaehlt bis zu 60 Minuten aufwaerts (wie in der App)
    var overRange: ClosedRange<Date> { start...start.addingTimeInterval(3600) }
    /// Anteil, der noch uebrig ist (fuer den Ring, solange pausiert)
    var leftFraction: Double { total > 0 ? min(1, max(0, remainingSec / total)) : 0 }

    /// "4:58" bzw. "1:02:03" – wie die Uhr-App
    var remainingText: String {
        let s = max(0, Int(remainingSec.rounded()))
        return s >= 3600
            ? String(format: "%d:%02d:%02d", s / 3600, s / 60 % 60, s % 60)
            : String(format: "%d:%02d", s / 60, s % 60)
    }
}
