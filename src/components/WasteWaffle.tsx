import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { WaffleChartData } from '../types';

const CELLS = 100;
const COLUMNS = 10;

type Group = 'highlight' | 'rest';

const formatInt = (n: number) => Math.round(n).toLocaleString('pt-BR');
const formatDecimal = (n: number) =>
    n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function WasteWaffle({ data }: { data: WaffleChartData }) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const totalRef = useRef<HTMLSpanElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const cellsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const fillsRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [focus, setFocus] = useState<Group | null>(null);

    const highlightCells = Math.round(data.highlightPercent);
    const restPercent = 100 - data.highlightPercent;
    const highlightAmount = (data.total * data.highlightPercent) / 100;
    const restAmount = data.total - highlightAmount;

    // Sequência: (1) grade acende em diagonal enquanto o total conta
    // 0 → 62; (2) só então a fatia reciclada ganha cor e o percentual
    // conta 0 → 22,3. O olhar lê primeiro o tamanho, depois a proporção.
    useEffect(() => {
        const cells = cellsRef.current.filter(Boolean) as HTMLSpanElement[];
        const fills = fillsRef.current.filter(Boolean) as HTMLSpanElement[];
        const totalEl = totalRef.current;
        const percentEl = percentRef.current;
        if (!totalEl || !percentEl) return;

        const counter = { total: 0, percent: 0 };
        const render = () => {
            totalEl.textContent = formatInt(counter.total);
            percentEl.textContent = `${formatDecimal(counter.percent)}%`;
        };

        if (reducedMotion) {
            counter.total = data.total;
            counter.percent = data.highlightPercent;
            render();
            gsap.set(cells, { opacity: 1, scale: 1 });
            gsap.set(fills, { opacity: 1, scale: 1 });
            return;
        }

        render();
        const tl = gsap.timeline({ delay: 0.25 });
        tl.fromTo(
            cells,
            { opacity: 0, scale: 0.4 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.45,
                ease: 'power2.out',
                stagger: { grid: [COLUMNS, COLUMNS], from: 'start', amount: 0.9 },
            },
            0
        )
            .to(counter, { total: data.total, duration: 1.3, ease: 'power2.out', onUpdate: render }, 0)
            .fromTo(
                fills,
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', stagger: 0.025 },
                '+=0.1'
            )
            .to(
                counter,
                { percent: data.highlightPercent, duration: 0.8, ease: 'power2.out', onUpdate: render },
                '<'
            );

        return () => {
            tl.kill();
        };
    }, [data.total, data.highlightPercent, reducedMotion]);

    const summary =
        `${formatInt(data.total)} ${data.unit} ${data.caption}. ` +
        `${formatDecimal(data.highlightPercent)}% (cerca de ${formatDecimal(highlightAmount)} ${data.unit}) ${data.highlightLabel}; ` +
        `${formatDecimal(restPercent)}% (cerca de ${formatDecimal(restAmount)} ${data.unit}) ${data.restLabel}.`;

    const readout =
        focus === 'highlight'
            ? `≈ ${formatDecimal(highlightAmount)} ${data.unit} · ${data.highlightLabel}`
            : focus === 'rest'
              ? `≈ ${formatDecimal(restAmount)} ${data.unit} · ${data.restLabel}`
              : `Cada quadrado ≈ ${(data.total / CELLS).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ${data.unit}`;

    return (
        <figure className="waffle" data-focus={focus ?? undefined}>
            <p className="waffle__hero" aria-hidden="true">
                <span ref={totalRef} className="waffle__hero-value">
                    0
                </span>
                <span className="waffle__hero-unit">{data.unit}</span>
            </p>
            <p className="waffle__hero-caption" aria-hidden="true">
                {data.caption}
            </p>

            <div className="waffle__grid" onPointerLeave={() => setFocus(null)} aria-hidden="true">
                {Array.from({ length: CELLS }, (_, i) => {
                    const group: Group = i < highlightCells ? 'highlight' : 'rest';
                    return (
                        <span
                            key={i}
                            ref={(el) => {
                                cellsRef.current[i] = el;
                            }}
                            className={`waffle__cell waffle__cell--${group}`}
                            onPointerEnter={() => setFocus(group)}
                        >
                            {group === 'highlight' && (
                                <span
                                    ref={(el) => {
                                        fillsRef.current[i] = el;
                                    }}
                                    className="waffle__fill"
                                />
                            )}
                        </span>
                    );
                })}
            </div>

            <ul className="waffle__legend" aria-hidden="true">
                <li>
                    <span
                        className="waffle__legend-item waffle__legend-item--highlight"
                        onPointerEnter={() => setFocus('highlight')}
                        onPointerLeave={() => setFocus(null)}
                    >
                        <span className="waffle__swatch" />
                        <span ref={percentRef} className="waffle__legend-value">
                            0%
                        </span>
                        <span className="waffle__legend-label">{data.highlightLabel}</span>
                    </span>
                </li>
                <li>
                    <span
                        className="waffle__legend-item waffle__legend-item--rest"
                        onPointerEnter={() => setFocus('rest')}
                        onPointerLeave={() => setFocus(null)}
                    >
                        <span className="waffle__swatch" />
                        <span className="waffle__legend-value">{formatDecimal(restPercent)}%</span>
                        <span className="waffle__legend-label">{data.restLabel}</span>
                    </span>
                </li>
            </ul>

            <p className="waffle__readout" aria-hidden="true">
                {readout}
            </p>

            {/* Versão textual completa para leitor de tela (a parte visual é aria-hidden). */}
            <figcaption className="sr-only">{summary}</figcaption>
        </figure>
    );
}
