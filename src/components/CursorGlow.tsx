import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

// Suavização do halo (0–1): quanto menor, mais "atrasado" e fluido.
// O ponto central segue o ponteiro sem atraso, para não parecer lag.
const HALO_EASE = 0.18;

export function CursorGlow() {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const dotRef = useRef<HTMLDivElement>(null);
    const haloRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Só faz sentido com mouse/trackpad; em toque não há cursor.
        if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

        const dot = dotRef.current;
        const halo = haloRef.current;
        if (!dot || !halo) return;

        const target = { x: -100, y: -100 };
        const current = { x: -100, y: -100 };
        let raf = 0;

        function onMove(e: PointerEvent) {
            target.x = e.clientX;
            target.y = e.clientY;
            dot!.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
            dot!.dataset.visible = 'true';
            halo!.dataset.visible = 'true';
        }

        function onLeave() {
            dot!.dataset.visible = 'false';
            halo!.dataset.visible = 'false';
        }

        function tick() {
            current.x += (target.x - current.x) * HALO_EASE;
            current.y += (target.y - current.y) * HALO_EASE;
            halo!.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
            raf = requestAnimationFrame(tick);
        }

        window.addEventListener('pointermove', onMove);
        document.documentElement.addEventListener('pointerleave', onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            cancelAnimationFrame(raf);
        };
    }, [reducedMotion]);

    if (reducedMotion) return null;

    return (
        <>
            <div ref={haloRef} className="cursor-glow cursor-glow--halo" aria-hidden="true" />
            <div ref={dotRef} className="cursor-glow cursor-glow--dot" aria-hidden="true" />
        </>
    );
}
