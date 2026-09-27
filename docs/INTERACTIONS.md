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
