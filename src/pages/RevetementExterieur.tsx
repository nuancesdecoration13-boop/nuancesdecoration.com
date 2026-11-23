import CategoryPage from './CategoryPage';
import { drawWeave, drawFolds } from '../utils/canvasDrawing';
import RealisationsOutdoor from '../components/RealisationsOutdoor';

export default function RevetementExterieur() {
  return (
    <CategoryPage
      title="Revêtement Extérieur"
      subtitle="Terrasses & espaces extérieurs"
      description="Nos revêtements extérieurs allient résistance et élégance pour vos espaces en plein air. Traités contre les UV, l'humidité et les intempéries, nos matériaux sélectionnés habillent terrasses, pergolas et façades avec un style affirmé et une longévité garantie."
      features={[
        'Matériaux traités UV et résistants aux intempéries',
        'Revêtements de sol pour terrasses et extérieurs',
        'Stores et brise-soleil extérieurs motorisables',
        'Tentes et pergolas sur mesure',
        'Pose et installation par nos équipes',
        'Entretien et garantie inclus',
      ]}
      heroDraw={(c) => drawWeave(c, '#9EA898', '#808A80')}
      galleryDraws={[
        (c) => drawWeave(c, '#A8B0A4', '#888E84'),
        (c) => drawFolds(c, '#9EA898', '#B4BEB0', '#808A7A', 5),
        (c) => drawWeave(c, '#96A090', '#788070'),
        (c) => drawFolds(c, '#B0B8AC', '#C4CCBF', '#909890', 4),
        (c) => drawWeave(c, '#A4ACA0', '#848C80'),
        (c) => drawFolds(c, '#9CA498', '#B0B8AC', '#7C8478', 6),
      ]}
      extraContent={<RealisationsOutdoor />}
    />
  );
}
