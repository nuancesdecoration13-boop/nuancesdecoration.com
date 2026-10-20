import CategoryPage from './CategoryPage';
import { drawNautical } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { bateauxGallery } from '../data/galleryItems';

export default function Bateaux() {
  return (
    <CategoryPage
      title="Sellerie bateau"
      subtitle="SELLERIE NAUTIQUE SUR MESURE"
      description="Nous réalisons la sellerie de votre bateau sur mesure, dans notre atelier : banquettes, coussins de cockpit, bains de soleil, couchages et matelas de cabine. Nous choisissons ensemble des tissus nautiques techniques, conçus pour résister au soleil, à l'eau et au sel. Nous prenons les mesures sur votre bateau, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
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
      extraContent={<RealisationsGrid items={bateauxGallery} />}
    />
  );
}
