import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { sequentialStepsContent } from '../data/slideContent';
import { FlowStrip } from '../components/FlowStrip';

export function SequentialStepsSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = sequentialStepsContent[slideId];
    if (!content) return null;

    return (
        <section className="sequential-steps">
            <h2 className="sequential-steps__headline">{content.headline}</h2>
            <div className="sequential-steps__list">
                {content.steps.map((step) => (
                    <div key={step.number} className="sequential-step">
                        <span className="sequential-step__number">{step.number}</span>
                        <h3 className="sequential-step__title">{step.title}</h3>
                        <p className="sequential-step__description">{step.description}</p>
                    </div>
                ))}
            </div>
            {content.flow && <FlowStrip steps={content.flow} />}
            {content.closingPhrase && <p className="sequential-steps__closing">{content.closingPhrase}</p>}
        </section>
    );
}