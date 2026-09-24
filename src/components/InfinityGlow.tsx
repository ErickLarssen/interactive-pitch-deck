import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

// Cores hardcoded (não var(--...)) de propósito: SVG gradients com
// custom properties dependem de suporte que preferimos não arriscar
// numa apresentação AO VIVO. Mantêm os mesmos valores de tokens.css —
// se a paleta de marca mudar lá, replicar aqui também.
const BLUE_LIGHT = '#4fa8db';
const BLUE = '#1f6fa8';
const GREEN = '#4caf50';
const GREEN_LIGHT = '#8bc34a';

function buildLemniscatePath(a: number, points: number) {
    const coords: string[] = [];
    for (let i = 0; i <= points; i++) {
        const t = (i / points) * Math.PI * 2;
        const denom = 1 + Math.sin(t) * Math.sin(t);
        const x = (a * Math.cos(t)) / denom;
        const y = (a * Math.sin(t) * Math.cos(t)) / denom;
        coords.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return coords.join(' ') + ' Z';
}

interface InfinityGlowProps {
    className?: string;
}

export function InfinityGlow({ className }: InfinityGlowProps) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const groupRef = useRef<SVGGElement>(null);
    const pathARef = useRef<SVGPathElement>(null);
    const pathBRef = useRef<SVGPathElement>(null);
    const dotsRef = useRef<(SVGCircleElement | null)[]>([]);

    const pathD = useMemo(() => buildLemniscatePath(150, 160), []);
    const dotPositions = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => {
            const t = (i / 14) * Math.PI * 2;
            const denom = 1 + Math.sin(t) * Math.sin(t);
            return {
                x: (150 * Math.cos(t)) / denom,
                y: (150 * Math.sin(t) * Math.cos(t)) / denom,
            };
        });
    }, []);

    useEffect(() => {
        const pathA = pathARef.current;
        const pathB = pathBRef.current;
        if (!pathA || !pathB) return;

        const length = pathA.getTotalLength();
        const dashValue = `${length * 0.18} ${length * 0.82}`;
        pathA.style.strokeDasharray = dashValue;
        pathB.style.strokeDasharray = dashValue;

        if (reducedMotion) {
            // Frame estático: sem fluxo de luz, sem rotação, sem pulso.
            return;
        }

        const tlA = gsap.fromTo(
            pathA,
            { strokeDashoffset: 0 },
            { strokeDashoffset: -length, duration: 6, ease: 'none', repeat: -1 }
        );
        const tlB = gsap.fromTo(
            pathB,
            { strokeDashoffset: 0 },
            { strokeDashoffset: length, duration: 8, ease: 'none', repeat: -1 }
        );
        const rotation = gsap.to(groupRef.current, {
            rotate: 360,
            duration: 90,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 50%',
        });
        const dots = dotsRef.current.filter(Boolean) as SVGCircleElement[];
        const dotsTl = gsap.to(dots, {
            opacity: () => 0.2 + Math.random() * 0.6,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.3, repeat: -1, yoyo: true },
        });

        return () => {
            tlA.kill();
            tlB.kill();
            rotation.kill();
            dotsTl.kill();
        };
    }, [reducedMotion]);

    return (
        <svg className={className} viewBox="-180 -120 360 240" aria-hidden="true" focusable="false">
            <defs>
                <linearGradient id="infinity-gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={BLUE_LIGHT} />
                    <stop offset="100%" stopColor={BLUE} />
                </linearGradient>
                <linearGradient id="infinity-gradient-green" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={GREEN} />
                    <stop offset="100%" stopColor={GREEN_LIGHT} />
                </linearGradient>
                <filter id="infinity-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" />
                </filter>
            </defs>
            <g ref={groupRef}>
                <path
                    ref={pathARef}
                    d={pathD}
                    fill="none"
                    stroke="url(#infinity-gradient-blue)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    filter="url(#infinity-blur)"
                    opacity={0.9}
                />
                <path
                    ref={pathBRef}
                    d={pathD}
                    fill="none"
                    stroke="url(#infinity-gradient-green)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    filter="url(#infinity-blur)"
                    opacity={0.75}
                    transform="rotate(6)"
                />
                {dotPositions.map((pos, i) => (
                    <circle
                        key={i}
                        ref={(el) => {
                            dotsRef.current[i] = el;
                        }}
                        cx={pos.x}
                        cy={pos.y}
                        r={1.6}
                        fill="#ffffff"
                        opacity={0.5}
                    />
                ))}
            </g>
        </svg>
    );
}