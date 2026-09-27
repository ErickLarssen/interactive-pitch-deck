import { CSSProperties, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { InfoCardIconKey } from '../types';
import { ICONS } from './icons';

export interface JourneyItem {
    title: string;
    description: string;
    icon?: string;
    iconKey?: InfoCardIconKey;
}

interface JourneyCardsProps {
    items: JourneyItem[];
    // true: numerados (01, 02…) e ligados pela linha do percurso.
    // false: itens paralelos, sem ordem implícita.
    connected?: boolean;
}

export function JourneyCards({ items, connected = true }: JourneyCardsProps) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const listRef = useRef<HTMLOListElement>(null);
    const railRef = useRef<HTMLSpanElement>(null);

    // Entrada: a linha do percurso (se houver) se desenha da esquerda
    // para a direita e os cards sobem em sequência (stagger 80ms).
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const rail = railRef.current;
        const cards = Array.from(list.querySelectorAll<HTMLElement>('.journey-card'));

        if (reducedMotion) {
            if (rail) gsap.set(rail, { scaleX: 1 });
            gsap.set(cards, { opacity: 1, y: 0 });
            return;
        }

        const tl = gsap.timeline({ delay: 0.2 });
        if (rail) tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, 0);
        tl.fromTo(
            cards,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.08,
                // Sem isso o transform inline do GSAP anula o :hover do CSS.
                clearProps: 'transform',
            },
            0.1
        );

        return () => {
            tl.kill();
        };
    }, [reducedMotion]);

    return (
        <div
            className={`journey ${connected ? 'journey--connected' : ''}`}
            style={{ '--journey-cols': items.length } as CSSProperties}
        >
            {connected && <span ref={railRef} className="journey__rail" aria-hidden="true" />}
            <ol ref={listRef} className="journey__list">
                {items.map((item, i) => {
                    const Icon = item.iconKey ? ICONS[item.iconKey] : null;
                    return (
                        <li key={item.title} className="journey-card premium-card">
                            <div className="journey-card__top">
                                {(Icon || item.icon) && (
                                    <span className="premium-icon" aria-hidden="true">
                                        {Icon ? <Icon size={26} strokeWidth={1.75} /> : item.icon}
                                    </span>
                                )}
                                {connected && (
                                    <span className="journey-card__index" aria-hidden="true">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                )}
                            </div>
                            <h3 className="journey-card__title">{item.title}</h3>
                            <p className="journey-card__description">{item.description}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
