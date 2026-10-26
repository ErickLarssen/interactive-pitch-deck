import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    plugins: [react(), viteSingleFile()],
    // Caminhos relativos + bundle único (JS e CSS inline no index.html,
    // via vite-plugin-singlefile): o dist/ abre direto de um pendrive
    // (file://) em qualquer computador, sem servidor nem internet —
    // essencial para rodar no PC do auditório, que a equipe não
    // controla com antecedência. Sem isso, o <script type="module">
    // padrão do Vite é bloqueado por CORS ao abrir via file://, e a
    // tela fica em branco. Vídeos/imagens continuam em dist/assets/
    // (vêm de public/, não passam pelo bundler) — só JS+CSS inlinam.
    base: './',
});