interface FlowStripProps {
    steps: string[];
}

export function FlowStrip({ steps }: FlowStripProps) {
    return (
        <div className="flow-strip">
            {steps.map((step, index) => (
                <span key={step} className="flow-strip__group">
                    <span className="flow-strip__item">{step}</span>
                    {index < steps.length - 1 && (
                        <span className="flow-strip__arrow" aria-hidden="true">→</span>
                    )}
                </span>
            ))}
        </div>
    );
}