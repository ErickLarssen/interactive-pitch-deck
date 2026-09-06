import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useGlobalTicker() {
    const tickGlobal = useStore((s) => s.tickGlobal);
    const tickSpeaker = useStore((s) => s.tickSpeaker);

    useEffect(() => {
        const id = setInterval(() => {
            tickGlobal();
            tickSpeaker();
        }, 1000);
        return () => clearInterval(id);
    }, [tickGlobal, tickSpeaker]);
}