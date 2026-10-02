import CategoryPage from './CategoryPage';
import { drawSheer, drawWeave } from '../utils/canvasDrawing';
import RealisationsSection from '../components/RealisationsSection';

export default function Voilages() {
  return (
    <CategoryPage
      title="Voilages"
      subtitle="Voilages sur mesure"
      description="Nos voilages apportent douceur et luminosité à vos espaces. Conçus pour filtrer délicatement la lumière naturelle tout en préservant votre intimité, ils créent une atmosphère aérienne et raffinée. Chaque voilage est confectionné avec des tissus légers et élégants, choisis pour leur capacité à sublimer la lumière."
      features={[
        'Tissus légers et transparents de haute qualité',
        'Filtration optimale de la lumière naturelle',
        'Protection de l\'intimité tout en laissant passer la clarté',
        'Confection adaptée aux grandes hauteurs sous plafond',
        'Finitions soignées et discrètes',
        'Entretien facile et durable',
      ]}
      heroImage={`${import.meta.env.BASE_URL}voilage-cat.jpg`}
      heroDraw={drawSheer}
      galleryDraws={[
        drawSheer,
        (c) => drawWeave(c, '#E8E4DC', '#D8D4CC'),
        drawSheer,
        (c) => drawWeave(c, '#F0ECE4', '#E0DCD4'),
        drawSheer,
        (c) => drawWeave(c, '#E4E0D8', '#D4D0C8'),
      ]}
      extraContent={
        <RealisationsSection
          media={[
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-177.jpg`, alt: 'Réalisation voilages' },
            { type: 'video', src: `${import.meta.env.BASE_URL}IMG_1595.MOV` },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-180.jpg`, alt: 'Réalisation voilages' },
            { type: 'video', src: `${import.meta.env.BASE_URL}IMG_1595.MOV`, alt: 'Réalisation voilages' },
            { type: 'image', src: `${import.meta.env.BASE_URL}IMG_1555.jpg`, alt: 'Réalisation voilages' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-198.jpg`, alt: 'Réalisation voilages' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-200.jpg`, alt: 'Réalisation voilages' },
            { type: 'image', src: `${import.meta.env.BASE_URL}naunces-192.jpg`, alt: 'Réalisation voilages' },
          ]}
          layout={['half', 'half', 'full', 'half', 'half', 'half', 'half', 'full']}
        />
      }
    />
  );
}
