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

## Arquitetura (slide 12)
Conexões se desenham ao entrar (scaleX). Tráfego ambiente: um ponto
por conexão em loop lento (2,6s), pausado durante a simulação.
Simulação (timeline GSAP): cada camada acende (0,55s para ler a linha
do trace) e o pacote viaja 0,5s até a próxima — ida azul, volta verde.
Roda sozinha 1x, 1,4s após entrar no slide; o botão repete. Reduced
motion: sem loop nem pacote; o botão mostra o trace completo direto.

## Stack (slide 13)
Tiles com inclinação 3D seguindo o mouse (máx. 10°, sem transição
longa) e escala 1.06 no hover. Inspector troca com fade 0,35s + linha
de varredura. Reduced motion: sem inclinação nem varredura.

## Documentação (slide 14)
Cards entram com useStaggerReveal. Prévia: scale 2.2 com
transform-origin no ponto do mouse (0,35s). Modal: entrada 0,28s
(fade + 12px + escala 0,985). Zoom por botão/tecla anima 0,22s; roda
do mouse e arraste aplicam direto (sem transição), para acompanhar a
mão sem atraso.

## Meme (slide 18)
Entrada da janela: cai 40px de -6° e assenta em -1,5° (0,7s,
power2.out). Borda: conic-gradient girando (6s, @property
--meme-angle). Aplausos: 14 👏 por clique, 1,1–1,7s, opacos até 60%
do voo. Reduced motion: sem borda girando, sem inclinação, sem chuva.

## Encerramento (slide 19)
Palavras sobem de uma máscara (stagger 45ms) → palco do logo (escala
0,86→1, 0,9s) → tagline e "Obrigado." (stagger 140ms). Loops lentos:
anéis 90s / 40s (sentido oposto) / órbita 14s, brilho "respirando" 5s.
APNG: loop próprio de 5s (125 quadros). Reduced motion: estado final
direto, sem loops CSS (o APNG em si continua animando — é o conteúdo).

## Resultados esperados (slide 16)
Cards com useStaggerReveal; linha da jornada desenha (scaleX 0,9s);
números contam (CountUpValue, 1,2s, escalonados); medidor da taxa
preenche até a meta junto com a contagem; balança "se equilibra" uma
vez (1,8s). Reduced motion: estado final direto.

## Demonstração (slide 15)
Janela e tiles entram com useStaggerReveal. Troca de tela: crossfade
0,4s (mesma keyframe `inspector-in` do Inspector do Stack) na imagem e
na descrição; ponto "ao vivo" pulsa em loop lento (2,4s). Troca de modo
(Capturas ↔ Vídeo): `demo__body` remonta por `key={mode}` e entra com a
mesma keyframe `inspector-in` (0,35s) — nunca um corte seco. Reduced
motion: sem crossfade, pulso nem entrada de modo; estado final direto.

## Próximos passos (slide 17)
Linha do roadmap se preenche (1,6s, power1.inOut); cada marco acende
quando a linha passa por ele e o card correspondente sobe logo depois
(timeline única). clearProps nos marcos e cards libera o transform
para o hover. Reduced motion: estado final direto.
