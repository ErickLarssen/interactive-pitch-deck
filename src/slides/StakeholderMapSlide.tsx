import { CSSProperties, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { stakeholderMapContent } from '../data/slideContent';
import { ICONS } from '../components/icons';

export function StakeholderMapSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const slideId = slides[currentSlide].id;
    const content = stakeholderMapContent[slideId];
    const mapRef = useRef<HTMLDivElement>(null);

    // Entrada: centro aparece, as conexões se desenham (tronco → barra →
    // hastes) e os nós chegam em sequência.
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        const q = gsap.utils.selector(map);

        if (reducedMotion) {
            gsap.set(q('.stakeholder-map__node'), { opacity: 1, y: 0 });
            return;
        }

        const tl = gsap.timeline({ delay: 0.15 });
        tl.fromTo(q('.stakeholder-map__center'), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
            .fromTo(q('.stakeholder-map__stem'), { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: 'power1.inOut' })
            .fromTo(q('.stakeholder-map__bar'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.out' })
            .fromTo(q('.stakeholder-map__node-stem'), { scaleY: 0 }, { scaleY: 1, duration: 0.25, stagger: 0.06 }, '-=0.1')
            .fromTo(
                q('.stakeholder-map__node'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08, clearProps: 'transform' },
                '-=0.2'
            );

        return () => {
            tl.kill();
        };
    }, [reducedMotion]);

    if (!content) return null;

    return (
        <section className="stakeholder-map">
            <h2 className="stakeholder-map__headline">{content.headline}</h2>
            <div
                ref={mapRef}
                className="stakeholder-map__diagram"
                style={{ '--nodes': content.nodes.length } as CSSProperties}
            >
                <div className="stakeholder-map__center">
                    <span className="stakeholder-map__pulse" aria-hidden="true" />
                    {content.center}
                </div>
                <div className="stakeholder-map__stem" aria-hidden="true" />
                <div className="stakeholder-map__bar" aria-hidden="true" />
                <div className="stakeholder-map__nodes">
                    {content.nodes.map((node) => {
                        const Icon = node.iconKey ? ICONS[node.iconKey] : null;
                        return (
                            <div key={node.label} className="stakeholder-map__branch">
                                <div className="stakeholder-map__node-stem" aria-hidden="true" />
                                <div
                                    className="stakeholder-map__node premium-card"
                                    data-status={node.status ?? 'active'}
                                >
                                    {Icon && (
                                        <span className="premium-icon premium-icon--sm" aria-hidden="true">
                                            <Icon size={22} strokeWidth={1.75} />
                                        </span>
                                    )}
                                    <h3>{node.label}</h3>
                                    <span className="stakeholder-map__node-tag">{node.tag}</span>
                                    <p>{node.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
