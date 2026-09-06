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