import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { useFullscreen } from '../hooks/useFullscreen';
import { useGlobalTicker } from '../hooks/useGlobalTicker';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { SlideDeck } from './SlideDeck';
import { ProgressIndicator } from './ProgressIndicator';
import { NavButtons } from '../controls/NavButtons';
import { SpeakerDock } from './SpeakerDock';
import { PresenterOverlay } from '../controls/PresenterOverlay';
import { VideoBackground } from './VideoBackground';

const PITCH_BACKGROUND = {
    src: '/assets/videos/eco-motion-loop.mp4',
    poster: '/assets/videos/eco-motion-loop-poster.jpg',
};

export function PresentationShell() {
    useKeyboardNav();
    useFullscreen();
    useGlobalTicker();
    useReducedMotionPreference();

    const activeSpeakerId = useStore((s) => s.activeSpeakerId);
    const globalRunning = useStore((s) => s.globalRunning);
    const startGlobal = useStore((s) => s.startGlobal);

    useEffect(() => {
        if (activeSpeakerId && !globalRunning) {
            startGlobal();
        }
    }, [activeSpeakerId, globalRunning, startGlobal]);

    return (
        <div className="presentation-shell">
            <VideoBackground
                className="app-background"
                src={PITCH_BACKGROUND.src}
                poster={PITCH_BACKGROUND.poster}
            />
            <div className="app-background-scrim" aria-hidden="true" />
            <SlideDeck />
            <ProgressIndicator />
            <NavButtons />
            <SpeakerDock />
            <PresenterOverlay />
        </div>
    );
}