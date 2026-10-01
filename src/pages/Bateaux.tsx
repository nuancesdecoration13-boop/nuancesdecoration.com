import CategoryPage from './CategoryPage';
import { drawNautical, drawWeave } from '../utils/canvasDrawing';
import RealisationsOutdoor from '../components/RealisationsOutdoor';

export default function Bateaux() {
  return (
    <CategoryPage
      title="Sellerie bateau"
      subtitle="Sellerie nautique sur mesure"
      description="Nous réalisons des projets de sellerie nautique entièrement sur mesure pour votre bateau : banquettes, coussins de cockpit, bains de soleil, couchages… Chaque réalisation est confectionnée dans notre atelier avec une large sélection de tissus techniques et étanches spécialement conçus pour résister aux conditions marines."
      features={[
        'Banquettes de bateau',
        'Coussins de cockpit',
        'Bains de soleil',
        'Couchages & matelas de cabine',
        'Mousses sur mesure',
        'Large sélection de tissus nautiques techniques',
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
