import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ModalProps {
    id: string;
    children: ReactNode;
    size?: 'default' | 'large';
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

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div
                ref={dialogRef}
                className={`modal-content ${size === 'large' ? 'modal-content--large' : ''}`}
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
        </div>
    );
}