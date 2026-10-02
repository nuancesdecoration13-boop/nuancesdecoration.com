import CategoryPage from './CategoryPage';
import { drawFolds, drawWeave } from '../utils/canvasDrawing';
import RealisationsSection from '../components/RealisationsSection';

export default function Rideaux() {
  return (
    <CategoryPage
      title="Rideaux"
      subtitle="Rideaux sur mesure"
      description="Nos rideaux sur mesure allient élégance et fonctionnalité. Chaque pièce est conçue avec soin, en tenant compte de vos besoins en matière de lumière, d'intimité et d'esthétique. Notre vaste sélection de tissus nobles et notre savoir-faire artisanal garantissent des créations uniques qui sublimeront vos intérieurs."
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
                  Ce que vous découvrirez
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
                    Plus de 500 références de tissus
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
                    De nombreuses finitions disponibles
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
                    Nos supports d'accroche
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Tringle ou rails — chaque support est sélectionné pour sa robustesse et son harmonie avec le tissu et la finition choisis. Nous proposons une gamme complète en laiton, nickel satiné, noir ou blanc, brillant ou mat, pour un résultat cohérent du sol au plafond. Le détail qui fait toute la différence.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <RealisationsSection
            media={[
              { type: 'image', src: `${import.meta.env.BASE_URL}naunces-177.jpg`, alt: 'Réalisation rideaux' },
              { type: 'video', src: `${import.meta.env.BASE_URL}IMG_1595.MOV` },
              { type: 'image', src: `${import.meta.env.BASE_URL}naunces-180.jpg`, alt: 'Réalisation rideaux' },
              { type: 'video', src: `${import.meta.env.BASE_URL}IMG_1595.MOV`, alt: 'Réalisation rideaux' },
              { type: 'image', src: `${import.meta.env.BASE_URL}IMG_1555.jpg`, alt: 'Réalisation rideaux' },
              { type: 'image', src: `${import.meta.env.BASE_URL}naunces-198.jpg`, alt: 'Réalisation rideaux' },
              { type: 'image', src: `${import.meta.env.BASE_URL}naunces-200.jpg`, alt: 'Réalisation rideaux' },
              { type: 'image', src: `${import.meta.env.BASE_URL}naunces-192.jpg`, alt: 'Réalisation rideaux' },
            ]}
            layout={['half', 'half', 'full', 'half', 'half', 'half', 'half', 'full']}
          />
        </div>
      }
    />
  );
}
