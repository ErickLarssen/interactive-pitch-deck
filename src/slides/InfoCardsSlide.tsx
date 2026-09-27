import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { infoCardsContent } from '../data/slideContent';
import { FlowStrip } from '../components/FlowStrip';
import { JourneyCards } from '../components/JourneyCards';

export function InfoCardsSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = infoCardsContent[slideId];
    if (!content) return null;

    // Layouts premium: 'journey' (numerado e conectado) e 'cards'
    // (paralelo). Fechamento em destaque ao lado do texto de apoio.
    if (content.layout) {
        return (
            <section className={`info-cards info-cards--premium info-cards--${content.layout}`}>
                <h2 className="info-cards__headline">{content.headline}</h2>
                {content.intro && <p className="info-cards__intro">{content.intro}</p>}
                <JourneyCards items={content.cards} connected={content.layout === 'journey'} />
                {content.flow && <FlowStrip steps={content.flow} />}
                {(content.closingPhrase || content.support) && (
                    <div className="info-cards__footer" data-single={!(content.closingPhrase && content.support)}>
                        {content.closingPhrase && <p className="premium-callout">{content.closingPhrase}</p>}
                        {content.support && <p className="info-cards__support">{content.support}</p>}
                    </div>
                )}
            </section>
        );
    }

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
