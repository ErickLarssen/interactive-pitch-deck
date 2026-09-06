import { StateCreator } from 'zustand';
import { slides } from '../../data/slides';

export interface NavigationSlice {
    currentSlide: number;
    totalSlides: number;
    goTo: (index: number) => void;
    next: () => void;
    prev: () => void;
    goToFirst: () => void;
    goToLast: () => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice> = (set) => ({
    currentSlide: 0,
    totalSlides: slides.length,
    goTo: (index) =>
        set((state) => ({
            currentSlide: Math.min(Math.max(index, 0), state.totalSlides - 1),
        })),
    next: () =>
        set((state) => ({
            currentSlide: Math.min(state.currentSlide + 1, state.totalSlides - 1),
        })),
    prev: () =>
        set((state) => ({
            currentSlide: Math.max(state.currentSlide - 1, 0),
        })),
    goToFirst: () => set({ currentSlide: 0 }),
    goToLast: () => set((state) => ({ currentSlide: state.totalSlides - 1 })),
});