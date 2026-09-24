# TEAM_SYSTEM.md

## team.ts
```ts
interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  skills?: string[];
  socials?: { github?: string; linkedin?: string; portfolio?: string };
}
```
Não inventar dados ausentes. Usar placeholder explícito quando faltar.

## Card (slide de integrantes)
Hover: microinteração única e discreta (elevação leve OU borda luminosa
OU leve movimento da foto, escolher uma linguagem consistente, não
todas ao mesmo tempo).

## Modal expandido
Ao clicar: foto, nome, papel, skills, links sociais. Sem sobrecarregar.

## Seleção de apresentador
Clique no avatar do card define esse integrante como apresentador ativo:
inicia timer, mostra indicador visual discreto, libera navegação normal.

## Avatar flutuante (durante fala)
Hover → mostra tempo e controles.
Click → menu: Pausar / Finalizar / Reiniciar (com confirmação).
Alvo de clique com margem suficiente para evitar toque acidental.

## Decisão: carrossel com foco central substitui o grid
O slide de Integrantes passou de grid para um carrossel (card central
grande e nítido, laterais menores e esbatidas), inspirado num padrão de
"time em destaque" comum em sites esportivos — sem copiar nenhum ativo
visual de marca de terceiros, só o conceito de layout.

Trade-off assumido: membros nas laterais ficam menores/esbatidos
(nome ainda legível, papel e botão ocultos até virarem o card ativo).
Mitigado por: nome sempre visível mesmo esbatido, clique em qualquer
lateral recentraliza instantaneamente, badge numerado (01–06) para
varredura rápida.

Sem abas de filtro por categoria (diferente da referência): os 6 papéis
da equipe são únicos, então um filtro não teria função real — decisão
deliberada para não criar um elemento decorativo que parece clicável
sem fazer nada.