import { CSSProperties, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { odsGridContent } from '../data/slideContent';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export function OdsGridSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = odsGridContent[slideId];
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [pinnedId, setPinnedId] = useState<string | null>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    useStaggerReveal(itemsRef);

    if (!content) return null;

    return (
        <section className="ods-grid">
            <h2 className="ods-grid__headline">{content.headline}</h2>
            <div ref={itemsRef} className="ods-grid__items">
                {content.items.map((item) => {
                    const isOpen = hoveredId === item.number || pinnedId === item.number;
                    return (
                        <button
                            key={item.number}
                            type="button"
                            className={`ods-card premium-card ${isOpen ? 'ods-card--open' : ''}`}
                            style={item.color ? ({ '--ods-color': item.color } as CSSProperties) : undefined}
                            onMouseEnter={() => setHoveredId(item.number)}
                            onMouseLeave={() => setHoveredId(null)}
                            onFocus={() => setHoveredId(item.number)}
                            onBlur={() => setHoveredId(null)}
                            onClick={() => setPinnedId((prev) => (prev === item.number ? null : item.number))}
                            aria-expanded={isOpen}
                        >
                            <span className="ods-card__head">
                                <span className="ods-card__number">
                                    <span className="ods-card__number-label">ODS</span> {item.number}
                                </span>
                                <span className="ods-card__toggle" aria-hidden="true">
                                    <Plus size={20} strokeWidth={2} />
                                </span>
                            </span>
                            <span className="ods-card__short">{item.short}</span>
                            <span className="ods-card__description">
                                <span className="ods-card__description-inner">{item.description}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
