import CategoryPage from './CategoryPage';
import { drawNautical, drawWeave } from '../utils/canvasDrawing';
import RealisationsOutdoor from '../components/RealisationsOutdoor';

export default function BanquettesExterieurSurMesure() {
  return (
    <CategoryPage
      title="Outdoor"
      subtitle="BANQUETTES & COUSSINS D'EXTÉRIEUR"
      description="Nous confectionnons vos banquettes, coussins, bains de soleil et transats d'extérieur sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble les mousses et des tissus techniques traités pour l'extérieur, résistants aux UV et aux intempéries. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
      discoveryTitle="Vos banquettes & coussins d'extérieur sur mesure"
      discoveryCards={[
        { title: '1. Banquettes et coussins', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}naunces-181.jpg` },
        { title: '2. Bains de soleil et transats', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}naunces-182.jpg` },
        { title: '3. Tissus techniques extérieurs', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}IMG_1597.jpg` },
      ]}
      features={[
        'Banquettes d\'extérieur',
        'Coussins de salon de jardin',
        'Bains de soleil & transats',
        'Mousses sur mesure',
        'Large sélection de tissus traités pour l\'extérieur : résistants aux UV, intempéries, imperméables, étanches...',
        'Conseils personnalisés style et finitions',
      ]}
      heroImage={`${import.meta.env.BASE_URL}outdoor-cat.jpg`}
      heroDraw={drawNautical}
      galleryDraws={[
        drawNautical,
        (c) => drawWeave(c, '#8A9EA8', '#6B8090'),
        drawNautical,
        (c) => drawWeave(c, '#7A8E98', '#5B7080'),
        drawNautical,
        (c) => drawWeave(c, '#9AAEB8', '#7B90A0'),
      ]}
      extraContent={<RealisationsOutdoor />}
    />
  );
}
