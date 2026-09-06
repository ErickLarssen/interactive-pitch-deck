# DESIGN_SYSTEM.md

## Princípio
Legibilidade a distância > densidade. Tudo aqui assume visualização em
projetor/telão, não em monitor de trabalho.

## Cores (tokens iniciais — ajustar com identidade real do projeto)
--bg-base: #0A0B0D        /* fundo escuro, alto contraste */
--bg-elevated: #16181C
--fg-primary: #F5F6F7
--fg-muted: #A7ACB3
--accent: #TBD             /* cor de marca do projeto, placeholder */
--state-success: #34D399   /* timer verde */
--state-warning: #FBBF24   /* timer âmbar */
--state-danger: #F87171    /* timer vermelho */

## Tipografia
--font-display: clamp(3.5rem, 6vw, 7rem);   /* capa, headlines fortes */
--font-heading: clamp(2.5rem, 4vw, 5rem);   /* título de slide */
--font-subheading: clamp(1.5rem, 2vw, 2.5rem);
--font-body: clamp(1.25rem, 1.4vw, 1.75rem); /* nunca abaixo disso em slide */
Fonte local (self-hosted), evitar Google Fonts via CDN.

## Espaçamento
Escala em rem: 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8.
Safe area: padding horizontal ~6–8% da viewport, nunca conteúdo colado à borda.

## Grid
Grid editorial de 12 colunas, assimetria controlada, espaço negativo
como ferramenta de hierarquia — não preencher a tela por padrão.

## Radius / Shadows / Bordas
--radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px;
Sombras suaves e discretas (elevação, não drama). Glass effect permitido
apenas em overlays de timer/avatar, nunca em cards de conteúdo principal.

## Cards
Estado padrão sóbrio; hover com elevação leve + borda luminosa sutil,
nunca escala agressiva.

## Timers / Avatares / Tooltips / Modais
- Timer: opacity 0.45–0.65 em repouso, 1.0 no hover; nunca sobre área
  de conteúdo principal (canto inferior/superior direito).
- Avatar flutuante: círculo compacto, indicador de estado por cor+ícone
  (nunca só cor).
- Modais: fundo escurecido, foco travado, fecha com ESC.

## Tamanhos mínimos para telão
Body nunca abaixo do token --font-body definido acima. Se o conteúdo
não couber, reduzir texto ou dividir slide — nunca reduzir fonte
abaixo do mínimo.

## Paleta de marca (EcoByte)
--brand-blue / --brand-blue-light / --brand-blue-dark
--brand-green / --brand-green-light / --brand-green-dark
--brand-gradient: verde → azul
--accent agora é alias de --brand-blue.
Cores de estado do timer permanecem separadas da paleta de marca
(semântica de semáforo, independente de coincidir com o verde da marca).

## Padrão de botão (pitch-button)
Texto com sublinhado revelado da esquerda no hover + seta que rotaciona
-45°. Variantes: blue (ação primária), green (ação ativa/confirmada),
ghost (neutro). Ver src/components/Button.tsx.

## Fundo animado (beams)
Novo SlideBackground.kind: 'beams'. Canvas com feixes de luz nas cores
da marca, intensidade subtle por padrão, usado na capa. Respeita
prefers-reduced-motion (desenha um frame estático). Ver
src/components/BeamsBackground.tsx.

## Tipos de slide
cover | team | content | stat-highlight | info-cards | sequential-steps |
stakeholder-map | ods-grid | closing

Cada tipo (exceto cover/team/content) busca seu conteúdo em
src/data/slideContent.ts pelo id do slide atual.

## Grid de integrantes: flexbox, não CSS Grid
CSS Grid define colunas para a grade inteira (não por linha), então um
item sozinho na última linha "herda" as colunas da linha cheia e cai à
esquerda — auto-fit não resolve isso. Flexbox com flex-wrap centra
corretamente por linha. Ver .team-grid em global.css.

## Hover de acessibilidade (auditório)
Cards, etapas, números e nós de diagrama aumentam via transform: scale()
no hover, não via font-size — mesmo efeito perceptível de "letra maior",
sem o custo de reflow que animar font-size causaria (ver PERFORMANCE.md).