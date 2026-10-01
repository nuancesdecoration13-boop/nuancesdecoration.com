import CategoryPage from './CategoryPage';
import { drawNautical } from '../utils/canvasDrawing';

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
      heroImage={`${import.meta.env.BASE_URL}Capture_d’écran_2026-10-01_à_09.48.32.png`}
      heroAlt="Sellerie bateau sur mesure – Nuances Décoration"
      heroDraw={drawNautical}
    />
  );
}
