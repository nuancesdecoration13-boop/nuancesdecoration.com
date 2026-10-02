import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsIndoor from '../components/RealisationsIndoor';

export default function Banquettes() {
  return (
    <CategoryPage
      title="Indoor"
      subtitle="Décoration d'intérieur sur mesure"
      description="Nos banquettes et assises sur mesure transforment chaque coin de votre intérieur en espace de confort et d'élégance. Créées avec des matériaux nobles et un rembourrage de qualité supérieure, elles allient esthétique raffinée et durabilité. Chaque pièce est unique, pensée pour s'intégrer harmonieusement à votre décoration."
      features={[
        'Conception sur mesure adaptée à vos espaces',
        'Sélection de tissus d\'ameublement haut de gamme',
        'Rembourrage de qualité pour un confort optimal',
        'Structures solides et durables',
        'Coussins et garnitures personnalisables',
        'Finitions soignées et détails artisanaux',
      ]}
      heroImage={`${import.meta.env.BASE_URL}indoor-cat.jpg`}
      heroDraw={(c) => drawWeave(c, '#B0A090', '#907060')}
      galleryDraws={[
        (c) => drawWeave(c, '#B8A898', '#90786A'),
        (c) => drawFolds(c, '#A89888', '#C0B0A0', '#887868', 4),
        (c) => drawWeave(c, '#C0B0A0', '#A08870'),
        (c) => drawWeave(c, '#A0908', '#786058'),
        (c) => drawFolds(c, '#B0A090', '#C8B8A8', '#907868', 5),
        (c) => drawWeave(c, '#A8988', '#887068'),
      ]}
      extraContent={<RealisationsIndoor />}
    />
  );
}
