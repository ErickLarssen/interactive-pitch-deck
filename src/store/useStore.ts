import { create } from 'zustand';
import { NavigationSlice, createNavigationSlice } from './slices/navigationSlice';
import { SpeakerSlice, createSpeakerSlice } from './slices/speakerSlice';
import { TimerSlice, createTimerSlice } from './slices/timerSlice';
import { UiSlice, createUiSlice } from './slices/uiSlice';

export type StoreState = NavigationSlice & SpeakerSlice & TimerSlice & UiSlice;

export const useStore = create<StoreState>()((...a) => ({
    ...createNavigationSlice(...a),
    ...createSpeakerSlice(...a),
    ...createTimerSlice(...a),
    ...createUiSlice(...a),
}));