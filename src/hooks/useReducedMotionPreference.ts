import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useReducedMotionPreference() {
    const setReducedMotion = useStore((s) => s.setReducedMotion);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(query.matches);

        function handleChange(e: MediaQueryListEvent) {
            setReducedMotion(e.matches);
        }
        query.addEventListener('change', handleChange);
        return () => query.removeEventListener('change', handleChange);
    }, [setReducedMotion]);
}