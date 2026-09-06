import { StateCreator } from 'zustand';

interface SpeakerRecord {
    elapsed: number;
    running: boolean;
    realized?: number; // preenchido ao finalizar (stopSpeaker)
}

export interface SpeakerSlice {
    activeSpeakerId: string | null;
    speakerTimers: Record<string, SpeakerRecord>;
    startSpeaker: (speakerId: string) => void;
    pauseSpeaker: () => void;
    resumeSpeaker: () => void;
    stopSpeaker: () => void;
    resetSpeaker: (speakerId: string) => void;
    tickSpeaker: () => void;
}

export const createSpeakerSlice: StateCreator<SpeakerSlice> = (set) => ({
    activeSpeakerId: null,
    speakerTimers: {},

    startSpeaker: (speakerId) =>
        set((state) => {
            const timers = { ...state.speakerTimers };

            // Se havia outro apresentador ativo, finaliza automaticamente
            // antes de iniciar o novo, evita perder o tempo realizado dele
            // ao trocar de apresentador pelo dock global.
            if (state.activeSpeakerId && state.activeSpeakerId !== speakerId) {
                const prev = timers[state.activeSpeakerId];
                if (prev) {
                    timers[state.activeSpeakerId] = { ...prev, running: false, realized: prev.elapsed };
                }
            }

            const existing = timers[speakerId] ?? { elapsed: 0, running: false };
            timers[speakerId] = { ...existing, running: true };

            return { activeSpeakerId: speakerId, speakerTimers: timers };
        }),

    pauseSpeaker: () =>
        set((state) => {
            if (!state.activeSpeakerId) return state;
            const current = state.speakerTimers[state.activeSpeakerId];
            if (!current) return state;
            return {
                speakerTimers: {
                    ...state.speakerTimers,
                    [state.activeSpeakerId]: { ...current, running: false },
                },
            };
        }),

    resumeSpeaker: () =>
        set((state) => {
            if (!state.activeSpeakerId) return state;
            const current = state.speakerTimers[state.activeSpeakerId];
            if (!current) return state;
            return {
                speakerTimers: {
                    ...state.speakerTimers,
                    [state.activeSpeakerId]: { ...current, running: true },
                },
            };
        }),

    stopSpeaker: () =>
        set((state) => {
            if (!state.activeSpeakerId) return state;
            const current = state.speakerTimers[state.activeSpeakerId];
            if (!current) return state;
            return {
                activeSpeakerId: null,
                speakerTimers: {
                    ...state.speakerTimers,
                    [state.activeSpeakerId]: {
                        ...current,
                        running: false,
                        realized: current.elapsed,
                    },
                },
            };
        }),

    resetSpeaker: (speakerId) =>
        set((state) => ({
            speakerTimers: {
                ...state.speakerTimers,
                [speakerId]: { elapsed: 0, running: false },
            },
        })),

    tickSpeaker: () =>
        set((state) => {
            const id = state.activeSpeakerId;
            if (!id) return state;
            const current = state.speakerTimers[id];
            if (!current || !current.running) return state;
            return {
                speakerTimers: {
                    ...state.speakerTimers,
                    [id]: { ...current, elapsed: current.elapsed + 1 },
                },
            };
        }),
});