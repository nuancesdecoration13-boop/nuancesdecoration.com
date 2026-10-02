import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsSection from '../components/RealisationsSection';

export default function Stores() {
  return (
    <CategoryPage
      title="Stores"
      subtitle="Store sur mesure"
      description="Nos stores sur mesure allient esthétique et performance. Du store bateau au store enrouleur, en passant par les stores romains et vénitiens, chaque modèle est conçu pour maîtriser la lumière et sublimer vos fenêtres avec élégance."
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
