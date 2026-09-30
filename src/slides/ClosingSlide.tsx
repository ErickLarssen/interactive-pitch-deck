import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { closingContent } from '../data/slideContent';

const STATIC_LOGO = '/assets/logos/ecobyte-logo.png';
const RING_TICKS = 72;

export function ClosingSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const content = closingContent[slides[currentSlide].id];
    const rootRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const [logoFailed, setLogoFailed] = useState(false);

    // Sequência: frase palavra a palavra → palco do logo (ápice) →
    // tagline → "Obrigado.". Layout effect: nada "pisca" antes.
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const q = gsap.utils.selector(root);

        if (reducedMotion) {
            gsap.set([q('.closing__word'), q('.closing__stage'), q('.closing__tagline'), q('.closing__thanks')], {
                opacity: 1,
                yPercent: 0,
                y: 0,
                scale: 1,
            });
            return;
        }

        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(
            q('.closing__word'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.045 }
        )
            .fromTo(
                q('.closing__stage'),
                { opacity: 0, scale: 0.86 },
                { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
                '-=0.15'
            )
            .fromTo(
                [q('.closing__tagline'), q('.closing__thanks')],
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.14 },
                '-=0.35'
            );

        return () => {
            tl.kill();
        };
    }, [reducedMotion]);

    if (!content) return null;

    // Paralaxe: o palco inclina levemente seguindo o mouse (CSS vars).
    function parallax(e: React.PointerEvent<HTMLElement>) {
        const stage = stageRef.current;
        if (!stage || reducedMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        stage.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        stage.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    }

    function resetParallax() {
        stageRef.current?.style.removeProperty('--px');
        stageRef.current?.style.removeProperty('--py');
    }

    // Clique no logo: onda de choque saindo do centro do palco.
    function shockwave() {
        const inner = stageRef.current?.querySelector('.closing__stage-inner');
        if (!inner || reducedMotion) return;
        const ring = document.createElement('span');
        ring.className = 'closing__shock';
        inner.appendChild(ring);
        gsap.fromTo(
            ring,
            { scale: 0.35, opacity: 0.9 },
            { scale: 1.45, opacity: 0, duration: 1.1, ease: 'power2.out', onComplete: () => ring.remove() }
        );
    }

    const logoSrc = content.animatedLogo && !logoFailed ? content.animatedLogo : STATIC_LOGO;

    return (
        <section ref={rootRef} className="closing" onPointerMove={parallax} onPointerLeave={resetParallax}>
            <div className="closing__statement">
                {content.lines.map((line) => (
                    <p key={line} className="closing__line" aria-label={line}>
                        {line.split(' ').map((word, i) => (
                            <span key={i} className="closing__word-mask" aria-hidden="true">
                                <span className="closing__word">{word}</span>
                            </span>
                        ))}
                    </p>
                ))}
            </div>

            <div ref={stageRef} className="closing__stage">
                <div className="closing__stage-inner">
                    <span className="closing__glow" aria-hidden="true" />

                    {/* Anéis de interface (HUD): giram devagar, em sentidos opostos */}
                    <svg className="closing__rings" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                        <defs>
                            <linearGradient id="closing-arc" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#4fa8db" />
                                <stop offset="100%" stopColor="#8bc34a" />
                            </linearGradient>
                        </defs>
                        <g className="closing__ring closing__ring--ticks">
                            {Array.from({ length: RING_TICKS }, (_, i) => (
                                <line
                                    key={i}
                                    x1="200"
                                    y1="6"
                                    x2="200"
                                    y2={i % 6 === 0 ? 20 : 13}
                                    transform={`rotate(${(360 / RING_TICKS) * i} 200 200)`}
                                />
                            ))}
                        </g>
                        <g className="closing__ring closing__ring--arc">
                            <circle cx="200" cy="200" r="172" />
                        </g>
                        <g className="closing__ring closing__ring--thin">
                            <circle cx="200" cy="200" r="150" />
                        </g>
                        <g className="closing__ring closing__ring--orbit">
                            <circle cx="200" cy="28" r="4" />
                        </g>
                    </svg>

                    <button
                        type="button"
                        className="closing__logo-btn"
                        onClick={shockwave}
                        aria-label={`${content.projectName} — logo animado`}
                    >
                        <img
                            src={logoSrc}
                            alt={content.projectName}
                            className="closing__logo"
                            draggable={false}
                            onError={() => setLogoFailed(true)}
                        />
                    </button>
                </div>
            </div>

            <p className="closing__tagline">{content.tagline}</p>
            <p className="closing__thanks">{content.thanks}</p>
        </section>
    );
}
