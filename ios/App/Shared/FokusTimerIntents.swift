// Knoepfe in der Live Activity (Pause/Weiter und Stopp, ab iOS 17) und alles, was
// App und Knoepfe gemeinsam brauchen: Mitteilung am Ende planen und Aktionen fuer
// die Web-App vormerken. Gehoert zu beiden Targets; ausgefuehrt wird ein
// LiveActivityIntent immer im Prozess der App (auch wenn sie im Hintergrund ist).
//
// Die Web-App (js/pomodoro.js) laeuft im Hintergrund nicht zuverlaessig weiter.
// Darum aendert der Knopf die Live Activity und die Mitteilung selbst und merkt
// sich den neuen Stand; die App holt ihn beim naechsten Oeffnen ab (takePending).

import ActivityKit
import AppIntents
import Foundation
import UserNotifications

@available(iOS 16.2, *)
enum FokusTimerStore {
    static let notificationId = "fokus-timeup"
    private static let pendingKey = "fokus.pending"
    private static let notifyTextKey = "fokus.notifyText"

    // MARK: Mitteilung am Ende

    /// Titel und Text der Mitteilung merken (fuer "Weiter" ueber den Knopf)
    static func rememberNotifyText(title: String, body: String) {
        UserDefaults.standard.set([title, body], forKey: notifyTextKey)
    }

    static func scheduleNotification(at date: Date) {
        let center = UNUserNotificationCenter.current()
        center.removePendingNotificationRequests(withIdentifiers: [notificationId])
        let seconds = date.timeIntervalSinceNow
        guard seconds > 0.5 else { return }
        let text = UserDefaults.standard.stringArray(forKey: notifyTextKey) ?? []
        let content = UNMutableNotificationContent()
        content.title = text.first ?? "Fokus"
        content.body = text.count > 1 ? text[1] : ""
        content.sound = .default
        content.interruptionLevel = .timeSensitive
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: seconds, repeats: false)
        center.add(UNNotificationRequest(identifier: notificationId, content: content, trigger: trigger))
    }

    static func cancelNotification() {
        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: [notificationId])
    }

    // MARK: Aktionen fuer die Web-App

    private static func remember(_ action: [String: Any]) {
        UserDefaults.standard.set(action, forKey: pendingKey)
    }

    /// Liefert die zuletzt per Knopf ausgeloeste Aktion und loescht sie
    static func takePending() -> [String: Any]? {
        let action = UserDefaults.standard.dictionary(forKey: pendingKey)
        UserDefaults.standard.removeObject(forKey: pendingKey)
        return action
    }

    // MARK: Knopf-Aktionen

    static func togglePause() async {
        guard let activity = Activity<FokusTimerAttributes>.activities.first else { return }
        var state = activity.content.state
        let now = Date()
        if state.over { return }                     // Ueberzeit: nichts zu pausieren
        if state.paused {
            state.paused = false
            state.end = now.addingTimeInterval(state.remainingSec)
            state.start = state.end.addingTimeInterval(-state.total)
            scheduleNotification(at: state.end)
        } else {
            guard state.end > now else { return }    // schon abgelaufen
            state.paused = true
            state.remainingSec = state.end.timeIntervalSince(now)
            cancelNotification()
        }
        await activity.update(ActivityContent(state: state, staleDate: state.paused ? nil : state.end))
        remember([
            "action": state.paused ? "pause" : "resume",
            "phase": state.phase,
            "remaining": state.remainingSec,
            "end": state.end.timeIntervalSince1970 * 1000,
        ])
    }

    static func stop() async {
        let phase = Activity<FokusTimerAttributes>.activities.first?.content.state.phase ?? ""
        let over = Activity<FokusTimerAttributes>.activities.first?.content.state.over ?? false
        cancelNotification()
        for activity in Activity<FokusTimerAttributes>.activities {
            await activity.end(nil, dismissalPolicy: .immediate)
        }
        remember(["action": "stop", "phase": phase, "over": over])
    }
}

@available(iOS 17.0, *)
struct FokusPauseIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Pause oder weiter"
    static var description = IntentDescription("Pausiert den Fokus-Timer oder laesst ihn weiterlaufen.")

    func perform() async throws -> some IntentResult {
        await FokusTimerStore.togglePause()
        return .result()
    }
}

@available(iOS 17.0, *)
struct FokusStopIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Timer stoppen"
    static var description = IntentDescription("Stoppt den Fokus-Timer und setzt die Phase zurueck.")

    func perform() async throws -> some IntentResult {
        await FokusTimerStore.stop()
        return .result()
    }
}
