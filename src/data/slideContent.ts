import {
    StatHighlightContent,
    InfoCardsContent,
    SequentialStepsContent,
    StakeholderMapContent,
    OdsGridContent,
    ClosingContent,
    DocumentGalleryContent,
    ArchitectureContent,
    TechStackContent,
    MemeContent,
} from '../types';

export const statHighlightContent: Record<string, StatHighlightContent> = {
    contexto: {
        headline: 'O lixo eletrônico cresce. O descarte correto não acompanha.',
        stats: [
            { value: '62 milhões de toneladas', label: 'de lixo eletrônico geradas no mundo em 2022' },
        ],
        waffleChart: {
            total: 62,
            unit: 'milhões de toneladas',
            caption: 'de lixo eletrônico geradas no mundo em 2022',
            highlightPercent: 22.3,
            highlightLabel: 'formalmente coletado e reciclado',
            restLabel: 'sem reciclagem documentada',
        },
        support:
            'Apenas 22,3% desse volume foi documentado como formalmente coletado e reciclado de maneira ambientalmente adequada.',
        impactPhrase:
            'O desafio não é apenas consumir tecnologia. É decidir o que fazer quando ela deixa de ser útil.',
        source: 'Fonte: Global E-waste Monitor 2024 — ITU / UNITAR.',
    },
    evidencias: {
        headline: 'O problema é mensurável.',
        stats: [
            { value: '62 Mt', label: 'de lixo eletrônico gerado mundialmente em 2022' },
            { value: '22,3%', label: 'documentado como formalmente coletado e reciclado' },
            { value: '82 Mt', label: 'projeção para 2030 caso a tendência continue' },
        ],
        trendChart: {
            from: { label: '2022', value: 62, displayValue: '62 Mt' },
            to: { label: '2030 (projeção)', value: 82, displayValue: '82 Mt' },
            ringLabel: 'reciclado corretamente',
            ringPercent: 22.3,
        },
        support:
            'O Global E-waste Monitor projeta aproximadamente 82 milhões de toneladas em 2030 — cerca de 32% acima de 2022.',
        impactPhrase: 'Mais resíduos estão sendo gerados do que devidamente encaminhados.',
        source: 'Fonte: Global E-waste Monitor 2024.',
        // Nota da equipe (não exibida no slide): antes da apresentação, vale
        // aplicar uma pesquisa curta com moradores de Diadema (ex.: "você sabe
        // onde descartar corretamente um eletrônico?"). Um dado local e
        // autoral é mais forte para a banca do que só a estatística mundial.
    },
};

export const infoCardsContent: Record<string, InfoCardsContent> = {
    problema: {
        layout: 'journey',
        headline: 'Descartar um eletrônico não deveria ser complicado.',
        cards: [
            {
                icon: '📍',
                iconKey: 'map-pin',
                title: 'Onde descartar?',
                description: 'Nem sempre é claro qual é o ponto adequado para cada tipo de resíduo.',
            },
            {
                icon: '🚚',
                iconKey: 'truck',
                title: 'Como transportar?',
                description:
                    'Equipamentos maiores ou em grande quantidade podem dificultar o deslocamento até um ponto de entrega.',
            },
            {
                icon: '🔄',
                iconKey: 'recycle',
                title: 'O que acontece depois?',
                description:
                    'O descarte adequado depende de que o resíduo entre em uma cadeia de recebimento e destinação ambientalmente correta.',
            },
        ],
        support:
            'No Brasil, o sistema de logística reversa de eletroeletrônicos prevê etapas de recebimento, armazenamento, transporte, tratamento e destinação ambientalmente adequada.',
        closingPhrase:
            'Existe infraestrutura para o descarte. O desafio é aproximá-la de quem precisa utilizá-la.',
    },
    publico: {
        layout: 'cards',
        headline: 'Começamos por quem vive e trabalha em Diadema.',
        cards: [
            {
                icon: '🏠',
                iconKey: 'house',
                title: 'Moradores',
                description:
                    'Pessoas com eletrônicos sem uso em casa e que precisam de uma alternativa prática para encaminhá-los corretamente.',
            },
            {
                icon: '🏢',
                iconKey: 'store',
                title: 'Pequenos negócios',
                description: 'Estabelecimentos que acumulam equipamentos, periféricos e componentes fora de uso.',
            },
            {
                icon: '🏙️',
                iconKey: 'building',
                title: 'Condomínios',
                description:
                    'Comunidades residenciais que podem concentrar volumes maiores de resíduos eletroeletrônicos.',
            },
        ],
        closingPhrase: 'Um problema doméstico. Uma oportunidade urbana.',
    },
    diferenciais: {
        layout: 'cards',
        headline: 'Menos atrito. Mais descarte correto.',
        cards: [
            {
                iconKey: 'door-open',
                title: 'Conveniência',
                description: 'O usuário solicita a coleta sem precisar transportar o material até o ponto de descarte.',
            },
            { iconKey: 'pointer', title: 'Simplicidade', description: 'A experiência concentra o processo em poucos passos.' },
            {
                iconKey: 'network',
                title: 'Intermediação',
                description: 'O EcoByte conecta o solicitante ao fluxo de encaminhamento definido pelo projeto.',
            },
            {
                iconKey: 'map-pin',
                title: 'Foco local',
                description: 'A solução nasce pensando especificamente na realidade de Diadema-SP.',
            },
        ],
    },
    funcionalidades: {
        layout: 'journey',
        headline: 'Do pedido à coleta, em uma única jornada.',
        cards: [
            { icon: '📝', iconKey: 'clipboard', title: 'Solicitação de coleta', description: 'Registro do pedido de recolhimento.' },
            { icon: '📍', iconKey: 'map-pin', title: 'Endereço', description: 'Definição do local onde o material deverá ser coletado.' },
            { icon: '🔄', iconKey: 'refresh', title: 'Acompanhamento', description: 'Visualização do status da solicitação.' },
            { icon: '✅', iconKey: 'check', title: 'Confirmação', description: 'Registro da conclusão do processo.' },
        ],
        flow: ['SOLICITADO', 'AGENDADO', 'EM COLETA', 'COLETADO', 'ENCAMINHADO'],
        // Nota da equipe (não exibida no slide): usar aqui só os estados que
        // realmente existem no software hoje, não antecipar funcionalidade
        // que ainda não foi implementada.
    },
};

export const sequentialStepsContent: Record<string, SequentialStepsContent> = {
    solucao: {
        layout: 'journey',
        headline: 'Uma plataforma que leva o descarte até você.',
        steps: [
            {
                number: '1',
                iconKey: 'smartphone',
                title: 'Solicite',
                description: 'O usuário informa o que deseja descartar e registra o endereço para coleta.',
            },
            {
                number: '2',
                iconKey: 'truck',
                title: 'A EcoByte recolhe',
                description: 'Um agente responsável pelo projeto realiza o recolhimento no endereço informado.',
            },
            {
                number: '3',
                iconKey: 'warehouse',
                title: 'Encaminhamos',
                description: 'O material é levado a um ecoponto adequado em Diadema.',
            },
            {
                number: '4',
                iconKey: 'recycle',
                title: 'Descarte correto',
                description: 'O resíduo entra no fluxo apropriado de recebimento e destinação.',
            },
        ],
        flow: ['CASA', 'ECOBYTE', 'ECOPONTO', 'DESTINAÇÃO'],
        closingPhrase: 'Do eletrônico parado em casa ao ponto correto de descarte.',
    },
    'proximos-passos': {
        headline: 'Começar em Diadema. Escalar com propósito.',
        steps: [
            {
                number: '01',
                title: 'Validar',
                description: 'Testar a experiência com usuários reais e medir a aderência da solução.',
            },
            {
                number: '02',
                title: 'Conectar',
                description: 'Buscar parcerias com ecopontos, cooperativas e atores do ecossistema de resíduos.',
            },
            {
                number: '03',
                title: 'Expandir',
                description: 'Ampliar gradualmente a cobertura para outros bairros e, posteriormente, municípios do ABC.',
            },
            {
                number: '04',
                title: 'Evoluir',
                description: 'Explorar novas plataformas e recursos digitais conforme os resultados da validação.',
            },
        ],
        closingPhrase: 'Primeiro, resolver localmente. Depois, escalar o impacto.',
    },
};

export const stakeholderMapContent: Record<string, StakeholderMapContent> = {
    stakeholders: {
        headline: 'Quem participa da solução?',
        center: 'EcoByte',
        nodes: [
            { label: 'Moradores', tag: 'Solicitante', description: 'Solicitam a coleta.', iconKey: 'house', status: 'active' },
            {
                label: 'Ecopontos',
                tag: 'Infraestrutura existente',
                description: 'Recebem o material encaminhado.',
                iconKey: 'warehouse',
                status: 'active',
            },
            {
                label: 'Cooperativas de reciclagem',
                tag: 'Potencial parceiro',
                iconKey: 'recycle',
                status: 'potential',
                description:
                    'Podem participar das etapas posteriores de destinação, conforme as parcerias e fluxos efetivamente estabelecidos.',
            },
            {
                label: 'Poder público',
                tag: 'Potencial parceiro',
                iconKey: 'landmark',
                status: 'potential',
                description: 'Pode atuar como parceiro institucional e na infraestrutura municipal.',
            },
        ],
        // Nota da equipe (não exibida no slide): usar sempre "potencial
        // parceiro"/"ator do ecossistema" para Prefeitura e cooperativas,
        // a menos que exista parceria de fato firmada, evita uma pergunta
        // desconfortável da banca.
    },
};

export const odsGridContent: Record<string, OdsGridContent> = {
    ods: {
        headline: 'Alinhado aos Objetivos de Desenvolvimento Sustentável',
        items: [
            {
                number: '11',
                color: '#FD9D24', // cor oficial ONU
                short: 'Cidades Sustentáveis',
                description:
                    'O projeto contribui para uma gestão urbana mais organizada e sustentável dos resíduos, especialmente ao facilitar o acesso a uma solução de descarte.',
            },
            {
                number: '12',
                color: '#BF8B2E',
                short: 'Consumo Responsável',
                description:
                    'É o ODS mais diretamente conectado ao EcoByte: assegurar padrões sustentáveis de consumo e produção, incluindo o manejo ambientalmente adequado de resíduos.',
            },
            {
                number: '13',
                color: '#3F7E44',
                short: 'Ação Climática',
                description:
                    'Contribuição indireta, relacionada à promoção de práticas de gestão de resíduos e uso mais eficiente de recursos.',
            },
        ],
    },
};

export const closingContent: Record<string, ClosingContent> = {
    encerramento: {
        lines: ['O eletrônico pode ter chegado ao fim.', 'O impacto dele não precisa terminar no lixo.'],
        projectName: 'EcoByte',
        tagline: 'Tecnologia para conectar pessoas ao descarte responsável.',
        thanks: 'Obrigado.',
        animatedLogo: '/assets/videos/ECOBYTE-logo-animado.png',
    },
};

export const memeContent: Record<string, MemeContent> = {
    meme: {
        src: '/assets/images/meme-encerramento.jpeg',
        alt: 'Meme do Homer Simpson apontando para a plateia: "Fim do slide. Acho bom você bater palmas e não fazer perguntas."',
        clapLabel: 'Clique para aplaudir',
    },
};

export const documentGalleryContent: Record<string, DocumentGalleryContent> = {
    documentacao: {
        headline: 'Documentação do projeto',
        documents: [
            { id: 'doc-navegacao', label: 'Diagrama de Navegação', src: '/assets/documents/diagrama-navegacao.png' },
            { id: 'doc-casos-uso', label: 'Casos de Uso', src: '/assets/documents/casos-de-uso.png' },
            { id: 'doc-idef0', label: 'IDEF-0', src: '/assets/documents/idef-0.png' },
            { id: 'doc-bpmn', label: 'BPMN', src: '/assets/documents/bpmn.png' },
        ],
    },
};

// Slides 12 e 13 — fonte: levantamento dos package.json do repositório
// EcoByte + docs/DECISIONS.md de lá (monorepo com npm workspaces).
// Não citar api-proxy.ts: o papel dele não foi confirmado.
export const architectureContent: Record<string, ArchitectureContent> = {
    arquitetura: {
        headline: 'Regras de negócio em um único lugar: a API.',
        chips: ['Monorepo · npm workspaces', 'TypeScript de ponta a ponta', 'Node.js 22+'],
        nodes: [
            {
                id: 'frontend',
                layer: 'Frontend',
                workspace: 'frontend/',
                name: 'Next.js',
                version: '16.3 · React 19.2',
                icon: 'nextjs',
                techs: [
                    { name: 'Tailwind CSS', icon: 'tailwind' },
                    { name: 'shadcn/ui', icon: 'shadcn' },
                    { name: 'TanStack Query', icon: 'tanstack' },
                ],
            },
            {
                id: 'api',
                layer: 'API',
                workspace: 'backend/',
                name: 'Express',
                version: '5 · ESM',
                icon: 'express',
                badge: 'Regras de negócio',
                techs: [
                    { name: 'Zod', icon: 'zod' },
                    { name: 'Sessões', icon: 'session' },
                    { name: 'Argon2id', icon: 'security' },
                ],
            },
            {
                id: 'odm',
                layer: 'Acesso a dados',
                workspace: 'backend/',
                name: 'Mongoose',
                version: '9',
                icon: 'mongoose',
                note: 'Modelagem e consultas ao MongoDB',
                techs: [],
            },
            {
                id: 'db',
                layer: 'Banco',
                name: 'MongoDB',
                icon: 'mongodb',
                note: 'Dados da aplicação e sessões (connect-mongo)',
                techs: [],
            },
        ],
        links: ['HTTP', '', ''],
        trace: [
            'Frontend (Next.js) envia a requisição HTTP',
            'API Express aplica as regras de negócio e valida com Zod',
            'Mongoose consulta o MongoDB',
            'MongoDB devolve os dados',
            'Mongoose entrega o resultado à API',
            'API responde via HTTP',
            'Frontend recebe — TanStack Query atualiza o cache',
        ],
    },
};

export const techStackContent: Record<string, TechStackContent> = {
    stack: {
        headline: 'TypeScript do navegador ao banco.',
        groups: [
            {
                label: 'Frontend',
                path: 'frontend/',
                items: [
                    { id: 'nextjs', name: 'Next.js', icon: 'nextjs', version: '16.3', role: 'Framework web com App Router' },
                    { id: 'react', name: 'React', icon: 'react', version: '19.2', role: 'Biblioteca de interface' },
                    { id: 'typescript', name: 'TypeScript', icon: 'typescript', version: '5', role: 'Tipagem estática no frontend' },
                    {
                        id: 'tailwind',
                        name: 'Tailwind CSS',
                        icon: 'tailwind',
                        version: '4',
                        role: 'Estilo utilitário via @tailwindcss/postcss, com tw-animate-css',
                    },
                    {
                        id: 'shadcn',
                        name: 'shadcn/ui',
                        icon: 'shadcn',
                        role: 'Componentes sobre Radix UI + class-variance-authority; ícones Lucide',
                    },
                    { id: 'tanstack', name: 'TanStack Query', icon: 'tanstack', role: 'Dados da API: cache, carregamento e invalidação' },
                    { id: 'rhf', name: 'React Hook Form', icon: 'rhf', role: 'Formulários, validados com Zod via @hookform/resolvers' },
                    { id: 'zod', name: 'Zod', icon: 'zod', version: '4', role: 'Validação de esquemas — nos formulários' },
                    { id: 'vitest', name: 'Vitest', icon: 'vitest', role: 'Testes com Testing Library + jsdom' },
                ],
            },
            {
                label: 'Backend',
                path: 'backend/',
                items: [
                    { id: 'node', name: 'Node.js', icon: 'node', version: '≥ 22', role: 'Runtime (fixado em .nvmrc e engines)' },
                    { id: 'express', name: 'Express', icon: 'express', version: '5', role: 'API HTTP em ESM — onde ficam as regras de negócio' },
                    { id: 'typescript', name: 'TypeScript', icon: 'typescript', version: '6', role: 'tsx no desenvolvimento, tsc no build' },
                    { id: 'mongodb', name: 'MongoDB', icon: 'mongodb', role: 'Banco de dados — guarda também as sessões' },
                    { id: 'mongoose', name: 'Mongoose', icon: 'mongoose', version: '9', role: 'Modelagem e acesso ao MongoDB' },
                    { id: 'zod', name: 'Zod', icon: 'zod', version: '4', role: 'Validação de esquemas — na API' },
                    { id: 'session', name: 'Sessões', icon: 'session', role: 'express-session + connect-mongo (sessões no MongoDB)' },
                    { id: 'security', name: 'Segurança', icon: 'security', role: 'Senhas com Argon2id + express-rate-limit' },
                    { id: 'vitest', name: 'Vitest', icon: 'vitest', role: 'Testes com Supertest + mongodb-memory-server' },
                ],
            },
        ],
        tooling: [
            { id: 'npm', name: 'npm workspaces', icon: 'npm', role: 'Monorepo com os workspaces backend e frontend' },
            { id: 'eslint', name: 'ESLint', icon: 'eslint', role: 'Lint nos dois workspaces (typescript-eslint e eslint-config-next)' },
            { id: 'concurrently', name: 'concurrently', icon: 'concurrently', role: 'npm run dev na raiz sobe backend e frontend juntos' },
            { id: 'seed', name: 'Seed', icon: 'seed', role: 'Script npm run seed no backend' },
        ],
    },
};
