import { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clapperboard, Image, Maximize2, VideoOff } from 'lucide-react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { demoContent } from '../data/slideContent';
import { ICONS } from '../components/icons';
import { Modal } from '../components/Modal';
import { DocumentViewer } from '../components/DocumentViewer';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

type Mode = 'screens' | 'video';

export function DemoSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = demoContent[slideId];
    const openModal = useStore((s) => s.openModal);
    const rootRef = useRef<HTMLElement>(null);
    const [mode, setMode] = useState<Mode>('screens');
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    useStaggerReveal(rootRef);

    if (!content) return null;
    const screens = content.screens;
    const shownIndex = hovered ?? selected;
    const shown = screens[shownIndex];

    return (
        <section ref={rootRef} className="demo">
            <header className="demo__header">
                <div>
                    <p className="demo__eyebrow">{content.eyebrow}</p>
                    <h2 className="demo__headline">{content.headline}</h2>
                </div>
                <p className="demo__live" aria-label={`No ar em ${content.url}`}>
                    <span className="demo__live-dot" aria-hidden="true" />
                    {content.url}
                </p>
            </header>

            {/* Modo (capturas locais ↔ vídeo de apoio) + única saída real
                para a internet: um clique explícito do apresentador, nunca
                algo carregado sozinho (ver ASSETS.md e QA.md). */}
            <div className="demo__controls">
                <div className="demo__mode" role="tablist" aria-label="Formato da demonstração">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={mode === 'screens'}
                        data-active={mode === 'screens'}
                        onClick={() => setMode('screens')}
                    >
                        <Image size={16} aria-hidden="true" />
                        Capturas
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={mode === 'video'}
                        data-active={mode === 'video'}
                        onClick={() => setMode('video')}
                    >
                        <Clapperboard size={16} aria-hidden="true" />
                        Vídeo (plano B)
                    </button>
                </div>

                <a
                    className="pitch-button pitch-button--blue demo__live-link"
                    href={content.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="pitch-button__label">Abrir site ao vivo</span>
                    <ArrowRight className="pitch-button__icon" size={18} aria-hidden="true" />
                </a>
            </div>

            {mode === 'screens' ? (
                <div key="screens" className="demo__body">
                    <div className="demo__nav-col">
                        <ul className="demo__nav">
                            {screens.map((screen, i) => {
                                const Icon = ICONS[screen.iconKey];
                                return (
                                    <li key={screen.id}>
                                        <button
                                            type="button"
                                            className="demo-tile premium-card"
                                            data-selected={selected === i}
                                            aria-pressed={selected === i}
                                            onPointerEnter={() => setHovered(i)}
                                            onPointerLeave={() => setHovered(null)}
                                            onFocus={() => setHovered(i)}
                                            onBlur={() => setHovered(null)}
                                            onClick={() => setSelected(i)}
                                        >
                                            <span className="premium-icon demo-tile__icon" aria-hidden="true">
                                                <Icon size={24} strokeWidth={1.75} />
                                            </span>
                                            <span className="demo-tile__body">
                                                <span className="demo-tile__label">{screen.label}</span>
                                                <span className="demo-tile__path">{screen.path}</span>
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <p key={shown.id} className="demo__description" aria-live="polite">
                            {shown.description}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="demo-window premium-card"
                        onClick={() => openModal(shown.id)}
                        aria-label={`Abrir ${shown.label} em tela cheia`}
                    >
                        <span className="demo-window__bar" aria-hidden="true">
                            <span className="demo-window__dots">
                                <span />
                                <span />
                                <span />
                            </span>
                            <span className="demo-window__url">
                                <span className="demo-window__lock" aria-hidden="true" />
                                {content.url}
                                <span className="demo-window__path">{shown.path}</span>
                            </span>
                        </span>
                        <span className="demo-window__viewport">
                            <img
                                key={shown.id}
                                src={shown.src}
                                alt={`Captura de tela da EcoByte em produção — ${shown.label}`}
                                className="demo-window__image"
                                draggable={false}
                            />
                        </span>
                        <span className="demo-window__open">
                            <Maximize2 size={16} aria-hidden="true" />
                            Abrir
                        </span>
                    </button>
                </div>
            ) : (
                <div key="video" className="demo__body">
                    <div className="demo__nav-col">
                        <div className="demo-video-info premium-card">
                            <span className="premium-icon demo-tile__icon" aria-hidden="true">
                                <Clapperboard size={24} strokeWidth={1.75} />
                            </span>
                            <p className="demo__description">{content.video.caption}</p>
                        </div>
                    </div>

                    <div className="demo-window premium-card">
                        <span className="demo-window__bar" aria-hidden="true">
                            <span className="demo-window__dots">
                                <span />
                                <span />
                                <span />
                            </span>
                            <span className="demo-window__url">
                                <span className="demo-window__lock" aria-hidden="true" />
                                gravação local · sem internet
                            </span>
                        </span>
                        <span className="demo-window__viewport">
                            {videoError ? (
                                <span className="demo-video__pending">
                                    <VideoOff size={32} aria-hidden="true" />
                                    Vídeo ainda não adicionado — ver docs/ASSETS.md
                                </span>
                            ) : (
                                <video
                                    key={content.video.src}
                                    src={content.video.src}
                                    poster={content.video.poster}
                                    className="demo-window__image demo-window__video"
                                    controls
                                    playsInline
                                    onError={() => setVideoError(true)}
                                >
                                    Seu navegador não reproduz este vídeo.
                                </video>
                            )}
                        </span>
                    </div>
                </div>
            )}

            <p className="demo__hint">
                {mode === 'screens'
                    ? content.hint
                    : 'Use os controles do vídeo para apresentar mesmo se a internet falhar no telão'}
            </p>

            {screens.map((screen, i) => {
                const prev = screens[(i - 1 + screens.length) % screens.length];
                const next = screens[(i + 1) % screens.length];
                return (
                    <Modal key={screen.id} id={screen.id} size={expanded ? 'full' : 'large'}>
                        <div className="doc-modal__bar">
                            <h3 className="document-viewer__title">{screen.label}</h3>
                            <span className="doc-modal__meta">
                                {content.url}
                                {screen.path}
                            </span>
                            <nav className="doc-modal__nav" aria-label="Outras telas">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelected(screens.indexOf(prev));
                                        openModal(prev.id);
                                    }}
                                    aria-label={`Tela anterior: ${prev.label}`}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelected(screens.indexOf(next));
                                        openModal(next.id);
                                    }}
                                    aria-label={`Próxima tela: ${next.label}`}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </nav>
                        </div>
                        <DocumentViewer
                            src={screen.src}
                            alt={`Captura de tela da EcoByte em produção — ${screen.label}`}
                            expanded={expanded}
                            onToggleExpand={() => setExpanded((v) => !v)}
                        />
                    </Modal>
                );
            })}
        </section>
    );
}
