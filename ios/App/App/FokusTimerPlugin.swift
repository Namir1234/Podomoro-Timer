// Bruecke von js/pomodoro.js zu iOS (Aufruf ueber Capacitor.nativePromise("FokusTimer", …)):
// - update/end: Live Activity auf Sperrbildschirm und Dynamic Island (FokusWidget)
// - schedule: Mitteilung mit Ton genau am Ende der Phase – kommt auch, wenn die App
//   im Hintergrund schlaeft (die Web-Mitteilungen gibt es in der iOS-App nicht)
// - takePending: was in der Zwischenzeit ueber die Knoepfe der Live Activity
//   passiert ist (Pause, Weiter, Stopp – siehe Shared/FokusTimerIntents.swift)

import ActivityKit
import Capacitor
import Foundation
import UserNotifications

@objc(FokusTimerPlugin)
public class FokusTimerPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "FokusTimerPlugin"
    public let jsName = "FokusTimer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "end", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "schedule", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "takePending", returnType: CAPPluginReturnPromise),
    ]

    /// Aenderungen an der Live Activity streng nacheinander (Pause und Weiter kurz hintereinander)
    private var lastTask: Task<Void, Never>?

    private func enqueue(_ work: @escaping () async -> Void) {
        let previous = lastTask
        lastTask = Task {
            await previous?.value
            await work()
        }
    }

    private func date(_ call: CAPPluginCall, _ key: String) -> Date {
        Date(timeIntervalSince1970: (call.getDouble(key) ?? 0) / 1000)
    }

    // MARK: Live Activity

    @objc func update(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve(["supported": false])
            return
        }
        let state = FokusTimerAttributes.ContentState(
            title: call.getString("title") ?? "Fokus",
            phase: call.getString("phase") ?? "focus",
            start: date(call, "start"),
            end: date(call, "end"),
            paused: call.getBool("paused") ?? false,
            over: call.getBool("over") ?? false,
            remainingSec: call.getDouble("remainingSec") ?? 0,
            total: call.getDouble("total") ?? 0,
            doneText: call.getString("doneText") ?? "",
            design: call.getString("design") ?? "coral"
        )
        // Ab dem Ende gilt die Anzeige als veraltet: das Widget zeigt dann "Zeit ist um!"
        let stale: Date? = state.paused || state.over ? nil : state.end
        let content = ActivityContent(state: state, staleDate: stale)
        enqueue {
            let running = Activity<FokusTimerAttributes>.activities
            if let first = running.first {
                await first.update(content)
                for extra in running.dropFirst() { await extra.end(nil, dismissalPolicy: .immediate) }
                call.resolve(["supported": true])
            } else if ActivityAuthorizationInfo().areActivitiesEnabled {
                do {
                    _ = try Activity.request(attributes: FokusTimerAttributes(), content: content)
                    call.resolve(["supported": true])
                } catch {
                    call.reject(error.localizedDescription)
                }
            } else {
                // In den iPhone-Einstellungen fuer Fokus ausgeschaltet
                call.resolve(["supported": false])
            }
        }
    }

    @objc func end(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        enqueue {
            for activity in Activity<FokusTimerAttributes>.activities {
                await activity.end(nil, dismissalPolicy: .immediate)
            }
            call.resolve()
        }
    }

    // MARK: Mitteilung am Ende

    @objc func requestPermission(_ call: CAPPluginCall) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { granted, _ in
            call.resolve(["granted": granted])
        }
    }

    /// at (ms seit 1970) > jetzt: Mitteilung planen; sonst nur die geplante loeschen
    @objc func schedule(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        FokusTimerStore.rememberNotifyText(title: call.getString("title") ?? "Fokus", body: call.getString("body") ?? "")
        FokusTimerStore.scheduleNotification(at: date(call, "at"))
        call.resolve()
    }

    // MARK: Knoepfe der Live Activity

    /// {action: "pause"|"resume"|"stop", phase, remaining (s), end (ms)} oder {}
    @objc func takePending(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *), let action = FokusTimerStore.takePending() else {
            call.resolve([:])
            return
        }
        call.resolve(action)
    }
}
