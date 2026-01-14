import { _mock } from './_mock';

export const POST_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Publicado' },
  { value: 'draft', label: 'Rascunho' },
];

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Mais Recentes' },
  { value: 'popular', label: 'Mais Populares' },
  { value: 'oldest', label: 'Mais Antigas' },
];

// ----------------------------------------------------------------------

// Dados mock de publicações do WhatsApp

export const _blogPosts = [...Array(23)].map((_, index) => {
  const publish = index % 3 === 0 ? 'draft' : 'published';
  const whatsappViews = _mock.number.nativeL(index);
  const whatsappInteractions = Math.floor(whatsappViews * (0.15 + Math.random() * 0.25)); // 15-40% de interação
  
  return {
    id: _mock.id(index),
    title: _mock.postTitle(index),
    description: _mock.description(index),
    content: `<p>${_mock.description(index)}</p><p>${_mock.description(index + 1)}</p>`,
    coverUrl: _mock.image.cover(index),
    totalViews: whatsappViews,
    totalShares: Math.floor(whatsappInteractions * 0.3),
    totalComments: Math.floor(whatsappInteractions * 0.5),
    totalFavorites: Math.floor(whatsappInteractions * 0.2),
    tags: ['bem-estar', 'saúde mental', 'dicas', 'autocuidado'].slice(0, (index % 4) + 1),
    publish,
    createdAt: _mock.time(index),
    author: {
      name: 'RH Cuidar.me',
      avatarUrl: _mock.image.avatar(index),
    },
    metaKeywords: ['bem-estar', 'saúde mental', 'dicas'],
    metaTitle: _mock.postTitle(index),
    metaDescription: _mock.description(index),
  };
});
