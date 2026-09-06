# AGENTS.md

## Objetivo
Interactive Pitch Deck: aplicação web para apresentar um Projeto Integrador
acadêmico em pitch presencial (10–15min), em formato de slides com motion
design, interatividade e ferramentas de apresentador. Não é um site
institucional, é uma ferramenta de apresentação ao vivo.

## Stack
React + Vite + TypeScript + GSAP + Zustand + CSS moderno. Sem backend,
sem banco de dados, sem CMS, sem autenticação, sem API externa obrigatória.

## Comandos
(definidos após o scaffold inicial do Vite, ver docs/DEVELOPMENT.md)
- npm run dev
- npm run build
- npm run preview

## Arquitetura
Ver docs/ARCHITECTURE.md. Resumo: shell de apresentação controla um
slide ativo via store global (Zustand); cada slide é um componente
isolado registrado em src/data/slides.ts; timers e presenter mode
vivem em slices separados do mesmo store.

## Regras
- Tudo deve funcionar 100% offline, sem internet.
- Nunca depender de API externa, iframe ou CDN para conteúdo essencial.
- Não implementar funcionalidades fora do MVP aprovado sem sinalizar.
- Não inventar dados de conteúdo real (integrantes, ODS, stakeholders) —
  usar os placeholders definidos em docs/CONTENT.md.

## Documentação
Antes de alterar qualquer área, ler o documento correspondente em docs/.
Não duplicar aqui o conteúdo de docs/, apenas apontar para ele.

## Padrão de trabalho
Alterações incrementais, em texto, no formato:
ARQUIVO / OBJETIVO / CÓDIGO / TESTE. Nunca enviar ZIP ou pasta de
substituição completa.