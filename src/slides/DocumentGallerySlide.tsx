import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FileImage, Maximize2, ZoomIn } from 'lucide-react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { documentGalleryContent } from '../data/slideContent';
import { Modal } from '../components/Modal';
import { DocumentViewer } from '../components/DocumentViewer';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

type Meta = Record<string, { w: number; h: number }>;

const formatOf = (src: string) => src.split('.').pop()?.toUpperCase() ?? '';

// Prévia "lupa": a miniatura amplia a partir do ponto sob o mouse
// (transform-origin em CSS vars, sem re-render).
function trackOrigin(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ox', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--oy', `${((e.clientY - r.top) / r.height) * 100}%`);
}

export function DocumentGallerySlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = documentGalleryContent[slideId];
    const openModal = useStore((s) => s.openModal);
    const rootRef = useRef<HTMLElement>(null);
    const [meta, setMeta] = useState<Meta>({});
    const [expanded, setExpanded] = useState(false);
    useStaggerReveal(rootRef);

    if (!content) return null;
    const docs = content.documents;

    // Resolução e formato lidos do próprio arquivo (nada digitado à mão).
    const describe = (id: string, src: string) => {
        const m = meta[id];
        return m ? `${formatOf(src)} · ${m.w}×${m.h}` : formatOf(src);
    };

    return (
        <section ref={rootRef} className="docs">
            <header className="docs__header">
                <h2 className="docs__headline">{content.headline}</h2>
                <p className="docs__hint">
                    <ZoomIn size={18} aria-hidden="true" />
                    Clique para abrir · zoom até 500%
                </p>
            </header>

            <ul className="docs__grid" style={{ '--docs-cols': Math.min(docs.length, 3) } as React.CSSProperties}>
                {docs.map((doc, i) => (
                    <li key={doc.id}>
                        <button
                            type="button"
                            className="doc-card premium-card"
                            onClick={() => openModal(doc.id)}
                            aria-label={`Abrir ${doc.label}`}
                        >
                            <span className="doc-card__paper" onPointerMove={trackOrigin}>
                                <img
                                    src={doc.src}
                                    alt=""
                                    draggable={false}
                                    onLoad={(e) => {
                                        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                                        setMeta((prev) => (prev[doc.id] ? prev : { ...prev, [doc.id]: { w, h } }));
                                    }}
                                />
                                <span className="doc-card__open" aria-hidden="true">
                                    <Maximize2 size={16} />
                                    Abrir
                                </span>
                            </span>
                            <span className="doc-card__footer">
                                <span className="doc-card__index" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="doc-card__label">{doc.label}</span>
                                <span className="doc-card__meta">
                                    <FileImage size={14} aria-hidden="true" />
                                    {describe(doc.id, doc.src)}
                                </span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {docs.map((doc, i) => {
                const prev = docs[(i - 1 + docs.length) % docs.length];
                const next = docs[(i + 1) % docs.length];
                return (
                    <Modal key={doc.id} id={doc.id} size={expanded ? 'full' : 'large'}>
                        <div className="doc-modal__bar">
                            <span className="doc-modal__index">
                                {String(i + 1).padStart(2, '0')} / {String(docs.length).padStart(2, '0')}
                            </span>
                            <h3 className="document-viewer__title">{doc.label}</h3>
                            <span className="doc-modal__meta">{describe(doc.id, doc.src)}</span>
                            {/* Troca de documento sem fechar o modal */}
                            <nav className="doc-modal__nav" aria-label="Outros documentos">
                                <button type="button" onClick={() => openModal(prev.id)} aria-label={`Anterior: ${prev.label}`}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button type="button" onClick={() => openModal(next.id)} aria-label={`Próximo: ${next.label}`}>
                                    <ChevronRight size={18} />
                                </button>
                            </nav>
                        </div>
                        <DocumentViewer
                            src={doc.src}
                            alt={doc.label}
                            expanded={expanded}
                            onToggleExpand={() => setExpanded((v) => !v)}
                        />
                    </Modal>
                );
            })}
        </section>
    );
}
