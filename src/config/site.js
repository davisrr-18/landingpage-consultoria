/**
 * Fonte única dos dados personalizáveis do site.
 *
 * Todo o conteúdo abaixo é fictício e serve apenas para demonstração.
 * Para adaptar o projeto a um cliente real, basta alterar este arquivo.
 */

export const siteConfig = {
  name: 'Vértice Fiscal',
  tagline: 'Consultoria fiscal e tributária',
  description:
    'Consultoria fiscal e tributária com atendimento próximo, linguagem clara e primeiro contato direto pelo WhatsApp. Site demonstrativo de empresa fictícia.',
  isDemo: true,

  /** Endereço público do site, com barra final. Usado nas tags de compartilhamento. */
  url: 'https://davisrr-18.github.io/landingpage-consultoria-fiscal/',
  shareImage: {
    /** Caminho relativo à pasta public/. Tamanho recomendado: 1200x630. */
    path: 'og-image.png',
    width: 1200,
    height: 630,
    alt: 'Capa da landing page demonstrativa da Vértice Fiscal, consultoria fiscal e tributária.',
  },

  whatsapp: {
    /**
     * Número no formato internacional E.164, com código do país e DDD
     * (ex.: 5511900000000). Enquanto estiver vazio ou inválido, o site
     * funciona em modo demonstração e nenhuma conversa é aberta.
     */
    number: '',
    defaultMessage:
      'Olá! Gostaria de saber mais sobre os serviços de consultoria fiscal.',
  },

  contact: {
    email: 'contato@example.com',
    hours: 'Segunda a sexta, das 9h às 18h',
    location: 'Atendimento online para todo o Brasil',
  },
}

export const navigation = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]

export const sectionIds = navigation.map((item) => item.id)

export const hero = {
  eyebrow: siteConfig.tagline,
  title: 'Organização fiscal para sua empresa decidir com',
  highlight: 'segurança',
  description:
    'Ajudamos empresas a entender suas obrigações, escolher o melhor caminho tributário e manter a rotina fiscal em ordem, com acompanhamento próximo e linguagem simples.',
  highlights: [
    'Atendimento consultivo e personalizado',
    'Linguagem clara, sem complicação',
    'Primeiro contato direto pelo WhatsApp',
  ],
  panel: {
    title: 'Panorama fiscal',
    badge: 'Ilustração',
    bars: [38, 56, 44, 70, 62, 88],
    items: [
      { label: 'Obrigações acessórias', status: 'Em acompanhamento' },
      { label: 'Regime tributário', status: 'Em análise' },
      { label: 'Planejamento do ano', status: 'Planejado' },
    ],
    chip: { label: 'Próximo passo', value: 'Diagnóstico inicial' },
  },
}

export const services = {
  eyebrow: 'Serviços',
  title: 'Suporte fiscal para cada etapa do negócio',
  description:
    'Soluções adaptadas ao porte e à realidade da sua empresa, do planejamento à rotina de obrigações.',
  items: [
    {
      icon: 'trend',
      title: 'Planejamento tributário',
      description:
        'Análise da carga tributária e das alternativas legais disponíveis para apoiar decisões financeiras mais conscientes.',
    },
    {
      icon: 'document',
      title: 'Enquadramento e regime tributário',
      description:
        'Avaliação do regime mais adequado ao perfil da empresa, com comparação clara de cenários e impactos.',
    },
    {
      icon: 'search',
      title: 'Revisão de rotinas fiscais',
      description:
        'Diagnóstico de processos, cadastros e apurações para identificar inconsistências e oportunidades de melhoria.',
    },
    {
      icon: 'shield',
      title: 'Compliance e obrigações acessórias',
      description:
        'Organização de prazos, documentos e entregas para manter a empresa em conformidade com a rotina fiscal.',
    },
    {
      icon: 'bell',
      title: 'Orientação em notificações fiscais',
      description:
        'Apoio para entender comunicados e notificações recebidos, organizar informações e definir os próximos passos.',
    },
    {
      icon: 'building',
      title: 'Consultoria para novos negócios',
      description:
        'Orientação fiscal na abertura, expansão ou reorganização da empresa, desde os primeiros passos.',
    },
  ],
}

export const benefits = {
  eyebrow: 'Diferenciais',
  title: 'Uma consultoria que trabalha ao seu lado',
  description:
    'Mais do que entregar relatórios, buscamos que você compreenda o cenário fiscal e tenha segurança para agir.',
  items: [
    {
      icon: 'people',
      title: 'Atendimento próximo',
      description:
        'Conversa direta com quem acompanha o seu caso, sem burocracia para tirar dúvidas.',
    },
    {
      icon: 'eye',
      title: 'Linguagem clara',
      description:
        'Explicamos termos técnicos de forma objetiva para que cada decisão seja bem compreendida.',
    },
    {
      icon: 'target',
      title: 'Análise personalizada',
      description:
        'Cada empresa tem uma realidade. Nosso trabalho parte do seu contexto, não de fórmulas prontas.',
    },
    {
      icon: 'clock',
      title: 'Respostas ágeis',
      description:
        'Canal direto pelo WhatsApp para iniciar a conversa e acompanhar o andamento com praticidade.',
    },
    {
      icon: 'lock',
      title: 'Sigilo e ética',
      description:
        'As informações da sua empresa são tratadas com confidencialidade e responsabilidade.',
    },
    {
      icon: 'layers',
      title: 'Organização e método',
      description:
        'Processos estruturados e prazos acompanhados para que nada importante fique para depois.',
    },
  ],
}

export const about = {
  eyebrow: 'Sobre',
  title: 'Clareza, ética e proximidade em cada projeto',
  paragraphs: [
    'A Vértice Fiscal é uma empresa fictícia criada para demonstrar como uma consultoria pode apresentar seus serviços de forma profissional e acessível.',
    'Nossa proposta de valor é simples: transformar a complexidade fiscal em informação útil, com atendimento humano e foco nas necessidades de cada negócio.',
  ],
  pillars: [
    'Transparência em cada etapa do atendimento',
    'Compromisso com a conformidade legal',
    'Foco em decisões práticas e aplicáveis',
  ],
  process: {
    title: 'Como trabalhamos',
    steps: [
      {
        title: 'Conversa inicial',
        description:
          'Entendemos o momento da empresa, suas dúvidas e seus objetivos.',
      },
      {
        title: 'Diagnóstico',
        description:
          'Analisamos a situação fiscal e apresentamos os pontos de atenção e caminhos possíveis.',
      },
      {
        title: 'Plano de ação',
        description:
          'Definimos, em conjunto, as prioridades e os passos para colocar o plano em prática.',
      },
      {
        title: 'Acompanhamento',
        description:
          'Mantemos contato para ajustar a estratégia conforme o negócio evolui.',
      },
    ],
  },
}

export const callToAction = {
  title: 'Vamos entender o cenário fiscal da sua empresa?',
  description:
    'Conte rapidamente o que você precisa e inicie a conversa pelo WhatsApp. O primeiro passo é simples.',
}

export const contact = {
  eyebrow: 'Contato',
  title: 'Inicie seu atendimento',
  description:
    'Preencha o formulário e continue a conversa pelo WhatsApp com todas as informações já organizadas.',
  demoNotice:
    'Projeto demonstrativo: o número de WhatsApp ainda não foi configurado, por isso nenhuma conversa será aberta.',
}

export const contactSubjects = [
  ...services.items.map((service) => service.title),
  'Outro assunto',
]

export const footer = {
  disclaimer:
    'As informações deste site têm caráter meramente informativo e não substituem uma análise individual da situação de cada empresa.',
  demoNotice: 'Site demonstrativo. Empresa, contatos e conteúdos fictícios.',
}
