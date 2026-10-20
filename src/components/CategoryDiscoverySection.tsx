export interface DiscoveryCard {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export default function CategoryDiscoverySection({
  title,
  cards,
}: {
  title: string;
  cards: DiscoveryCard[];
}) {
  return (
    <section className="bg-[var(--linen)] px-8 md:px-12 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
            {title}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="text-center">
              {card.image ? (
                <div className="aspect-square relative overflow-hidden mb-6">
                  <img
                    src={card.image}
                    alt={card.imageAlt ?? card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square relative overflow-hidden mb-6 bg-[var(--pale)] flex items-center justify-center">
                  <span className="font-['MaisonNeue'] font-light text-[12px] text-[var(--warm)]">
                    Contenu à définir
                  </span>
                </div>
              )}
              <h3 className="font-['FreeSerif'] font-black text-[22px] text-[var(--moka)] leading-[1.1] mb-3">
                {card.title}
              </h3>
              <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
