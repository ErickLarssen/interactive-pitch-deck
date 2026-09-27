import { CSSProperties } from 'react';

interface FlowStripProps {
    steps: string[];
}

// Pipeline de etapas: cada etapa acende em sequência ao entrar no slide
// (delays por índice via --i, animação só em CSS). Conectores se
// desenham entre elas. Hover destaca a etapa.
export function FlowStrip({ steps }: FlowStripProps) {
    return (
        <ol className="flow-strip" aria-label={steps.join(' → ')}>
            {steps.map((step, index) => (
                <li key={step} className="flow-strip__group" style={{ '--i': index } as CSSProperties}>
                    <span className="flow-strip__item">
                        <span className="flow-strip__dot" aria-hidden="true" />
                        {step}
                    </span>
                    {index < steps.length - 1 && <span className="flow-strip__connector" aria-hidden="true" />}
                </li>
            ))}
        </ol>
    );
}
