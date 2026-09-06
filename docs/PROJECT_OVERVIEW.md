# PROJECT_OVERVIEW.md

## Problema
[DEFINIR PROBLEMA — descrição do problema real do P.I.]

## Objetivo
Substituir o formato tradicional (Canva/PowerPoint/Slides) por uma
aplicação web interativa que ainda seja percebida visualmente como um
deck de slides, com motion design, interatividade e ferramentas de
apresentador, para um pitch presencial de 10–15 minutos.

## Público
- Banca avaliadora (presencial, auditório)
- Colegas/plateia
- Exibição em notebook → projetor/telão

## Contexto do pitch
- Tempo curto e não repetível: falhas técnicas são caras.
- Ambiente controlado pela própria equipe (sem dependência de terceiros).
- Resolução alvo: 1920×1080, com fallback para notebooks menores
  (ex.: 1366×768).

## Restrições
- Sem backend, sem banco de dados, sem CMS, sem autenticação.
- Deve funcionar 100% offline.
- Sem dependência crítica de API, iframe, vídeo externo ou CDN.

## Requisitos essenciais (resumo)
1. Navegação de slides por teclado e botões discretos.
2. Slide de capa e slide de integrantes com modal expandido.
3. Seleção de apresentador + cronômetro por bloco.
4. Presenter Mode com timer individual e global.
5. Seções para ODS, stakeholders, stack e arquitetura.
6. Fallback local para demonstração de software.
7. Fullscreen, motion consistente, respeito a reduced-motion.

## Definição de sucesso
A apresentação roda do início ao fim sem falha técnica visível, mesmo
sem internet; os apresentadores conseguem controlar o próprio tempo;
a narrativa é compreendida por quem está no fundo do auditório; a banca
percebe domínio da equipe sobre o próprio produto — não "um site
complexo".