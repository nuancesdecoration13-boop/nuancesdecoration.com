import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsSection from '../components/RealisationsSection';

export default function Stores() {
  return (
    <CategoryPage
      title="Stores"
      subtitle="STORES SUR MESURE"
      description="Nous confectionnons vos stores bateaux et stores romains sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble le tissu, le type de store, les finitions et le niveau d'occultation. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
      discoveryTitle="Vos stores sur mesure"
      discoveryCards={[
        { title: '1. Stores bateau et romains', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}naunces-172.jpg` },
        { title: '2. Tissus et occultation', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}naunces-178.jpg` },
        { title: '3. Finitions sur mesure', description: 'Contenu à définir', image: `${import.meta.env.BASE_URL}naunces-179.jpg` },
      ]}
      features={[
        'Stores bateau, romains et enrouleurs sur mesure',
        'Large gamme de tissus occultants et tamisant',
        'Mécanismes motorisés disponibles',
        'Finitions soignées et matières durables',
        'Pose professionnelle incluse',
        'Entretien et réparation assurés',
      ]}
      heroImage={`${import.meta.env.BASE_URL}stores-cat.jpg`}
      heroDraw={(c) => drawWeave(c, '#B8A898', '#9A8878')}
      galleryDraws={[
        (c) => drawWeave(c, '#C0B0A0', '#A09080'),
        (c) => drawFolds(c, '#B0A090', '#C8B8A8', '#908070', 5),
        (c) => drawWeave(c, '#A89888', '#887868'),
        (c) => drawFolds(c, '#C8B8A8', '#D8CCC0', '#A8988A', 4),
        (c) => drawWeave(c, '#B8ACA0', '#988880'),
        (c) => drawFolds(c, '#A89888', '#C0B0A0', '#887868', 6),
      ]}
      extraContent={
        <RealisationsSection
          media={[
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-172.jpg`, alt: 'Réalisation stores' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-178.jpg`, alt: 'Réalisation stores' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-179.jpg`, alt: 'Réalisation stores' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-193.jpg`, alt: 'Réalisation stores' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-196.jpg`, alt: 'Réalisation stores' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-195.jpg`, alt: 'Réalisation stores' },
          ]}
          layout={['half', 'half', 'full', 'full', 'half', 'half']}
        />
      }
    />
  );
}
