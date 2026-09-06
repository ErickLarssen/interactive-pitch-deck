import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { closingContent } from '../data/slideContent';

export function ClosingSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = closingContent[slideId];
    if (!content) return null;

    return (
        <section className="closing-slide">
            <div className="closing-slide__lines">
                {content.lines.map((line) => (
                    <p key={line}>{line}</p>
                ))}
            </div>
            <img src="/assets/logos/ecobyte-logo.png" alt={content.projectName} className="closing-slide__logo" />
            <p className="closing-slide__tagline">{content.tagline}</p>
            <p className="closing-slide__thanks">{content.thanks}</p>
        </section>
    );
}