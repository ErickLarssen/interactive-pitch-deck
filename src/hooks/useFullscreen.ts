import { useCallback, useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useFullscreen() {
    const setFullscreen = useStore((s) => s.setFullscreen);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(() => {
                // Falha ou restrição do navegador: a apresentação continua normalmente.
            });
        } else {
            document.exitFullscreen?.().catch(() => { });
        }
    }, []);

    useEffect(() => {
        function handleChange() {
            setFullscreen(Boolean(document.fullscreenElement));
        }
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, [setFullscreen]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleFullscreen]);

    return { toggleFullscreen };
}