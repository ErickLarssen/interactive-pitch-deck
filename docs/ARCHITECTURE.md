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