import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { StepItem } from '../types';
import { ICONS } from './icons';

// Roadmap: linha do tempo com um marco por fase. Os marcos crescem de
// fase em fase — metáfora visual de "começar pequeno e escalar" (não
// representa nenhum dado). Hover num card acende o marco dele.
export function RoadmapSteps({ steps }: { steps: StepItem[] }) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const rootRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    // A linha se preenche e cada marco acende quando ela passa por ele;
    // o card correspondente sobe logo em seguida.
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const q = gsap.utils.selector(root);
        const fill = q('.roadmap__fill');
        const nodes = q('.roadmap__node');
        const cards = q('.roadmap-card');

        if (reducedMotion) {
            gsap.set(fill, { scaleX: 1 });
            gsap.set(nodes, { opacity: 1, scale: 1 });
            gsap.set(cards, { opacity: 1, y: 0 });
            return;
        }

        const FILL = 1.6;
        const tl = gsap.timeline({ delay: 0.25 });
        tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: FILL, ease: 'power1.inOut' }, 0);
        const last = Math.max(steps.length - 1, 1);
        steps.forEach((_, i) => {
            const at = (i / last) * FILL * 0.92;
            // clearProps: libera o transform para o destaque do hover (CSS).
            tl.fromTo(
                nodes[i],
                { opacity: 0.25, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity' },
                at
            );
            tl.fromTo(
                cards[i],
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' },
                at + 0.05
            );
        });

        return () => {
            tl.kill();
        };
    }, [reducedMotion, steps]);

    return (
        <div
            ref={rootRef}
            className="roadmap"
            data-hovered={hovered ?? undefined}
            style={{ '--count': steps.length } as CSSProperties}
        >
            <div className="roadmap__track" aria-hidden="true">
                <span className="roadmap__line">
                    <span className="roadmap__fill" />
                </span>
                {steps.map((step, i) => (
                    <span
                        key={step.number}
                        className="roadmap__stop"
                        data-active={hovered === i}
                        style={{ '--i': i } as CSSProperties}
                    >
                        <span className="roadmap__node" />
                        <span className="roadmap__phase">Fase {step.number}</span>
                    </span>
                ))}
            </div>

            <ol className="roadmap__list">
                {steps.map((step, i) => {
                    const Icon = step.iconKey ? ICONS[step.iconKey] : null;
                    return (
                        <li
                            key={step.number}
                            className="roadmap-card premium-card"
                            onPointerEnter={() => setHovered(i)}
                            onPointerLeave={() => setHovered(null)}
                        >
                            {Icon && (
                                <span className="premium-icon" aria-hidden="true">
                                    <Icon size={26} strokeWidth={1.75} />
                                </span>
                            )}
                            <h3 className="roadmap-card__title">
                                <span className="sr-only">Fase {step.number}: </span>
                                {step.title}
                            </h3>
                            <p className="roadmap-card__description">{step.description}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
