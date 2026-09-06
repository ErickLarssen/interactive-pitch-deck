import { PresentationConfig } from '../types';

export const presentationConfig: PresentationConfig = {
    totalPitchSeconds: 15 * 60,
    thresholds: {
        amber: 0.8,
        red: 1.0,
    },
};

// Tempo-alvo por apresentador, em segundos. As chaves devem bater com
// os ids reais em src/data/team.ts: ajustem se os ids forem diferentes
// (ex.: "integrante-1"). Qualquer id não listado aqui usa o padrão.
export const speakerTargetSeconds: Record<string, number> = {
    carlos: 150,
    eduardo: 150,
    erick: 150,
    guilherme: 150,
    michael: 150,
    ryan: 150,
};

export const defaultSpeakerTargetSeconds = 150;