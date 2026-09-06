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