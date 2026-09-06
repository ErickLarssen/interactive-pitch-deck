import { presentationConfig } from '../data/presentation';

export type TimerStatus = 'normal' | 'warning' | 'danger';

export function getTimerStatus(elapsed: number, targetSeconds?: number): TimerStatus {
    if (!targetSeconds) return 'normal';
    const ratio = elapsed / targetSeconds;
    const { amber, red } = presentationConfig.thresholds;
    if (ratio >= red) return 'danger';
    if (ratio >= amber) return 'warning';
    return 'normal';
}

export function getTimerStatusLabel(status: TimerStatus): string {
    switch (status) {
        case 'warning':
            return 'atenção';
        case 'danger':
            return 'estourou';
        default:
            return 'no tempo';
    }
}