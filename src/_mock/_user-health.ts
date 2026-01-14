// ----------------------------------------------------------------------

type SentimentData = {
  positive: number;
  neutral: number;
  concern: number;
  negative: number;
  total: number;
};

type Sentiment7DaysData = {
  dates: string[];
  positive: number[];
  neutral: number[];
  concern: number[];
  negative: number[];
};

type TopicData = {
  name: string;
  count: number;
  percentage: number;
};

type RecommendationData = {
  type: 'success' | 'warning' | 'error' | 'info';
  icon: string;
  title: string;
  description: string;
};

type AlertLevelData = {
  level: string;
  color: 'success' | 'warning' | 'error';
  icon: string;
  description: string;
};

export type UserHealthData = {
  userId: string;
  messagesCount: number;
  responseRate: number;
  engagement7Days: number;
  sentiment: SentimentData;
  sentiment7Days: Sentiment7DaysData;
  topTopics: TopicData[];
  recommendations: RecommendationData[];
  alertLevel: AlertLevelData;
};

// ----------------------------------------------------------------------

const MOCK_HEALTH_DATA: Record<string, UserHealthData> = {
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': {
    userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    messagesCount: 45,
    responseRate: 89,
    engagement7Days: 12,
    sentiment: {
      positive: 28,
      neutral: 12,
      concern: 3,
      negative: 2,
      total: 45,
    },
    sentiment7Days: {
      dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      positive: [4, 3, 5, 2, 3, 0, 1],
      neutral: [1, 2, 1, 0, 1, 0, 0],
      concern: [0, 0, 1, 0, 0, 0, 0],
      negative: [0, 0, 0, 0, 0, 0, 0],
    },
    topTopics: [
      { name: 'Bem-estar no trabalho', count: 18, percentage: 40 },
      { name: 'Carga de trabalho', count: 12, percentage: 27 },
      { name: 'Benefícios', count: 8, percentage: 18 },
      { name: 'Desenvolvimento profissional', count: 7, percentage: 15 },
    ],
    alertLevel: {
      level: 'Saúde Mental Boa',
      color: 'success',
      icon: 'solar:smile-circle-bold',
      description: 'Funcionário demonstra sinais positivos de bem-estar.',
    },
    recommendations: [
      {
        type: 'success',
        icon: 'solar:check-circle-bold',
        title: 'Engajamento Positivo',
        description:
          'Funcionário mantém boa comunicação e apresenta sentimentos positivos nas interações.',
      },
      {
        type: 'info',
        icon: 'solar:info-circle-bold',
        title: 'Acompanhamento Preventivo',
        description:
          'Considere agendar uma conversa trimestral para manter o canal de comunicação aberto.',
      },
    ],
  },
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': {
    userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    messagesCount: 67,
    responseRate: 78,
    engagement7Days: 18,
    sentiment: {
      positive: 25,
      neutral: 28,
      concern: 10,
      negative: 4,
      total: 67,
    },
    sentiment7Days: {
      dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      positive: [3, 2, 3, 1, 2, 0, 0],
      neutral: [2, 3, 2, 2, 1, 1, 0],
      concern: [1, 1, 0, 1, 0, 0, 0],
      negative: [0, 1, 0, 0, 0, 0, 0],
    },
    topTopics: [
      { name: 'Pressão no trabalho', count: 22, percentage: 33 },
      { name: 'Relacionamento com equipe', count: 18, percentage: 27 },
      { name: 'Reconhecimento profissional', count: 15, percentage: 22 },
      { name: 'Equilíbrio vida-trabalho', count: 12, percentage: 18 },
    ],
    alertLevel: {
      level: 'Atenção Moderada',
      color: 'warning',
      icon: 'solar:danger-triangle-bold',
      description: 'Funcionário demonstra alguns sinais de preocupação.',
    },
    recommendations: [
      {
        type: 'warning',
        icon: 'solar:danger-triangle-bold',
        title: 'Sinais de Estresse',
        description:
          'Identificadas menções frequentes sobre pressão no trabalho. Recomenda-se conversa com gestor.',
      },
      {
        type: 'info',
        icon: 'solar:calendar-mark-bold',
        title: 'Acompanhamento Sugerido',
        description:
          'Agende uma reunião individual nas próximas 2 semanas para entender melhor as preocupações.',
      },
      {
        type: 'success',
        icon: 'solar:heart-bold',
        title: 'Apoio Disponível',
        description:
          'Lembre o funcionário sobre os recursos de apoio psicológico disponíveis na empresa.',
      },
    ],
  },
  'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': {
    userId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
    messagesCount: 89,
    responseRate: 92,
    engagement7Days: 25,
    sentiment: {
      positive: 15,
      neutral: 24,
      concern: 32,
      negative: 18,
      total: 89,
    },
    sentiment7Days: {
      dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      positive: [1, 1, 0, 2, 1, 0, 0],
      neutral: [2, 2, 3, 2, 1, 0, 1],
      concern: [3, 4, 3, 5, 2, 1, 0],
      negative: [2, 2, 1, 3, 1, 0, 0],
    },
    topTopics: [
      { name: 'Esgotamento profissional', count: 35, percentage: 39 },
      { name: 'Conflitos no trabalho', count: 28, percentage: 31 },
      { name: 'Ansiedade', count: 18, percentage: 20 },
      { name: 'Sobrecarga de trabalho', count: 8, percentage: 10 },
    ],
    alertLevel: {
      level: 'Alerta Crítico - Intervenção Necessária',
      color: 'error',
      icon: 'solar:danger-bold',
      description: 'Funcionário apresenta sinais críticos de esgotamento.',
    },
    recommendations: [
      {
        type: 'error',
        icon: 'solar:danger-bold',
        title: 'URGENTE: Intervenção Imediata',
        description:
          'Sinais claros de burnout e alta carga emocional. Contato com RH e gestor direto necessário nas próximas 24h.',
      },
      {
        type: 'error',
        icon: 'solar:health-bold',
        title: 'Suporte Profissional',
        description:
          'Encaminhar para atendimento psicológico imediato através do programa de assistência ao empregado.',
      },
      {
        type: 'warning',
        icon: 'solar:calendar-bold',
        title: 'Afastamento Temporário',
        description:
          'Avaliar necessidade de afastamento temporário ou redistribuição de tarefas.',
      },
      {
        type: 'info',
        icon: 'solar:users-group-rounded-bold',
        title: 'Reunião com Gestão',
        description:
          'Agendar reunião urgente com gestor para revisar carga de trabalho e ambiente.',
      },
    ],
  },
};

// ----------------------------------------------------------------------

// Função para gerar dados aleatórios para usuários sem dados específicos
function generateRandomHealthData(userId: string): UserHealthData {
  const messagesCount = Math.floor(Math.random() * 60) + 20;
  const responseRate = Math.floor(Math.random() * 30) + 70;
  
  const positiveCount = Math.floor(messagesCount * (Math.random() * 0.4 + 0.3));
  const neutralCount = Math.floor(messagesCount * (Math.random() * 0.3 + 0.2));
  const concernCount = Math.floor(messagesCount * (Math.random() * 0.2 + 0.05));
  const negativeCount = messagesCount - positiveCount - neutralCount - concernCount;

  const sentimentScore = (positiveCount * 3 + neutralCount * 1 - concernCount * 1 - negativeCount * 2) / messagesCount;

  let alertLevel: AlertLevelData;
  if (sentimentScore > 1.5) {
    alertLevel = {
      level: 'Saúde Mental Boa',
      color: 'success',
      icon: 'solar:smile-circle-bold',
      description: 'Funcionário demonstra sinais positivos de bem-estar.',
    };
  } else if (sentimentScore > 0) {
    alertLevel = {
      level: 'Atenção Moderada',
      color: 'warning',
      icon: 'solar:danger-triangle-bold',
      description: 'Funcionário demonstra alguns sinais de preocupação.',
    };
  } else {
    alertLevel = {
      level: 'Requer Atenção',
      color: 'error',
      icon: 'solar:danger-bold',
      description: 'Funcionário apresenta sinais de estresse elevado.',
    };
  }

  const topics = [
    'Bem-estar no trabalho',
    'Carga de trabalho',
    'Benefícios',
    'Desenvolvimento profissional',
    'Pressão no trabalho',
    'Relacionamento com equipe',
    'Reconhecimento profissional',
    'Equilíbrio vida-trabalho',
  ];

  const selectedTopics = topics
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map((topic, index) => ({
      name: topic,
      count: Math.floor(messagesCount * (0.4 - index * 0.1)),
      percentage: 40 - index * 10,
    }));

  return {
    userId,
    messagesCount,
    responseRate,
    engagement7Days: Math.floor(messagesCount * 0.3),
    sentiment: {
      positive: positiveCount,
      neutral: neutralCount,
      concern: concernCount,
      negative: negativeCount,
      total: messagesCount,
    },
    sentiment7Days: {
      dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
      positive: Array(7).fill(0).map(() => Math.floor(Math.random() * 5)),
      neutral: Array(7).fill(0).map(() => Math.floor(Math.random() * 3)),
      concern: Array(7).fill(0).map(() => Math.floor(Math.random() * 2)),
      negative: Array(7).fill(0).map(() => Math.floor(Math.random() * 2)),
    },
    topTopics: selectedTopics,
    recommendations: [
      {
        type: sentimentScore > 1 ? 'success' : sentimentScore > 0 ? 'info' : 'warning',
        icon: 'solar:info-circle-bold',
        title: 'Acompanhamento Regular',
        description: 'Continue monitorando as interações do funcionário.',
      },
    ],
    alertLevel,
  };
}

export function getUserHealthData(userId: string): UserHealthData {
  return MOCK_HEALTH_DATA[userId] || generateRandomHealthData(userId);
}
