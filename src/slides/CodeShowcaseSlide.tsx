import { useRef, useState } from 'react';
import { Highlight, type Language } from 'prism-react-renderer';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { codeShowcaseContent } from '../data/slideContent';
import { BrandIcon, brandColor } from '../components/BrandIcon';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import { codeEditorTheme } from '../components/codeEditorTheme';
import type { CSSProperties } from 'react';

export function CodeShowcaseSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = codeShowcaseContent[slideId];
    const rootRef = useRef<HTMLElement>(null);
    const [selected, setSelected] = useState(0);
    useStaggerReveal(rootRef);

    if (!content) return null;
    const snippets = content.snippets;
    const shown = snippets[selected];

    return (
        <section ref={rootRef} className="code-showcase">
            <header className="code-showcase__header">
                <div>
                    <p className="code-showcase__eyebrow">{content.eyebrow}</p>
                    <h2 className="code-showcase__headline">{content.headline}</h2>
                    {content.intro && <p className="code-showcase__intro">{content.intro}</p>}
                </div>
                <p className="code-showcase__repo">
                    <span className="code-showcase__repo-dot" aria-hidden="true" />
                    {content.repoNote}
                </p>
            </header>

            <div className="code-showcase__tabs" role="tablist" aria-label="Tecnologia">
                {snippets.map((snippet, i) => (
                    <button
                        key={snippet.id}
                        type="button"
                        role="tab"
                        className="code-tab premium-card"
                        data-selected={selected === i}
                        aria-selected={selected === i}
                        style={{ '--brand': brandColor(snippet.iconKey) } as CSSProperties}
                        onClick={() => setSelected(i)}
                    >
                        <BrandIcon icon={snippet.iconKey} size={22} className="code-tab__icon" />
                        {snippet.label}
                    </button>
                ))}
            </div>

            <div key={shown.id} className="code-showcase__body">
                <div className="code-editor premium-card">
                    <div className="code-editor__bar" aria-hidden="true">
                        <span className="code-editor__dots">
                            <span />
                            <span />
                            <span />
                        </span>
                        <span className="code-editor__path">{shown.filePath}</span>
                    </div>
                    <Highlight theme={codeEditorTheme} code={shown.code} language={shown.language as Language}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={`code-editor__pre ${className}`} style={style}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })} className="code-editor__line">
                                        <span className="code-editor__line-number" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                        <span className="code-editor__line-content">
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </div>

                <div className="code-showcase__preview">
                    <div className="code-showcase__screenshot premium-card">
                        <img src={shown.screenshot.src} alt={shown.screenshot.alt} draggable={false} />
                    </div>
                    <p className="code-showcase__caption">{shown.screenshot.caption}</p>
                    <p className="code-showcase__description">{shown.description}</p>
                </div>
            </div>
        </section>
    );
}
