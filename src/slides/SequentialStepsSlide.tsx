import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { sequentialStepsContent } from '../data/slideContent';
import { FlowStrip } from '../components/FlowStrip';
import { JourneyCards } from '../components/JourneyCards';
import { RoadmapSteps } from '../components/RoadmapSteps';

export function SequentialStepsSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = sequentialStepsContent[slideId];
    if (!content) return null;

    // Layout 'journey' (slide Solução): mesmos cards do slide Problema.
    // A numeração vem da posição (01…), igual ao número do conteúdo.
    if (content.layout === 'journey') {
        return (
            <section className="sequential-steps sequential-steps--journey">
                <h2 className="sequential-steps__headline">{content.headline}</h2>
                <JourneyCards items={content.steps} />
                {content.flow && <FlowStrip steps={content.flow} />}
                {content.closingPhrase && <p className="premium-callout">{content.closingPhrase}</p>}
            </section>
        );
    }

    // Layout 'roadmap' (slide Próximos passos): linha do tempo de fases.
    if (content.layout === 'roadmap') {
        return (
            <section className="sequential-steps sequential-steps--roadmap">
                <h2 className="sequential-steps__headline">{content.headline}</h2>
                <RoadmapSteps steps={content.steps} />
                {content.closingPhrase && <p className="premium-callout">{content.closingPhrase}</p>}
            </section>
        );
    }

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
