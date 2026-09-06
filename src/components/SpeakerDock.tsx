import { useState } from 'react';
import { team } from '../data/team';
import { useStore } from '../store/useStore';
import { formatTime } from '../utils/formatTime';
import { getTimerStatus, getTimerStatusLabel } from '../utils/timerStatus';
import { speakerTargetSeconds, defaultSpeakerTargetSeconds } from '../data/presentation';

export function SpeakerDock() {
    const [expanded, setExpanded] = useState(false);
    const activeSpeakerId = useStore((s) => s.activeSpeakerId);
    const speakerTimers = useStore((s) => s.speakerTimers);
    const startSpeaker = useStore((s) => s.startSpeaker);
    const pauseSpeaker = useStore((s) => s.pauseSpeaker);
    const resumeSpeaker = useStore((s) => s.resumeSpeaker);
    const stopSpeaker = useStore((s) => s.stopSpeaker);
    const resetSpeaker = useStore((s) => s.resetSpeaker);

    const activeMember = team.find((m) => m.id === activeSpeakerId);
    const activeTimer = activeSpeakerId ? speakerTimers[activeSpeakerId] : undefined;
    const activeTarget = activeSpeakerId
        ? speakerTargetSeconds[activeSpeakerId] ?? defaultSpeakerTargetSeconds
        : defaultSpeakerTargetSeconds;
    const activeStatus = activeTimer ? getTimerStatus(activeTimer.elapsed, activeTarget) : 'normal';

    return (
        <div
            className="speaker-dock"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <button type="button" className="speaker-dock__chip">
                {activeMember ? (
                    <>
                        <img src={activeMember.photo} alt={activeMember.name} />
                        <span className="speaker-dock__time">{formatTime(activeTimer?.elapsed ?? 0)}</span>
                        <span className={`speaker-dock__dot speaker-dock__dot--${activeStatus}`} aria-hidden="true" />
                    </>
                ) : (
                    <span className="speaker-dock__placeholder">Apresentadores</span>
                )}
            </button>

            {expanded && (
                <div className="speaker-dock__panel">
                    {activeMember && activeTimer && (
                        <div className="speaker-dock__active-controls">
                            <span>
                                {activeMember.name} — {getTimerStatusLabel(activeStatus)}
                            </span>
                            <div className="speaker-dock__active-buttons">
                                {activeTimer.running ? (
                                    <button onClick={pauseSpeaker}>Pausar</button>
                                ) : (
                                    <button onClick={resumeSpeaker}>Retomar</button>
                                )}
                                <button onClick={stopSpeaker}>Finalizar</button>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`Reiniciar o tempo de ${activeMember.name}?`)) {
                                            resetSpeaker(activeMember.id);
                                        }
                                    }}
                                >
                                    Reiniciar
                                </button>
                            </div>
                        </div>
                    )}

                    <ul className="speaker-dock__list">
                        {team.map((member) => {
                            const timer = speakerTimers[member.id];
                            const target = speakerTargetSeconds[member.id] ?? defaultSpeakerTargetSeconds;
                            const status = timer ? getTimerStatus(timer.elapsed, target) : 'normal';
                            const isActive = member.id === activeSpeakerId;
                            return (
                                <li key={member.id}>
                                    <button
                                        type="button"
                                        className={`speaker-dock__member ${isActive ? 'speaker-dock__member--active' : ''}`}
                                        onClick={() => startSpeaker(member.id)}
                                    >
                                        <img src={member.photo} alt={member.name} />
                                        <span className="speaker-dock__member-name">{member.name}</span>
                                        <span className="speaker-dock__member-time">{formatTime(timer?.elapsed ?? 0)}</span>
                                        <span className={`speaker-dock__dot speaker-dock__dot--${status}`} aria-hidden="true" />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}