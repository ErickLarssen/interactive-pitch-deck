# ASSETS.md

## Inventário
| arquivo | tipo | local | uso | slide | dimensões | status |
|---|---|---|---|---|---|---|
| eco-motion-loop.mp4 | MP4 | assets/videos/ | background capa/solução/encerramento | 01, 09, 19 | 1920x1080 | em uso |
| eco-motion-loop-poster.jpg | JPG | assets/videos/ | poster/fallback do vídeo acima | 01, 09, 18 | 1920x1080 | em uso |

## Documentação (slide 14) — galeria de 6 documentos
| arquivo | tipo | local | uso | dimensões | status |
|---|---|---|---|---|---|
| casos-de-uso.png | PNG | assets/documents/ | modal documentação — 01 Casos de Uso | 990×1022 | em uso |
| idef-0.png | PNG | assets/documents/ | modal documentação — 02 IDEF-0 | 859×529 | em uso |
| bpmn.png | PNG | assets/documents/ | modal documentação — 03 BPMN | 799×532 | em uso (arte atualizada em 2026-10-30) |
| EAP.png | PNG | assets/documents/ | modal documentação — 04 EAP (Estrutura Analítica) | 1035×739 | em uso |
| smart.png | PNG | assets/documents/ | modal documentação — 05 Metas SMART | 558×784 | em uso |
| canva-mvp.png | PNG | assets/documents/ | modal documentação — 06 MVP & Modelo de Negócios | 1920×1080 | em uso |

diagrama-navegacao.png foi removido do slide e do repositório (não é
mais referenciado em slideContent.ts) — pedido da equipe em
2026-10-30. Grade do slide foi de 4 documentos (1 linha) para 6 (2
linhas de 3); ver DESIGN_SYSTEM.md e docs/SLIDE_SYSTEM.md.

## Demonstração (slide 15) — capturas do deploy em produção
| arquivo | tipo | local | uso | slide | dimensões | status |
|---|---|---|---|---|---|---|
| demo-home.jpg | JPG | assets/images/demo/ | janela do slide de demonstração (tela "Início") | 15 | 1536x695 | em uso |
| demo-como-funciona.jpg | JPG | assets/images/demo/ | janela do slide de demonstração (tela "Como funciona") | 15 | 1536x695 | em uso |
| demo-ecoponto.jpg | JPG | assets/images/demo/ | janela do slide de demonstração (tela "Ecoponto") | 15 | 1536x695 | em uso |
| demo-walkthrough.mp4 | MP4 | assets/videos/ | modo "Vídeo (plano B)" do slide de demonstração | 15 | 1:34, 25,4 MB | em uso |

Capturadas de eco-byte-neon.vercel.app (páginas públicas, sem login).
Deliberadamente capturas locais, não um `<iframe>` ao vivo apontando
pro deploy: a convenção abaixo já proíbe asset essencial de URL
externa, e QA.md exige a aplicação inteira — demo incluída —
funcionando sem internet no telão. Textos do slide (headline, url,
descrição de cada tela) são cópia real do próprio site, não inventados.

### Exceção deliberada: um link real para a internet
O slide 15 também tem um botão "Abrir site ao vivo"
(`<a target="_blank">` para `eco-byte-neon.vercel.app`) — a ÚNICA
dependência de internet do deck inteiro. Não contraria a regra acima
porque não é um asset carregado automaticamente: só abre se o
apresentador clicar, de propósito, para mostrar o produto real ao
vivo quando a internet permitir; se falhar, o apresentador troca para
o modo "Vídeo" (acima) sem precisar recarregar nada. demo-walkthrough.mp4
já foi enviado pela equipe e está em uso; se o arquivo vier a faltar
(caminho errado, removido por engano), o modo Vídeo cai num placeholder
estilizado ("Vídeo ainda não adicionado") em vez de um vídeo quebrado —
ver DemoSlide.tsx (`videoError`/`onError`).

## Convenções
- Vídeo: autoplay + muted + loop + playsInline, overlay para contraste,
  object-fit: cover, sempre com poster estático de fallback.
- Imagem: AVIF/WebP quando possível, nunca 8K para exibição 1080p.
- Nenhum asset essencial vindo de URL externa.
- Ícones de ODS: usar os oficiais fornecidos, sem alterar cor sem necessidade.

## Meme e encerramento (slides 18–19)
| arquivo | tipo | local | uso | slide | dimensões | status |
|---|---|---|---|---|---|---|
| ECOBYTE-logo-animado.png | APNG (125 quadros, loop 5 s) | assets/videos/ | logo animado do encerramento | 19 | 480x336 | em uso (~15 MB; pré-carregado no slide 18) |
| meme-encerramento.jpeg | JPEG | assets/images/ | meme antes do encerramento | 18 | 330x376 | em uso (baixa resolução: altura limitada a 54vh/470px) |

Obs.: o projeto-fonte da animação do logo (JSX/HTML) fica em
design-source/Logo animation request/ — fora de public/, então não vai
para o build — e está no .gitignore (não versionada). O app usa só o
APNG exportado.
