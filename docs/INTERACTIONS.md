# INTERACTIONS.md

## Hover
- Team card → microinteração premium (ver TEAM_SYSTEM.md)
- ODS icon → card com número, nome e relação com o projeto
- Stakeholder → papel, necessidade, relação
- Stack item → nome + função no projeto

## Click
- ODS/Stakeholder/Stack → expande explicação maior (modal ou inline)
- Documentação → abre preview local ou PDF local
- Avatar de integrante → seleciona apresentador
- Avatar flutuante → abre menu de controle do timer

## Teclado (ver também SLIDE_SYSTEM.md)
ESC fecha modal aberto antes de qualquer navegação de slide.
P alterna Presenter Mode. F alterna fullscreen.

## Modais (regra geral)
Um modal por vez. Foco travado dentro do modal. Fecha com ESC ou
clique fora. Nunca abrir modal automaticamente sem ação do usuário.
## Cursor neon (CursorGlow)
Ponto nítido (segue o ponteiro sem atraso) + halo com leve atraso,
nas cores da marca, em todos os slides. Cursor nativo continua
visível (precisão de clique ao vivo). pointer-events: none, só em
dispositivos com pointer: fine, desligado com prefers-reduced-motion.
Posição atualizada via rAF direto no DOM, sem re-render do React.
Ver src/components/CursorGlow.tsx.

## Cards 'journey' (slide Problema)
Hover: escala 1.04 + leve elevação, borda azul da marca e brilho
radial que segue o mouse dentro do card (posição em CSS vars, sem
re-render). Ícone muda de azul para verde no hover.

## Hover premium (slides 4–11)
Todo .premium-card: brilho radial seguindo o mouse, elevação leve,
borda azul, ícone azul → verde. Stakeholders: hover no nó acende a
haste que o liga ao centro. ODS: hover/foco abre a descrição, clique
fixa (ícone + gira para ×). FlowStrip: hover destaca a etapa.

## Arquitetura (slide 12)
Botão "Simular requisição" (Enter/clique) repete a simulação; status
no terminal (aguardando / executando… / concluído) com aria-live.

## Stack (slide 13)
Hover ou foco (Tab) num tile mostra a tecnologia no inspector; clique
fixa a seleção. A mesma tecnologia no outro workspace acende junto
(ex.: TypeScript, Zod, Vitest). Obs.: Espaço continua avançando slide
(atalho global) — para ativar botões use Enter ou clique.

## Visualizador de documentos (slide 14)
Pensado para o fundo do auditório: aproximar exatamente no ponto que
o apresentador aponta.
- Roda do mouse: zoom no ponto do cursor (1–500%).
- Duplo clique: aproxima 250% no ponto; de novo, volta a 100%.
- Arrastar (com zoom) move; o documento nunca sai da área visível.
- Barra: − / + (passos de 50%), atalhos 100–400%, reset, tela cheia.
- Teclado (modal aberto bloqueia a navegação de slides): + − 0 e setas.
- Minimapa (só com zoom): região visível; clique centraliza ali.
- ‹ › no topo: documento anterior/próximo sem fechar o modal.
- Fechar: X, ESC ou clique fora (na tela cheia não há "fora": X/ESC).
Barra de zoom e dica ficam ABAIXO do documento, nunca sobre ele.
Na galeria, o hover amplia a prévia a partir do ponto do mouse.

## Meme (slide 18)
Clique no meme (no ponto clicado) ou no botão "Clique para aplaudir"
(Enter) → chuva de 👏. Mouse inclina a janela em 3D.

## Encerramento (slide 19)
Mouse inclina o palco do logo (paralaxe: anéis e logo em camadas).
Clique/Enter no logo → onda de choque.

## Dock de apresentadores
Hover no chip abre o painel; clique no chip fixa/solta (acessível por
teclado). Fixado: fecha com clique fora ou ESC (ESC sem modal aberto
não navega slide). Ponte invisível entre chip e painel evita que o
hover "caia" no vão. Lista rola dentro do painel se faltar altura.
