import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { indoorGallery } from '../data/galleryItems';

export default function Banquettes() {
  return (
    <CategoryPage
      title="Indoor"
      subtitle="BANQUETTES & COUSSINS D'INTÉRIEUR"
      description="Nous confectionnons vos banquettes, coussins et linge de maison sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble le tissu, la mousse, les dimensions et les finitions. Nous prenons les mesures, réalisons la confection, puis assurons la livraison et la pose."
      hideFeatures
      showHeroActions
      features={[
        'Conception sur mesure adaptée à vos espaces',
        'Sélection de tissus d\'ameublement haut de gamme',
        'Rembourrage de qualité pour un confort optimal',
        'Structures solides et durables',
        'Coussins et garnitures personnalisables',
        'Finitions soignées et détails artisanaux',
      ]}
      heroImage={`${import.meta.env.BASE_URL}img/realisations/rideaux/naunces_-_206.jpg`}
      heroAlt="Chambre avec coussins sur mesure en lin et velours, rideaux en lin et store bateau"
      heroObjectPosition="25% 80%"
      heroDraw={(c) => drawWeave(c, '#B0A090', '#907060')}
      galleryDraws={[
        (c) => drawWeave(c, '#B8A898', '#90786A'),
        (c) => drawFolds(c, '#A89888', '#C0B0A0', '#887868', 4),
        (c) => drawWeave(c, '#C0B0A0', '#A08870'),
        (c) => drawWeave(c, '#A0908', '#786058'),
        (c) => drawFolds(c, '#B0A090', '#C8B8A8', '#907868', 5),
        (c) => drawWeave(c, '#A8988', '#887068'),
      ]}
      extraContent={<RealisationsGrid items={indoorGallery} />}
    />
  );
}
