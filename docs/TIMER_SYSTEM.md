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