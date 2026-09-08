export type SlideType =
    | 'cover'
    | 'team'
    | 'content'
    | 'stat-highlight'
    | 'info-cards'
    | 'sequential-steps'
    | 'stakeholder-map'
    | 'ods-grid'
    | 'closing'
    | 'document-gallery';

export interface SlideBackground {
    kind: 'solid' | 'gradient' | 'video' | 'image' | 'beams';
    src?: string;
    poster?: string;
}

// --- Conteúdo estruturado por tipo de slide ---
// Ver src/data/slideContent.ts para os valores reais.

export interface StatItem {
    value: string;
    label: string;
}
export interface StatHighlightContent {
    headline: string;
    stats: StatItem[];
    support?: string;
    impactPhrase?: string;
    source?: string;
}

export interface InfoCard {
    icon?: string;
    title: string;
    description: string;
}
export interface InfoCardsContent {
    headline: string;
    intro?: string;
    cards: InfoCard[];
    support?: string;
    flow?: string[];
    closingPhrase?: string;
}

export interface StepItem {
    number: string;
    title: string;
    description: string;
}
export interface SequentialStepsContent {
    headline: string;
    steps: StepItem[];
    flow?: string[];
    closingPhrase?: string;
}

export interface StakeholderNode {
    label: string;
    tag: string;
    description: string;
}
export interface StakeholderMapContent {
    headline: string;
    center: string;
    nodes: StakeholderNode[];
}

export interface OdsItem {
    number: string;
    short: string;
    description: string;
}
export interface OdsGridContent {
    headline: string;
    items: OdsItem[];
}

export interface ClosingContent {
    lines: string[];
    projectName: string;
    tagline: string;
    thanks: string;
}

export interface SlideConfig {
    id: string;
    title: string;
    type: SlideType;
    speakerId?: string;
    targetSeconds?: number;
    background?: SlideBackground;
    theme?: 'dark' | 'light';
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    photo: string;
    skills?: string[];
    socials?: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
}

export interface TimerThresholds {
    amber: number; // fração 0–1 de targetSeconds
    red: number;
}

export interface PresentationConfig {
    totalPitchSeconds: number;
    thresholds: TimerThresholds;
}

export interface DocumentItem {
    id: string;
    label: string;
    src: string;
}
export interface DocumentGalleryContent {
    headline: string;
    documents: DocumentItem[];
}