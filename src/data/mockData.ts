import { Category, Product, CompanySettings, Order } from '../types';

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: 'JPCT – Prestação de Serviços, Lda.',
  nif: '5417082910',
  address: 'Bairro Comandante Cow Boy, Rua Principal, próximo ao Restaurante Casa Verde',
  neighborhood: 'Bairro Comandante Cow Boy',
  city: 'Lubango',
  province: 'Huíla',
  country: 'Angola',
  phone: '+244 942 778 643',
  secondaryPhone: '+244 942 778 643',
  whatsappNumber: '244942778643',
  email: 'geral@jpct.ao',
  workingHours: 'Segunda a Sexta: 08:00 – 18:00 | Sábado: 08:00 – 14:00',
  bankDetails: {
    bankName: 'Banco BAI / BFA Angola',
    accountNumber: '0040.0000.1234.5678.9012.3',
    iban: 'AO06.0040.0000.1234.5678.9012.3',
    holder: 'JPCT – Prestação de Serviços, Lda.',
    multicaixaPhone: '942 778 643',
  },
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'mobiliario',
    name: 'Mobiliário Escolar & Escritório',
    slug: 'mobiliario',
    iconName: 'Armchair',
    description: 'Carteiras escolares, secretárias executivas, armários metálicos, mesas de reunião, longarinas e cadeiras ergonómicas.',
    count: 38,
    image: '/images/jpct_office_desk_1790249696423.jpg',
  },
  {
    id: 'informatica',
    name: 'Informática & Consumíveis HP',
    slug: 'informatica',
    iconName: 'Printer',
    description: 'Impressoras multifunções HP Smart Tank, tinteiros originais HP 953/953XL e garrafas de tinta GT53/GT52.',
    count: 26,
    image: '/images/jpct_hp_printer_1790249743146.jpg',
  },
  {
    id: 'escritorio',
    name: 'Material de Escritório',
    slug: 'escritorio',
    iconName: 'Briefcase',
    description: 'Flipcharts, organizadores de secretária, quadros brancos, resmas de papel A4 e agrafadores corporativos.',
    count: 42,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'papelaria',
    name: 'Papelaria & Ensino',
    slug: 'papelaria',
    iconName: 'PenTool',
    description: 'Livro de Ponto AUKORA-109, lousas e quadros verdes de giz, canetas BIC Cristal Dura+ e cadernos escolares.',
    count: 45,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'livros',
    name: 'Livros & Literatura',
    slug: 'livros',
    iconName: 'BookOpen',
    description: 'Dicionários, livros escolares, manuais técnicos e obras literárias de autores angolanos e internacionais.',
    count: 24,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'agricultura',
    name: 'Agricultura & Sementes',
    slug: 'agricultura',
    iconName: 'Sprout',
    description: 'Sementes certificadas de milho híbrido, adubos NPK e ferramentas de campo para a produção agrícola na Huíla.',
    count: 22,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'alimentacao',
    name: 'Bens Alimentares',
    slug: 'alimentacao',
    iconName: 'ShoppingBag',
    description: 'Arroz agulha, açúcar, óleo vegetal e géneros alimentícios essenciais para cantinas, empresas e famílias.',
    count: 28,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bolas',
    name: 'Bolas e Artigos Desportivos',
    slug: 'bolas',
    iconName: 'Trophy',
    description: 'Bolas oficiais de futebol tamanho 5, bombas manuais de ar e artigos desportivos para escolas e clubes.',
    count: 16,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'recargas',
    name: 'Recargas Electrónicas',
    slug: 'recargas',
    iconName: 'Smartphone',
    description: 'Saldos digitais para Unitel, Africell, Movicel, ZAP e DStv com envio imediato por WhatsApp.',
    count: 10,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'jornais',
    name: 'Jornais e Revistas',
    slug: 'jornais',
    iconName: 'Newspaper',
    description: 'Jornal de Angola, publicações periódicas oficiais e imprensa informativa no Lubango.',
    count: 12,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-mob-01',
    name: 'Secretária Executiva em Madeira com Bloco de Gavetas e Fechadura',
    code: 'MOB-SEC-01',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Mobiliário',
    price: 0,
    rating: 5.0,
    reviewsCount: 38,
    inStock: true,
    stockQuantity: 15,
    badge: 'Mais vendido',
    description: 'Secretária executiva de escritório com tampo espesso em madeira tratada de alta densidade e acabamento carvalho/nogueira. Equipada com furo passa-cabos embutido e gaveteiro lateral com fechadura e chave de segurança para proteção de documentos sigilosos.',
    features: [
      'Tampo resistente a riscos, manchas e humidade com acabamento nobre',
      'Passa-cabos embutido para cabos de computador e carregadores',
      'Bloco lateral com gavetas e fechadura de segurança com 2 chaves',
      'Excelente estabilidade e ergonomia para gabinetes directivos no Lubango'
    ],
    specifications: [
      { label: 'Dimensões', value: '140 x 70 x 75 cm' },
      { label: 'Material', value: 'MDF de alta densidade com acabamento melamínico' },
      { label: 'Segurança', value: 'Fechadura centralizada com chave' },
      { label: 'Cor', value: 'Carvalho Escuro / Grafite' }
    ],
    images: [
      '/images/jpct_office_desk_1790249696423.jpg'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-mob-02',
    name: 'Armário Metálico de Escritório com Portas de Vidro e Gavetas',
    code: 'MOB-ARM-02',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Mobiliário',
    price: 0,
    rating: 4.9,
    reviewsCount: 29,
    inStock: true,
    stockQuantity: 12,
    badge: 'Novo',
    description: 'Armário arquivador em chapa de aço esmaltada cinzenta de calibre industrial. Equipado com 2 portas superiores em vidro temperado com fechadura, 2 gavetas centrais com chave e 2 portas inferiores de aço com tranca para organização de dossiers e documentação confidencial.',
    features: [
      'Construção reforçada em chapa de aço esmaltada contra oxidação',
      'Portas superiores envidraçadas para fácil localização visual de arquivos',
      'Duas gavetas centrais com fechadura para material de valor e carimbos',
      'Portas inferiores cegas de alta segurança com chave independente'
    ],
    specifications: [
      { label: 'Dimensões', value: '185 x 90 x 40 cm' },
      { label: 'Material', value: 'Chapa de aço laminada a frio esmaltada e vidro' },
      { label: 'Prateleiras', value: 'Prateleiras interiores ajustáveis em altura' },
      { label: 'Segurança', value: 'Fechaduras em cada secção com chaves de reserva' }
    ],
    images: [
      '/images/jpct_metal_cabinet_1790249708738.jpg'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-mob-03',
    name: 'Cadeira Ergonómica de Escritório Giratória Mesh com Braços',
    code: 'MOB-CAD-03',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Ergo',
    price: 0,
    rating: 4.9,
    reviewsCount: 44,
    inStock: true,
    stockQuantity: 28,
    badge: 'Mais vendido',
    description: 'Cadeira giratória executiva com encosto em malha mesh respirável, apoio lombar ergonómico integrado, apoios de braço anatómicos e ajuste pneumático de altura a gás. Proporciona máximo conforto e postura correcta durante longas jornadas de trabalho.',
    features: [
      'Encosto em malha mesh respirável que dissipa o calor corporal',
      'Assento com espuma moldada de alta densidade e revestimento durável',
      'Elevação suave com pistão a gás Classe 3 de alta durabilidade',
      'Base estável em estrela de 5 pontas com rodízios de deslizamento suave'
    ],
    specifications: [
      { label: 'Tipo', value: 'Cadeira Giratória Ergonómica com Braços' },
      { label: 'Ajuste de Altura', value: 'Pistão pneumático Classe 3 (45 - 55 cm)' },
      { label: 'Peso Suportado', value: 'Até 130 kg' },
      { label: 'Cor', value: 'Preto Executivo' }
    ],
    images: [
      '/images/jpct_mesh_chair_1790249729537.jpg'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-inf-04',
    name: 'Impressora Multifunções HP Smart Tank 580 Wireless All-in-One',
    code: 'INF-IMP-04',
    category: 'informatica',
    categoryName: 'Informática & Consumíveis HP',
    brand: 'HP (Hewlett-Packard)',
    price: 0,
    rating: 5.0,
    reviewsCount: 57,
    inStock: true,
    stockQuantity: 18,
    badge: 'Mais vendido',
    description: 'Impressora multifunções a cores sem fios com tanques de tinta de grande capacidade recarregáveis. Imprime, digitaliza e fotocopia com extrema poupança. Inclui garrafas originais para até 6.000 páginas a preto ou cores.',
    features: [
      'Funções 3 em 1: Impressão a cores, Fotocopiadora e Scanner de mesa',
      'Conectividade Wi-Fi auto-reparável e Wi-Fi Direct para telemóveis',
      'Rendimento impressionante de até 6.000 páginas com as tintas inclusas',
      'Sistema de recarga de tinta antifugas e limpo'
    ],
    specifications: [
      { label: 'Velocidade', value: 'Até 12 ppm (Preto) / 5 ppm (Cores)' },
      { label: 'Conectividade', value: 'Wi-Fi, Bluetooth LE, USB 2.0 de alta velocidade' },
      { label: 'Consumíveis', value: 'Garrafas HP GT53 Preto e HP GT52 Ciano, Magenta, Amarelo' },
      { label: 'Resolução', value: 'Até 4800 x 1200 dpi optimizados' }
    ],
    images: [
      '/images/jpct_hp_printer_1790249743146.jpg'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-mob-05',
    name: 'Carteira Escolar Individual com Tampo e Assento em Madeira',
    code: 'MOB-CRT-05',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Escolar',
    price: 0,
    rating: 4.9,
    reviewsCount: 62,
    inStock: true,
    stockQuantity: 80,
    badge: 'Mais vendido',
    description: 'Carteira escolar individual resistente especialmente projectada para salas de aula, colégios e universidades no Lubango. Tampo em madeira maciça prensada tratada com ranhura para lápis, prateleira porta-livros inferior e estrutura em tubo de aço com ponteiras de borracha antirruído.',
    features: [
      'Estrutura em tubo de aço redondo soldado com pintura electrostática',
      'Tampo com ranhura de arrumação de lápis e canetas',
      'Prateleira inferior espaçosa para mochilas, cadernos e livros',
      'Pés com sapatas de borracha que protegem o pavimento das salas de aula'
    ],
    specifications: [
      { label: 'Modelo', value: 'Carteira Escolar Monobloco Individual' },
      { label: 'Tampo', value: 'Madeira prensada tratada com cantos boleados (60 x 40 cm)' },
      { label: 'Estrutura', value: 'Tubo de aço com tratamento anticorrosivo' },
      { label: 'Aplicação', value: 'Ensino Primário, Secundário, Médio e Superior' }
    ],
    images: [
      '/images/jpct_school_desk_1790249761487.jpg'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-pap-06',
    name: 'Livro De Ponto Horizontal AUKORA-109 (Registo de Pessoal)',
    code: 'PAP-AUK-06',
    category: 'papelaria',
    categoryName: 'Papelaria & Ensino',
    brand: 'Aukora',
    price: 0,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    stockQuantity: 65,
    badge: 'Mais vendido',
    description: 'Livro de ponto horizontal oficial modelo AUKORA-109 para registo e controlo de presenças, horários de entrada e saída de funcionários em empresas, instituições públicas e escolas no Lubango e em toda a Huíla.',
    features: [
      'Capa dura em napa preta encadernada com gravação de luxo em letras douradas',
      'Folhas pautadas normalizadas com colunas para todo o mês',
      'Papel de alta gramagem que não mancha nem transfere a tinta',
      'Conforme a legislação laboral para fiscalização e arquivo de RH'
    ],
    specifications: [
      { label: 'Modelo', value: 'AUKORA-109' },
      { label: 'Formato', value: 'Horizontal / Paisagem' },
      { label: 'Capa', value: 'Dura preta com termoestampagem a dourado' },
      { label: 'Finalidade', value: 'Registo e Assiduidade de Pessoal e Trabalhadores' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-mob-07',
    name: 'Longarina Metálica de 4 Lugares com Estofos Pretos para Recepção',
    code: 'MOB-LNG-07',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Mobiliário',
    price: 0,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    stockQuantity: 14,
    badge: 'Novo',
    description: 'Banco longarina de 4 lugares em estrutura tubular e chapa de aço com acabamento prateado/cromado, assentos e encostos estofados a corvim preto de alta densidade e apoios de braço ergonómicos. Perfeita para salas de espera, hospitais, clínicas, bancos e balcões de atendimento.',
    features: [
      'Viga de aço de sustentação com alta capacidade de carga',
      '4 Assentos individuais almofadados com revestimento lavável',
      'Apoios de braço laterais confortáveis com acabamento metálico',
      'Sapatas com niveladores reguláveis para total estabilidade'
    ],
    specifications: [
      { label: 'Capacidade', value: '4 Lugares' },
      { label: 'Dimensões', value: '235 x 65 x 78 cm' },
      { label: 'Estrutura', value: 'Aço com tratamento anticorrosivo prateado' },
      { label: 'Estofo', value: 'Napa preta de alta densidade e fácil higienização' }
    ],
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-esc-08',
    name: 'Flipchart / Quadro Branco Magnético com Tripé Regulável',
    code: 'ESC-FLP-08',
    category: 'escritorio',
    categoryName: 'Material de Escritório',
    brand: 'JPCT Office',
    price: 0,
    rating: 4.8,
    reviewsCount: 24,
    inStock: true,
    stockQuantity: 22,
    badge: 'Mais vendido',
    description: 'Cavalete flipchart versátil com superfície de quadro branco magnético para escrita com marcadores e apagamento a seco. Equipado com tripé metálico preto regulável em altura e barra superior de fixação para blocos de papel de apresentação.',
    features: [
      'Superfície magnética para marcadores de feltro e ímanes',
      'Grampo superior de pressão reforçado para fixar folhas de bloco',
      'Tripé metálico telescópico com ajuste simples de altura',
      'Estrutura leve e dobrável para fácil transporte entre salas de reunião'
    ],
    specifications: [
      { label: 'Dimensões do Quadro', value: '70 x 100 cm' },
      { label: 'Altura Ajustável', value: 'De 105 cm a 185 cm' },
      { label: 'Moldura', value: 'Alumínio preto com cantos de segurança' },
      { label: 'Acessórios compatíveis', value: 'Blocos flipchart, marcadores e apagadores' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-esc-09',
    name: 'Quadro Escolar Verde de Giz com Moldura de Alumínio e Calha',
    code: 'ESC-QDV-09',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Escolar',
    price: 0,
    rating: 5.0,
    reviewsCount: 42,
    inStock: true,
    stockQuantity: 35,
    badge: 'Mais vendido',
    description: 'Lousa escolar tradicional verde com acabamento fosco antireflexo de alta aderência para giz. Moldura perimetral em alumínio anodizado reforçado com cantos arredondados de segurança e calha inferior contínua para acomodação de giz e apagador.',
    features: [
      'Superfície verde mate antireflexo que facilita a visualização em aula',
      'Moldura de alumínio resistente contra choques com cantoneiras de protecção',
      'Calha porta-giz e porta-apagador integrada em toda a base',
      'Sistema de fixação mural seguro e discreto'
    ],
    specifications: [
      { label: 'Dimensões disponíveis', value: '120 x 90 cm / 200 x 120 cm / 240 x 120 cm' },
      { label: 'Superfície', value: 'Chapa verde fosca texturada para giz' },
      { label: 'Moldura', value: 'Alumínio anodizado natural' },
      { label: 'Aplicação', value: 'Escolas, colégios, centros de formação e auditórios' }
    ],
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-esc-10',
    name: 'Organizador de Secretária em Rede Metálica Preta (3 Compartimentos)',
    code: 'ESC-ORG-10',
    category: 'escritorio',
    categoryName: 'Material de Escritório',
    brand: 'JPCT Office',
    price: 0,
    rating: 4.7,
    reviewsCount: 33,
    inStock: true,
    stockQuantity: 45,
    badge: 'Novo',
    description: 'Organizador multifunções compacto em rede de arame metálico preto com pintura electrostática antiferrugem. Contém compartimento vertical espaçoso para canetas e réguas, nicho para bloco de notas e bandeja rebaixada para clipes, borrachas e pequenos utensílios.',
    features: [
      'Rede de aço resistente com pintura preta antiferrugem',
      '3 Divisórias optimizadas para poupar espaço na secretária',
      'Pés com protecção que não riscam a superfície da mesa',
      'Mantém a secretária limpa, organizada e profissional'
    ],
    specifications: [
      { label: 'Dimensões', value: '20.5 x 10.5 x 10 cm' },
      { label: 'Material', value: 'Malha de aço aramado com acabamento preto' },
      { label: 'Compartimentos', value: '1 Porta-canetas + 1 Porta-bloco + 1 Bandeja de clipes' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-inf-11',
    name: 'Tinteiros Originais HP 953 / 953XL (Preto, Ciano, Magenta, Amarelo)',
    code: 'INF-TIN-11',
    category: 'informatica',
    categoryName: 'Informática & Consumíveis HP',
    brand: 'HP (Hewlett-Packard)',
    price: 0,
    rating: 5.0,
    reviewsCount: 78,
    inStock: true,
    stockQuantity: 95,
    badge: 'Mais vendido',
    description: 'Cartuchos originais HP 953 e 953XL de alta capacidade com tecnologia de tinta pigmentada genuína. Oferecem textos pretos nítidos com qualidade laser e cores intensas resistentes a água e desvanecimento para impressoras corporativas HP OfficeJet Pro.',
    features: [
      'Tinta 100% original certificada HP com chip de monitorização de nível',
      'Rendimento prolongado com versões estándar e XL de alto volume',
      'Secagem imediata que evita borrões em faturas e relatórios',
      'Compatível com HP OfficeJet Pro 7720, 7730, 7740, 8210, 8710, 8720, 8730'
    ],
    specifications: [
      { label: 'Cores Disponíveis', value: 'Preto (953 / 953XL), Ciano, Magenta, Amarelo' },
      { label: 'Rendimento', value: 'Até 1.000 páginas (Padrão) / 2.000 páginas (XL)' },
      { label: 'Origem', value: 'Genuíno HP' }
    ],
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-inf-12',
    name: 'Kit Garrafas de Tinta Original HP GT53 Preto e GT52 Cores',
    code: 'INF-GAR-12',
    category: 'informatica',
    categoryName: 'Informática & Consumíveis HP',
    brand: 'HP (Hewlett-Packard)',
    price: 0,
    rating: 5.0,
    reviewsCount: 82,
    inStock: true,
    stockQuantity: 110,
    badge: 'Mais vendido',
    description: 'Garrafas originais de tinta de recarga HP GT53 Preto (90ml) e HP GT52 Ciano, Amarelo e Magenta (70ml) com bico dosador inteligente com sistema anti-derramamento. Ideais para impressoras HP Smart Tank e HP DeskJet GT no Lubango.',
    features: [
      'Sistema de abastecimento limpo que só verte quando acoplado ao tanque',
      'Tinta genuína que não entope nem danifica a cabeça de impressão',
      'Alto rendimento de até 6.000 páginas a custo por cópia ultra reduzido',
      'Cores vivas e textos pretos nítidos em documentos e imagens'
    ],
    specifications: [
      { label: 'Conteúdo', value: 'GT53 Preto (90 ml) | GT52 Ciano, Magenta, Amarelo (70 ml cada)' },
      { label: 'Compatibilidade', value: 'HP Smart Tank Séries 500, 580, 600, 700 e DeskJet GT' },
      { label: 'Origem', value: 'Genuíno HP' }
    ],
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-mob-13',
    name: 'Mesa de Reunião e Conferência Executiva em Madeira com Pés Metálicos',
    code: 'MOB-REU-13',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Mobiliário',
    price: 0,
    rating: 4.9,
    reviewsCount: 16,
    inStock: true,
    stockQuantity: 6,
    badge: 'Novo',
    description: 'Mesa corporativa ampla para salas de conselho directivo e reuniões com tampo em madeira nobre e pernas reforçadas em aço com pintura cinzenta escura. Acomoda com conforto 8 a 10 pessoas em reuniões de negócios e formações.',
    features: [
      'Tampo maciço de alta resistência com tratamento anti-manchas e riscos',
      'Estrutura metálica reforçada de suporte que suporta cargas elevadas',
      'Caixa passa-cabos integrada para tomadas e ligação de projectores',
      'Design elegante e moderno que valoriza a sede da empresa'
    ],
    specifications: [
      { label: 'Dimensões', value: '240 x 120 x 75 cm' },
      { label: 'Capacidade', value: '8 a 10 Lugares' },
      { label: 'Tampo', value: 'MDF melamínico de alta densidade' },
      { label: 'Base', value: 'Aço estrutural lacado' }
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-mob-14',
    name: 'Conjunto Modular de Mesas e Cadeiras para Sala de Formação e Refeitório',
    code: 'MOB-SET-14',
    category: 'mobiliario',
    categoryName: 'Mobiliário Escolar & Escritório',
    brand: 'JPCT Mobiliário',
    price: 0,
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    stockQuantity: 20,
    badge: 'Mais vendido',
    description: 'Conjunto modular de mesas compridas com estrutura metálica e tampo em madeira clara laminada, acompanhadas por cadeiras ergonómicas empilháveis em polipropileno perfurado preto e pés em aço. Perfeito para salas de aula, refeitórios e centros de formação na Huíla.',
    features: [
      'Mesas modulares que podem ser unidas em linha contínua ou separadas',
      'Cadeiras empilháveis que facilitam a lavagem e arrumação do espaço',
      'Assentos e encostos anatómicos perfurados com ventilação',
      'Estrutura em aço com pintura epóxi duradoura contra choques'
    ],
    specifications: [
      { label: 'Configuração', value: 'Mesas modulares com cadeiras empilháveis' },
      { label: 'Material Tampo', value: 'Compensado laminado com bordas seladas impermeáveis' },
      { label: 'Cadeiras', value: 'Polipropileno de alta tenacidade sobre pés de aço' },
      { label: 'Indicação', value: 'Centros de Formação, Escolas, Refeitórios e Empresas' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-pap-15',
    name: 'Caixa de Canetas Esferográficas BIC Cristal Dura+ (50 Unidades)',
    code: 'PAP-BIC-15',
    category: 'papelaria',
    categoryName: 'Papelaria & Ensino',
    brand: 'BIC',
    price: 0,
    rating: 5.0,
    reviewsCount: 140,
    inStock: true,
    stockQuantity: 180,
    badge: 'Mais vendido',
    description: 'Caixa com 50 canetas esferográficas BIC Cristal Dura+ ponta média 1.0mm nas cores clássicas (Azul, Preto, Vermelho, Verde). Escrita contínua sem borrões até 3km por caneta com corpo hexagonal transparente para ver o nível de tinta.',
    features: [
      'Caixa económica de atacado com 50 unidades',
      'Fórmula exclusiva Dura+ com escrita suave e secagem rápida',
      'Corpo hexagonal clássico que evita a queda da mesa de trabalho',
      'Tampa ventilada de segurança na cor da tinta'
    ],
    specifications: [
      { label: 'Ponta', value: '1.0 mm (Média)' },
      { label: 'Quantidade', value: 'Caixa com 50 Canetas' },
      { label: 'Cores Disponíveis', value: 'Azul, Preto, Vermelho, Verde' },
      { label: 'Marca', value: 'BIC Original' }
    ],
    images: [
      'https://images.unsplash.com/photo-1585336261026-7756f50b4e0d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-esc-16',
    name: 'Quadro Branco Magnético Dupla Face com Rodízios e Cortiça',
    code: 'ESC-QDM-16',
    category: 'escritorio',
    categoryName: 'Material de Escritório',
    brand: 'JPCT Office',
    price: 0,
    rating: 4.9,
    reviewsCount: 21,
    inStock: true,
    stockQuantity: 10,
    badge: 'Novo',
    description: 'Linha de quadros corporativos e pedagógicos: quadro branco magnético dupla face montado sobre suporte móvel em aço com 4 rodízios e travão, quadro de cortiça para avisos e flipchart. Rotação em 360º com bloqueio rápido de ângulo.',
    features: [
      'Dupla face magnética útil que duplica a área de anotações',
      'Base móvel com rodízios de borracha para deslocar entre salas',
      'Travões de bloqueio de rodízios que garantem firmeza ao escrever',
      'Calha porta-marcadores em alumínio incluída na base'
    ],
    specifications: [
      { label: 'Dimensões', value: '150 x 100 cm / 180 x 120 cm' },
      { label: 'Mobilidade', value: '4 Rodízios com sistema de travão' },
      { label: 'Estrutura', value: 'Aço carbono esmaltado cinzento' },
      { label: 'Modelos', value: 'Branco Magnético ou Cortiça Natural' }
    ],
    images: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-esc-17',
    name: 'Papel Fotocópia A4 80g (Caixa com 5 Resmas / 2.500 Fls)',
    code: 'PAP-A4-CX5',
    category: 'escritorio',
    categoryName: 'Material de Escritório',
    brand: 'Chamex / Navigator',
    price: 0,
    rating: 5.0,
    reviewsCount: 52,
    inStock: true,
    stockQuantity: 40,
    badge: 'Mais vendido',
    description: 'Caixa de 5 resmas de 500 folhas de papel branco formato A4, gramagem 80g/m². Excelente alvura e opacidade, concebido para fotocopiadoras de grande tiragem, impressoras laser e jato de tinta sem encravamentos.',
    features: [
      '5 Resmas de 500 folhas (Total: 2.500 folhas)',
      'Elevada brancura certificada (161 CIE)',
      'Sem encravamento em impressoras de alto volume',
      'Secagem rápida da tinta de impressora'
    ],
    specifications: [
      { label: 'Gramagem', value: '80 g/m²' },
      { label: 'Formato', value: 'A4 (210 x 297 mm)' },
      { label: 'Quantidade', value: 'Caixa com 5 Resmas (2.500 Folhas)' },
      { label: 'Compatibilidade', value: 'Laser, Jato de Tinta, Fotocopiadora' }
    ],
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    weeklyDeal: true,
    active: true,
  },
  {
    id: 'p-agr-18',
    name: 'Sementes Seleccionadas de Milho Híbrido (Saco 5kg)',
    code: 'AGR-MIL-18',
    category: 'agricultura',
    categoryName: 'Agricultura & Sementes',
    brand: 'Huíla Agro Pro',
    price: 0,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true,
    stockQuantity: 40,
    badge: 'Mais vendido',
    description: 'Sementes de milho híbrido tratadas para elevada produtividade e resistência à seca no planalto da Huíla (Lubango, Humpata, Chibia, Caconda). Alto rendimento por hectare garantido.',
    features: [
      'Germinação superior a 95% testada em laboratório',
      'Tratadas com fungicida e insecticida protector',
      'Ciclo médio de 115 a 125 dias até colheita',
      'Especialmente adaptado ao clima da província da Huíla'
    ],
    specifications: [
      { label: 'Peso', value: '5 kg' },
      { label: 'Germinação', value: '> 95%' },
      { label: 'Pureza', value: '99%' }
    ],
    images: [
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-liv-19',
    name: 'Dicionário Escolar da Língua Portuguesa',
    code: 'LIV-DIC-19',
    category: 'livros',
    categoryName: 'Livros & Literatura',
    brand: 'Porto Editora / Plural',
    price: 0,
    rating: 4.9,
    reviewsCount: 19,
    inStock: true,
    stockQuantity: 25,
    badge: 'Mais vendido',
    description: 'Dicionário completo e actualizado com mais de 45.000 entradas com definições claras, sinónimos, antónimos e guia gramatical prático para estudantes e profissionais no Lubango.',
    features: [
      'Mais de 45.000 entradas e vocábulos',
      'Exemplos contextualizados e regras gramaticais',
      'Capa resistente plastificada de longa durabilidade'
    ],
    specifications: [
      { label: 'Páginas', value: '896 páginas' },
      { label: 'Encadernação', value: 'Brochura com laminação mate' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  },
  {
    id: 'p-des-20',
    name: 'Bola de Futebol Oficial Tamanho 5 Costurada à Mão',
    code: 'DESP-BOL-20',
    category: 'bolas',
    categoryName: 'Bolas e Artigos Desportivos',
    brand: 'Champion Pro',
    price: 0,
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
    stockQuantity: 18,
    badge: 'Novo',
    description: 'Bola de futebol oficial de campo com construção de 32 gomos em couro sintético PU reforçado com excelente retenção de pressão para relva sintética, relva natural ou terra batida.',
    features: [
      'Construção em PU de alta resistência ao atrito',
      'Câmara de ar em butil de retenção prolongada',
      'Inclui agulha de enchimento de oferta'
    ],
    specifications: [
      { label: 'Tamanho', value: 'Oficial nº 5 (68-70 cm)' },
      { label: 'Peso', value: '410 - 450 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    weeklyDeal: false,
    active: true,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#JPCT-000124',
    createdAt: '2026-09-22T14:30:00Z',
    customer: {
      fullName: 'Dr. Manuel Agostinho Tchissola',
      phone: '+244 923 111 222',
      email: 'tchissola.adv@gmail.com',
      address: 'Rua Deolinda Rodrigues, Edifício Huíla Center, 2º Andar',
      neighborhood: 'Comercial',
      city: 'Lubango',
      province: 'Huíla',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Secretária Executiva
        quantity: 2,
      },
      {
        product: INITIAL_PRODUCTS[2], // Cadeira Mesh
        quantity: 2,
      },
      {
        product: INITIAL_PRODUCTS[1], // Armário Metálico
        quantity: 1,
      },
    ],
    subtotal: 0,
    deliveryMethod: 'lubango_express',
    deliveryCost: 0,
    discount: 0,
    total: 0,
    paymentMethod: 'bank_transfer',
    status: 'Em preparação',
  },
  {
    id: '#JPCT-000123',
    createdAt: '2026-09-20T10:15:00Z',
    customer: {
      fullName: 'Complexo Escolar Santa Teresinha',
      phone: '+244 942 333 444',
      email: 'direcao@santateresinha.ao',
      address: 'Bairro Lucrécia, próximo à Missão Católica',
      neighborhood: 'Lucrécia',
      city: 'Lubango',
      province: 'Huíla',
    },
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Carteiras Escolares
        quantity: 30,
      },
      {
        product: INITIAL_PRODUCTS[8], // Quadros Verdes
        quantity: 4,
      },
    ],
    subtotal: 0,
    deliveryMethod: 'lubango_express',
    deliveryCost: 0,
    discount: 0,
    total: 0,
    paymentMethod: 'bank_transfer',
    status: 'Confirmado',
  },
];
