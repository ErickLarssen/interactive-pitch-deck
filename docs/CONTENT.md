# CONTENT.md

Este documento é a referência humana do conteúdo do pitch. A fonte que
os componentes de fato renderizam é src/data/slideContent.ts — mantenha
os dois sincronizados ao editar.

## 01 — Capa
EcoByte · Desenvolvimento de Software Multiplataforma (3º semestre) ·
Fatec Diadema Luigi Papaiz

## 02 — Integrantes
Ver src/data/team.ts

## 03 — Contexto
Headline: "O lixo eletrônico cresce. O descarte correto não acompanha."
Dado: 62 milhões de toneladas de e-lixo geradas no mundo em 2022.
Apoio: apenas 22,3% documentado como formalmente coletado/reciclado.
Fonte: Global E-waste Monitor 2024 — ITU/UNITAR.
Visual: gráfico waffle (62 Mt em 100 quadrados, 22,3% em verde) com
count-up — ver waffleChart em slideContent.ts.

## 04 — Problema
Três perguntas-guia: onde descartar, como transportar, o que acontece
depois. Fecha citando o sistema brasileiro de logística reversa de
eletroeletrônicos.
Sem frase de introdução (removida para despoluir o slide).

## 05 — Evidências / Pesquisa
Três números: 62 Mt (2022), 22,3% (reciclado), 82 Mt (projeção 2030).
Nota da equipe: antes da apresentação, vale aplicar uma pesquisa curta
com moradores de Diadema — um dado local e autoral é mais forte para a
banca do que só a estatística mundial. Isso NÃO substitui o slide atual,
apenas o reforça se houver tempo.

## 06 — Público-alvo
Moradores, pequenos negócios, condomínios.

## 07 — Stakeholders
Mapa com EcoByte no centro: Moradores (solicitante), Ecopontos
(infraestrutura existente), Cooperativas de reciclagem (potencial
parceiro), Poder público (potencial parceiro).
Nota da equipe: nunca apresentar Prefeitura/cooperativas como parceiros
firmados sem que a parceria exista de fato — usar sempre "potencial
parceiro" ou "ator do ecossistema".

## 08 — ODS
ODS 11 (Cidades Sustentáveis), 12 (Consumo Responsável — o mais direto),
13 (Ação Climática — contribuição indireta). Hover/click revela a
descrição de cada um.

## 09 — Solução
4 passos: Solicite → A EcoByte recolhe → Encaminhamos → Descarte
correto. Fluxo visual: CASA → ECOBYTE → ECOPONTO → DESTINAÇÃO.

## 10 — Diferenciais
Conveniência, Simplicidade, Intermediação, Foco local.

## 11 — Funcionalidades
Solicitação de coleta, Endereço, Acompanhamento, Confirmação.
Fluxo de status: SOLICITADO → AGENDADO → EM COLETA → COLETADO →
ENCAMINHADO.
Nota da equipe: usar só os estados que o software realmente implementa.

## 12 — Arquitetura
Headline: "Regras de negócio em um único lugar: a API."
Fluxo: Frontend (Next.js 16.3 + React 19.2) → HTTP → API Express 5
(regras de negócio, Zod, sessões, Argon2id) → Mongoose 9 → MongoDB
(dados + sessões via connect-mongo). Monorepo com npm workspaces
(frontend/ e backend/), TypeScript de ponta a ponta, Node.js 22+.
Fonte: levantamento dos package.json do repositório EcoByte +
docs/DECISIONS.md de lá. NÃO citar frontend/src/lib/api-proxy.ts: o
papel dele (repasse para a API) não foi confirmado.

## 13 — Stack
Headline: "TypeScript do navegador ao banco."
frontend/: Next.js 16.3, React 19.2, TypeScript 5, Tailwind CSS 4,
shadcn/ui (Radix + cva, ícones Lucide), TanStack Query, React Hook
Form, Zod 4, Vitest (+ Testing Library, jsdom).
backend/: Node.js ≥ 22, Express 5 (ESM), TypeScript 6 (tsx/tsc),
MongoDB, Mongoose 9, Zod 4, sessões (express-session + connect-mongo),
segurança (Argon2id + express-rate-limit), Vitest (+ Supertest,
mongodb-memory-server).
Raiz: npm workspaces, ESLint, concurrently (npm run dev), seed.
Fonte: a mesma do slide 12. Dados em techStackContent (slideContent.ts).

## 14 — Documentação
4 botões, cada um abrindo um modal com zoom: Diagrama de Navegação,
Casos de Uso, IDEF-0, BPMN. Documentos já produzidos pela equipe — ver
src/data/slideContent.ts (documentGalleryContent).

## 15 — Demonstração
[DEFINIR FORMATO DA DEMO] — não preencher agora.

## 16 — Resultados
[DEFINIR RESULTADOS] — não preencher agora.

## 17 — Próximos passos
Validar → Conectar → Expandir → Evoluir.

## 18 — Encerramento
"O eletrônico pode ter chegado ao fim. O impacto dele não precisa
terminar no lixo." EcoByte — Tecnologia para conectar pessoas ao
descarte responsável. Obrigado.
