import { useStore } from '../store/useStore';

export function ProgressIndicator() {
    const currentSlide = useStore((s) => s.currentSlide);
    const totalSlides = useStore((s) => s.totalSlides);

    const current = String(currentSlide + 1).padStart(2, '0');
    const total = String(totalSlides).padStart(2, '0');

    return (
        <div className="progress-indicator" aria-hidden="true">
            {current} / {total}
        </div>
    );
}