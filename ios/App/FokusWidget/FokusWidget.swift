// Widget-Erweiterung: zeichnet die Live Activity des Pomodoro-Timers – aufgebaut wie der
// Timer der Uhr-App: links Pause/Weiter und Stopp, rechts Beschriftung und grosse Zeit;
// in der Dynamic Island ein Ring, der sich leert, und die Restzeit. Countdown und Ring
// zaehlt iOS selbst weiter (timerInterval) – die App muss dafuer nicht laufen und Musik
// aus anderen Apps (Spotify usw.) wird nicht unterbrochen.

import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

@main
struct FokusWidgetBundle: WidgetBundle {
    var body: some Widget {
        FokusLiveActivity()
    }
}

// MARK: - Farben wie in der App

private extension FokusTimerAttributes.ContentState {
    /// Fokus in der Akzentfarbe, Pausen und Ueberzeit etwas heller
    var color: Color {
        let focus = phase == "focus" && !over
        if design == "original" {
            return focus ? Color(red: 0.53, green: 0.66, blue: 0.38) : Color(red: 0.66, green: 0.77, blue: 0.53)
        }
        return focus ? Color(red: 0.95, green: 0.55, blue: 0.42) : Color(red: 0.96, green: 0.70, blue: 0.60)
    }
}

// MARK: - Bausteine

/// Grosse Zeit: zaehlt herunter, pausiert fest, in der Ueberzeit aufwaerts mit "+"
private struct ClockText: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool

    var body: some View {
        Group {
            if state.paused {
                Text(state.remainingText)
            } else if state.over {
                HStack(spacing: 0) {
                    Text("+")
                    Text(timerInterval: state.overRange, countsDown: false)
                }
            } else if stale {
                Text("0:00")
            } else {
                Text(timerInterval: state.range, countsDown: true)
            }
        }
        .monospacedDigit()
        .lineLimit(1)
    }
}

/// Ring wie bei der Uhr-App: voll beim Start, leert sich bis zum Ende
private struct Ring: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool

    var body: some View {
        Group {
            if state.paused {
                ProgressView(value: state.leftFraction)
            } else if state.over || stale {
                ProgressView(value: 1.0)
            } else {
                ProgressView(timerInterval: state.range, countsDown: true) { EmptyView() } currentValueLabel: { EmptyView() }
            }
        }
        .progressViewStyle(.circular)
        .tint(state.color)
    }
}

/// Runder Knopf wie in der Uhr-App
private struct RoundIcon: View {
    let symbol: String
    let foreground: Color
    let background: Color
    let size: CGFloat

    var body: some View {
        Image(systemName: symbol)
            .font(.system(size: size * 0.4, weight: .bold))
            .foregroundColor(foreground)
            .frame(width: size, height: size)
            .background(Circle().fill(background))
    }
}

/// Pause/Weiter und Stopp (Knoepfe in Live Activities gibt es ab iOS 17)
private struct Buttons: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool
    let size: CGFloat

    var body: some View {
        HStack(spacing: size * 0.22) {
            if #available(iOS 17.0, *) {
                if !state.over && !stale {
                    Button(intent: FokusPauseIntent()) {
                        RoundIcon(symbol: state.paused ? "play.fill" : "pause.fill",
                                  foreground: state.color, background: state.color.opacity(0.3), size: size)
                    }
                    .buttonStyle(.plain)
                }
                Button(intent: FokusStopIntent()) {
                    RoundIcon(symbol: "xmark", foreground: .white, background: Color.white.opacity(0.18), size: size)
                }
                .buttonStyle(.plain)
            } else {
                RoundIcon(symbol: state.paused ? "pause.fill" : "timer",
                          foreground: state.color, background: state.color.opacity(0.3), size: size)
            }
        }
    }
}

/// Beschriftung + grosse Zeit rechts
private struct LabelAndTime: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool
    let timeSize: CGFloat

    var body: some View {
        HStack(alignment: .lastTextBaseline, spacing: 8) {
            Text(stale ? state.doneText : state.title)
                .font(.system(size: timeSize * 0.42, weight: .semibold))
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            ClockText(state: state, stale: stale)
                .font(.system(size: timeSize, weight: .light))
                .multilineTextAlignment(.trailing)
                // Text(timerInterval:) nimmt sonst die ganze Breite ein
                .frame(width: timeSize * (state.total >= 3600 || state.over ? 3.6 : 2.55), alignment: .trailing)
        }
        .foregroundColor(state.color)
    }
}

// MARK: - Live Activity

struct FokusLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FokusTimerAttributes.self) { context in
            let state = context.state
            let stale = context.isStale && !state.paused && !state.over
            HStack(alignment: .center) {
                Buttons(state: state, stale: stale, size: 50)
                Spacer(minLength: 8)
                LabelAndTime(state: state, stale: stale, timeSize: 46)
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
            .activityBackgroundTint(Color.black.opacity(0.88))
            .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            let state = context.state
            let stale = context.isStale && !state.paused && !state.over
            return DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Buttons(state: state, stale: stale, size: 44)
                        .padding(.leading, 4)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    LabelAndTime(state: state, stale: stale, timeSize: 38)
                        .padding(.trailing, 4)
                }
            } compactLeading: {
                Ring(state: state, stale: stale)
                    .frame(width: 22, height: 22)
            } compactTrailing: {
                ClockText(state: state, stale: stale)
                    .foregroundColor(state.color)
                    .multilineTextAlignment(.trailing)
                    .frame(width: state.total >= 3600 || state.over ? 66 : 46)
            } minimal: {
                Ring(state: state, stale: stale)
                    .frame(width: 22, height: 22)
            }
            .keylineTint(state.color)
        }
    }
}
