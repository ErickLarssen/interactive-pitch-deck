import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { TrendChartData } from '../types';

const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function TrendChart({ data }: { data: TrendChartData }) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const barFromRef = useRef<HTMLDivElement>(null);
    const barToRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<SVGCircleElement>(null);

    const maxValue = Math.max(data.from.value, data.to.value);
    const fromHeightPct = (data.from.value / maxValue) * 100;
    const toHeightPct = (data.to.value / maxValue) * 100;
    const ringOffset = RING_CIRCUMFERENCE * (1 - data.ringPercent / 100);

    useEffect(() => {
        if (!barFromRef.current || !barToRef.current || !ringRef.current) return;

        if (reducedMotion) {
            gsap.set(barFromRef.current, { height: `${fromHeightPct}%` });
            gsap.set(barToRef.current, { height: `${toHeightPct}%` });
            gsap.set(ringRef.current, { strokeDashoffset: ringOffset });
            return;
        }

        gsap.set(ringRef.current, { strokeDashoffset: RING_CIRCUMFERENCE });
        gsap.fromTo(
            barFromRef.current,
            { height: '0%' },
            { height: `${fromHeightPct}%`, duration: 1, ease: 'power2.out' }
        );
        gsap.fromTo(
            barToRef.current,
            { height: '0%' },
            { height: `${toHeightPct}%`, duration: 1, ease: 'power2.out', delay: 0.15 }
        );
        gsap.to(ringRef.current, {
            strokeDashoffset: ringOffset,
            duration: 1.2,
            delay: 0.3,
            ease: 'power2.out',
        });
    }, [fromHeightPct, toHeightPct, ringOffset, reducedMotion]);

    return (
        <div className="trend-chart">
            <div className="trend-chart__bars">
                <div className="trend-chart__bar-col">
                    <div className="trend-chart__bar-track">
                        <div ref={barFromRef} className="trend-chart__bar trend-chart__bar--from" />
                    </div>
                    <span className="trend-chart__bar-value">{data.from.displayValue}</span>
                    <span className="trend-chart__bar-caption">{data.from.label}</span>
                </div>
                <div className="trend-chart__bar-col">
                    <div className="trend-chart__bar-track">
                        <div ref={barToRef} className="trend-chart__bar trend-chart__bar--to" />
                    </div>
                    <span className="trend-chart__bar-value">{data.to.displayValue}</span>
                    <span className="trend-chart__bar-caption">{data.to.label}</span>
                </div>
            </div>

            <div className="trend-chart__ring-wrap">
                <svg viewBox="0 0 128 128" className="trend-chart__ring">
                    <circle cx="64" cy="64" r={RING_RADIUS} className="trend-chart__ring-track" />
                    <circle
                        ref={ringRef}
                        cx="64"
                        cy="64"
                        r={RING_RADIUS}
                        className="trend-chart__ring-fill"
                        strokeDasharray={RING_CIRCUMFERENCE}
                    />
                </svg>
                <div className="trend-chart__ring-label">
                    <strong>{data.ringPercent.toLocaleString('pt-BR')}%</strong>
                    <span>{data.ringLabel}</span>
                </div>
            </div>
        </div>
    );
}