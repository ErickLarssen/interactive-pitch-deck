import { RefObject, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

// Entrada escalonada padrão dos cards premium (MOTION.md: reveal
// 300–500ms, stagger 40–80ms, power2.out). Roda a cada montagem do
// slide — SlideDeck remonta por key, então reanima ao voltar.
export function useStaggerReveal(containerRef: RefObject<HTMLElement>, selector = '.premium-card') {
    const reducedMotion = useStore((s) => s.reducedMotion);

    // Layout effect: esconde os cards antes da primeira pintura (sem "piscar").
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
        if (items.length === 0) return;

        if (reducedMotion) {
            gsap.set(items, { opacity: 1, y: 0 });
            return;
        }

        const tween = gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.08,
                delay: 0.15,
                // Libera o transform para o :hover do CSS depois da entrada.
                clearProps: 'transform',
            }
        );

        return () => {
            tween.kill();
        };
    }, [containerRef, selector, reducedMotion]);
}
