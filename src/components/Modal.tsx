import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ModalProps {
    id: string;
    children: ReactNode;
    // 'full' = tela cheia (visualizador de documentos): sem área de
    // clique-fora; fecha pelo X ou ESC.
    size?: 'default' | 'large' | 'full';
}

export function Modal({ id, children, size = 'default' }: ModalProps) {
    const openModalId = useStore((s) => s.openModalId);
    const closeModal = useStore((s) => s.closeModal);
    const dialogRef = useRef<HTMLDivElement>(null);
    const isOpen = openModalId === id;

    useEffect(() => {
        if (isOpen) dialogRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) return null;

    // Portal no <body>: o slide recebe transform (GSAP) nas transições, e
    // um ancestral com transform prende position: fixed a ele em vez da
    // tela — o overlay precisa cobrir a viewport inteira.
    return createPortal(
        <div className="modal-overlay" onClick={closeModal}>
            <div
                ref={dialogRef}
                className={`modal-content ${size !== 'default' ? `modal-content--${size}` : ''}`}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" className="modal-content__close" onClick={closeModal} aria-label="Fechar">
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}