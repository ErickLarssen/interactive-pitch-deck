# SLIDE_SYSTEM.md

## Anatomia de um slide
Safe area > Zona de headline (1 ideia) > Zona de apoio visual >
Rodapé discreto (progresso, opcional timer).

## Tipos de slide
cover | content | team | ods | stakeholders | stack | architecture |
documentation | demo | closing

## Slide registry (src/data/slides.ts)
```ts
interface SlideConfig {
  id: string;
  title: string;
  type: SlideType;
  speakerId?: string;
  targetSeconds?: number;
  background?: { kind: 'solid' | 'gradient' | 'video' | 'image'; src?: string };
  theme?: 'dark' | 'light';
}
```

## Transições
Slide atual: opacity 1→0, scale 1→0.98.
Próximo: opacity 0→1, translateY 24→0.
Duração: 400–700ms, easing sem bounce.

## Navegação
ArrowRight/PageDown/Space → next
ArrowLeft/PageUp → prev
Home → primeiro slide, End → último slide
F → fullscreen, P → presenter mode
Se modal aberto: ESC fecha modal primeiro, não navega.

## Convenções
Um componente por tipo em src/slides/, nome PascalCase + sufixo Slide
(ex.: CoverSlide.tsx, TeamSlide.tsx).