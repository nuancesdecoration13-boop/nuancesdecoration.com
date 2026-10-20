import { Link } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import { drawFolds, drawWeave } from '../utils/canvasDrawing';
import RealisationsGrid from '../components/RealisationsGrid';
import { rideauxGallery } from '../data/galleryItems';

export default function Rideaux() {
  return (
    <CategoryPage
      title="Rideaux"
      subtitle="Rideaux sur mesure"
      description="Nous confectionnons vos rideaux sur mesure, dans notre atelier. Tout commence par un rendez-vous, en showroom ou chez vous : nous choisissons ensemble le tissu, le tombé, les finitions et la doublure, thermique ou occultante. Nous prenons les mesures, réalisons la confection, puis assurons la pose."
      features={[
        'Confection sur mesure adaptée à vos dimensions',
        'Large choix de tissus haute qualité et matières nobles',
        'Conseils personnalisés pour le style et les finitions',
        'Doublures thermiques et occultantes disponibles',
        'Pose professionnelle et installation complète',
        'Service de retouches et d\'entretien',
      ]}
      heroDraw={(c) => drawFolds(c, '#C0A890', '#D8C8B4', '#A89070', 8)}
      heroImage={`${import.meta.env.BASE_URL}rideaux-hero.jpg`}
      hideFeatures
      heroActions={
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto text-center font-['MaisonNeue'] font-bold text-[12px] tracking-[2.5px] uppercase text-[var(--linen)] bg-[var(--moka)] border-none py-3 px-6 cursor-pointer no-underline transition-colors hover:bg-[var(--charcoal)]"
          >
            PRENDRE RENDEZ-VOUS
          </Link>
          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto text-center font-['MaisonNeue'] font-bold text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] bg-transparent border border-[var(--moka)] py-3 px-6 cursor-pointer no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
          >
            NOUS CONTACTER
          </Link>
        </div>
      }
      galleryDraws={[
        (c) => drawFolds(c, '#C8B4A0', '#D8C8B4', '#A89078', 6),
        (c) => drawFolds(c, '#B8A090', '#CCBCAC', '#988078', 7),
        (c) => drawWeave(c, '#C0A890', '#A08870'),
        (c) => drawFolds(c, '#D0C4B4', '#E0D8CC', '#B0A090', 5),
        (c) => drawFolds(c, '#A89888', '#C0B0A0', '#887868', 6),
        (c) => drawWeave(c, '#B0A090', '#907060'),
      ]}
      extraContent={
        <div>
          {/* Ce que vous découvrirez */}
          <section className="bg-[var(--linen)] px-8 md:px-12 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
                  Vos rideaux sur mesure
                </h2>
                <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="aspect-square relative overflow-hidden mb-6">
                    <img
                      src={`${import.meta.env.BASE_URL}500-references.jpg`}
                      alt="Plus de 500 références de tissus"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.1] mb-3">
                    1. Choisissez votre tissu
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Lin, velours, tweed, coton, doublures thermiques, occultants, outdoor... Trouvez la matière qui saura répondre à vos envies !
                  </p>
                </div>

                <div className="text-center">
                  <div className="aspect-square relative overflow-hidden mb-6">
                    <img
                      src={`${import.meta.env.BASE_URL}finissions.jpg`}
                      alt="De nombreuses finitions disponibles"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.1] mb-3">
                    2. Choisissez votre finition
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Wave, œillets, plis flamands, pince plate, galon fronceur... Chaque finition est réalisée avec soin pour correspondre au rendu souhaité.
                  </p>
                </div>

                <div className="text-center">
                  <div className="aspect-square relative overflow-hidden mb-6">
                    <img
                      src={`${import.meta.env.BASE_URL}supports.jpg`}
                      alt="Nos supports d'accroche"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.1] mb-3">
                    3. Choissisez votre support
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Tringle ou rails — chaque support est sélectionné pour sa robustesse et son harmonie avec le tissu et la finition choisis. Nous proposons une gamme complète en laiton, nickel satiné, noir ou blanc, brillant ou mat, pour un résultat cohérent du sol au plafond. Le détail qui fait toute la différence.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <RealisationsGrid items={rideauxGallery} />
        </div>
      }
    />
  );
}
