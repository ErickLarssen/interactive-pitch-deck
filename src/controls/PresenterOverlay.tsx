import { useStore } from '../store/useStore';
import { team } from '../data/team';
import { formatTime } from '../utils/formatTime';

export function PresenterOverlay() {
    const isPresenterMode = useStore((s) => s.isPresenterMode);
    const globalElapsed = useStore((s) => s.globalElapsed);
    const totalPitchSeconds = useStore((s) => s.totalPitchSeconds);
    const activeSpeakerId = useStore((s) => s.activeSpeakerId);
    const speakerTimers = useStore((s) => s.speakerTimers);
    const currentSlide = useStore((s) => s.currentSlide);
    const totalSlides = useStore((s) => s.totalSlides);

    if (!isPresenterMode) return null;

    const activeMember = team.find((m) => m.id === activeSpeakerId);

    return (
        <div className="presenter-overlay">
            <div>
                PITCH {formatTime(globalElapsed)} / {formatTime(totalPitchSeconds)}
            </div>
            <div>
                Slide {currentSlide + 1} / {totalSlides}
            </div>
            {activeMember && speakerTimers[activeMember.id] && (
                <div>
                    {activeMember.name}: {formatTime(speakerTimers[activeMember.id].elapsed)}
                </div>
            )}
        </div>
    );
}