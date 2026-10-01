export default function RealisationsIndoor() {
  const base = import.meta.env.BASE_URL;
  return (
    <section className="bg-white px-8 md:px-12 pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
            Nos réalisations
          </h2>
          <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
        </div>

        {/* Ligne 1 — deux portraits */}
        <div className="flex gap-4 items-stretch">
          <div className="flex-1">
            <img src={`${base}naunces-177.jpg`} alt="Réalisation indoor" className="w-full h-auto block" />
          </div>
          <div className="flex-1">
            <img src={`${base}naunces-189.jpg`} alt="Réalisation indoor" className="w-full h-auto block" />
          </div>
        </div>

        {/* Ligne 2 — deux portraits */}
        <div className="flex gap-4 mt-4 items-stretch">
          <div className="flex-1">
            <img src={`${base}naunces-202.jpg`} alt="Réalisation indoor" className="w-full h-auto block" />
          </div>
          <div className="flex-1">
            <img src={`${base}naunces-200.jpg`} alt="Réalisation indoor" className="w-full h-auto block" />
          </div>
        </div>
      </div>
    </section>
  );
}
