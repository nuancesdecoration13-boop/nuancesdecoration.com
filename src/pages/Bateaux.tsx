import CategoryPage from './CategoryPage';
import { drawNautical } from '../utils/canvasDrawing';
import RealisationsSection from '../components/RealisationsSection';

export default function Bateaux() {
  return (
    <CategoryPage
      title="Sellerie bateau"
      subtitle="SELLERIE NAUTIQUE SUR MESURE"
      description="Nous réalisons la sellerie de votre bateau sur mesure, dans notre atelier : banquettes, coussins de cockpit, bains de soleil, couchages et matelas de cabine. Nous choisissons ensemble des tissus nautiques techniques, conçus pour résister au soleil, à l'eau et au sel. Nous prenons les mesures sur votre bateau, réalisons la confection, puis assurons la pose."
      hideFeatures
      showHeroActions
      discoveryTitle="Votre sellerie bateau sur mesure"
      discoveryCards={[
        { title: '1. Banquettes de bateau', description: 'Contenu à définir' },
        { title: '2. Coussins de cockpit', description: 'Contenu à définir' },
        { title: '3. Bains de soleil', description: 'Contenu à définir' },
      ]}
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
      extraContent={<RealisationsSection />}
    />
  );
}
