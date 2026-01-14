import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'pending', label: 'Férias' },
  { value: 'banned', label: 'Demissão' },
];

export const USER_DEPARTMENT_OPTIONS = [
  'RH',
  'TI',
  'Financeiro',
  'Comercial',
  'Operações',
  'Marketing',
  'Atendimento',
  'Administração',
  'Jurídico',
  'Logística',
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  school: _mock.companyNames(2),
  company: _mock.companyNames(1),
  country: _mock.countryNames(2),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  socialLinks: {
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: _mock.countryNames(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  { subscription: 'basic', price: 0, primary: false },
  { subscription: 'starter', price: 4.99, primary: true },
  { subscription: 'premium', price: 9.99, primary: false },
];

const departamentosBrasileiros = [
  'Recursos Humanos',
  'Tecnologia da Informação',
  'Financeiro',
  'Comercial',
  'Operações',
  'Marketing',
  'Atendimento ao Cliente',
  'Jurídico',
  'Compras',
  'Logística',
  'Qualidade',
  'Segurança do Trabalho',
  'Administração',
  'Controladoria',
  'Comunicação',
  'Produtos',
  'Engenharia',
  'Pesquisa e Desenvolvimento',
  'Projetos',
  'Facilities',
];

const cargosBrasileiros = [
  'Analista de RH',
  'Desenvolvedor Full Stack',
  'Gerente Financeiro',
  'Executivo de Vendas',
  'Coordenador de Operações',
  'Analista de Marketing',
  'Atendente',
  'Advogado',
  'Comprador',
  'Analista de Logística',
  'Supervisor de Qualidade',
  'Técnico de Segurança',
  'Assistente Administrativo',
  'Controller',
  'Comunicador Social',
  'Product Owner',
  'Engenheiro',
  'Pesquisador',
  'Gerente de Projetos',
  'Analista de Facilities',
];

const telefonesBrasileiros = [
  '(11) 98765-4321',
  '(21) 99876-5432',
  '(85) 97654-3210',
  '(31) 96543-2109',
  '(48) 95432-1098',
  '(81) 94321-0987',
  '(71) 93210-9876',
  '(51) 92109-8765',
  '(41) 91098-7654',
  '(61) 90987-6543',
  '(62) 98876-5432',
  '(27) 97765-4321',
  '(84) 96654-3210',
  '(83) 95543-2109',
  '(86) 94432-1098',
  '(92) 93321-0987',
  '(65) 92210-9876',
  '(82) 91109-8765',
  '(79) 90098-7654',
  '(98) 99987-6543',
];

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '01310-100',
  state: 'São Paulo',
  city: 'São Paulo',
  role: cargosBrasileiros[index],
  email: _mock.email(index),
  address: 'Av. Paulista, 1000',
  name: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  company: departamentosBrasileiros[index],
  country: 'Brasil',
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: telefonesBrasileiros[index],
  status:
    (index % 2 && 'pending') || (index % 3 && 'banned') || 'active',
}));
