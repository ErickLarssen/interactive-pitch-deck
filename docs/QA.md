# QA.md

- [ ] Teclado funciona (todas as teclas mapeadas)
- [ ] Fullscreen funciona (e falha graciosamente se bloqueado)
- [ ] Vídeos locais tocam sem internet
- [ ] Aplicação inteira funciona sem internet
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
- [ ] Speaker Dock aparece em todos os 18 slides, não só quando alguém
      já está apresentando
- [ ] Trocar de apresentador pelo dock finaliza o anterior automaticamente
      (conferir tempo realizado registrado)
      - [ ] Slide de Documentação: os 4 botões abrem o modal correto
- [ ] Dentro do modal: scroll do mouse e botões +/- aplicam zoom; arrastar
      com o mouse navega a imagem ampliada; botão de reset volta a 100%
- [ ] ESC fecha o modal do documento sem navegar de slide (mesmo
      comportamento já validado nos outros modais)
- [ ] Logo da capa: aumentar --cover-logo-scale não move o subtítulo/meta
- [ ] Documento em zoom 100%: a imagem inteira aparece, sem corte nas bordas
- [ ] Arrastar a imagem ampliada e soltar o botão fora da área do documento não trava o modal
- [ ] Botão "X" no canto do modal sempre fecha, nos 4 documentos
- [ ] Clicar na área fora do modal (fora dos 85vw/85vh) fecha o modal
- [ ] ESC fecha o modal de documento sem precisar recarregar a página