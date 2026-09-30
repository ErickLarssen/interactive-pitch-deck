import { ReactNode } from 'react';
import { presentationConfig } from '../data/presentation';
import { TimerStatus } from '../utils/timerStatus';

interface TimerRingProps {
    // elapsed / target (pode passar de 1 quando estoura)
    ratio: number;
    status: TimerStatus;
    size: number;
    stroke?: number;
    children?: ReactNode;
}

// Anel de progresso do tempo: preenche até a meta, na cor do status,
// com uma marca no limiar de atenção (80%). Acima de 100% fica cheio
// (o pulso vermelho vem do CSS do componente pai).
export function TimerRing({ ratio, status, size, stroke = 3, children }: TimerRingProps) {
    const r = (size - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    const clamped = Math.min(Math.max(ratio, 0), 1);
    const amberAngle = presentationConfig.thresholds.amber * 360 - 90;
    const rad = (amberAngle * Math.PI) / 180;
    const c = size / 2;

    return (
        <span className={`timer-ring timer-ring--${status}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
                <circle className="timer-ring__track" cx={c} cy={c} r={r} strokeWidth={stroke} />
                <circle
                    className="timer-ring__fill"
                    cx={c}
                    cy={c}
                    r={r}
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - clamped)}
                    transform={`rotate(-90 ${c} ${c})`}
                />
                {/* Marca do limiar de atenção (80% da meta) */}
                <line
                    className="timer-ring__tick"
                    x1={c + (r - stroke) * Math.cos(rad)}
                    y1={c + (r - stroke) * Math.sin(rad)}
                    x2={c + (r + stroke) * Math.cos(rad)}
                    y2={c + (r + stroke) * Math.sin(rad)}
                />
            </svg>
            <span className="timer-ring__content">{children}</span>
        </span>
    );
}
