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

## Tipo de slide adicionado: document-gallery
Renderiza N botões (definidos em slideContent.ts); cada um abre um
Modal (variante size="large") contendo um DocumentViewer com zoom.
Usado no slide 14 (Documentação).
## Variante de layout: info-cards 'journey'
InfoCardsContent.layout = 'journey' (hoje só no slide 04 — Problema)
troca a grade padrão por JourneyCards: cards numerados (01–03) com
ícone de linha lucide (InfoCard.iconKey), ligados por uma linha em
gradiente da marca, e rodapé em duas colunas (closingPhrase em
destaque | support discreto). Slides info-cards sem `layout` seguem
com a grade padrão, inalterada.

## Layouts premium por conteúdo
InfoCardsContent.layout: 'journey' | 'cards'; SequentialStepsContent.layout:
'journey'. StakeholderNode ganhou iconKey e status ('active' | 'potential');
OdsItem ganhou color (cor oficial). Todos opcionais: conteúdo sem esses
campos renderiza o visual anterior.

## Tipos de slide: architecture e tech-stack
- architecture (slide 12, ArchitectureSlide.tsx): diagrama de camadas
  com chaves de workspace, conexões com tráfego ambiente e simulação de
  requisição (ida e volta) com terminal de trace. Conteúdo em
  architectureContent; trace tem 2 × nós − 1 linhas (uma por camada
  visitada).
- tech-stack (slide 13, TechStackSlide.tsx): grades de logos por
  workspace + inspector. TechItem com o mesmo id em grupos diferentes
  = mesma tecnologia (acendem juntas).
Os dois substituem o antigo tipo 'content' desses slides.

## document-gallery (slide 14) — redesign
Cards premium com a prévia real de cada documento (papel branco) e
metadados lidos do próprio arquivo (formato + resolução, via
naturalWidth/Height — nada digitado à mão). Clique abre o Modal com o
DocumentViewer. No modal: índice 02 / 04, título, metadados e setas
‹ › para trocar de documento sem fechar. Modal ganhou o tamanho
'full' (tela cheia) e passou a renderizar via portal no <body> (ver
ARCHITECTURE.md).

## Tipo meme (slide 18) e encerramento redesenhado (19)
- meme (MemeSlide.tsx, memeContent): imagem numa "janela" de
  visualizador (nome e resolução lidos do arquivo), borda luminosa
  girando, inclinação 3D e chuva de aplausos no clique. Pré-carrega o
  APNG do slide seguinte (animatedLogo do closingContent).
- closing (ClosingSlide.tsx): frase palavra a palavra, palco com o APNG
  (ClosingContent.animatedLogo) cercado de anéis HUD, paralaxe no mouse,
  onda de choque no clique no logo, tagline e "Obrigado." em gradiente.
  O mesh escuro da capa (PresentationShell) também fica ativo aqui.
