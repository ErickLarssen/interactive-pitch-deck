import { CSSProperties } from 'react';
import {
    siEslint,
    siExpress,
    siMongodb,
    siMongoose,
    siNextdotjs,
    siNodedotjs,
    siNpm,
    siReact,
    siReacthookform,
    siReactquery,
    siShadcnui,
    siTailwindcss,
    siTypescript,
    siVitest,
    siZod,
} from 'simple-icons';
import { Cookie, LucideIcon, ShieldCheck, Sprout, SquareTerminal } from 'lucide-react';
import { TechIconKey } from '../types';

// Logos de marca: simple-icons (CC0, SVG local — funciona offline).
// Sem logo oficial: ícone de linha lucide, com uma cor da marca EcoByte.
type BrandSource = { kind: 'brand'; path: string; hex: string } | { kind: 'lucide'; Icon: LucideIcon; hex: string };

const brand = (icon: { path: string; hex: string }): BrandSource => ({ kind: 'brand', path: icon.path, hex: `#${icon.hex}` });

const ICONS: Record<TechIconKey, BrandSource> = {
    nextjs: brand(siNextdotjs),
    react: brand(siReact),
    typescript: brand(siTypescript),
    tailwind: brand(siTailwindcss),
    shadcn: brand(siShadcnui),
    tanstack: brand(siReactquery),
    rhf: brand(siReacthookform),
    zod: brand(siZod),
    vitest: brand(siVitest),
    node: brand(siNodedotjs),
    express: brand(siExpress),
    mongodb: brand(siMongodb),
    mongoose: brand(siMongoose),
    eslint: brand(siEslint),
    npm: brand(siNpm),
    session: { kind: 'lucide', Icon: Cookie, hex: '#4fa8db' },
    security: { kind: 'lucide', Icon: ShieldCheck, hex: '#8bc34a' },
    concurrently: { kind: 'lucide', Icon: SquareTerminal, hex: '#4fa8db' },
    seed: { kind: 'lucide', Icon: Sprout, hex: '#8bc34a' },
};

// Várias marcas são pretas/escuras (Next.js, Express, shadcn, Mongoose)
// e somem no fundo escuro. Clareia em direção ao branco até atingir
// contraste ≥ 3:1 contra --bg-elevated (#16181c), preservando o matiz.
const SURFACE = [0x16, 0x18, 0x1c];

function luminance([r, g, b]: number[]) {
    const lin = (v: number) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function readable(hex: string) {
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const surface = luminance(SURFACE);
    for (let t = 0; t <= 1; t += 0.05) {
        const mixed = rgb.map((c) => Math.round(c + (255 - c) * t));
        if ((luminance(mixed) + 0.05) / (surface + 0.05) >= 3) {
            return `rgb(${mixed.join(', ')})`;
        }
    }
    return '#ffffff';
}

const displayColors = new Map<TechIconKey, string>();
export function brandColor(key: TechIconKey) {
    if (!displayColors.has(key)) displayColors.set(key, readable(ICONS[key].hex));
    return displayColors.get(key)!;
}

interface BrandIconProps {
    icon: TechIconKey;
    size?: number;
    className?: string;
}

// Renderiza em currentColor; quem usa decide quando mostrar a cor da
// marca (via --brand, exposta aqui para o CSS do componente pai).
export function BrandIcon({ icon, size = 28, className }: BrandIconProps) {
    const source = ICONS[icon];
    const style = { '--brand': brandColor(icon) } as CSSProperties;

    if (source.kind === 'lucide') {
        const { Icon } = source;
        return (
            <span className={`brand-icon ${className ?? ''}`} style={style} aria-hidden="true">
                <Icon size={size} strokeWidth={1.75} />
            </span>
        );
    }

    return (
        <span className={`brand-icon ${className ?? ''}`} style={style} aria-hidden="true">
            <svg viewBox="0 0 24 24" width={size} height={size} focusable="false">
                <path d={source.path} fill="currentColor" />
            </svg>
        </span>
    );
}
