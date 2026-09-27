import { useEffect } from 'react';

// Brilho que segue o mouse em qualquer .premium-card: um único listener
// delegado no documento grava a posição em CSS vars no card sob o
// ponteiro (sem re-render). O gradiente em si vive no CSS.
export function usePremiumSpotlight() {
    useEffect(() => {
        function onMove(e: PointerEvent) {
            const card = (e.target as Element | null)?.closest?.<HTMLElement>('.premium-card');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
        }

        document.addEventListener('pointermove', onMove, { passive: true });
        return () => document.removeEventListener('pointermove', onMove);
    }, []);
}
