import { StateCreator } from 'zustand';

export interface UiSlice {
    isPresenterMode: boolean;
    openModalId: string | null;
    isFullscreen: boolean;
    reducedMotion: boolean;
    togglePresenterMode: () => void;
    setPresenterMode: (value: boolean) => void;
    openModal: (id: string) => void;
    closeModal: () => void;
    setFullscreen: (value: boolean) => void;
    setReducedMotion: (value: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
    isPresenterMode: false,
    openModalId: null,
    isFullscreen: false,
    reducedMotion: false,

    togglePresenterMode: () => set((state) => ({ isPresenterMode: !state.isPresenterMode })),
    setPresenterMode: (value) => set({ isPresenterMode: value }),
    openModal: (id) => set({ openModalId: id }),
    closeModal: () => set({ openModalId: null }),
    setFullscreen: (value) => set({ isFullscreen: value }),
    setReducedMotion: (value) => set({ reducedMotion: value }),
});