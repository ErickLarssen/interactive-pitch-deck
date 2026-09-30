import { useEffect, useRef, useState } from 'react';
import { Check, CircleCheck, OctagonAlert, Pause, Play, RotateCcw, Square, TriangleAlert, Users } from 'lucide-react';
import { team } from '../data/team';
import { useStore } from '../store/useStore';
import { formatTime } from '../utils/formatTime';
import { getTimerStatus, getTimerStatusHint, getTimerStatusLabel, TimerStatus } from '../utils/timerStatus';
import { speakerTargetSeconds, defaultSpeakerTargetSeconds } from '../data/presentation';
import { TimerRing } from './TimerRing';

const targetOf = (id: string) => speakerTargetSeconds[id] ?? defaultSpeakerTargetSeconds;

// Ícone por status: o estado nunca é comunicado só pela cor.
const STATUS_ICON: Record<TimerStatus, typeof CircleCheck> = {
    normal: CircleCheck,
    warning: TriangleAlert,
    danger: OctagonAlert,
};

const LIGHTS: TimerStatus[] = ['danger', 'warning', 'normal'];

// "restam 00:42" antes da meta; "+00:15 acima" depois dela.
function remainingLabel(elapsed: number, target: number) {
    const diff = target - elapsed;
    return diff >= 0 ? `restam ${formatTime(diff)}` : `+${formatTime(-diff)} acima`;
}

const firstName = (name: string) => name.split(' ')[0];

export function SpeakerDock() {
    const [hovered, setHovered] = useState(false);
    // Aberto também por clique/teclado (antes só abria com hover).
    const [pinned, setPinned] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const dockRef = useRef<HTMLDivElement>(null);

    const activeSpeakerId = useStore((s) => s.activeSpeakerId);
    const speakerTimers = useStore((s) => s.speakerTimers);
    const globalElapsed = useStore((s) => s.globalElapsed);
    const totalPitchSeconds = useStore((s) => s.totalPitchSeconds);
    const startSpeaker = useStore((s) => s.startSpeaker);
    const pauseSpeaker = useStore((s) => s.pauseSpeaker);
    const resumeSpeaker = useStore((s) => s.resumeSpeaker);
    const stopSpeaker = useStore((s) => s.stopSpeaker);
    const resetSpeaker = useStore((s) => s.resetSpeaker);

    const expanded = hovered || pinned;

    const activeMember = team.find((m) => m.id === activeSpeakerId);
    const activeTimer = activeSpeakerId ? speakerTimers[activeSpeakerId] : undefined;
    const activeTarget = activeSpeakerId ? targetOf(activeSpeakerId) : defaultSpeakerTargetSeconds;
    const activeElapsed = activeTimer?.elapsed ?? 0;
    const activeStatus: TimerStatus = activeTimer ? getTimerStatus(activeElapsed, activeTarget) : 'normal';
    const ActiveIcon = STATUS_ICON[activeStatus];

    const globalStatus = getTimerStatus(globalElapsed, totalPitchSeconds);
    const globalRatio = Math.min(globalElapsed / totalPitchSeconds, 1);

    // Painel fixado por clique: fecha com clique fora ou ESC.
    useEffect(() => {
        if (!pinned) return;
        function onPointerDown(e: PointerEvent) {
            if (!dockRef.current?.contains(e.target as Node)) setPinned(false);
        }
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setPinned(false);
        }
        document.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('keydown', onKey);
        };
    }, [pinned]);

    // Confirmação de reinício some ao fechar o painel ou trocar de apresentador.
    useEffect(() => {
        if (!expanded) setConfirmReset(false);
    }, [expanded, activeSpeakerId]);

    return (
        <div
            ref={dockRef}
            className="speaker-dock"
            data-status={activeMember ? activeStatus : 'idle'}
            data-expanded={expanded}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button
                type="button"
                className="speaker-dock__chip"
                aria-expanded={expanded}
                aria-label={
                    activeMember
                        ? `${activeMember.name}: ${formatTime(activeElapsed)}, ${getTimerStatusLabel(activeStatus)}. Abrir painel de apresentadores`
                        : 'Abrir painel de apresentadores'
                }
                onClick={() => setPinned((v) => !v)}
            >
                {activeMember ? (
                    <>
                        {/* Brilho único a cada mudança de cor (key = status) */}
                        <span key={activeStatus} className="speaker-dock__flash" aria-hidden="true" />
                        <TimerRing ratio={activeElapsed / activeTarget} status={activeStatus} size={40} stroke={3}>
                            <img src={activeMember.photo} alt="" />
                        </TimerRing>
                        <span className="speaker-dock__time">{formatTime(activeElapsed)}</span>
                        <ActiveIcon className="speaker-dock__status-icon" size={18} aria-hidden="true" />
                    </>
                ) : (
                    <span className="speaker-dock__placeholder">
                        <Users size={16} aria-hidden="true" />
                        Apresentadores
                    </span>
                )}
            </button>

            {expanded && (
                <div className="speaker-dock__panel" role="dialog" aria-label="Apresentadores e tempo">
                    {activeMember && activeTimer ? (
                        <section className="speaker-dock__now">
                            {/* Semáforo: a luz do status acesa, as outras apagadas */}
                            <div className="speaker-dock__lights" aria-hidden="true">
                                {LIGHTS.map((light) => (
                                    <span
                                        key={light}
                                        className={`speaker-dock__light speaker-dock__light--${light}`}
                                        data-on={light === activeStatus}
                                    />
                                ))}
                            </div>

                            <div className="speaker-dock__now-body">
                                <div className="speaker-dock__now-head">
                                    <TimerRing
                                        ratio={activeElapsed / activeTarget}
                                        status={activeStatus}
                                        size={52}
                                        stroke={3}
                                    >
                                        <img src={activeMember.photo} alt="" />
                                    </TimerRing>
                                    <div className="speaker-dock__now-id">
                                        <span className="speaker-dock__now-name">{activeMember.name}</span>
                                        <span className={`speaker-dock__badge speaker-dock__badge--${activeStatus}`}>
                                            <ActiveIcon size={14} aria-hidden="true" />
                                            {getTimerStatusLabel(activeStatus)}
                                            {!activeTimer.running && ' · pausado'}
                                        </span>
                                    </div>
                                </div>

                                <div className="speaker-dock__clock" aria-live="polite">
                                    <span className="speaker-dock__clock-time">{formatTime(activeElapsed)}</span>
                                    <span className="speaker-dock__clock-target">/ {formatTime(activeTarget)}</span>
                                </div>
                                <p className="speaker-dock__hint">
                                    <strong>{getTimerStatusHint(activeStatus)}</strong>
                                    <span>{remainingLabel(activeElapsed, activeTarget)}</span>
                                </p>

                                {confirmReset ? (
                                    <div className="speaker-dock__confirm" role="alert">
                                        <span>Reiniciar o tempo de {firstName(activeMember.name)}?</span>
                                        <div className="speaker-dock__actions">
                                            <button
                                                type="button"
                                                className="speaker-dock__action speaker-dock__action--danger"
                                                onClick={() => {
                                                    resetSpeaker(activeMember.id);
                                                    setConfirmReset(false);
                                                }}
                                            >
                                                <RotateCcw size={15} aria-hidden="true" />
                                                Reiniciar
                                            </button>
                                            <button
                                                type="button"
                                                className="speaker-dock__action"
                                                onClick={() => setConfirmReset(false)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="speaker-dock__actions">
                                        {activeTimer.running ? (
                                            <button type="button" className="speaker-dock__action" onClick={pauseSpeaker}>
                                                <Pause size={15} aria-hidden="true" />
                                                Pausar
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="speaker-dock__action speaker-dock__action--primary"
                                                onClick={resumeSpeaker}
                                            >
                                                <Play size={15} aria-hidden="true" />
                                                Retomar
                                            </button>
                                        )}
                                        <button type="button" className="speaker-dock__action" onClick={stopSpeaker}>
                                            <Square size={14} aria-hidden="true" />
                                            Finalizar
                                        </button>
                                        <button
                                            type="button"
                                            className="speaker-dock__action"
                                            onClick={() => setConfirmReset(true)}
                                        >
                                            <RotateCcw size={15} aria-hidden="true" />
                                            Reiniciar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : (
                        <p className="speaker-dock__empty">
                            Nenhum apresentador ativo. Escolha alguém abaixo para iniciar a contagem.
                        </p>
                    )}

                    {/* Tempo total do pitch (mesmo semáforo, contra o total) */}
                    <div className={`speaker-dock__global speaker-dock__global--${globalStatus}`}>
                        <div className="speaker-dock__global-row">
                            <span>Pitch</span>
                            <span className="speaker-dock__global-time">
                                {formatTime(globalElapsed)} / {formatTime(totalPitchSeconds)}
                            </span>
                        </div>
                        <span className="speaker-dock__bar" aria-hidden="true">
                            <span style={{ width: `${globalRatio * 100}%` }} />
                        </span>
                    </div>

                    <ul className="speaker-dock__list">
                        {team.map((member) => {
                            const timer = speakerTimers[member.id];
                            const target = targetOf(member.id);
                            const elapsed = timer?.elapsed ?? 0;
                            const status = timer ? getTimerStatus(elapsed, target) : 'normal';
                            const isActive = member.id === activeSpeakerId;
                            const done = !isActive && timer?.realized !== undefined;
                            const StatusIcon = STATUS_ICON[status];
                            return (
                                <li key={member.id}>
                                    <button
                                        type="button"
                                        className="speaker-dock__member"
                                        data-active={isActive}
                                        data-status={timer ? status : 'idle'}
                                        onClick={() => startSpeaker(member.id)}
                                        aria-label={`${isActive ? 'Apresentando' : 'Iniciar'}: ${member.name}, ${formatTime(elapsed)} de ${formatTime(target)}`}
                                    >
                                        <TimerRing ratio={elapsed / target} status={status} size={34} stroke={2.5}>
                                            <img src={member.photo} alt="" />
                                        </TimerRing>
                                        <span className="speaker-dock__member-info">
                                            <span className="speaker-dock__member-name">{member.name}</span>
                                            <span className="speaker-dock__bar" aria-hidden="true">
                                                <span style={{ width: `${Math.min(elapsed / target, 1) * 100}%` }} />
                                            </span>
                                        </span>
                                        <span className="speaker-dock__member-time">{formatTime(elapsed)}</span>
                                        {done ? (
                                            <Check className="speaker-dock__member-done" size={16} aria-hidden="true" />
                                        ) : timer ? (
                                            <StatusIcon className="speaker-dock__member-status" size={16} aria-hidden="true" />
                                        ) : (
                                            <Play className="speaker-dock__member-start" size={14} aria-hidden="true" />
                                        )}
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
