import { StateCreator } from 'zustand';
import { presentationConfig } from '../../data/presentation';

export interface TimerSlice {
    globalElapsed: number;
    globalRunning: boolean;
    thresholds: { amber: number; red: number };
    totalPitchSeconds: number;
    startGlobal: () => void;
    pauseGlobal: () => void;
    resetGlobal: () => void;
    tickGlobal: () => void;
}

export const createTimerSlice: StateCreator<TimerSlice> = (set) => ({
    globalElapsed: 0,
    globalRunning: false,
    thresholds: presentationConfig.thresholds,
    totalPitchSeconds: presentationConfig.totalPitchSeconds,

    startGlobal: () => set({ globalRunning: true }),
    pauseGlobal: () => set({ globalRunning: false }),
    resetGlobal: () => set({ globalElapsed: 0, globalRunning: false }),
    tickGlobal: () =>
        set((state) => (state.globalRunning ? { globalElapsed: state.globalElapsed + 1 } : state)),
});