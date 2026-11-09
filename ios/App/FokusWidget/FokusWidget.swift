// Widget-Erweiterung: zeichnet die Live Activity des Pomodoro-Timers als eigene Zeile
// auf dem Sperrbildschirm und in der Dynamic Island. Den Countdown zaehlt iOS selbst
// weiter (Text/ProgressView mit timerInterval) – die App muss dafuer nicht laufen und
// Musik von anderen Apps (Spotify usw.) wird nicht unterbrochen.

import ActivityKit
import SwiftUI
import WidgetKit

@main
struct FokusWidgetBundle: WidgetBundle {
    var body: some Widget {
        FokusLiveActivity()
    }
}

// MARK: - Farben wie in der App

private struct Palette {
    let accent: Color
    let pause: Color
    let background: Color

    static func of(_ design: String) -> Palette {
        design == "original"
            ? Palette(accent: Color(red: 0.53, green: 0.66, blue: 0.38),
                      pause: Color(red: 0.66, green: 0.77, blue: 0.53),
                      background: Color(red: 0.106, green: 0.129, blue: 0.098))
            : Palette(accent: Color(red: 0.91, green: 0.54, blue: 0.46),
                      pause: Color(red: 0.94, green: 0.71, blue: 0.64),
                      background: Color(red: 0.11, green: 0.098, blue: 0.086))
    }
}

private extension FokusTimerAttributes.ContentState {
    var palette: Palette { Palette.of(design) }
    var color: Color { phase == "focus" && !over ? palette.accent : palette.pause }
    var symbol: String { over ? "plus.circle" : phase == "focus" ? "timer" : "cup.and.saucer" }
    /// Zeitspanne fuer Countdown und Balken (nie leer, sonst stuerzt Text(timerInterval:) ab)
    var range: ClosedRange<Date> { start...max(end, start.addingTimeInterval(1)) }
    /// Ueberzeit zaehlt bis zu 60 Minuten aufwaerts (wie in der App)
    var overRange: ClosedRange<Date> { start...start.addingTimeInterval(3600) }
}

// MARK: - Uhr und Balken

private struct ClockText: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool

    var body: some View {
        Group {
            if state.paused {
                Text(state.remaining)
            } else if state.over {
                Text(timerInterval: state.overRange, countsDown: false)
            } else if stale {
                Text("0:00")
            } else {
                Text(timerInterval: state.range, countsDown: true)
            }
        }
        .monospacedDigit()
    }
}

private struct Bar: View {
    let state: FokusTimerAttributes.ContentState
    let stale: Bool

    var body: some View {
        Group {
            if state.paused {
                ProgressView(value: min(1, max(0, state.progress)))
            } else if state.over {
                ProgressView(timerInterval: state.overRange, countsDown: false) { EmptyView() } currentValueLabel: { EmptyView() }
            } else if stale {
                ProgressView(value: 1.0)
            } else {
                ProgressView(timerInterval: state.range, countsDown: false) { EmptyView() } currentValueLabel: { EmptyView() }
            }
        }
        .progressViewStyle(.linear)
        .tint(state.color)
    }
}

// MARK: - Sperrbildschirm

private struct LockScreenView: View {
    let context: ActivityViewContext<FokusTimerAttributes>

    var body: some View {
        let state = context.state
        let stale = context.isStale && !state.paused && !state.over
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .center, spacing: 12) {
                Image(systemName: state.symbol)
                    .font(.title2)
                    .foregroundColor(state.color)
                VStack(alignment: .leading, spacing: 2) {
                    Text(stale ? state.doneText : state.title)
                        .font(.headline)
                        .foregroundColor(.white)
                    Text(state.subtitle)
                        .font(.caption)
                        .foregroundColor(.white.opacity(0.65))
                        .lineLimit(1)
                }
                Spacer(minLength: 8)
                ClockText(state: state, stale: stale)
                    .font(.system(size: 34, weight: .semibold, design: .rounded))
                    .foregroundColor(state.color)
                    .multilineTextAlignment(.trailing)
                    .frame(minWidth: 90, alignment: .trailing)
            }
            Bar(state: state, stale: stale)
        }
        .padding(16)
    }
}

// MARK: - Live Activity

struct FokusLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: FokusTimerAttributes.self) { context in
            LockScreenView(context: context)
                .activityBackgroundTint(context.state.palette.background)
                .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            let state = context.state
            let stale = context.isStale && !state.paused && !state.over
            return DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Label {
                        Text(stale ? state.doneText : state.title)
                            .font(.headline)
                            .lineLimit(1)
                    } icon: {
                        Image(systemName: state.symbol).foregroundColor(state.color)
                    }
                }
                DynamicIslandExpandedRegion(.trailing) {
                    ClockText(state: state, stale: stale)
                        .font(.title2.weight(.semibold))
                        .foregroundColor(state.color)
                        .multilineTextAlignment(.trailing)
                        .frame(maxWidth: 110, alignment: .trailing)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(alignment: .leading, spacing: 6) {
                        Text(state.subtitle)
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .lineLimit(1)
                        Bar(state: state, stale: stale)
                    }
                }
            } compactLeading: {
                Image(systemName: state.symbol).foregroundColor(state.color)
            } compactTrailing: {
                ClockText(state: state, stale: stale)
                    .foregroundColor(state.color)
                    .multilineTextAlignment(.trailing)
                    .frame(maxWidth: 56)
            } minimal: {
                Image(systemName: state.symbol).foregroundColor(state.color)
            }
            .keylineTint(state.color)
        }
    }
}
