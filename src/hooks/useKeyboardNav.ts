import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useKeyboardNav() {
    const next = useStore((s) => s.next);
    const prev = useStore((s) => s.prev);
    const goToFirst = useStore((s) => s.goToFirst);
    const goToLast = useStore((s) => s.goToLast);
    const togglePresenterMode = useStore((s) => s.togglePresenterMode);
    const openModalId = useStore((s) => s.openModalId);
    const closeModal = useStore((s) => s.closeModal);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (openModalId) {
                if (e.key === 'Escape') closeModal();
                return;
            }

            switch (e.key) {
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    next();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    prev();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToFirst();
                    break;
                case 'End':
                    e.preventDefault();
                    goToLast();
                    break;
                case 'p':
                case 'P':
                    togglePresenterMode();
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [next, prev, goToFirst, goToLast, togglePresenterMode, openModalId, closeModal]);
}