import { CSSProperties, useRef, useState } from 'react';
import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { techStackContent } from '../data/slideContent';
import { BrandIcon, brandColor } from '../components/BrandIcon';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import { TechGroup, TechItem } from '../types';

interface Pick {
    group: number;
    item: number;
}

const MAX_TILT = 10; // graus

// Inclinação 3D seguindo o ponteiro: grava --rx/--ry direto no tile
// (sem re-render); o transform vive no CSS.
function tilt(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * MAX_TILT).toFixed(2)}deg`);
}

function resetTilt(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.style.removeProperty('--rx');
    e.currentTarget.style.removeProperty('--ry');
}

export function TechStackSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const content = techStackContent[slides[currentSlide].id];
    const rootRef = useRef<HTMLElement>(null);
    const [hovered, setHovered] = useState<Pick | null>(null);
    const [selected, setSelected] = useState<Pick>({ group: 0, item: 0 });
    useStaggerReveal(rootRef, '.stack-tile, .stack__inspector');

    if (!content) return null;

    // Ferramentas entram como um "grupo" a mais (raiz do monorepo).
    const allGroups: TechGroup[] = [...content.groups, { label: 'Ferramentas', path: './', items: content.tooling }];
    const shown = hovered ?? selected;
    const shownGroup = allGroups[shown.group];
    const shownItem = shownGroup.items[shown.item];
    // Onde mais essa tecnologia aparece (ex.: TypeScript nos dois lados).
    const alsoIn = allGroups.filter((g, gi) => gi !== shown.group && g.items.some((t) => t.id === shownItem.id));

    const tileProps = (group: number, item: number, tech: TechItem) => ({
        'data-selected': selected.group === group && selected.item === item,
        'data-linked': shownItem.id === tech.id && !(shown.group === group && shown.item === item),
        style: { '--brand': brandColor(tech.icon) } as CSSProperties,
        onPointerEnter: () => setHovered({ group, item }),
        onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
            setHovered(null);
            resetTilt(e);
        },
        onPointerMove: reducedMotion ? undefined : tilt,
        onFocus: () => setHovered({ group, item }),
        onBlur: () => setHovered(null),
        onClick: () => setSelected({ group, item }),
    });

    return (
        <section ref={rootRef} className="stack">
            <h2 className="stack__headline">{content.headline}</h2>

            <div className="stack__body">
                {content.groups.map((group, gi) => (
                    <div key={group.path} className="stack__group">
                        <div className="stack__group-head">
                            <span className="stack__path">{group.path}</span>
                            <span className="stack__group-label">{group.label}</span>
                        </div>
                        <ul className="stack__grid">
                            {group.items.map((tech, ti) => (
                                <li key={`${group.path}-${tech.id}`}>
                                    <button type="button" className="stack-tile premium-card" {...tileProps(gi, ti, tech)}>
                                        <BrandIcon icon={tech.icon} size={34} className="stack-tile__logo" />
                                        <span className="stack-tile__name">{tech.name}</span>
                                        {tech.version && <span className="stack-tile__version">{tech.version}</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <aside
                    className="stack__inspector premium-card"
                    style={{ '--brand': brandColor(shownItem.icon) } as CSSProperties}
                    aria-live="polite"
                >
                    <span className="stack__inspector-title">inspector</span>
                    <div key={`${shown.group}-${shown.item}`} className="stack__inspector-body">
                        <BrandIcon icon={shownItem.icon} size={64} className="stack__inspector-logo" />
                        <h3 className="stack__inspector-name">{shownItem.name}</h3>
                        <dl className="stack__inspector-meta">
                            <div>
                                <dt>workspace</dt>
                                <dd>{shownGroup.path}</dd>
                            </div>
                            {shownItem.version && (
                                <div>
                                    <dt>versão</dt>
                                    <dd>{shownItem.version}</dd>
                                </div>
                            )}
                        </dl>
                        <p className="stack__inspector-role">{shownItem.role}</p>
                        {alsoIn.length > 0 && (
                            <p className="stack__inspector-also">
                                Também em {alsoIn.map((g) => g.path).join(', ')}
                            </p>
                        )}
                    </div>
                </aside>
            </div>

            <div className="stack__tooling">
                <span className="stack__path">./</span>
                <ul className="stack__tooling-list">
                    {content.tooling.map((tech, ti) => (
                        <li key={tech.id}>
                            <button
                                type="button"
                                className="stack-tile stack-tile--inline premium-card"
                                {...tileProps(allGroups.length - 1, ti, tech)}
                            >
                                <BrandIcon icon={tech.icon} size={22} className="stack-tile__logo" />
                                <span className="stack-tile__name">{tech.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
