import type { PrismTheme } from 'prism-react-renderer';

// Tema do editor de código (slide 14 — Código): cores da marca em vez
// do tema padrão do prism-react-renderer, pra não parecer um snippet
// de blog genérico. Fundo transparente — quem define o fundo é o
// .code-editor__pre (combina com .premium-card / --bg-elevated).
export const codeEditorTheme: PrismTheme = {
    plain: {
        color: '#f5f6f7', // --fg-primary
        backgroundColor: 'transparent',
    },
    styles: [
        { types: ['comment'], style: { color: '#a7acb3', fontStyle: 'italic' } }, // --fg-muted
        { types: ['string', 'char', 'attr-value'], style: { color: '#8bc34a' } }, // --brand-green-light
        { types: ['number', 'boolean'], style: { color: '#8bc34a' } },
        { types: ['keyword', 'operator', 'rule'], style: { color: '#4fa8db' } }, // --brand-blue-light
        { types: ['function', 'class-name', 'maybe-class-name'], style: { color: '#4fa8db', fontWeight: '600' } },
        { types: ['punctuation'], style: { color: '#a7acb3' } },
        { types: ['property', 'attr-name', 'tag'], style: { color: '#f5f6f7' } },
        { types: ['constant', 'symbol'], style: { color: '#8bc34a' } },
    ],
};
