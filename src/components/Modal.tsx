import { ReactNode, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

interface ModalProps {
    id: string;
    children: ReactNode;
}

export function Modal({ id, children }: ModalProps) {
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
                className="modal-content"
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}