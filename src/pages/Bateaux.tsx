import CategoryPage from './CategoryPage';
import { drawNautical } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { bateauxGallery } from '../data/galleryItems';

export default function Bateaux() {
  return (
    <CategoryPage
      title="Sellerie bateau"
      subtitle="SELLERIE NAUTIQUE SUR MESURE"
      h1Suffix="sur mesure"
      seoTitle="Sellerie bateau sur mesure à Marseille — Nuances Décoration"
      seoDescription="Sellerie bateau sur mesure : banquettes de cockpit, bains de soleil, couchages et matelas de cabine. Confection dans notre atelier à Marseille."
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
      heroImage={`${import.meta.env.BASE_URL}img/realisations/bateaux/naunces_-_203.jpg`}
      heroAlt="Sellerie bateau sur mesure – Nuances Décoration"
      heroDraw={drawNautical}
      extraContent={<RealisationsGrid items={bateauxGallery} />}
    />
  );
}
