import type { GalleryItem } from '../data/galleryItems';
 
export default function RealisationsGrid({ items, after }: { items: GalleryItem[]; after?: React.ReactNode }) {
  if (items.length === 0) return null;
 
  return (
    <section className="bg-white px-8 md:px-12 pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['FreeSerif'] font-black text-[40px] text-[var(--moka)] leading-[1.1] mb-4">
            Nos réalisations
          </h2>
          <div className="w-12 h-[1px] bg-[var(--primary)] mx-auto"></div>
        </div>
 
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12">
          {items.map((item, index) => (
            <div key={index}>
              <div className="aspect-[3/4] overflow-hidden mb-3">
                <img
                  src={`${import.meta.env.BASE_URL}${item.image}`}
                  alt={item.alt ?? 'Réalisation'}
                  className="w-full h-full object-cover block"
                />
              </div>
              {item.reference && (
                <p className="font-['MaisonNeue'] font-bold text-[11px] md:text-[12px] tracking-[2px] uppercase text-[var(--moka)] leading-[1.4]">
                  {item.reference}
                </p>
              )}
              {item.finish && (
                <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.5] mt-1">
                  {item.finish}
                </p>
              )}
            </div>
          ))}
          {after}
        </div>
      </div>
    </section>
  );
}
