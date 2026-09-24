import { useLayoutEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { team } from '../data/team';
import { useStore } from '../store/useStore';
import { Button } from './Button';

const CARD_WIDTH = 220;
const CARD_GAP = 24;

export function TeamCarousel() {
    const activeSpeakerId = useStore((s) => s.activeSpeakerId);
    const startSpeaker = useStore((s) => s.startSpeaker);
    const openModal = useStore((s) => s.openModal);

    const viewportRef = useRef<HTMLDivElement>(null);
    const [viewportWidth, setViewportWidth] = useState(0);

    const foundIndex = team.findIndex((m) => m.id === activeSpeakerId);
    const [activeIndex, setActiveIndex] = useState(foundIndex >= 0 ? foundIndex : 0);

    // Largura medida em tempo real (não fixa): garante centralização
    // correta tanto em 1920x1080 quanto em 1366x768, sem duplicar um
    // número mágico entre JS e CSS.
    useLayoutEffect(() => {
        function measure() {
            if (viewportRef.current) setViewportWidth(viewportRef.current.clientWidth);
        }
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const goPrev = () => setActiveIndex((i) => (i - 1 + team.length) % team.length);
    const goNext = () => setActiveIndex((i) => (i + 1) % team.length);

    const centerOffset =
        viewportWidth / 2 - (activeIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2);

    return (
        <div className="team-carousel">
            <button type="button" className="team-carousel__nav" onClick={goPrev} aria-label="Integrante anterior">
                ‹
            </button>

            <div ref={viewportRef} className="team-carousel__viewport">
                <div
                    className="team-carousel__track"
                    style={{ transform: `translateX(${centerOffset}px)` }}
                >
                    {team.map((member, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={member.id}
                                className={`team-carousel__card ${isActive ? 'team-carousel__card--active' : ''}`}
                                style={{ width: CARD_WIDTH }}
                                role="button"
                                tabIndex={0}
                                onClick={() => setActiveIndex(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') setActiveIndex(index);
                                }}
                            >
                                <div className="team-carousel__photo-frame">
                                    <img src={member.photo} alt={member.name} className="team-carousel__photo" />
                                    <span className="team-carousel__badge">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <p className="team-carousel__name">{member.name}</p>
                                <p className="team-carousel__role">{member.role}</p>
                                <div className="team-carousel__actions">
                                    <Button
                                        variant={activeSpeakerId === member.id ? 'green' : 'blue'}
                                        icon={false}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startSpeaker(member.id);
                                        }}
                                    >
                                        {activeSpeakerId === member.id ? 'Apresentando' : 'Apresentar'}
                                    </Button>
                                    <button
                                        type="button"
                                        className="team-carousel__info-btn"
                                        aria-label={`Ver perfil de ${member.name}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(member.id);
                                        }}
                                    >
                                        <Info size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button type="button" className="team-carousel__nav" onClick={goNext} aria-label="Próximo integrante">
                ›
            </button>
        </div>
    );
}