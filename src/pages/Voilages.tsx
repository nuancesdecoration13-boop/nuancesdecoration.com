import CategoryPage from './CategoryPage';
import { drawSheer, drawWeave } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { voilagesGallery } from '../data/galleryItems';

export default function Voilages() {
  return (
    <CategoryPage
      title="Voilages"
      subtitle="VOILAGES SUR MESURE"
      description="Nous confectionnons vos voilages sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble la matière, la transparence, le tombé et les finitions. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
      discoveryTitle="Vos voilages sur mesure"
      discoveryCards={[
        { title: '1. Choisissez votre tissu', description: 'Lin, velours, tweed, coton, doublures thermiques, occultants, outdoor... Trouvez la matière qui saura répondre à vos envies !', image: `${import.meta.env.BASE_URL}500-references.jpg` },
        { title: '2. Choisissez votre finition', description: 'Wave, œillets, plis flamands, pince plate, galon fronceur... Chaque finition est réalisée avec soin pour correspondre au rendu souhaité.', image: `${import.meta.env.BASE_URL}finissions.jpg` },
        { title: '3. Choissisez votre support', description: 'Tringle ou rails — chaque support est sélectionné pour sa robustesse et son harmonie avec le tissu et la finition choisis. Nous proposons une gamme complète en laiton, nickel satiné, noir ou blanc, brillant ou mat, pour un résultat cohérent du sol au plafond. Le détail qui fait toute la différence.', image: `${import.meta.env.BASE_URL}supports.jpg` },
      ]}
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
      extraContent={<RealisationsGrid items={voilagesGallery} />}
    />
  );
}
