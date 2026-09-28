import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface DocumentViewerProps {
    src: string;
    alt: string;
    expanded?: boolean;
    onToggleExpand?: () => void;
}

const MIN_SCALE = 1;
// 500%: diagramas com texto pequeno precisam chegar legíveis ao fundo
// do auditório (antes o teto era 300%).
const MAX_SCALE = 5;
const BUTTON_STEP = 0.5;
const WHEEL_FACTOR = 1.15;
const KEY_PAN = 80; // px por toque de seta
const PRESETS = [1, 2, 3, 4];

type Point = { x: number; y: number };

export function DocumentViewer({ src, alt, expanded = false, onToggleExpand }: DocumentViewerProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const miniRectRef = useRef<HTMLSpanElement>(null);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [stageAspect, setStageAspect] = useState(16 / 9);

    // Escala e deslocamento vivem em refs: wheel, arraste e teclado
    // aplicam o transform direto no DOM (sem re-render por pixel). O
    // state `scale` só alimenta a interface (porcentagem, botões).
    const scaleRef = useRef(1);
    const offsetRef = useRef<Point>({ x: 0, y: 0 });
    const dragRef = useRef<{ start: Point; origin: Point } | null>(null);

    const stageSize = () => {
        const stage = stageRef.current;
        return { w: stage?.clientWidth ?? 1, h: stage?.clientHeight ?? 1 };
    };

    // Não deixa arrastar o documento para fora da área visível.
    const clampOffset = (o: Point, s: number): Point => {
        const { w, h } = stageSize();
        const maxX = ((s - 1) * w) / 2;
        const maxY = ((s - 1) * h) / 2;
        return {
            x: Math.min(maxX, Math.max(-maxX, o.x)),
            y: Math.min(maxY, Math.max(-maxY, o.y)),
        };
    };

    const apply = useCallback((animate: boolean) => {
        const img = imageRef.current;
        if (!img) return;
        const s = scaleRef.current;
        const { x, y } = offsetRef.current;
        img.style.transition = animate ? 'transform 0.22s ease-out' : 'none';
        img.style.transform = `translate(${x}px, ${y}px) scale(${s})`;

        // Minimapa: região visível em frações do documento.
        const rect = miniRectRef.current;
        if (rect) {
            const { w, h } = stageSize();
            const size = 100 / s;
            rect.style.width = `${size}%`;
            rect.style.height = `${size}%`;
            rect.style.left = `${(0.5 - 0.5 / s - x / (s * w)) * 100}%`;
            rect.style.top = `${(0.5 - 0.5 / s - y / (s * h)) * 100}%`;
        }
    }, []);

    // Zoom mantendo fixo o ponto sob o cursor (focal, relativo ao centro
    // do palco). Sem focal = zoom pelo centro (botões e teclado).
    const zoomTo = useCallback(
        (next: number, focal: Point = { x: 0, y: 0 }, animate = true) => {
            const prev = scaleRef.current;
            const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
            if (s === prev) return;
            const o = offsetRef.current;
            offsetRef.current =
                s === MIN_SCALE
                    ? { x: 0, y: 0 }
                    : clampOffset(
                          {
                              x: focal.x - (focal.x - o.x) * (s / prev),
                              y: focal.y - (focal.y - o.y) * (s / prev),
                          },
                          s
                      );
            scaleRef.current = s;
            setScale(s);
            apply(animate);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [apply]
    );

    const reset = useCallback(() => {
        offsetRef.current = { x: 0, y: 0 };
        scaleRef.current = 1;
        setScale(1);
        apply(true);
    }, [apply]);

    const focalFrom = (clientX: number, clientY: number): Point => {
        const r = stageRef.current!.getBoundingClientRect();
        return { x: clientX - r.left - r.width / 2, y: clientY - r.top - r.height / 2 };
    };

    const panBy = useCallback(
        (dx: number, dy: number) => {
            if (scaleRef.current <= MIN_SCALE) return;
            const o = offsetRef.current;
            offsetRef.current = clampOffset({ x: o.x + dx, y: o.y + dy }, scaleRef.current);
            apply(true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [apply]
    );

    // Wheel com listener nativo não passivo (preventDefault sem aviso
    // do React). Zoom no ponto do cursor.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        function handleWheel(e: WheelEvent) {
            e.preventDefault();
            const factor = e.deltaY < 0 ? WHEEL_FACTOR : 1 / WHEEL_FACTOR;
            zoomTo(scaleRef.current * factor, focalFrom(e.clientX, e.clientY), false);
        }
        stage.addEventListener('wheel', handleWheel, { passive: false });
        return () => stage.removeEventListener('wheel', handleWheel);
    }, [zoomTo]);

    // Teclado (o modal aberto já bloqueia a navegação de slides em
    // useKeyboardNav, então setas/+/− ficam livres aqui).
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            switch (e.key) {
                case '+':
                case '=':
                    zoomTo(scaleRef.current + BUTTON_STEP);
                    break;
                case '-':
                case '_':
                    zoomTo(scaleRef.current - BUTTON_STEP);
                    break;
                case '0':
                    reset();
                    break;
                case 'ArrowLeft':
                    panBy(KEY_PAN, 0);
                    break;
                case 'ArrowRight':
                    panBy(-KEY_PAN, 0);
                    break;
                case 'ArrowUp':
                    panBy(0, KEY_PAN);
                    break;
                case 'ArrowDown':
                    panBy(0, -KEY_PAN);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [zoomTo, reset, panBy]);

    // Proporção do palco (para o minimapa) e reenquadramento ao
    // redimensionar ou alternar tela cheia.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const observer = new ResizeObserver(() => {
            const { w, h } = stageSize();
            setStageAspect(w / h);
            offsetRef.current = clampOffset(offsetRef.current, scaleRef.current);
            apply(false);
        });
        observer.observe(stage);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apply]);

    function handleDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (scaleRef.current < 2) zoomTo(2.5, focalFrom(e.clientX, e.clientY));
        else reset();
    }

    function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
        if (scaleRef.current <= MIN_SCALE || e.button !== 0) return;
        // Captura no palco (currentTarget), não no alvo: soltar o botão
        // fora do documento continua encerrando o arraste.
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = { start: { x: e.clientX, y: e.clientY }, origin: { ...offsetRef.current } };
        setIsDragging(true);
    }

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const drag = dragRef.current;
        if (!drag) return;
        offsetRef.current = clampOffset(
            { x: drag.origin.x + e.clientX - drag.start.x, y: drag.origin.y + e.clientY - drag.start.y },
            scaleRef.current
        );
        apply(false);
    }

    function endDrag(e: PointerEvent<HTMLDivElement>) {
        if (!dragRef.current) return;
        dragRef.current = null;
        setIsDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    }

    // Clique no minimapa: centraliza a vista naquele ponto.
    function handleMinimapClick(e: React.MouseEvent<HTMLDivElement>) {
        const r = e.currentTarget.getBoundingClientRect();
        const u = (e.clientX - r.left) / r.width - 0.5;
        const v = (e.clientY - r.top) / r.height - 0.5;
        const { w, h } = stageSize();
        const s = scaleRef.current;
        offsetRef.current = clampOffset({ x: -u * w * s, y: -v * h * s }, s);
        apply(true);
    }

    const zoomed = scale > MIN_SCALE;

    return (
        <div className="document-viewer">
            <div
                ref={stageRef}
                className="document-viewer__stage"
                data-zoomed={zoomed}
                data-dragging={isDragging}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                onDoubleClick={handleDoubleClick}
            >
                <img ref={imageRef} src={src} alt={alt} className="document-viewer__image" draggable={false} />


                <div
                    className="document-viewer__minimap"
                    data-visible={zoomed}
                    style={{ aspectRatio: stageAspect }}
                    onClick={handleMinimapClick}
                    onPointerDown={(e) => e.stopPropagation()}
                    onDoubleClick={(e) => e.stopPropagation()}
                    aria-hidden="true"
                >
                    <img src={src} alt="" draggable={false} />
                    <span ref={miniRectRef} className="document-viewer__minimap-rect" />
                </div>
            </div>

            {/* Faixa abaixo do documento (nunca sobre ele: em 100% o
                diagrama inteiro precisa ficar visível). */}
            <div className="document-viewer__footer">
                <p className="document-viewer__hint">
                    Roda do mouse aproxima no ponto · arraste para mover · duplo clique · teclas + − 0 e setas
                </p>
                <div className="document-viewer__toolbar" role="toolbar" aria-label="Zoom do documento">
                    <button type="button" onClick={() => zoomTo(scale - BUTTON_STEP)} aria-label="Diminuir zoom" disabled={scale <= MIN_SCALE}>
                        <ZoomOut size={20} />
                    </button>
                    <span className="document-viewer__scale" aria-live="polite">
                        {Math.round(scale * 100)}%
                    </span>
                    <button type="button" onClick={() => zoomTo(scale + BUTTON_STEP)} aria-label="Aumentar zoom" disabled={scale >= MAX_SCALE}>
                        <ZoomIn size={20} />
                    </button>
                    <span className="document-viewer__divider" aria-hidden="true" />
                    {PRESETS.map((p) => (
                        <button
                            key={p}
                            type="button"
                            className="document-viewer__preset"
                            data-active={Math.abs(scale - p) < 0.01}
                            onClick={() => (p === 1 ? reset() : zoomTo(p))}
                        >
                            {p * 100}%
                        </button>
                    ))}
                    <span className="document-viewer__divider" aria-hidden="true" />
                    <button type="button" onClick={reset} aria-label="Restaurar zoom (100%)">
                        <RotateCcw size={18} />
                    </button>
                    {onToggleExpand && (
                        <button
                            type="button"
                            onClick={onToggleExpand}
                            aria-label={expanded ? 'Sair da tela cheia' : 'Tela cheia'}
                            aria-pressed={expanded}
                        >
                            {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
