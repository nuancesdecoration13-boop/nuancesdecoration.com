import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const storeTypes = [
  {
    title: 'STORES BATEAUX',
    text: "Il suffit de tirer sur un cordon pour que le tissu remonte en plis plats et réguliers, tenus par des baguettes cousues au dos. Le store habille la fenêtre sans être encombrant. Il peut être en lin, en coton, en voilage ou en tissu occultant, doublé ou non.",
    illustration: `${import.meta.env.BASE_URL}images/store-bateau.svg`,
    alt: "Illustration d'un store bateau",
  },
  {
    title: 'STORES ENROULEURS',
    text: "Il se compose d'une seule toile tendue qui s'enroule autour d'un tube, en haut de la fenêtre. La ligne est nette et le store prend peu de place. Il convient bien aux cuisines, aux salles de bain comme aux autres pièces. Il existe en toile tamisante ou occultante.",
    illustration: `${import.meta.env.BASE_URL}images/store-enrouleur.svg`,
    alt: "Illustration d'un store enrouleur",
  },
  {
    title: 'PANNEAUX JAPONAIS',
    text: 'De larges panneaux de tissu verticaux qui coulissent sur un rail, sans plis, grâce à une barre de lestage qui les garde bien tendus. Ils habillent une baie vitrée, séparent des espaces ou cachent un rangement. Disponibles en voilage léger ou en tissu occultant.',
    illustration: `${import.meta.env.BASE_URL}images/panneaux-japonais.svg`,
    alt: 'Illustration de panneaux japonais',
  },
] as const;

export default function StoresTypesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedType = storeTypes[selectedIndex];

  return (
    <section className="bg-[var(--linen)] px-8 py-16 md:px-16 md:py-20">
      <div className="mb-12">
        <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
          Nos types de stores
        </h2>
        <div className="w-12 h-[1px] bg-[#A0716B]"></div>
      </div>

      <div className="hidden md:grid md:grid-cols-[minmax(220px,360px)_minmax(0,1fr)_260px] md:items-center md:gap-16">
        <div>
          {storeTypes.map((storeType, index) => (
            <button
              key={storeType.title}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex w-full items-center justify-between border-b border-[rgba(160,113,107,0.35)] py-5 text-left font-['DM_Sans'] text-[13px] tracking-[0.15em] transition-colors ${index === selectedIndex ? 'text-[#3E2416]' : 'text-[#9a8a82] hover:text-[#3E2416]'}`}
            >
              {storeType.title}
              <span aria-hidden="true" className="font-light text-[25px] leading-none">›</span>
            </button>
          ))}
        </div>

        <div key={selectedType.title} className="animate-[fadeUp_0.35s_ease_both]">
          <p className="max-w-[500px] font-['DM_Sans'] text-[15px] leading-[1.8] text-[#1D1D1B]">
            {selectedType.text}
          </p>
        </div>

        <div key={`${selectedType.title}-illustration`} className="flex justify-center animate-[fadeUp_0.35s_ease_both]">
          <img src={selectedType.illustration} alt={selectedType.alt} className="w-[220px]" />
        </div>
      </div>

      <div className="md:hidden">
        {storeTypes.map((storeType, index) => {
          const isOpen = index === selectedIndex;
          return (
            <div key={storeType.title} className="border-b border-[rgba(160,113,107,0.35)]">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between py-5 text-left font-['DM_Sans'] text-[12px] tracking-[0.15em] transition-colors ${isOpen ? 'text-[#3E2416]' : 'text-[#9a8a82]'}`}
              >
                {storeType.title}
                <ChevronDown size={17} strokeWidth={1.5} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="pb-7 animate-[fadeUp_0.35s_ease_both]">
                  <img src={storeType.illustration} alt={storeType.alt} className="mx-auto mb-6 w-[140px]" />
                  <p className="font-['DM_Sans'] text-[14px] leading-[1.8] text-[#1D1D1B]">
                    {storeType.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
