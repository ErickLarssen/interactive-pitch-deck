# MOTION.md

## Durações
Transição de slide: 400–700ms.
Microinterações (hover): 150–250ms.
Reveals de conteúdo: 300–500ms, stagger 40–80ms entre itens.

## Easing
Entradas: power2.out. Saídas: power1.inOut. Nunca bounce, nunca
rotações exageradas, nunca transições longas que atrasem a fala.

## Padrões disponíveis
slide enter/exit, headline reveal, image reveal, stagger, mask,
clip-path, scale, fade, blur, parallax muito leve, count-up,
diagram animation (revelar fluxo progressivamente).

## prefers-reduced-motion
Quando ativo: desabilitar motion não essencial (parallax, stagger
decorativo); manter apenas transições essenciais de estado, em fade
simples e curto.

## Convenção de implementação
Centralizar timelines reutilizáveis em hooks/utilitários (ex.:
useSlideTransition, useRevealOnEnter) — não duplicar tweens GSAP
soltos em cada componente.
## WasteWaffle (slide Contexto)
Timeline única: (1) quadrados entram em diagonal (stagger grid,
~0,9s) enquanto o total conta 0 → 62; (2) em seguida a fatia reciclada
acende quadrado a quadrado (stagger 25ms) e o percentual conta
0 → 22,3%. Primeiro o tamanho, depois a proporção. Reanima a cada
entrada no slide (remonta por key). Reduced motion: estado final
direto, sem contagem.

## JourneyCards (slide Problema)
Linha do percurso se desenha da esquerda para a direita (scaleX,
0,9s, power2.out) enquanto os cards sobem 24px com stagger de 80ms.
Reduced motion: estado final direto.

## Entradas dos slides premium (5–11)
- useStaggerReveal(ref): cards sobem 24px com stagger 80ms (useLayoutEffect,
  sem 'piscar'). clearProps: 'transform' ao final — obrigatório, senão o
  transform inline do GSAP anula o :hover do CSS (bug corrigido também
  no JourneyCards do slide 4).
- CountUpValue: conta o 1º número do texto ("62 Mt", "22,3%") mantendo
  casas decimais; leitor de tela recebe só o valor final.
- Stakeholders: centro → tronco → barra → hastes → nós (timeline única).
  Anel pulsante do centro em loop lento (2,8s), desligado com reduced motion.
- FlowStrip: só CSS; estado base = aceso, animação define apenas o 'from'
  com delay por índice — reduced motion mostra tudo aceso direto.
