function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover block"
    />
  );
}

export default function RealisationsOutdoor() {
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
        <div className="grid grid-cols-2 gap-3 aspect-[3/2]">
          <div className="h-full overflow-hidden">
            <Img src={`${base}naunces-181.jpg`} alt="Réalisation outdoor" />
          </div>
          <div className="h-full overflow-hidden">
            <Img src={`${base}naunces-182.jpg`} alt="Réalisation outdoor" />
          </div>
        </div>

        {/* Ligne 2 — portrait à gauche + deux paysages empilés à droite, même hauteur totale */}
        <div className="flex gap-3 mt-3 aspect-[3/2]">
          <div className="flex-1 overflow-hidden">
            <Img src={`${base}IMG_1597.jpg`} alt="Réalisation outdoor" />
          </div>
          <div className="grid grid-rows-2 gap-3 flex-1">
            <div className="h-full overflow-hidden">
              <Img src={`${base}IMG_1594.jpg`} alt="Réalisation outdoor" />
            </div>
            <div className="h-full overflow-hidden">
              <Img src={`${base}IMG_1596.jpg`} alt="Réalisation outdoor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
