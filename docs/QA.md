# QA.md

- [ ] Teclado funciona (todas as teclas mapeadas)
- [ ] Fullscreen funciona (e falha graciosamente se bloqueado)
- [ ] Vídeos locais tocam sem internet
- [ ] Aplicação inteira funciona sem internet
- [x] `dist/index.html` (gerado por `npm run build`) abre com duplo
      clique, direto de um pendrive, sem servidor nem internet, em
      qualquer PC — testado via Chrome headless em 2026-10-25 (ver
      ARCHITECTURE.md). Reconferir manualmente no PC real do auditório
      antes da apresentação.
- [ ] Timer inicia/pausa/encerra/reinicia corretamente
- [ ] Timer global não perde sincronia ao trocar slides
- [ ] Reset completo funciona (fora do modo oficial)
- [ ] Resolução 1920×1080 ok
- [ ] Resolução 1366×768 ok
- [ ] Todos os modais fecham (ESC e clique fora)
- [ ] ESC fecha modal antes de navegar slide
- [ ] Seção ODS funciona (hover + click)
- [ ] Sem erros no console
- [ ] Fallback da demonstração disponível e testado
- [ ] Presenter Mode liga/desliga por atalho e por ?presenter=true
- [ ] Slide de Integrantes cabe sem corte vertical em 1366×768 (testar
      especificamente — card foi compactado para isso)
- [ ] Speaker Dock aparece em todos os 19 slides, não só quando alguém
      já está apresentando
- [ ] Trocar de apresentador pelo dock finaliza o anterior automaticamente
      (conferir tempo realizado registrado)
      - [ ] Slide de Documentação: os 4 botões abrem o modal correto
- [ ] Dentro do modal: roda do mouse aproxima NO PONTO do cursor; botões
      +/−, atalhos 100–400% e teclas + − 0 aplicam zoom (até 500%);
      arrastar e setas navegam a imagem ampliada; reset volta a 100%
- [ ] Documento em 100%: nada (barra de zoom, dica) fica sobre o diagrama
- [ ] Minimapa aparece com zoom, mostra a região visível; clique nele centraliza
- [ ] Tela cheia (botão na barra) ocupa a janela toda; ESC/X continuam fechando
- [ ] Setas ‹ › no topo do modal trocam de documento sem fechar
- [ ] ESC fecha o modal do documento sem navegar de slide (mesmo
      comportamento já validado nos outros modais)
- [ ] Logo da capa: aumentar --cover-logo-size não move o subtítulo/meta
- [ ] Documento em zoom 100%: a imagem inteira aparece, sem corte nas bordas
- [ ] Arrastar a imagem ampliada e soltar o botão fora da área do documento não trava o modal
- [ ] Botão "X" no canto do modal sempre fecha, nos 4 documentos
- [ ] Clicar na área fora do modal (fora dos 85vw/85vh) fecha o modal
- [ ] ESC fecha o modal de documento sem precisar recarregar a página
- [ ] Carrossel de Integrantes: card central sempre alinhado ao centro
      do viewport, em 1920×1080 E em 1366×768
- [ ] Clicar em qualquer card lateral recentraliza sem abrir modal nem
      iniciar o timer da pessoa sem querer
- [ ] Capa: painel glass centralizado e legível em 1920×1080 e 1366×768;
      mesh escuro some com crossfade ao sair da capa e volta ao retornar
- [ ] Gráfico de Evidências: barras e anel animam uma vez ao entrar no
      slide (voltar e entrar de novo deve reanimar)
- [ ] Fonte Saira (slides 2+): nenhum título/card estoura ou corta texto em
      1366×768 (conferir slide a slide, em especial Integrantes)
- [ ] Cursor neon segue o mouse, some ao sair da janela e não bloqueia
      clique em botões/cards; desligado com "reduzir movimento"
- [ ] Slide Contexto: waffle anima (grade + contagem 0→62, depois verde
      + 0→22,3%) e reanima ao sair e voltar; hover destaca o grupo
- [ ] Slide Contexto cabe sem corte vertical em 1366×768
- [ ] Slide Problema: linha do percurso desenha e cards entram em
      sequência; hover com brilho seguindo o mouse; cabe sem corte em
      1366×768 (sem sobrepor o Speaker Dock)
- [ ] Slides Público-alvo, Diferenciais e Funcionalidades continuam
      com a grade padrão, sem mudança
- [ ] Slides 5–11: cards entram em sequência, hover (elevação + brilho
      seguindo o mouse) funciona e nada corta em 1366×768
- [ ] Slide Evidências: contagem termina exatamente em 62 Mt / 22,3% / 82 Mt
- [ ] Slide Stakeholders: "Potencial parceiro" com selo tracejado
- [ ] Slide Arquitetura: simulação roda sozinha ao entrar, pacote vai e
      volta, terminal preenche ida | volta; botão repete; cabe em 1366×768
- [ ] Slide Stack: logos acendem no hover, TypeScript/Zod/Vitest acendem
      nos dois lados, inspector atualiza; cabe em 1366×768
- [ ] Logos escuros (Next.js, Express, shadcn/ui) legíveis no fundo escuro
- [ ] Slide Documentação: prévias reais dos 4 documentos; hover amplia a
      prévia no ponto do mouse; resolução exibida bate com o arquivo
- [ ] Slide Meme: janela entra "caindo", inclina com o mouse; clique no
      meme ou no botão solta a chuva de 👏
- [ ] Slide Encerramento: frase entra palavra a palavra, APNG do logo em
      loop no centro dos anéis (sem tela vazia — pré-carregado no Meme),
      clique no logo gera onda de choque; "Obrigado." não encosta no rodapé
      em 1366×768
- [ ] Dock: chip verde discreto; âmbar mais visível; vermelho aceso e
      pulsando; brilho único a cada troca de cor
- [ ] Dock: semáforo, instrução e "restam / acima" batem com o tempo
- [ ] Dock: Reiniciar pede confirmação no painel; Cancelar não zera
- [ ] Dock: abre por clique/Enter; fecha com clique fora e ESC; painel
      não sai da tela em 1366×768 (lista rola)
- [ ] Slide Resultados esperados: números terminam exatamente em 500+ /
      300+ / 200+ / 2+ toneladas / 80%+; medidor para em 80%; cabe em
      1366×768; selo "Meta inicial" visível em todos
- [ ] Slide Próximos passos: linha preenche e marcos acendem em sequência;
      hover no card acende o marco; frase final não encosta no rodapé em
      1366×768
- [ ] Slide Demonstração: hover numa tela da lista troca a prévia na
      janela sem fixar; clique fixa a seleção; clique na janela abre o
      modal com zoom/pan; ‹ › trocam de tela no modal mantendo a lista
      sincronizada; ESC fecha sem navegar; cabe em 1366×768
- [ ] Slide Demonstração funciona sem internet no modo Capturas e no
      modo Vídeo (capturas e vídeo são arquivos locais, não um iframe
      do deploy) — só o botão "Abrir site ao vivo" depende de internet,
      e só se o apresentador clicar nele
- [ ] Slide Demonstração: tabs Capturas/Vídeo trocam com crossfade, sem
      corte seco; "Abrir site ao vivo" abre eco-byte-neon.vercel.app em
      nova aba (não navega para fora da apresentação)
- [x] Slide Demonstração, modo Vídeo: demo-walkthrough.mp4 carrega (sem
      cair no placeholder "Vídeo ainda não adicionado") e
      play/pause/volume/tela cheia funcionam pelos controles nativos —
      testado em 2026-10-15 (1:34, 25,4 MB)
- [ ] Encerramento: logo visualmente centrado nos anéis (inclusive com o
      mouse parado num canto da tela)
