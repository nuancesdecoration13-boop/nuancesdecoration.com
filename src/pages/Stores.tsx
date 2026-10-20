import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { storesGallery } from '../data/galleryItems';

export default function Stores() {
  return (
    <CategoryPage
      title="Stores"
      subtitle="STORES SUR MESURE"
      description="Nous confectionnons vos stores bateaux sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble le tissu, le type de store, les finitions et le niveau d'occultation. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
      features={[
        'Stores bateau, romains et enrouleurs sur mesure',
        'Large gamme de tissus occultants et tamisant',
        'Mécanismes motorisés disponibles',
        'Finitions soignées et matières durables',
        'Pose professionnelle incluse',
        'Entretien et réparation assurés',
      ]}
      heroImage={`${import.meta.env.BASE_URL}img/realisations/stores/CCCA117B-5AF3-4F91-887A-839D0689FBB7_4_5005_c.jpeg`}
      heroAlt="Store bateau sur mesure en lin naturel au-dessus d'un évier de cuisine"
      heroDraw={(c) => drawWeave(c, '#B8A898', '#9A8878')}
      galleryDraws={[
        (c) => drawWeave(c, '#C0B0A0', '#A09080'),
        (c) => drawFolds(c, '#B0A090', '#C8B8A8', '#908070', 5),
        (c) => drawWeave(c, '#A89888', '#887868'),
        (c) => drawFolds(c, '#C8B8A8', '#D8CCC0', '#A8988A', 4),
        (c) => drawWeave(c, '#B8ACA0', '#988880'),
        (c) => drawFolds(c, '#A89888', '#C0B0A0', '#887868', 6),
      ]}
      extraContent={<RealisationsGrid items={storesGallery} />}
    />
  );
}
