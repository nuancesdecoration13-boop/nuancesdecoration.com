import CategoryPage from './CategoryPage';
import { drawNautical, drawWeave } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { outdoorGallery } from '../data/galleryItems';

export default function BanquettesExterieurSurMesure() {
  return (
    <CategoryPage
      title="Outdoor"
      subtitle="BANQUETTES & COUSSINS D'EXTÉRIEUR"
      description="Nous confectionnons vos banquettes, coussins, bains de soleil et transats d'extérieur sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble les mousses et des tissus techniques traités pour l'extérieur, résistants aux UV et aux intempéries. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
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
      extraContent={<RealisationsGrid items={outdoorGallery} />}
    />
  );
}
