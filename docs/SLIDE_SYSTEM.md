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
  (ClosingContent.animatedLogo) cercado de anéis HUD, inclinação 3D no mouse,
  onda de choque no clique no logo, tagline e "Obrigado." em gradiente.
  O mesh escuro da capa (PresentationShell) também fica ativo aqui.

## Tipo goals (slide 16 — Resultados esperados)
GoalsSlide.tsx + goalsContent: jornada operacional (3 cards ligados por
linha — ordem, não proporção) e destaques (resíduos com balança; taxa
com medidor circular via GoalItem.gauge). value é exibido exatamente
como a equipe informou; CountUpValue anima só o número.

## Layout 'roadmap' (slide 17)
SequentialStepsContent.layout = 'roadmap' → RoadmapSteps.tsx (detalhes
visuais em DESIGN_SYSTEM.md). Etapas com iconKey; closingPhrase em
premium-callout.

## Tipo de slide: demo (slide 15 — Demonstração)
DemoSlide.tsx + demoContent (src/data/slideContent.ts). Janela de
navegador (demo-window) com capturas reais do deploy em produção
(eco-byte-neon.vercel.app) — nunca um `<iframe>` ao vivo: ver
ASSETS.md. Coluna lateral (demo-tile, mesmo padrão hover/seleção do
Stack) troca a captura mostrada; clique na janela abre Modal +
DocumentViewer (reaproveitado do slide de Documentação) para navegar
em detalhe. Content: eyebrow, headline, url (domínio real, texto —
nunca link clicável), hint, screens (id, label, path, description,
src, iconKey).

### Modo Capturas ↔ Vídeo (plano B) + link ao vivo
Barra `demo__controls` acima da janela: tabs `demo__mode`
("Capturas" | "Vídeo (plano B)", `role="tablist"`) trocam o conteúdo
de `demo__body` (remonta via `key={mode}`, crossfade — ver MOTION.md);
no modo Vídeo a coluna lateral vira legenda (`demo-video-info`) e a
janela mostra um `<video controls playsInline>` local (poster +
`content.video.src`); sem `autoplay`/`loop` — é conteúdo que o
apresentador toca, não um fundo ambiente. Se o arquivo ainda não
existir, `onError` troca para um estado de placeholder
(`demo-video__pending`) em vez de ícone de vídeo quebrado. À direita,
`demo__live-link` é um `<a target="_blank" rel="noopener noreferrer">`
real para `content.liveHref` — a ÚNICA dependência de internet do
slide, e só por ação explícita do apresentador (ver ASSETS.md/QA.md).
