import { Link } from 'react-router-dom';

export default function CollectionMaisonPromo() {
  return (
    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 items-start">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}collection-maison-plaids.jpg`}
          alt="Trois plaids à franges suspendus : motif ondulé terracotta, motif ondulé vert olive et motif zébré camel"
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center 35%' }}
          loading="lazy"
        />
      </div>
      <div className="sm:aspect-[3/4] bg-[var(--linen)] px-6 py-10 md:px-9 flex flex-col justify-center gap-4">
        <p className="font-['MaisonNeue'] font-thin text-[10px] tracking-[4px] uppercase text-[var(--primary)] m-0">
          Plaids, coussins, dessus de lit, trousses
        </p>
        <h2 className="font-['FreeSerif'] font-black text-[28px] md:text-[34px] leading-[1.05] text-[var(--moka)] m-0">
          Notre collection maison
        </h2>
        <span aria-hidden="true" className="w-12 h-px bg-[var(--primary)]" />
        <p className="font-['MaisonNeue'] font-light text-[13px] leading-[1.8] text-[var(--warm)] m-0">
          Des pièces choisies et confectionnées pour habiller la maison au quotidien. Disponibles dans notre showroom au 63 Avenue de Montredon, ou sur commande.
        </p>
        <div className="mt-2">
          <Link
            to="/collection-maison/"
            className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-6 text-center no-underline transition-colors hover:bg-[var(--charcoal)]"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    </div>
  );
}
