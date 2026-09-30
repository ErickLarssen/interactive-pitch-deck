# TIMER_SYSTEM.md

## Lifecycle
idle → running (ao selecionar apresentador) → paused (opcional) →
finished (ao encerrar fala, registra realizado vs previsto).

## Estados visuais (thresholds configuráveis)
0–80% do targetSeconds → verde
80–100% → âmbar
>100% → vermelho
Nunca depender só de cor: acompanhar de ícone + texto + borda.

## Comportamento
- Iniciar ao selecionar apresentador (clique no avatar).
- Continua contando ao trocar de slide.
- Pausar: congela contagem sem resetar.
- Reiniciar: exige confirmação (ação consciente, não 1 clique acidental).
- Encerrar: para o timer e registra {previsto, realizado} — visível
  apenas em Presenter Mode.

## Timer global
Formato "11:42 / 15:00". Ainda mais discreto que o individual.
Existe para impedir que a soma dos blocos estoure o tempo total do pitch.

## Regras visuais
Opacity 0.45–0.65 em repouso, 1.0 no hover. Posição em canto (inferior
ou superior direito), nunca sobre a headline do slide.

## Decisão: alvo de tempo por apresentador, não por slide
O alvo (targetSeconds) usado para colorir o timer agora vem de
src/data/presentation.ts (speakerTargetSeconds, por id de apresentador),
não do slide atualmente exibido. Motivo: o cronômetro nunca ficava
verde/âmbar porque a maioria dos slides não tinha targetSeconds
definido. Qualquer id de apresentador não mapeado usa
defaultSpeakerTargetSeconds como fallback seguro.
## Decisão: opacidade do chip acompanha a urgência
Decisão anterior: chip do timer com opacity 0.45–0.65 em repouso,
1.0 só no hover.
Problema: justamente quando o tempo estoura, o chip continuava apagado
— o apresentador podia não perceber o vermelho.
Nova regra: verde 0.55 (discreto, como antes); âmbar 0.85 + borda
âmbar; vermelho 1.0 + borda vermelha + pulso de brilho. Hover/painel
aberto sempre 1.0. Troca de status dispara um brilho único no chip.
Impacto: o chip só chama atenção quando há motivo; reduced motion
desliga pulso e brilho (cor, ícone e texto continuam).

## Semáforo e sinais do dock (SpeakerDock.tsx)
- Chip: foto no anel de progresso (TimerRing: preenche até a meta, na
  cor do status, com marca no limiar de 80%), tempo e ícone de status
  (CircleCheck / TriangleAlert / OctagonAlert).
- Painel: semáforo de 3 luzes (a do status acesa; vermelha pisca),
  selo "no tempo / atenção / estourou", tempo grande na cor do status,
  instrução ("Siga no seu ritmo" / "Comece a concluir" / "Encerre sua
  fala" — getTimerStatusHint) e "restam mm:ss" ou "+mm:ss acima".
- Tempo total do pitch no painel, com barra no mesmo semáforo
  (contra totalPitchSeconds).
- Lista: anel + minibarra por integrante; ✓ para quem já finalizou.
- Reiniciar: confirmação dentro do painel (antes: window.confirm, que
  trava a página e foge do visual). Continua exigindo confirmação.
- Painel abre por hover OU clique no chip (teclado: Tab + Enter);
  fixado por clique, fecha com clique fora ou ESC.

## Pendência conhecida: chaves de speakerTargetSeconds
Em src/data/presentation.ts as chaves são carlos, eduardo, erick…,
mas os ids em team.ts são integrante-1…integrante-6. Hoje todo mundo
cai em defaultSpeakerTargetSeconds (150s) — como todos os valores são
150, o resultado é o mesmo. Ao definir metas diferentes por pessoa,
trocar as chaves pelos ids reais.
