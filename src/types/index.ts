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
    | 'document-gallery'
    | 'architecture'
    | 'tech-stack'
    | 'meme'
    | 'goals'
    | 'demo';

// Ícones de tecnologia: logos de marca (simple-icons) ou, sem logo
// oficial, ícone de linha lucide. Registro em components/BrandIcon.tsx.
export type TechIconKey =
    | 'nextjs'
    | 'react'
    | 'typescript'
    | 'tailwind'
    | 'shadcn'
    | 'tanstack'
    | 'rhf'
    | 'zod'
    | 'vitest'
    | 'node'
    | 'express'
    | 'mongodb'
    | 'mongoose'
    | 'eslint'
    | 'npm'
    | 'session'
    | 'security'
    | 'concurrently'
    | 'seed';

export interface TechItem {
    // Mesmo id em grupos diferentes = mesma tecnologia (acendem juntas).
    id: string;
    name: string;
    icon: TechIconKey;
    version?: string;
    role: string;
}
export interface TechGroup {
    label: string;
    path: string;
    items: TechItem[];
}
export interface TechStackContent {
    headline: string;
    groups: TechGroup[];
    tooling: TechItem[];
}

export interface ArchitectureNode {
    id: string;
    layer: string;
    workspace?: string;
    name: string;
    version?: string;
    icon: TechIconKey;
    badge?: string;
    note?: string;
    techs: { name: string; icon: TechIconKey }[];
}
export interface ArchitectureContent {
    headline: string;
    chips: string[];
    nodes: ArchitectureNode[];
    // Rótulo de cada conexão entre nós (length = nodes.length - 1).
    links: string[];
    // Uma linha por camada visitada pela requisição simulada: ida
    // (nó 0 → último) e volta (→ nó 0). length = 2 * nodes.length - 1.
    trace: string[];
}

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
export interface TrendChartData {
    from: { label: string; value: number; displayValue: string };
    to: { label: string; value: number; displayValue: string };
    ringLabel: string;
    ringPercent: number;
}
// Waffle 10×10: o total vira 100 quadrados; highlightPercent define
// quantos acendem. Todos os números vêm de fonte — nenhum é interpolado.
export interface WaffleChartData {
    total: number;
    unit: string;
    caption: string;
    highlightPercent: number;
    highlightLabel: string;
    restLabel: string;
}
export interface StatHighlightContent {
    headline: string;
    stats: StatItem[];
    support?: string;
    impactPhrase?: string;
    source?: string;
    trendChart?: TrendChartData;
    // Quando presente, substitui a lista de stats pelo gráfico (o número
    // de destaque passa a ser exibido, com count-up, dentro dele).
    waffleChart?: WaffleChartData;
}

export type InfoCardIconKey =
    | 'map-pin'
    | 'truck'
    | 'recycle'
    | 'house'
    | 'store'
    | 'building'
    | 'door-open'
    | 'pointer'
    | 'network'
    | 'clipboard'
    | 'refresh'
    | 'check'
    | 'smartphone'
    | 'warehouse'
    | 'landmark'
    | 'users'
    | 'package'
    | 'scale'
    | 'badge-check'
    | 'flask'
    | 'handshake'
    | 'map'
    | 'rocket';
export interface InfoCard {
    icon?: string;
    // Ícone de linha (lucide) usado pelo layout 'journey' no lugar do emoji.
    iconKey?: InfoCardIconKey;
    title: string;
    description: string;
}
export interface InfoCardsContent {
    // 'journey': cards premium numerados e conectados (etapas de um percurso).
    // 'cards': mesmos cards premium, sem numeração/linha (itens paralelos).
    // Omitido = grade padrão original.
    layout?: 'journey' | 'cards';
    headline: string;
    intro?: string;
    cards: InfoCard[];
    support?: string;
    flow?: string[];
    closingPhrase?: string;
}

export interface StepItem {
    number: string;
    iconKey?: InfoCardIconKey;
    title: string;
    description: string;
}
export interface SequentialStepsContent {
    // 'journey': renderiza os passos com JourneyCards (igual ao slide Problema).
    // 'roadmap': linha do tempo com marcos crescentes (slide Próximos passos).
    layout?: 'journey' | 'roadmap';
    headline: string;
    steps: StepItem[];
    flow?: string[];
    closingPhrase?: string;
}

export interface StakeholderNode {
    label: string;
    tag: string;
    description: string;
    iconKey?: InfoCardIconKey;
    // 'potential' = parceria não firmada: selo tracejado no mapa, para
    // nunca parecer parceria existente (ver nota da equipe em CONTENT.md).
    status?: 'active' | 'potential';
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
    // Cor oficial do ODS (paleta ONU), usada só como faixa de destaque.
    color?: string;
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
    // APNG em loop, ápice do slide; se falhar, cai para o logo estático.
    animatedLogo?: string;
}

export interface MemeContent {
    src: string;
    alt: string;
    // Rótulo do botão de aplauso (interação do slide).
    clapLabel: string;
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

// Slide de metas (Resultados esperados). value é exibido exatamente
// como informado pela equipe (ex.: "500+", "2+ toneladas", "80%+");
// CountUpValue anima só o número. gauge (0–100) desenha o medidor.
export interface GoalItem {
    icon: InfoCardIconKey;
    label: string;
    value: string;
    gauge?: number;
}
export interface GoalsContent {
    eyebrow: string;
    headline: string;
    badge: string;
    // Jornada operacional (ordem das etapas — NÃO implica proporção).
    journey: GoalItem[];
    highlights: GoalItem[];
}

// Slide de demonstração (15). Modo padrão: capturas reais do deploy em
// produção — nunca um <iframe> ao vivo (ASSETS.md proíbe asset
// essencial de URL externa; QA.md exige a aplicação inteira
// funcionando sem internet). src aponta para a captura local; url/path
// são só texto (nunca um link clicável) que mostra de onde ela veio.
// liveHref é a ÚNICA dependência de internet do slide: uma ação
// explícita do apresentador (botão "Abrir site ao vivo"), nunca algo
// carregado automaticamente. O modo "video" é o plano B caso a
// internet falhe no telão: vídeo local gravado, controles nativos,
// sem autoplay.
export interface DemoScreen {
    id: string;
    label: string;
    path: string;
    description: string;
    src: string;
    iconKey: InfoCardIconKey;
}
export interface DemoVideo {
    src: string;
    poster: string;
    caption: string;
}
export interface DemoContent {
    eyebrow: string;
    headline: string;
    intro?: string;
    url: string;
    liveHref: string;
    hint: string;
    screens: DemoScreen[];
    video: DemoVideo;
}
