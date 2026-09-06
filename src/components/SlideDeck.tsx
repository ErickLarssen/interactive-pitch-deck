import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';
import { slides } from '../data/slides';
import { CoverSlide } from '../slides/CoverSlide';
import { TeamSlide } from '../slides/TeamSlide';
import { ContentSlide } from '../slides/ContentSlide';
import { StatHighlightSlide } from '../slides/StatHighlightSlide';
import { InfoCardsSlide } from '../slides/InfoCardsSlide';
import { SequentialStepsSlide } from '../slides/SequentialStepsSlide';
import { StakeholderMapSlide } from '../slides/StakeholderMapSlide';
import { OdsGridSlide } from '../slides/OdsGridSlide';
import { ClosingSlide } from '../slides/ClosingSlide';

function renderSlide(type: string) {
    switch (type) {
        case 'cover': return <CoverSlide />;
        case 'team': return <TeamSlide />;
        case 'stat-highlight': return <StatHighlightSlide />;
        case 'info-cards': return <InfoCardsSlide />;
        case 'sequential-steps': return <SequentialStepsSlide />;
        case 'stakeholder-map': return <StakeholderMapSlide />;
        case 'ods-grid': return <OdsGridSlide />;
        case 'closing': return <ClosingSlide />;
        case 'content': return <ContentSlide />;
        default: return null;
    }
}

export function SlideDeck() {
    const currentSlide = useStore((s) => s.currentSlide);
    const reducedMotion = useStore((s) => s.reducedMotion);
    const containerRef = useRef<HTMLDivElement>(null);
    const slide = slides[currentSlide];

    useEffect(() => {
        if (!containerRef.current) return;
        if (reducedMotion) {
            gsap.set(containerRef.current, { opacity: 1, y: 0 });
            return;
        }
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
        );
    }, [currentSlide, reducedMotion]);

    return (
        <div className="slide-viewport" data-theme={slide.theme}>
            <div key={slide.id} ref={containerRef} className="slide-content">
                {renderSlide(slide.type)}
            </div>
        </div>
    );
}