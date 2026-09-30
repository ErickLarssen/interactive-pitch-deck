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

## Capa premium (exceção de glass)
Decisão anterior: glass effect só em overlays de timer/avatar.
Problema: o redesign da capa pediu um painel glassmorphism atrás do
logo/textos. Nova regra: glass permitido também no painel da capa
(`.cover-slide__panel`) — borda 1px rgba(255,255,255,.1), blur 18px,
fundo quase transparente, raio 32px. Continua proibido em cards de
conteúdo dos demais slides.
Linha principal branca #fff peso 600; linha acadêmica peso 400 em
--fg-subtle (#9ca3af, equivalente a gray-400).
Logo: slot com altura fixa (--cover-logo-slot-height) + imagem
absoluta ancorada pela base visível da marca; --cover-logo-size
muda só o tamanho visual (cresce para cima), sem mover o texto.
Fundo da capa: camada .app-background-mesh (#0a0f1c a 55% + radiais
azul/verde da marca, blur 40px) sobre o mesmo vídeo do shell.

## Tipografia: duas famílias
Decisão anterior: Eurostile Extended (fallback Michroma) no projeto todo.
Problema: fonte estendida ocupa ~30–40% mais largura — texto estourava
a partir do slide 4 — e é menos legível a distância em corpo de texto.
Nova regra:
- --font-family-display ('Eurostile Extended', 'Michroma'): só a capa
  (.cover-slide). Eurostile é comercial; só é usada se instalada no SO
  da apresentação. Michroma é self-hosted (@fontsource/michroma).
- --font-family-base ('Saira Variable'): slide 2 em diante e todos os
  controles (dock, timer, modais). Mesmo desenho quadrado da Eurostile,
  largura normal, pesos reais 100–900. Self-hosted
  (@fontsource-variable/saira) — funciona offline.

## Gráfico waffle (WasteWaffle)
Usado no slide Contexto para o dado de 62 Mt. Grade 10×10: cada
quadrado = total/100 (≈0,62 Mt); os 22 primeiros (22,3%, arredondado)
acendem em verde da marca = "formalmente coletado e reciclado"; o
restante fica em ardósia neutra #56607a. Codificação destaque vs.
neutro (não par categórico); contraste no fundo: verde 7,1:1,
ardósia 3,1:1. Identidade nunca só por cor: legenda com valor e
rótulo. Hover em quadrado/legenda destaca o grupo e mostra a
quantidade aproximada (derivada: 62 × 22,3%). Versão textual completa
em figcaption sr-only. Nenhum valor é interpolado ou inventado.

## Sistema premium de cards (slides 4–11)
Superfície única `.premium-card`: fundo --bg-elevated translúcido (sem
blur — glass continua proibido em card de conteúdo), borda 1px branca
a 8%, raio --radius-lg, brilho radial azul/verde que segue o mouse
(listener global usePremiumSpotlight) e hover com translateY(-4px) +
scale(1.04) — mesma regra de acessibilidade do auditório (escala via
transform, nunca font-size). Peças associadas:
- `.premium-icon`: ícone de linha lucide em tile azul; verde no hover.
  Registro único em src/components/icons.ts; dados usam só a chave
  (iconKey).
- `.premium-callout`: frase de conclusão com barra em gradiente.
- FlowStrip: pipeline de pílulas que acendem em sequência; a última
  (destino) fica verde.
Aplicação por slide:
- 04 Problema, 09 Solução, 11 Funcionalidades: JourneyCards conectado
  (numerado 01…, linha do percurso).
- 06 Público-alvo, 10 Diferenciais: JourneyCards sem conexão (itens
  paralelos, sem numeração).
- 05 Evidências: números em cards com contagem (CountUpValue, texto
  final = texto original) + gráfico em card próprio | notas.
- 07 Stakeholders: centro pulsante, conexões desenhadas, nós premium.
  Selo sólido = participante existente; selo tracejado = POTENCIAL
  parceiro (reforça a nota da equipe: nunca parecer parceria firmada).
- 08 ODS: faixa superior na cor oficial ONU de cada ODS (#FD9D24,
  #BF8B2E, #3F7E44) — só decorativa, texto nunca usa essa cor.
O slide 17 (Próximos passos) compartilha o componente de etapas com
o 09, mas usa o layout próprio 'roadmap' (ver abaixo).

## Slides técnicos (12 Arquitetura, 13 Stack)
Mesma superfície premium, com linguagem de ferramenta de dev: grade
de fundo sutil (máscara radial), rótulos em --font-mono (fontes do
sistema: Cascadia/Consolas, nada a baixar) para paths, versões e
terminal. Logos via BrandIcon: em repouso monocromáticos (--fg-muted)
no Stack, coloridos no hover/seleção; na Arquitetura sempre na cor da
marca. Cores de marca muito escuras (Next.js, Express, shadcn/ui,
Mongoose) são clareadas automaticamente até contraste ≥ 3:1 contra
--bg-elevated, preservando o matiz (brandColor em BrandIcon.tsx).
Pacote de requisição = azul da marca; de resposta = verde.

## Selo tracejado = "ainda não é realidade"
Borda tracejada marca o que é potencial/meta, não fato: "Potencial
parceiro" (slide 7) e "Meta inicial" (slide 16). Borda sólida = algo
que existe. Manter essa linguagem em novos slides.

## Layout 'roadmap' (slide 17 — Próximos passos)
SequentialStepsContent.layout = 'roadmap' → RoadmapSteps.tsx: linha do
tempo (Fase 01–04) com um marco por etapa, cards premium alinhados a
cada marco (StepItem.iconKey) e closingPhrase em premium-callout.
Diferente do 'journey' do slide 09 de propósito: aqui a ideia é escala
no tempo, não um fluxo de uso.

## Roadmap (slide 17)
Marcos crescem de 14px a 35px e passam do azul ao verde da marca
(color-mix por índice) — metáfora de "começar pequeno e escalar", sem
representar dado. Hover no card preenche e acende o marco dele.

## Centralização óptica do logo animado (encerramento)
O APNG tem o desenho com a caixa centralizada, mas o peso visual
deslocado: com o logo completo, o centro de massa fica em (215, 139)
no canvas 480×336, não em (240, 168) — o laço azul do ∞ é pesado e o
texto e a folha são finos. .closing__logo usa translate(4%, 6.25%),
que compensa ~75% dessa diferença (100% jogaria o texto baixo demais).
Resultado medido: centro de massa a ~3–4px do centro dos anéis. Se o
APNG for reexportado com outro enquadramento, remedir e ajustar.

