import { Link } from 'react-router-dom';
import CategoryPage from './CategoryPage';


const steps = [
  {
    number: '1',
    label: 'Étude du projet',
    description: "Nous analysons vos plans, votre cahier des charges et vos contraintes d'usage.",
    image: `${import.meta.env.BASE_URL}conseil-domicile.jpg`,
  },
  {
    number: '2',
    label: 'Échantillons & devis',
    description: 'Nous vous proposons une sélection de tissus, dont des références non feu, et un devis détaillé.',
    image: `${import.meta.env.BASE_URL}500-references.jpg`,
  },
  {
    number: '3',
    label: "Confection à l'atelier",
    description: "Chaque pièce est fabriquée dans notre atelier, dans le respect de vos délais.",
    image: `${import.meta.env.BASE_URL}fabrication-locale.jpg`,
  },
  {
    number: '4',
    label: 'Pose sur site',
    description: "Notre équipe assure l'installation, en coordination avec vos équipes ou vos artisans.",
    image: `${import.meta.env.BASE_URL}pose-installation.jpg`,
  },
];

function WorkingMethod() {
  return (
    <section className="bg-[var(--grege-p)] pt-14 md:pt-20">
      <div className="px-4 md:px-12 mb-10 md:mb-12 text-center">
        <h2 className="font-['FreeSerif'] font-normal text-[30px] md:text-[40px] text-[var(--moka)] leading-[1.1]">
          Notre expertise pour vos projets
        </h2>
        <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto mt-5"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] px-0">
        {steps.map((step) => (
          <div key={step.number} className="bg-[var(--grege-p)] flex flex-col">
            <div className="relative overflow-hidden aspect-[2/3] md:aspect-[3/4]">
              <img
                src={step.image}
                alt={step.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(40,20,10,0.45)] to-transparent" />
            </div>
            <div className="px-4 py-5 md:py-8 flex flex-col flex-1 bg-[var(--grege-p)]">
              <div className="flex items-baseline gap-1.5 mb-2 md:mb-3">
                <span className="shrink-0 font-['FreeSerif'] font-black text-[24px] md:text-[30px] text-[var(--moka)] leading-none">
                  {step.number}.
                </span>
                <h3 className="min-w-0 font-['FreeSerif'] font-black text-[15px] md:text-[21px] text-[var(--moka)] leading-tight">
                  {step.label}
                </h3>
              </div>
              <div className="w-8 h-[1px] bg-[#A0716B] mb-3 md:mb-4"></div>
              <p className="font-['MaisonNeue'] font-light text-[11px] md:text-[12px] text-[var(--warm)] leading-[1.8] flex-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Professionnels() {
  return (
    <CategoryPage
      title="Professionnels"
      subtitle="PROJETS POUR PROFESSIONNELS"
      description="Architectes, décorateurs, hôtels, restaurants, chambres d'hôtes : nous vous accompagnons dans vos projets d'aménagement textile, de l'étude à la pose. Chaque pièce est confectionnée dans notre atelier, selon votre cahier des charges. Nous proposons une large sélection de tissus non feu (classés M1), adaptés aux établissements recevant du public."
      features={[]}
      heroDraw={() => undefined}
      heroImage={`${import.meta.env.BASE_URL}CAMENGO_KAURI-2-KAURI2-ambiance-kauri-bronze.jpg`}
      heroAlt="Rideau sur mesure en tissu uni dans un salon"
      heroObjectPosition="50% 75%"
      hideFeatures
      heroActions={
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto text-center font-['MaisonNeue'] font-bold text-[12px] tracking-[2.5px] uppercase text-[var(--linen)] bg-[var(--moka)] border-none py-3 px-6 cursor-pointer no-underline transition-colors hover:bg-[var(--charcoal)]"
          >
            NOUS CONTACTER
          </Link>
          <Link
            to="/contact"
            className="inline-block w-full sm:w-auto text-center font-['MaisonNeue'] font-bold text-[12px] tracking-[2.5px] uppercase text-[var(--moka)] bg-transparent border border-[var(--moka)] py-3 px-6 cursor-pointer no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
          >
            PRENDRE RENDEZ-VOUS
          </Link>
        </div>
      }
      extraContent={
        <div>
          <section className="bg-white px-8 md:px-12 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
                  Un service pour professionnels
                </h2>
                <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-4xl mx-auto">
                <div className="text-center flex flex-col">
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.2] mb-3 min-h-[54px] flex items-start justify-center">
                    Architectes & décorateurs
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Nous réalisons vos prescriptions avec précision : rideaux, voilages, banquettes d'intérieur ou d'extérieur.
                  </p>
                </div>
                <div className="text-center flex flex-col">
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.2] mb-3 min-h-[54px] flex items-start justify-center">
                    Hôtels & chambres d'hôtes
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Rideaux, voilages, têtes de lit et coussins en tissus non feu, pour chambres et pièces communes pensées dans le détail.
                  </p>
                </div>
                <div className="text-center flex flex-col">
                  <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.2] mb-3 min-h-[54px] flex items-start justify-center">
                    Restaurants & bars
                  </h3>
                  <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                    Banquettes, assises et coussins sur mesure en tissus non feu, pour l'intérieur comme pour l'extérieur.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <WorkingMethod />
        </div>
      }
    />
  );
}
