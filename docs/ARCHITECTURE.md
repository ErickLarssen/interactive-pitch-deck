# ARCHITECTURE.md

## Decisão de estado global: Zustand
Avaliado Context+useReducer primeiro, conforme solicitado. Rejeitado
porque o timer atualiza a cada tick e é consumido por componentes
desacoplados (avatar flutuante, presenter panel, indicador global);
com Context isso re-renderiza toda a árvore de consumidores a menos
que se fatie manualmente em múltiplos providers, o que reimplementa,
pior, o que Zustand resolve nativamente com seletores. Zustand permite
`useStore(s => s.timer.seconds)` sem re-render em cascata.

## Estrutura de diretórios
Ver README raiz / prompt original. Resumo dos papéis:
- src/slides: um componente por slide, registrado em src/data/slides.ts
- src/controls: navegação, avatar flutuante, presenter panel
- src/store: slices Zustand (navigation, speaker/timer, ui)
- src/data: fonte única de verdade para slides, equipe e tempos

## Fluxo da aplicação
App.tsx
 └─ PresentationShell (fullscreen root, cursor idle, keyboard listener)
     └─ SlideDeck (lê currentSlide do store, renderiza slide ativo)
         └─ Slide[type] (cover | content | team | ods | stack | ...)
     └─ ProgressIndicator (discreto)
     └─ FloatingAvatar (se houver activeSpeaker)
     └─ PresenterOverlay (se isPresenterMode)
     └─ ModalRoot (integrante, ODS, doc preview — um de cada vez)

## Estado (slices Zustand)
- navigationSlice: currentSlide, totalSlides, goTo(), next(), prev()
- speakerSlice: activeSpeakerId, perSpeakerElapsed, start/pause/stop/reset
- timerSlice: globalElapsed, thresholds (amber/red), running
- uiSlice: isPresenterMode, openModalId, isFullscreen, isPaused,
  reducedMotion (espelha prefers-reduced-motion)

## Componentes (categorias)
- Layout/shell, Slides, Controles de navegação, Timer/Avatar,
  Modais, Primitivas de motion (wrappers GSAP reutilizáveis)

## Dados
- src/data/slides.ts — registry de slides (id, title, type, speaker,
  targetSeconds, background, theme)
- src/data/team.ts — integrantes
- src/data/presentation.ts — tempos globais e por bloco, thresholds

## Dependências
react, react-dom, vite, typescript, gsap, zustand.
Ícones: biblioteca leve a definir apenas se necessário (ex.: lucide-react),
evitar dependência se poucos ícones forem usados (SVG inline resolve).

## Decisão: fundo movido para o shell (persistente)
O vídeo de fundo deixou de ser configurado por slide e passou a viver
uma única vez em PresentationShell, atrás de SlideDeck. Motivo: um
<video> por slide era desmontado/remontado a cada navegação, causando
reinício visível e inconsistência entre slides. Agora é um único
elemento, nunca desmontado — mesmo fundo, contínuo, em todos os slides.

## Decisão: FloatingAvatar substituído por SpeakerDock (global)
O dock de apresentador passou a ficar disponível em todos os slides
(não só quando alguém já estava falando), permitindo trocar de
apresentador de qualquer ponto da apresentação sem voltar ao slide de
Integrantes. Ao trocar, o apresentador anterior é finalizado
automaticamente (tempo realizado registrado), evitando perda de dado.

## Decisão: logo da capa desacoplado via transform: scale()
O aumento do logo passou a usar transform: scale() num "slot" de
tamanho fixo, em vez de aumentar o width do próprio <img>. Motivo:
qualquer aumento de caixa em fluxo normal empurra os irmãos abaixo —
isso é comportamento padrão do modelo de caixas do CSS, não um bug
específico. transform não afeta o fluxo do documento, então o
subtítulo/meta nunca mais mudam de posição ao ajustar o tamanho visual
do logo. Dois controles agora independentes:
--cover-logo-scale (tamanho visual) e --cover-logo-clearance (espaço
reservado abaixo, só ajustado se o logo maior encostar no subtítulo).

## Decisão: DocumentViewer como componente reutilizável
O visualizador de documentos com zoom/pan (scroll do mouse, arrastar,
botões +/-/reset) foi implementado como componente próprio, não
acoplado ao slide de Documentação — pode ser reaproveitado em qualquer
slide futuro que precise mostrar uma imagem grande em modal.

## Decisão: DocumentViewer usa Pointer Events + object-fit: contain
Duas correções na visualização de documentos:
1. Corte de bordas: modal-content--large tinha apenas max-height, não
   height — a cadeia flex (document-viewer → stage) nunca recebia uma
   altura definida, então o <img> (sem object-fit) renderizava no
   tamanho natural do PNG e estourava o container, sendo cortado pelo
   overflow:hidden do stage. Corrigido com height explícito +
   object-fit: contain no <img>, que garante o encaixe total da
   imagem no zoom 100%, independente da resolução nativa do arquivo.
2. Pan/zoom trocou mouse events por Pointer Events com
   setPointerCapture: garante que o elemento sempre recebe o
   pointerup/pointercancel, mesmo que o cursor saia da área durante o
   arraste. O deslocamento (pan) agora é aplicado direto no DOM via ref
   durante o arraste, não via re-render por pixel (ver PERFORMANCE.md).