import { useState } from 'react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { odsGridContent } from '../data/slideContent';

export function OdsGridSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = odsGridContent[slideId];
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [pinnedId, setPinnedId] = useState<string | null>(null);

    if (!content) return null;

    return (
        <section className="ods-grid">
            <h2 className="ods-grid__headline">{content.headline}</h2>
            <div className="ods-grid__items">
                {content.items.map((item) => {
                    const isOpen = hoveredId === item.number || pinnedId === item.number;
                    return (
                        <button
                            key={item.number}
                            type="button"
                            className={`ods-card ${isOpen ? 'ods-card--open' : ''}`}
                            onMouseEnter={() => setHoveredId(item.number)}
                            onMouseLeave={() => setHoveredId(null)}
                            onFocus={() => setHoveredId(item.number)}
                            onBlur={() => setHoveredId(null)}
                            onClick={() => setPinnedId((prev) => (prev === item.number ? null : item.number))}
                            aria-expanded={isOpen}
                        >
                            <span className="ods-card__number">ODS {item.number}</span>
                            <span className="ods-card__short">{item.short}</span>
                            <span className="ods-card__description">{item.description}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}