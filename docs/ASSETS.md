# ASSETS.md

## Inventário (preencher conforme materiais forem fornecidos)
| arquivo | tipo | local | uso | slide | dimensões | status |
|---|---|---|---|---|---|---|
| eco-motion-loop.mp4 | MP4 | assets/videos/ | background capa/solução/encerramento | 01, 09, 19 | 1920x1080 | pendente |
| eco-motion-loop-poster.jpg | JPG | assets/videos/ | poster/fallback do vídeo acima | 01, 09, 18 | 1920x1080 | pendente | | diagrama-navegacao.png | PNG | assets/documents/ | modal documentação | 14 | — | recebido, aguardando ser salvo no repo |
| casos-de-uso.png | PNG | assets/documents/ | modal documentação | 14 | — | recebido, aguardando ser salvo no repo |
| idef-0.png | PNG | assets/documents/ | modal documentação | 14 | — | recebido, aguardando ser salvo no repo |
| bpmn.png | PNG | assets/documents/ | modal documentação | 14 | — | recebido, aguardando ser salvo no repo |

## Convenções
- Vídeo: autoplay + muted + loop + playsInline, overlay para contraste,
  object-fit: cover, sempre com poster estático de fallback.
- Imagem: AVIF/WebP quando possível, nunca 8K para exibição 1080p.
- Nenhum asset essencial vindo de URL externa.
- Ícones de ODS: usar os oficiais fornecidos, sem alterar cor sem necessidade.| ECOBYTE-logo-animado.png | APNG (125 quadros, loop 5 s) | assets/videos/ | logo animado do encerramento | 19 | 480x336 | em uso (~15 MB; pré-carregado no slide 18) |
| meme-encerramento.jpeg | JPEG | assets/images/ | meme antes do encerramento | 18 | 330x376 | em uso (baixa resolução: altura limitada a 54vh/470px) |

Obs.: o projeto-fonte da animação do logo (JSX/HTML) fica em
design-source/Logo animation request/ — fora de public/, então não vai
para o build — e está no .gitignore (não versionada). O app usa só o
APNG exportado.
