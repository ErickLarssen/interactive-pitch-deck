import { useRef } from 'react';
import { slides } from '../data/slides';
import { CountUpValue } from '../components/CountUpValue';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import { useStore } from '../store/useStore';
import { statHighlightContent } from '../data/slideContent';
import { TrendChart } from '../components/TrendChart';
import { WasteWaffle } from '../components/WasteWaffle';

export function StatHighlightSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = statHighlightContent[slideId];
    const statsRef = useRef<HTMLDivElement>(null);
    useStaggerReveal(statsRef);
    if (!content) return null;

    // Com waffleChart: layout em duas colunas (texto | gráfico) e o
    // número de destaque passa a viver dentro do gráfico, com count-up.
    if (content.waffleChart) {
        return (
            <section className="stat-highlight stat-highlight--visual">
                <div className="stat-highlight__text">
                    <h2 className="stat-highlight__headline">{content.headline}</h2>
                    {content.support && <p className="stat-highlight__support">{content.support}</p>}
                    {content.impactPhrase && <p className="stat-highlight__impact">{content.impactPhrase}</p>}
                    {content.source && <p className="stat-highlight__source">{content.source}</p>}
                </div>
                <WasteWaffle data={content.waffleChart} />
            </section>
        );
    }

    // Padrão premium (slide Evidências): números em cards com contagem;
    // abaixo, gráfico em card próprio | texto de apoio e impacto.
    return (
        <section className="stat-highlight stat-highlight--premium">
            <h2 className="stat-highlight__headline">{content.headline}</h2>
            <div ref={statsRef} className="stat-highlight__stats" data-count={content.stats.length}>
                {content.stats.map((stat, i) => (
                    <div key={stat.label} className="stat-highlight__stat premium-card">
                        <p className="stat-highlight__value">
                            <CountUpValue value={stat.value} delay={0.25 + i * 0.08} />
                        </p>
                        <p className="stat-highlight__label">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="stat-highlight__lower">
                {content.trendChart && (
                    <div className="stat-highlight__chart premium-card">
                        <TrendChart data={content.trendChart} />
                    </div>
                )}
                <div className="stat-highlight__notes">
                    {content.support && <p className="stat-highlight__support">{content.support}</p>}
                    {content.impactPhrase && <p className="premium-callout">{content.impactPhrase}</p>}
                    {content.source && <p className="stat-highlight__source">{content.source}</p>}
                </div>
            </div>
        </section>
    );
}
