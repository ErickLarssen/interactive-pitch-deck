import { slides } from '../data/slides';
import { useStore } from '../store/useStore';
import { documentGalleryContent } from '../data/slideContent';
import { Modal } from '../components/Modal';
import { DocumentViewer } from '../components/DocumentViewer';

export function DocumentGallerySlide() {
    const currentSlide = useStore((s) => s.currentSlide);
    const slideId = slides[currentSlide].id;
    const content = documentGalleryContent[slideId];
    const openModal = useStore((s) => s.openModal);
    if (!content) return null;

    return (
        <section className="document-gallery">
            <h2 className="document-gallery__headline">{content.headline}</h2>
            <div className="document-gallery__buttons">
                {content.documents.map((doc) => (
                    <button
                        key={doc.id}
                        type="button"
                        className="document-gallery__button"
                        onClick={() => openModal(doc.id)}
                    >
                        {doc.label}
                    </button>
                ))}
            </div>

            {content.documents.map((doc) => (
                <Modal key={doc.id} id={doc.id} size="large">
                    <h3 className="document-viewer__title">{doc.label}</h3>
                    <DocumentViewer src={doc.src} alt={doc.label} />
                </Modal>
            ))}
        </section>
    );
}