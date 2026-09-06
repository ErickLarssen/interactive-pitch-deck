import { useStore } from '../store/useStore';

export function NavButtons() {
    const prev = useStore((s) => s.prev);
    const next = useStore((s) => s.next);

    return (
        <div className="nav-buttons">
            <button type="button" aria-label="Slide anterior" onClick={prev}>‹</button>
            <button type="button" aria-label="Próximo slide" onClick={next}>›</button>
        </div>
    );
}