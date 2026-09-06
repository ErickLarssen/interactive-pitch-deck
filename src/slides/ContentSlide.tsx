import { slides } from '../data/slides';
import { useStore } from '../store/useStore';

export function ContentSlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slide = slides[currentSlide];

    return (
        <section className="content-slide">
            <h2 className="content-slide__title">{slide.title}</h2>
            <p className="content-slide__body">[INSERIR CONTEÚDO DESTE BLOCO]</p>
        </section>
    );
}