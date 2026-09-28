import { CSSProperties, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, RotateCcw } from 'lucide-react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { architectureContent } from '../data/slideContent';
import { BrandIcon, brandColor } from '../components/BrandIcon';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

const LINK_WIDTH = 'clamp(48px, 5vw, 96px)';

type RunState = 'idle' | 'running' | 'done';

export function ArchitectureSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const content = architectureContent[slides[currentSlide].id];
    const rootRef = useRef<HTMLElement>(null);
    const packetRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [step, setStep] = useState(-1);
    const [runState, setRunState] = useState<RunState>('idle');
    const [runId, setRunId] = useState(0);
    useStaggerReveal(rootRef);

    const nodes = content?.nodes ?? [];
    // Ordem das camadas visitadas: ida 0→n-1 e volta n-2→0.
    const visits = useMemo(() => {
        const forward = nodes.map((_, i) => i);
        return [...forward, ...forward.slice(0, -1).reverse()];
    }, [nodes]);

    // Simulação: acende a camada, escreve a linha no terminal e manda o
    // pacote pela conexão até a próxima. Roda sozinha 1x ao entrar no
    // slide (runId 0) e de novo a cada clique em "Simular requisição".
    useEffect(() => {
        if (!content) return;

        if (reducedMotion) {
            // Sem animação: só no clique, e mostra o trace completo direto.
            if (runId > 0) {
                setStep(visits.length - 1);
                setRunState('done');
            }
            return;
        }

        const tl = gsap.timeline({ delay: runId === 0 ? 1.4 : 0.1 });
        tl.call(() => {
            setRunState('running');
            setStep(-1);
        });

        visits.forEach((nodeIndex, v) => {
            tl.call(() => setStep(v));
            tl.to({}, { duration: 0.55 }); // tempo para ler a linha
            const next = visits[v + 1];
            if (next === undefined) return;
            const link = Math.min(nodeIndex, next);
            const packet = packetRefs.current[link];
            if (!packet) return;
            const forward = next > nodeIndex;
            // Pacote de requisição azul; de resposta, verde (CSS por data-dir).
            tl.set(packet, { attr: { 'data-dir': forward ? 'req' : 'res' } })
                .fromTo(
                    packet,
                    { left: forward ? '0%' : '100%', opacity: 1 },
                    { left: forward ? '100%' : '0%', duration: 0.5, ease: 'power1.inOut' }
                )
                .set(packet, { opacity: 0 });
        });

        tl.call(() => setRunState('done'));

        return () => {
            tl.kill();
        };
    }, [content, visits, runId, reducedMotion]);

    if (!content) return null;

    const activeNode = runState === 'running' && step >= 0 ? visits[step] : null;
    const columns = nodes.map(() => 'minmax(0, 1fr)').join(` ${LINK_WIDTH} `);

    // Chaves de workspace: nós consecutivos com o mesmo workspace.
    const brackets: { label: string; start: number; end: number }[] = [];
    nodes.forEach((node, i) => {
        if (!node.workspace) return;
        const last = brackets[brackets.length - 1];
        if (last && last.label === node.workspace && last.end === i - 1) last.end = i;
        else brackets.push({ label: node.workspace, start: i, end: i });
    });

    return (
        <section ref={rootRef} className="arch">
            <header className="arch__header">
                <h2 className="arch__headline">{content.headline}</h2>
                <ul className="arch__chips">
                    {content.chips.map((chip) => (
                        <li key={chip} className="arch__chip">
                            {chip}
                        </li>
                    ))}
                </ul>
            </header>

            <div className="arch__diagram" data-running={runState === 'running'}>
                <div className="arch__workspaces" style={{ gridTemplateColumns: columns }} aria-hidden="true">
                    {brackets.map((b) => (
                        <span
                            key={`${b.label}-${b.start}`}
                            className="arch__bracket"
                            style={{ gridColumn: `${b.start * 2 + 1} / ${b.end * 2 + 2}` }}
                        >
                            {b.label}
                        </span>
                    ))}
                </div>

                <ol className="arch__row" style={{ gridTemplateColumns: columns }}>
                    {nodes.map((node, i) => (
                        <Fragment key={node.id}>
                            <li
                                className="arch-node premium-card"
                                data-active={activeNode === i}
                                style={{ '--node-brand': brandColor(node.icon) } as CSSProperties}
                            >
                                <span className="arch-node__layer">{node.layer}</span>
                                <BrandIcon icon={node.icon} size={40} className="arch-node__logo" />
                                <h3 className="arch-node__name">{node.name}</h3>
                                {node.version && <span className="arch-node__version">{node.version}</span>}
                                {node.badge && <span className="arch-node__badge">{node.badge}</span>}
                                {node.note && <p className="arch-node__note">{node.note}</p>}
                                {node.techs.length > 0 && (
                                    <ul className="arch-node__techs">
                                        {node.techs.map((tech) => (
                                            <li key={tech.name} className="arch-node__tech">
                                                <BrandIcon icon={tech.icon} size={16} />
                                                {tech.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            {i < nodes.length - 1 && (
                                <li className="arch-link" aria-hidden="true">
                                    {content.links[i] && <span className="arch-link__label">{content.links[i]}</span>}
                                    <span className="arch-link__line">
                                        <span className="arch-link__ambient" />
                                        <span
                                            ref={(el) => {
                                                packetRefs.current[i] = el;
                                            }}
                                            className="arch-link__packet"
                                        />
                                    </span>
                                </li>
                            )}
                        </Fragment>
                    ))}
                </ol>
            </div>

            <div className="arch-console premium-card" data-state={runState}>
                <div className="arch-console__bar">
                    <span className="arch-console__lights" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                    </span>
                    <span className="arch-console__title">trace · requisição simulada</span>
                    <span className="arch-console__status" aria-live="polite">
                        {runState === 'running' ? 'executando…' : runState === 'done' ? 'concluído' : 'aguardando'}
                    </span>
                    <button
                        type="button"
                        className="arch-console__run"
                        onClick={() => setRunId((n) => n + 1)}
                        disabled={runState === 'running'}
                    >
                        {runState === 'done' ? <RotateCcw size={16} /> : <Play size={16} />}
                        Simular requisição
                    </button>
                </div>
                {/* Duas colunas: ida (requisição) | volta (resposta) */}
                <ol className="arch-console__lines" style={{ '--rows': nodes.length } as CSSProperties}>
                    {content.trace.map((line, i) => {
                        const state = i < step ? 'done' : i === step ? 'current' : 'pending';
                        const back = i >= nodes.length;
                        return (
                            <li
                                key={line}
                                className="arch-console__line"
                                data-state={runState === 'done' && i <= step ? 'done' : state}
                                style={{ '--chars': line.length + 4 } as CSSProperties}
                            >
                                <span className="arch-console__arrow" data-dir={back ? 'res' : 'req'}>
                                    {back ? '←' : '→'}
                                </span>
                                <span className="arch-console__text">{line}</span>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
