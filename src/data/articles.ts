export type ArticleCategory =
  | 'Conseils rideaux'
  | 'Conseils banquette'
  | 'Matières et tissus'
  | 'Tendance';

export type ArticleBodyBlock =
  | { type: 'heading'; id: string; content: string }
  | { type: 'paragraph'; content: string }
  | { type: 'definition'; word: string; content: string }
  | { type: 'quote'; content: string; signature: string }
  | { type: 'comparison'; headers: string[]; rows: string[][] }
  | { type: 'advice'; content: string }
  | { type: 'service'; image: string; title: string; categoryLink: string; content: string };

export interface Article {
  title: string;
  slug: string;
  category: ArticleCategory;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  imageCaption: string;
  body: ArticleBodyBlock[];
  tags: string[];
  relatedArticles: string[];
  status: 'brouillon' | 'publié';
}

const image = (name: string) => `${import.meta.env.BASE_URL}${name}`;

export const articles: Article[] = [
  {
    title: 'Lin, coton, velours : choisir le tissu de ses rideaux selon la lumière',
    slug: 'choisir-tissu-rideaux-selon-lumiere',
    status: 'publié',
    category: 'Matières et tissus',
    excerpt: 'Une pièce au nord ne s’habille pas comme un séjour plein sud. L’exposition, l’usage de la pièce et le tombé recherché guident le choix de la matière.',
    date: '14 octobre 2026',
    readingTime: '8 min de lecture',
    image: image('rideaux-hero.jpg'),
    imageCaption: 'Rideaux en lin lavé, tête à plis flamands. Réalisation de l’atelier, Marseille.',
    body: [
      { type: 'heading', id: 'commencer-par-la-lumiere', content: 'Commencer par la lumière' },
      { type: 'paragraph', content: 'Lors d’une première visite, nous regardons la fenêtre avant de regarder les échantillons. Son orientation, les heures où le soleil entre, ce qui se passe dans la pièce à ce moment-là. Une chambre demande du noir le matin. Un séjour plein sud demande de filtrer sans éteindre. Une pièce au nord demande au contraire de laisser passer chaque rayon.' },
      { type: 'paragraph', content: 'Ces trois besoins appellent trois familles de tissus. Le reste, couleur, motif, tête de rideau, vient ensuite.' },
      { type: 'heading', id: 'lin-lumiere-filtree', content: 'Le lin, la lumière filtrée' },
      { type: 'paragraph', content: 'Le lin laisse passer une lumière douce, légèrement grainée par l’irrégularité du fil. Son tombé est souple et vivant : il bouge avec l’air et garde un froissé naturel que beaucoup recherchent. C’est la matière des pièces de vie claires et des fenêtres que l’on ne ferme jamais tout à fait.' },
      { type: 'paragraph', content: 'Deux points de vigilance. Le lin non prélavé peut rétrécir au premier lavage : nous travaillons le plus souvent un lin lavé, stable. Et sous un soleil direct et quotidien, la couleur peut évoluer naturellement.' },
      { type: 'definition', word: 'Laize', content: 'Largeur utile d’un tissu, mesurée d’une lisière à l’autre. Elle détermine le nombre de raccords et la quantité nécessaire pour un projet.' },
      { type: 'heading', id: 'coton-tenue', content: 'Le coton, la tenue' },
      { type: 'paragraph', content: 'Le coton offre une main plus régulière et une tenue souvent plus nette. Il existe dans des poids très différents, du voile léger au coton d’ameublement qui structure vraiment une pièce.' },
      { type: 'quote', content: 'Un beau rideau ne doit pas seulement habiller la fenêtre. Il doit trouver sa place dans la lumière de la pièce.', signature: 'L’équipe Nuances Décoration' },
      { type: 'heading', id: 'velours-calme', content: 'Le velours, le calme' },
      { type: 'paragraph', content: 'Dense, enveloppant et naturellement isolant, le velours apporte une présence immédiate. Il absorbe une partie de la lumière et du son. Nous le conseillons dans les chambres, les salons et les pièces où l’on cherche une sensation plus feutrée.' },
      { type: 'comparison', headers: ['Matière', 'Lumière', 'Tombé'], rows: [['Lin', 'Douce et filtrée', 'Souple, vivant'], ['Coton', 'Variable selon le poids', 'Régulier, net'], ['Velours', 'Feutrée, tamisée', 'Dense, enveloppant']] },
      { type: 'advice', content: 'Apportez toujours une photo de votre pièce, prise à plusieurs heures de la journée. La couleur et la transparence d’un tissu se lisent avec votre lumière, jamais sur un échantillon isolé.' },
      { type: 'service', image: image('conseil-domicile.jpg'), title: 'Rideaux et voilages sur mesure', categoryLink: '/realisations/rideaux', content: 'Échantillons, conseil à domicile, confection et pose : nous vous accompagnons de la première idée à la dernière finition.' },
    ],
    tags: ['Lin', 'Rideaux', 'Lumière', 'Tissus'],
    relatedArticles: ['comprendre-laize-tissu', 'voilage-ou-store-bateau', 'entretenir-rideaux-lin'],
  },
  {
    title: 'Prendre ses mesures avant un rideau sur mesure : la méthode de l’équipe',
    slug: 'prendre-mesures-rideau-sur-mesure',
    status: 'publié',
    category: 'Conseils rideaux',
    excerpt: 'Largeur de tringle, hauteur sous plafond, retour au mur. Les cotes que nous relevons à chaque visite, et pourquoi elles comptent.',
    date: '8 octobre 2026',
    readingTime: '6 min de lecture',
    image: image('prise-mesure.jpg'),
    imageCaption: 'Photo · mètre ruban sur tringle',
    body: [
      { type: 'heading', id: 'mesurer-sans-se-tromper', content: 'Mesurer sans se tromper' },
      { type: 'paragraph', content: 'Avant de choisir un tissu, il faut comprendre la fenêtre, la tringle et l’espace autour. Une mesure prise au bon endroit évite les mauvaises surprises et permet au rideau de tomber comme prévu.' },
      { type: 'heading', id: 'les-trois-cotes', content: 'Les trois cotes essentielles' },
      { type: 'paragraph', content: 'Nous relevons la largeur de la tringle, la hauteur finie souhaitée et le retour éventuel au mur. Nous vérifions aussi les radiateurs, les poignées et les obstacles qui peuvent modifier la confection.' },
      { type: 'advice', content: 'Ne mesurez pas seulement la fenêtre. Mesurez le système qui portera le rideau et prévoyez le dégagement nécessaire pour que le tissu puisse vivre autour de l’ouverture.' },
    ],
    tags: ['Mesures', 'Rideaux', 'Projet sur mesure'],
    relatedArticles: ['choisir-tissu-rideaux-selon-lumiere', 'voilage-ou-store-bateau', 'comprendre-laize-tissu'],
  },
  {
    title: 'Quelle mousse choisir pour une banquette sur mesure',
    slug: 'choisir-mousse-banquette-sur-mesure',
    status: 'publié',
    category: 'Conseils banquette',
    excerpt: 'Densité, portance, épaisseur : comment l’assise se décide selon l’usage, le repas, la lecture ou la sieste.',
    date: '1 octobre 2026',
    readingTime: '6 min de lecture',
    image: image('finissions.jpg'),
    imageCaption: 'Photo · coupe de mousse à l’atelier',
    body: [
      { type: 'heading', id: 'une-mousse-pour-chaque-usage', content: 'Une mousse pour chaque usage' },
      { type: 'paragraph', content: 'Une banquette de repas n’a pas les mêmes besoins qu’une assise de lecture. La densité et la portance se choisissent ensemble, en fonction du temps passé assis et du confort recherché.' },
      { type: 'heading', id: 'penser-la-housse', content: 'Penser la housse dès le départ' },
      { type: 'paragraph', content: 'Le tissu, les coutures, les angles et la possibilité de retirer la housse font partie du projet. Une belle banquette est confortable, mais aussi simple à vivre au quotidien.' },
      { type: 'service', image: image('fabrication-locale.jpg'), title: 'Banquettes et assises sur mesure', categoryLink: '/realisations/banquettes', content: 'Nous dessinons et confectionnons des assises adaptées à vos usages, à vos dimensions et à votre intérieur.' },
    ],
    tags: ['Banquette', 'Mousse', 'Confection'],
    relatedArticles: ['banquette-dans-une-niche', 'choisir-tissu-rideaux-selon-lumiere', 'prendre-mesures-rideau-sur-mesure'],
  },
  {
    title: 'Les tons terre s’invitent aux fenêtres cet automne',
    slug: 'tons-terre-fenetres-automne',
    status: 'publié',
    category: 'Tendance',
    excerpt: 'Ocre, argile, tabac : des couleurs chaudes qui s’accordent à la lumière du Sud et aux intérieurs clairs.',
    date: '24 septembre 2026',
    readingTime: '4 min de lecture',
    image: image('HISTOIRE_HOME.jpg'),
    imageCaption: 'Photo · nuancier de tissus',
    body: [
      { type: 'heading', id: 'une-palette-chaleureuse', content: 'Une palette chaleureuse' },
      { type: 'paragraph', content: 'Les tons terre réchauffent une pièce sans l’alourdir. Ocre, argile et tabac peuvent se glisser par petites touches ou habiller une fenêtre entière, selon la lumière et les matières déjà présentes.' },
      { type: 'quote', content: 'La bonne couleur est celle qui reste juste quand la lumière change.', signature: 'L’équipe Nuances Décoration' },
    ],
    tags: ['Couleurs', 'Tendance', 'Tissus'],
    relatedArticles: ['choisir-tissu-rideaux-selon-lumiere', 'comprendre-laize-tissu', 'entretenir-rideaux-lin'],
  },
  {
    title: 'Voilage ou store bateau pour une fenêtre exposée plein sud',
    slug: 'voilage-ou-store-bateau',
    status: 'publié',
    category: 'Conseils rideaux',
    excerpt: 'Filtrer la lumière sans assombrir la pièce : ce que chaque solution apporte, et les tissus qui supportent le soleil.',
    date: '17 septembre 2026',
    readingTime: '5 min de lecture',
    image: image('voilages-home.jpg'),
    imageCaption: 'Photo · store bateau, lumière filtrée',
    body: [
      { type: 'heading', id: 'filtrer-la-lumiere', content: 'Filtrer la lumière' },
      { type: 'paragraph', content: 'Plein sud, une fenêtre demande une solution qui protège sans priver la pièce de sa clarté. Le voilage diffuse les rayons tandis que le store bateau donne une lecture plus architecturée.' },
      { type: 'heading', id: 'choisir-selon-la-piece', content: 'Choisir selon la pièce' },
      { type: 'paragraph', content: 'Dans un séjour, nous pouvons superposer les deux. Dans une cuisine ou une petite chambre, un store bien proportionné apporte une réponse plus légère et facile à utiliser.' },
    ],
    tags: ['Voilage', 'Store bateau', 'Lumière'],
    relatedArticles: ['choisir-tissu-rideaux-selon-lumiere', 'tons-terre-fenetres-automne', 'prendre-mesures-rideau-sur-mesure'],
  },
  {
    title: 'Comprendre la laize d’un tissu avant de commander',
    slug: 'comprendre-laize-tissu',
    status: 'publié',
    category: 'Matières et tissus',
    excerpt: 'La laize, c’est la largeur utile du tissu. Elle décide du nombre de lés, des raccords de motif et, au final, du métrage.',
    date: '10 septembre 2026',
    readingTime: '4 min de lecture',
    image: image('500-references.jpg'),
    imageCaption: 'Photo · rouleaux de tissu',
    body: [
      { type: 'heading', id: 'la-largeur-utile', content: 'La largeur utile' },
      { type: 'paragraph', content: 'La laize correspond à la largeur disponible entre les deux lisières. Elle conditionne la façon dont un tissu sera utilisé, notamment pour les rideaux, les coussins et les grandes pièces.' },
      { type: 'definition', word: 'Raccord', content: 'Répétition d’un motif dans la largeur ou la hauteur du tissu. Plus le raccord est grand, plus il faut anticiper la quantité nécessaire.' },
      { type: 'advice', content: 'Demandez toujours la laize et le raccord avant de valider un tissu. Ces deux informations permettent d’établir un métrage fiable.' },
    ],
    tags: ['Laize', 'Tissus', 'Métrage'],
    relatedArticles: ['choisir-tissu-rideaux-selon-lumiere', 'voilage-ou-store-bateau', 'tons-terre-fenetres-automne'],
  },
  {
    title: 'Une banquette dans une niche : assise, dossier et housse déhoussable',
    slug: 'banquette-dans-une-niche',
    status: 'publié',
    category: 'Conseils banquette',
    excerpt: 'Les trois choix qui font une banquette confortable et facile à vivre, de la prise de mesures à la pose.',
    date: '3 septembre 2026',
    readingTime: '5 min de lecture',
    image: image('outdoor-home.jpg'),
    imageCaption: 'Photo · banquette en niche',
    body: [
      { type: 'heading', id: 'dessiner-lassise', content: 'Dessiner l’assise' },
      { type: 'paragraph', content: 'Une niche donne un cadre précis au projet. Nous partons de la profondeur disponible, de la hauteur de l’assise et de l’usage de la pièce pour trouver des proportions confortables.' },
      { type: 'heading', id: 'une-housse-facile-a-vivre', content: 'Une housse facile à vivre' },
      { type: 'paragraph', content: 'Une housse déhoussable permet d’entretenir la banquette et de la faire évoluer. Les finitions sont pensées avec l’usage, les angles et les contraintes de la niche.' },
    ],
    tags: ['Banquette', 'Niche', 'Housse'],
    relatedArticles: ['choisir-mousse-banquette-sur-mesure', 'prendre-mesures-rideau-sur-mesure', 'choisir-tissu-rideaux-selon-lumiere'],
  },
  {
    title: 'Entretenir des rideaux en lin sans les abîmer',
    slug: 'entretenir-rideaux-lin',
    status: 'publié',
    category: 'Matières et tissus',
    excerpt: 'Les gestes simples pour conserver la souplesse, le tombé et la lumière d’un lin lavé au fil des saisons.',
    date: '27 août 2026',
    readingTime: '5 min de lecture',
    image: image('linge_maison.jpg'),
    imageCaption: 'Photo · lin lavé, plis souples',
    body: [
      { type: 'heading', id: 'les-bons-gestes', content: 'Les bons gestes' },
      { type: 'paragraph', content: 'Le lin aime les gestes doux. Un dépoussiérage régulier, une aération et un lavage adapté permettent de préserver son tombé et sa main naturelle.' },
      { type: 'heading', id: 'avant-le-lavage', content: 'Avant le lavage' },
      { type: 'paragraph', content: 'Vérifiez toujours l’étiquette d’entretien et les recommandations de l’atelier. Certains rideaux doublés ou confectionnés avec des finitions particulières demandent un nettoyage professionnel.' },
      { type: 'advice', content: 'Ne repassez pas systématiquement le lin. Son léger froissé fait partie de son charme et un séchage soigné suffit souvent à retrouver un tombé élégant.' },
    ],
    tags: ['Lin', 'Entretien', 'Rideaux'],
    relatedArticles: ['choisir-tissu-rideaux-selon-lumiere', 'comprendre-laize-tissu', 'voilage-ou-store-bateau'],
  },
];

export const articleCategories = ['Tout', 'Conseils rideaux', 'Conseils banquette', 'Matières et tissus', 'Tendance'] as const;

export function getArticle(slug: string, includeDrafts = false) {
  return articles.find((article) => article.slug === slug && (includeDrafts || article.status === 'publié'));
}
