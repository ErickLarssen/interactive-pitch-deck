import { CSSProperties, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { goalsContent } from '../data/slideContent';
import { ICONS } from '../components/icons';
import { CountUpValue } from '../components/CountUpValue';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import { GoalItem } from '../types';

const GAUGE_R = 52;
const GAUGE_C = 2 * Math.PI * GAUGE_R;

function GoalIcon({ item, className }: { item: GoalItem; className?: string }) {
    const Icon = ICONS[item.icon];
    return (
        <span className={`premium-icon ${className ?? ''}`} aria-hidden="true">
            <Icon size={26} strokeWidth={1.75} />
        </span>
    );
}

export function GoalsSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const content = goalsContent[slides[currentSlide].id];
    const rootRef = useRef<HTMLElement>(null);
    useStaggerReveal(rootRef);

    // Linha da jornada se desenha; medidor preenche até a meta junto
    // com a contagem do número (mesma duração do CountUpValue).
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const q = gsap.utils.selector(root);
        const rail = q('.goals__rail');
        const gauges = Array.from(root.querySelectorAll<SVGCircleElement>('.goals-gauge__fill'));

        if (reducedMotion) {
            gsap.set(rail, { scaleX: 1 });
            gauges.forEach((g) => gsap.set(g, { strokeDashoffset: g.dataset.offset }));
            return;
        }

        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, 0);
        gauges.forEach((g) => {
            tl.fromTo(
                g,
                { strokeDashoffset: GAUGE_C },
                { strokeDashoffset: Number(g.dataset.offset), duration: 1.2, ease: 'power2.out' },
                0.55
            );
        });

        return () => {
            tl.kill();
        };
    }, [reducedMotion]);

    if (!content) return null;

    return (
        <section ref={rootRef} className="goals">
            <header className="goals__header">
                <div>
                    <p className="goals__eyebrow">{content.eyebrow}</p>
                    <h2 className="goals__headline">{content.headline}</h2>
                </div>
                <p className="goals__legend">
                    <span className="goals__badge">{content.badge}</span>
                    sistema em desenvolvimento
                </p>
            </header>

            {/* Jornada: a linha indica a ordem das etapas, não proporção */}
            <div className="goals__journey" style={{ '--cols': content.journey.length } as CSSProperties}>
                <span className="goals__rail" aria-hidden="true" />
                <ol className="goals__journey-list">
                    {content.journey.map((item, i) => (
                        <li key={item.label} className="goal-card premium-card">
                            <div className="goal-card__top">
                                <GoalIcon item={item} />
                                <span className="goals__badge">{content.badge}</span>
                            </div>
                            <p className="goal-card__value">
                                <CountUpValue value={item.value} delay={0.35 + i * 0.1} />
                            </p>
                            <p className="goal-card__label">{item.label}</p>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="goals__highlights">
                {content.highlights.map((item, i) => (
                    <div key={item.label} className="goal-card goal-card--wide premium-card">
                        {item.gauge !== undefined ? (
                            <span className="goals-gauge" aria-hidden="true">
                                <svg viewBox="0 0 128 128">
                                    <circle className="goals-gauge__track" cx="64" cy="64" r={GAUGE_R} />
                                    <circle
                                        className="goals-gauge__fill"
                                        cx="64"
                                        cy="64"
                                        r={GAUGE_R}
                                        strokeDasharray={GAUGE_C}
                                        strokeDashoffset={GAUGE_C * (1 - item.gauge / 100)}
                                        data-offset={GAUGE_C * (1 - item.gauge / 100)}
                                        transform="rotate(-90 64 64)"
                                    />
                                </svg>
                                <GoalIcon item={item} className="goals-gauge__icon" />
                            </span>
                        ) : (
                            <GoalIcon item={item} className="goal-card__icon-lg" />
                        )}
                        <div className="goal-card__body">
                            <span className="goals__badge">{content.badge}</span>
                            <p className="goal-card__value">
                                <CountUpValue value={item.value} delay={0.65 + i * 0.1} />
                            </p>
                            <p className="goal-card__label">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
