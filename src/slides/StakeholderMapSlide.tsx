import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { stakeholderMapContent } from '../data/slideContent';

export function StakeholderMapSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = stakeholderMapContent[slideId];
    if (!content) return null;

    return (
        <section className="stakeholder-map">
            <h2 className="stakeholder-map__headline">{content.headline}</h2>
            <div className="stakeholder-map__center">{content.center}</div>
            <div className="stakeholder-map__stem" aria-hidden="true" />
            <div className="stakeholder-map__bar" aria-hidden="true" />
            <div className="stakeholder-map__nodes">
                {content.nodes.map((node) => (
                    <div key={node.label} className="stakeholder-map__node">
                        <div className="stakeholder-map__node-stem" aria-hidden="true" />
                        <h3>{node.label}</h3>
                        <span className="stakeholder-map__node-tag">{node.tag}</span>
                        <p>{node.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}