# CLAUDE.md

Antes de alterar qualquer código, leia primeiro a documentação relacionada
ao que você vai tocar. Não pule esta etapa mesmo em pedidos curtos.

| Área a alterar          | Ler antes                          |
|--------------------------|-------------------------------------|
| UI / estilos / tokens    | docs/DESIGN_SYSTEM.md               |
| Timers / cronômetro      | docs/TIMER_SYSTEM.md                |
| Slides / navegação       | docs/SLIDE_SYSTEM.md                |
| Estrutura / estado       | docs/ARCHITECTURE.md                |
| Integrantes / speakers   | docs/TEAM_SYSTEM.md                 |
| Hover / click / teclado  | docs/INTERACTIONS.md                |
| Animações GSAP           | docs/MOTION.md                      |
| Imagens / vídeos         | docs/ASSETS.md                      |
| Legibilidade / auditório | docs/ACCESSIBILITY.md               |
| Conteúdo real do pitch   | docs/CONTENT.md                     |
| Antes de considerar pronto | docs/QA.md                        |

## Regra de entrega
Alterações sempre em texto, incrementais, no formato:
ARQUIVO: caminho
OBJETIVO: por quê
CÓDIGO: bloco de código
TESTE: como verificar
Nunca reescrever arquivos não relacionados. Nunca enviar zip.

## Mudança de decisão de arquitetura
Se uma tarefa exigir contradizer uma decisão já documentada, não altere
silenciosamente. Explique: decisão atual → problema → nova proposta →
impacto. Depois atualize o doc correspondente.