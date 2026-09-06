import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { statHighlightContent } from '../data/slideContent';

export function StatHighlightSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = statHighlightContent[slideId];
    if (!content) return null;

    return (
        <section className="stat-highlight">
            <h2 className="stat-highlight__headline">{content.headline}</h2>
            <div className="stat-highlight__stats" data-count={content.stats.length}>
                {content.stats.map((stat) => (
                    <div key={stat.label} className="stat-highlight__stat">
                        <p className="stat-highlight__value">{stat.value}</p>
                        <p className="stat-highlight__label">{stat.label}</p>
                    </div>
                ))}
            </div>
            {content.support && <p className="stat-highlight__support">{content.support}</p>}
            {content.impactPhrase && <p className="stat-highlight__impact">{content.impactPhrase}</p>}
            {content.source && <p className="stat-highlight__source">{content.source}</p>}
        </section>
    );
}