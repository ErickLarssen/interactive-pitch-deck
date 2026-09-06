import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { infoCardsContent } from '../data/slideContent';
import { FlowStrip } from '../components/FlowStrip';

export function InfoCardsSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = infoCardsContent[slideId];
    if (!content) return null;

    return (
        <section className="info-cards">
            <h2 className="info-cards__headline">{content.headline}</h2>
            {content.intro && <p className="info-cards__intro">{content.intro}</p>}

            <div className="info-cards__grid">
                {content.cards.map((card) => (
                    <div key={card.title} className="info-card">
                        {card.icon && <span className="info-card__icon" aria-hidden="true">{card.icon}</span>}
                        <h3 className="info-card__title">{card.title}</h3>
                        <p className="info-card__description">{card.description}</p>
                    </div>
                ))}
            </div>

            {content.flow && <FlowStrip steps={content.flow} />}
            {content.support && <p className="info-cards__support">{content.support}</p>}
            {content.closingPhrase && <p className="info-cards__closing">{content.closingPhrase}</p>}
        </section>
    );
}