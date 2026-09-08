import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface DocumentViewerProps {
    src: string;
    alt: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.5;

export function DocumentViewer({ src, alt }: DocumentViewerProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    // Deslocamento (pan) fica em ref, não em state: durante o arraste, a
    // posição é aplicada direto no elemento via DOM a cada movimento,
    // evitando um re-render do componente por pixel arrastado.
    const offsetRef = useRef({ x: 0, y: 0 });
    const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

    function applyTransform(nextScale: number) {
        if (!imageRef.current) return;
        const { x, y } = offsetRef.current;
        imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(${nextScale})`;
    }

    function clampScale(next: number) {
        return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    }

    function setScaleClamped(updater: (current: number) => number) {
        setScale((current) => {
            const next = clampScale(updater(current));
            if (next === MIN_SCALE) offsetRef.current = { x: 0, y: 0 };
            applyTransform(next);
            return next;
        });
    }

    function zoomIn() {
        setScaleClamped((s) => s + SCALE_STEP);
    }
    function zoomOut() {
        setScaleClamped((s) => s - SCALE_STEP);
    }
    function reset() {
        offsetRef.current = { x: 0, y: 0 };
        setScale(1);
        applyTransform(1);
    }

    // Listener nativo (não passivo) para o wheel: permite preventDefault
    // sem o aviso do React sobre listeners passivos por padrão.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        function handleWheel(e: WheelEvent) {
            e.preventDefault();
            const direction = e.deltaY > 0 ? -1 : 1;
            setScaleClamped((s) => s + direction * 0.25);
        }

        stage.addEventListener('wheel', handleWheel, { passive: false });
        return () => stage.removeEventListener('wheel', handleWheel);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
        if (scale <= MIN_SCALE) return;
        (e.target as Element).setPointerCapture(e.pointerId);
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: offsetRef.current.x,
            originY: offsetRef.current.y,
        };
        setIsDragging(true);
    }

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        offsetRef.current = { x: dragRef.current.originX + dx, y: dragRef.current.originY + dy };
        applyTransform(scale);
    }

    function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
        dragRef.current = null;
        setIsDragging(false);
        try {
            (e.target as Element).releasePointerCapture(e.pointerId);
        } catch {
            // já liberado — seguro ignorar
        }
    }

    return (
        <div className="document-viewer">
            <div className="document-viewer__toolbar">
                <button type="button" onClick={zoomOut} aria-label="Diminuir zoom" disabled={scale <= MIN_SCALE}>
                    <ZoomOut size={20} />
                </button>
                <span className="document-viewer__scale">{Math.round(scale * 100)}%</span>
                <button type="button" onClick={zoomIn} aria-label="Aumentar zoom" disabled={scale >= MAX_SCALE}>
                    <ZoomIn size={20} />
                </button>
                <button type="button" onClick={reset} aria-label="Restaurar zoom">
                    <RotateCcw size={18} />
                </button>
            </div>
            <div
                ref={stageRef}
                className={`document-viewer__stage ${isDragging ? 'document-viewer__stage--dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="document-viewer__image"
                    style={{ cursor: scale > MIN_SCALE ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                    draggable={false}
                />
            </div>
        </div>
    );
}