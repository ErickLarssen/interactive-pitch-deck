import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { closingContent, memeContent } from '../data/slideContent';

const MAX_TILT = 8; // graus
const CLAPS_PER_BURST = 14;

const fileNameOf = (src: string) => src.split('/').pop() ?? src;

export function MemeSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const content = memeContent[slides[currentSlide].id];
    const rootRef = useRef<HTMLElement>(null);
    const windowRef = useRef<HTMLElement>(null);
    const burstRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<{ w: number; h: number } | null>(null);

    // O APNG do encerramento tem ~15 MB: pré-carrega aqui, no slide
    // anterior, para o logo entrar sem tela vazia.
    useEffect(() => {
        const next = slides[currentSlide + 1];
        const logo = next && closingContent[next.id]?.animatedLogo;
        if (!logo) return;
        const img = new Image();
        img.src = logo;
        img.decode?.().catch(() => {
            // falha de decodificação: o encerramento cai para o logo estático
        });
    }, [currentSlide]);

    // Entrada: a "janela" cai e se ajeita levemente inclinada (polaroid).
    useLayoutEffect(() => {
        const win = windowRef.current;
        if (!win) return;
        if (reducedMotion) {
            gsap.set(win, { opacity: 1 });
            return;
        }
        const tween = gsap.fromTo(
            win,
            { opacity: 0, y: -40, rotate: -6, scale: 0.94 },
            { opacity: 1, y: 0, rotate: -1.5, scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.15 }
        );
        return () => {
            tween.kill();
        };
    }, [reducedMotion]);

    if (!content) return null;

    // Inclinação 3D seguindo o mouse (CSS vars no elemento interno, para
    // não brigar com o transform da entrada, que fica no externo).
    function tilt(e: React.PointerEvent<HTMLElement>) {
        if (reducedMotion) return;
        const inner = e.currentTarget.querySelector<HTMLElement>('.meme__tilt');
        if (!inner) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--rx', `${(-y * MAX_TILT).toFixed(2)}deg`);
        inner.style.setProperty('--ry', `${(x * MAX_TILT).toFixed(2)}deg`);
    }

    function resetTilt(e: React.PointerEvent<HTMLElement>) {
        const inner = e.currentTarget.querySelector<HTMLElement>('.meme__tilt');
        inner?.style.removeProperty('--rx');
        inner?.style.removeProperty('--ry');
    }

    // Chuva de aplausos a partir do ponto clicado (ou do centro do botão).
    function clap(clientX: number, clientY: number) {
        const layer = burstRef.current;
        const root = rootRef.current;
        if (!layer || !root || reducedMotion) return;
        const r = root.getBoundingClientRect();
        const x0 = clientX - r.left;
        const y0 = clientY - r.top;

        for (let i = 0; i < CLAPS_PER_BURST; i++) {
            const el = document.createElement('span');
            el.className = 'meme__clap-particle';
            el.textContent = '👏';
            el.style.left = `${x0}px`;
            el.style.top = `${y0}px`;
            layer.appendChild(el);
            const duration = gsap.utils.random(1.1, 1.7);
            gsap.fromTo(
                el,
                { x: 0, y: 0, scale: 0.4, rotate: 0 },
                {
                    x: gsap.utils.random(-180, 180),
                    y: gsap.utils.random(-380, -200),
                    scale: gsap.utils.random(0.9, 1.7),
                    rotate: gsap.utils.random(-45, 45),
                    duration,
                    ease: 'power2.out',
                    onComplete: () => el.remove(),
                }
            );
            // Opaco na maior parte do voo; some só no fim.
            gsap.to(el, { opacity: 0, delay: duration * 0.6, duration: duration * 0.4, ease: 'power1.in' });
        }
    }

    const fileName = fileNameOf(content.src);

    return (
        <section ref={rootRef} className="meme">
            <figure
                ref={windowRef}
                className="meme__window"
                onPointerMove={tilt}
                onPointerLeave={resetTilt}
                onClick={(e) => clap(e.clientX, e.clientY)}
            >
                <div className="meme__tilt">
                    <span className="meme__border" aria-hidden="true" />
                    <div className="meme__frame">
                        <div className="meme__chrome" aria-hidden="true">
                            <span className="meme__lights">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="meme__file">{fileName}</span>
                            {size && (
                                <span className="meme__res">
                                    {size.w}×{size.h}
                                </span>
                            )}
                        </div>
                        <img
                            src={content.src}
                            alt={content.alt}
                            className="meme__img"
                            draggable={false}
                            onLoad={(e) =>
                                setSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
                            }
                        />
                    </div>
                </div>
            </figure>

            <button
                type="button"
                className="meme__clap"
                onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    clap(r.left + r.width / 2, r.top);
                }}
            >
                <span aria-hidden="true">👏</span>
                {content.clapLabel}
            </button>

            <div ref={burstRef} className="meme__burst" aria-hidden="true" />
        </section>
    );
}
