import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import Seo from '../components/Seo';

const BASE = import.meta.env.BASE_URL;

type Category = 'plaids' | 'coussins' | 'dessus' | 'trousses';

interface Product {
  cat: Category;
  name: string;
  sub: string;
  colors: number;
  price: string;
  badge?: string;
  img: string;
  alt: string;
}

interface PlaidColor {
  name: string;
  hex: string;
  img: string;
  det?: string[];
}

interface PlaidInfo {
  desc: string;
  comp: string;
  all?: string;
  extra?: string[];
  colors: PlaidColor[];
}

const CATEGORIES: { id: Category | 'tout'; label: string }[] = [
  { id: 'plaids', label: 'Plaids' },
  { id: 'coussins', label: 'Coussins' },
  { id: 'dessus', label: 'Dessus de lit' },
  { id: 'trousses', label: 'Trousses' },
  { id: 'tout', label: 'Toute la collection' },
];

const PRODUCTS: Product[] = [
  { cat: 'plaids', name: 'Plaid Zebra', sub: '140x180 cm', colors: 5, price: '90 €', badge: 'Nouveauté', img: 'plaid-zebra-vieil-or.jpg', alt: 'Plaid Zebra plié, motif zébré en jacquard' },
  { cat: 'plaids', name: 'Plaid Uniwaffle', sub: '140x180 cm', colors: 6, price: '90 €', img: 'plaid-uniwaffle-vison.jpg', alt: 'Plaid Uniwaffle plié, tissage nid d’abeille' },
  { cat: 'plaids', name: 'Plaid Zen', sub: '140x180 cm', colors: 12, price: '90 €', img: 'plaid-zen-bleu-nuit.jpg', alt: 'Plaid Zen plié, armure fine deux tons' },
  { cat: 'plaids', name: 'Plaid Squares', sub: '140x180 cm', colors: 7, price: '90 €', img: 'plaid-squares-rose-poudre.jpg', alt: 'Plaid Squares plié, grands carreaux rose poudré' },
  { cat: 'plaids', name: 'Plaid Curly', sub: '140x180 cm', colors: 6, price: '106 €', img: 'plaid-curly-naturel.jpg', alt: 'Plaid Curly plié, laine mérinos et fil bouclette' },
  { cat: 'plaids', name: 'Plaid Stellar', sub: '140x180 cm ou 140x250 cm', colors: 6, price: 'Dès 90 €', img: 'plaid-stellar-corail.jpg', alt: 'Plaid Stellar plié, fil chiné corail' },
  { cat: 'plaids', name: 'Plaid Ruby', sub: '140x180 cm ou 140x250 cm', colors: 5, price: 'Dès 90 €', img: 'plaid-ruby-taupe.jpg', alt: 'Plaid Ruby plié, petit damier taupe' },
  { cat: 'dessus', name: 'Dessus de lit gaze de coton', sub: '130x220 cm', colors: 0, price: 'Dès 75 €', badge: 'Plusieurs coloris', img: 'dessus-de-lit-gaze.jpg', alt: 'Dessus de lit en gaze de coton à carreaux vichy terracotta, plié, avec pompons' },
  { cat: 'coussins', name: 'Coussin velours à franges', sub: '45x45 cm ou 30x50 cm', colors: 0, price: 'Dès 40 €', badge: 'Plusieurs coloris', img: 'coussin-franges.jpg', alt: 'Coussin en tissu crème bordé de franges brunes' },
  { cat: 'coussins', name: 'Coussin à volants', sub: '30x30 cm', colors: 0, price: '50 €', badge: 'Plusieurs coloris', img: 'coussin-volants.jpg', alt: 'Coussin rayé beige et blanc bordé de volants en lin écru' },
  { cat: 'trousses', name: 'Petite trousse matelassée', sub: '44x51 cm', colors: 0, price: '38 €', badge: 'Plusieurs coloris', img: 'trousse-petite.jpg', alt: 'Deux trousses matelassées à motifs floraux, framboise et moutarde' },
  { cat: 'trousses', name: 'Grande trousse matelassée', sub: '48x68 cm', colors: 0, price: '58 €', badge: 'Plusieurs coloris', img: 'trousse-grande.jpg', alt: 'Grande trousse matelassée à motif floral sur fond framboise' }
    ];

const PLAIDS: Record<string, PlaidInfo> = {
  'Plaid Zebra': { desc: 'Des rayures souples tissées en jacquard, ton sur ton. Le motif reste discret à distance et se révèle de près.', comp: '50 % coton recyclé, 50 % acrylique', all: 'plaid-zebra-tous-coloris.jpg', colors: [
    { name: 'Vieil or', hex: '#B07A48', img: 'plaid-zebra-vieil-or.jpg' },
    { name: 'Lin', hex: '#D9CFC2', img: 'plaid-zebra-lin.jpg' },
    { name: 'Pierre', hex: '#D7BD8F', img: '' },
    { name: 'Cannelle', hex: '#A0623A', img: '' },
    { name: 'Rose velours', hex: '#B9787A', img: '' } ] },
  'Plaid Uniwaffle': { desc: 'Un nid d’abeille en relief, tissé sur une chaîne gris clair : la couleur passe par la trame et se fond dans le tissage.', comp: '50 % coton recyclé, 50 % acrylique', all: 'plaid-uniwaffle-tous-coloris.jpg', colors: [
    { name: 'Vison', hex: '#8E7757', img: 'plaid-uniwaffle-vison.jpg', det: ['plaid-uniwaffle-vison-roule.jpg', 'plaid-uniwaffle-vison-detail-1.jpg', 'plaid-uniwaffle-vison-detail-2.jpg', 'plaid-uniwaffle-vison-detail-3.jpg'] },
    { name: 'Taupe', hex: '#A6988C', img: 'plaid-uniwaffle-taupe.jpg' },
    { name: 'Terracotta', hex: '#A24628', img: 'plaid-uniwaffle-terracotta.jpg' },
    { name: 'Doré', hex: '#B99A35', img: 'plaid-uniwaffle-dore.jpg' },
    { name: 'Prune', hex: '#6C4666', img: 'plaid-uniwaffle-prune.jpg' },
    { name: 'Vert sauge', hex: '#98A099', img: 'plaid-uniwaffle-vert-sauge.jpg' } ] },
  'Plaid Zen': { desc: 'Une armure fine et régulière, qui joue sur deux tons sans motif appuyé. Douze teintes pour s’accorder à un tissu d’ameublement ou à des rideaux.', comp: '50 % coton recyclé, 50 % acrylique', extra: ['plaid-zen-detail-1.jpg', 'plaid-zen-detail-2.jpg', 'plaid-zen-detail-3.jpg'], colors: [
    { name: 'Bleu nuit', hex: '#898B99', img: 'plaid-zen-bleu-nuit.jpg' },
    { name: 'Crème', hex: '#E8E6DF', img: '' },
    { name: 'Pierre', hex: '#D7BD8F', img: '' },
    { name: 'Gris clair', hex: '#CFCECB', img: '' },
    { name: 'Gris foncé', hex: '#4D4D4D', img: '' },
    { name: 'Bleu marine', hex: '#2E3A55', img: '' },
    { name: 'Bleu ciel', hex: '#A9C0D6', img: '' },
    { name: 'Taupe', hex: '#A6988C', img: '' },
    { name: 'Rose poudré', hex: '#AC988B', img: '' },
    { name: 'Vert sauge', hex: '#98A099', img: '' },
    { name: 'Lin', hex: '#D9CFC2', img: '' },
    { name: 'Cannelle', hex: '#A0623A', img: '' } ] },
  'Plaid Squares': { desc: 'De grands carreaux tracés d’un fil clair sur un fond uni. Le tissage est bicolore et réversible : chaque face a sa propre lecture.', comp: '50 % coton recyclé, 50 % acrylique', extra: ['plaid-squares-detail-1.jpg', 'plaid-squares-detail-2.jpg', 'plaid-squares-detail-3.jpg'], colors: [
    { name: 'Rose poudré', hex: '#AC988B', img: 'plaid-squares-rose-poudre.jpg' },
    { name: 'Pierre', hex: '#D7BD8F', img: '' },
    { name: 'Gris clair', hex: '#CFCECB', img: '' },
    { name: 'Bleu azur', hex: '#6F9CC4', img: '' },
    { name: 'Gris moyen', hex: '#9A9896', img: '' },
    { name: 'Corail', hex: '#C8644A', img: '' },
    { name: 'Vert sauge', hex: '#98A099', img: '' } ] },
  'Plaid Curly': { desc: 'De la laine mérinos et un fil bouclette, tissés sur métier à lames. Le plaid le plus chaud de la sélection, aux lisières brutes et franges courtes.', comp: '65 % acrylique, 20 % laine mérinos, 15 % coton recyclé', extra: ['plaid-curly-detail-1.jpg', 'plaid-curly-detail-2.jpg', 'plaid-curly-detail-3.jpg'], all: 'plaid-curly-tous-coloris.jpg', colors: [
    { name: 'Naturel', hex: '#EDE6D6', img: 'plaid-curly-naturel.jpg' },
    { name: 'Bleu canard', hex: '#2F5F68', img: '' },
    { name: 'Fer', hex: '#5E5A55', img: '' },
    { name: 'Merisier', hex: '#7A3A2C', img: '' },
    { name: 'Rose nude', hex: '#D9B4A2', img: '' },
    { name: 'Vert sable', hex: '#A8A57E', img: '' } ] },
  'Plaid Stellar': { desc: 'Une trame chinée, piquée de petites mèches blanches qui donnent de la profondeur à la couleur. Le tombé est souple, la main généreuse.', comp: '50 % coton recyclé, 50 % acrylique', colors: [
    { name: 'Corail', hex: '#C8644A', img: 'plaid-stellar-corail.jpg', det: ['plaid-stellar-corail-detail-1.jpg', 'plaid-stellar-corail-detail-2.jpg', 'plaid-stellar-corail-detail-3.jpg'] },
    { name: 'Pierre', hex: '#D7BD8F', img: 'plaid-stellar-pierre.jpg', det: ['plaid-stellar-pierre-detail-1.jpg', 'plaid-stellar-pierre-detail-2.jpg', 'plaid-stellar-pierre-detail-3.jpg'] },
    { name: 'Gris clair', hex: '#CFCECB', img: 'plaid-stellar-gris-clair.jpg', det: ['plaid-stellar-gris-clair-detail-1.jpg', 'plaid-stellar-gris-clair-detail-2.jpg', 'plaid-stellar-gris-clair-detail-3.jpg'] },
    { name: 'Noir', hex: '#2B2A2A', img: 'plaid-stellar-noir.jpg', det: ['plaid-stellar-noir-detail-1.jpg', 'plaid-stellar-noir-detail-2.jpg', 'plaid-stellar-noir-detail-3.jpg'] },
    { name: 'Céleste', hex: '#9DB9CF', img: '' },
    { name: 'Prune', hex: '#6C4666', img: '' } ] },
  'Plaid Ruby': { desc: 'Un tissage serré en petit damier, où la couleur se mêle à un fil écru. Des franges crème longues et torsadées.', comp: '50 % coton recyclé, 50 % acrylique', colors: [
    { name: 'Taupe', hex: '#A6988C', img: 'plaid-ruby-taupe.jpg', det: ['plaid-ruby-taupe-detail-1.jpg', 'plaid-ruby-taupe-detail-2.jpg', 'plaid-ruby-taupe-detail-3.jpg'] },
    { name: 'Gris clair', hex: '#CFCECB', img: 'plaid-ruby-gris-clair.jpg', det: ['plaid-ruby-gris-clair-detail-1.jpg', 'plaid-ruby-gris-clair-detail-2.jpg', 'plaid-ruby-gris-clair-detail-3.jpg'] },
    { name: 'Gris foncé', hex: '#4D4D4D', img: 'plaid-ruby-gris-fonce.jpg', det: ['plaid-ruby-gris-fonce-detail-1.jpg', 'plaid-ruby-gris-fonce-detail-2.jpg', 'plaid-ruby-gris-fonce-detail-3.jpg'] },
    { name: 'Bleu nuit', hex: '#898B99', img: 'plaid-ruby-bleu-nuit.jpg', det: ['plaid-ruby-bleu-nuit-detail-1.jpg', 'plaid-ruby-bleu-nuit-detail-2.jpg', 'plaid-ruby-bleu-nuit-detail-3.jpg'] },
    { name: 'Crème', hex: '#E8E6DF', img: '' } ] }
};

const SERIF = "font-['FreeSerif'] font-black text-[var(--moka)]";
const BTN_DARK = "font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase bg-[var(--moka)] text-[var(--linen)] border-none cursor-pointer no-underline transition-colors hover:bg-[var(--charcoal)]";
const BTN_LIGHT = "font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase bg-transparent border border-[var(--moka)] text-[var(--moka)] cursor-pointer no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]";
const LABEL = "font-['MaisonNeue'] font-bold text-[9px] tracking-[2px] uppercase text-[var(--primary)]";

function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/45 flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-[#F6F4F0] px-6 py-10 md:px-10 md:pb-10 md:pt-11"
      >
        <button type="button" aria-label="Fermer" onClick={onClose} className="absolute top-2.5 right-2.5 w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer text-[var(--moka)]">
          <X size={18} />
        </button>
        <h2 id="contact-title" className={`${SERIF} text-[28px] leading-[1.1] m-0`}>Contactez-nous</h2>
        <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8] mt-3 mb-7">
          Appelez-nous ou écrivez-nous pour commander, ou pour toutes questions.
        </p>
        <div className="flex flex-col gap-[22px]">
          <div className="flex gap-3.5">
            <Phone size={18} strokeWidth={1.5} className="text-[var(--primary)] flex-none mt-px" />
            <div className="flex flex-col gap-1.5">
              <span className={LABEL}>Téléphone</span>
              <a href="tel:+33759574098" className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] no-underline">07 59 57 40 98</a>
              <a href="tel:+33603657997" className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] no-underline">06 03 65 79 97</a>
            </div>
          </div>
          <div className="flex gap-3.5">
            <Mail size={18} strokeWidth={1.5} className="text-[var(--primary)] flex-none mt-px" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className={LABEL}>Email</span>
              <a href="mailto:contact@nuancesdecoration.com" className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] no-underline break-all">contact@nuancesdecoration.com</a>
            </div>
          </div>
          <div className="flex gap-3.5">
            <MapPin size={18} strokeWidth={1.5} className="text-[var(--primary)] flex-none mt-px" />
            <div className="flex flex-col gap-1.5">
              <span className={LABEL}>Showroom</span>
              <span className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)]">63 Avenue de Montredon, Marseille</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaidModal({ product, onClose, onContact }: { product: Product; onClose: () => void; onContact: () => void }) {
  const info = PLAIDS[product.name];
  const [colorIndex, setColorIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const first = info.colors[0];
  const current = info.colors[colorIndex];
  const slides: { src: string; alt: string }[] = [];
  if (current.img) slides.push({ src: current.img, alt: `${product.name}, coloris ${current.name.toLowerCase()}` });
  else slides.push({ src: first.img, alt: `${product.name}, coloris ${first.name.toLowerCase()}` });
  const details = current.det ?? (current === first || !current.img ? info.extra : undefined) ?? [];
  details.forEach((src) => slides.push({ src, alt: `${product.name}, détail du tissage` }));
  if (info.all) slides.push({ src: info.all, alt: `${product.name}, tous les coloris` });
  const slide = slides[Math.min(slideIndex, slides.length - 1)];

  const pickColor = (i: number) => {
    setColorIndex(i);
    setSlideIndex(0);
  };
  const go = (step: number) => setSlideIndex((i) => (i + step + slides.length) % slides.length);

  return (
    <div className="fixed inset-0 z-[200] bg-black/45 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="plaid-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[860px] bg-white grid grid-cols-1 md:grid-cols-2 my-auto"
      >
        <button type="button" aria-label="Fermer" onClick={onClose} className="absolute top-2 right-2 z-10 w-11 h-11 flex items-center justify-center bg-white/85 border-none cursor-pointer text-[var(--moka)]">
          <X size={18} />
        </button>
        <div className="relative bg-white aspect-[2/3] overflow-hidden">
          <img src={`${BASE}${slide.src}`} alt={slide.alt} className="w-full h-full object-contain block" />
          {slides.length > 1 && (
            <>
              <button type="button" aria-label="Photo précédente" onClick={() => go(-1)} className="absolute left-3 top-1/2 -mt-[22px] w-11 h-11 rounded-full bg-white/90 border-none flex items-center justify-center cursor-pointer text-[var(--moka)]">
                <ChevronLeft size={18} />
              </button>
              <button type="button" aria-label="Photo suivante" onClick={() => go(1)} className="absolute right-3 top-1/2 -mt-[22px] w-11 h-11 rounded-full bg-white/90 border-none flex items-center justify-center cursor-pointer text-[var(--moka)]">
                <ChevronRight size={18} />
              </button>
              <span aria-live="polite" className="absolute right-3 bottom-3 bg-[#F6F4F0] text-[var(--moka)] font-['MaisonNeue'] font-light text-[11px] px-2 py-1">
                {Math.min(slideIndex, slides.length - 1) + 1} / {slides.length}
              </span>
            </>
          )}
        </div>
        <div className="px-6 py-8 md:px-9 md:pt-10 md:pb-9 flex flex-col gap-3.5">
          <h2 id="plaid-title" className={`${SERIF} text-[28px] leading-[1.1] m-0`}>{product.name}</h2>
          <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] -mt-1 m-0">
            {product.sub} · <span className="text-[var(--moka)]">{product.price}</span>
          </p>
          <p className="font-['MaisonNeue'] font-light text-[13px] leading-[1.8] text-[var(--charcoal)] m-0">{info.desc}</p>
          <p className="font-['MaisonNeue'] font-light text-[12px] text-[var(--warm)] m-0">
            <span className={LABEL}>Composition</span>&nbsp;&nbsp;{info.comp}
          </p>
          <div className="border-t border-[#EDE6DE] pt-4 flex flex-col gap-2.5">
            <p className="font-['MaisonNeue'] font-light text-[13px] m-0">
              <span className={LABEL}>Coloris :</span>{' '}
              <span className="text-[var(--moka)]">{current.name}</span>
            </p>
            <div role="group" aria-label="Coloris disponibles" className="flex flex-wrap gap-1">
              {info.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  title={c.name}
                  onClick={() => pickColor(i)}
                  className="w-9 h-9 p-1 bg-transparent cursor-pointer rounded-full"
                  style={{ border: `1.5px solid ${i === colorIndex ? '#A0716B' : 'transparent'}` }}
                >
                  <span className="block w-full h-full rounded-full border border-[#D9CFC4]" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={onContact} className={`${BTN_DARK} mt-auto py-4 px-5 text-center`}>
            Contactez-nous pour commander
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollectionMaison() {
  const { pathname } = useLocation();
  const [cat, setCat] = useState<Category | 'tout'>('tout');
  const [openPlaid, setOpenPlaid] = useState<Product | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const open = openPlaid || contactOpen;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPlaid(null);
        setContactOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openPlaid, contactOpen]);

  const list = cat === 'tout' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  const openContact = () => {
    setOpenPlaid(null);
    setContactOpen(true);
  };

  return (
    <>
      <Seo
        title="Plaids, coussins et linge de maison à Marseille | Nuances Décoration"
        description="Découvrez notre collection de plaids, coussins, dessus de lit et trousses à Marseille. Pièces disponibles au showroom ou sur commande."
        path={pathname}
      />
      <header className="bg-[var(--grege-p)] px-4 pt-12 pb-10 md:px-12 md:pt-16 md:pb-12">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-4">
          <span className="font-['MaisonNeue'] font-thin text-[10px] tracking-[4px] uppercase text-[var(--primary)]">
            Plaids, coussins, dessus de lit, trousses
          </span>
          <h1 className={`${SERIF} text-[40px] leading-[1.1] m-0`}>Notre collection maison</h1>
          <span aria-hidden="true" className="w-12 h-px bg-[var(--primary)]" />
          <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)] leading-[1.8] m-0">
            Des pièces disponibles dans notre showroom au 63 Avenue de Montredon, ou sur commande.
          </p>
          <nav aria-label="Catégories de la collection maison" className="flex flex-wrap justify-center gap-2 mt-5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={c.id === cat}
                onClick={() => setCat(c.id)}
                className={`min-h-[40px] px-4 border-none cursor-pointer font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase transition-colors ${
                  c.id === cat ? 'bg-[var(--moka)] text-[var(--linen)]' : 'bg-white text-[var(--moka)] hover:bg-[var(--linen)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div className="bg-white text-[var(--charcoal)] px-4 pt-10 pb-16 md:px-12 md:pt-12 md:pb-20">
        <section className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12">
            {list.map((p) => {
              const isPlaid = Boolean(PLAIDS[p.name]);
              const open = () => isPlaid && setOpenPlaid(p);
              return (
                <div key={p.name} className={`group flex flex-col gap-1 min-w-0 ${isPlaid ? 'cursor-pointer' : ''}`} onClick={open}>
                  <div className="relative aspect-[4/5] bg-[#EFEAE3] mb-3 overflow-hidden">
                    <img src={`${BASE}${p.img}`} alt={p.alt} className="absolute inset-0 w-full h-full object-cover block" loading="lazy" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-[#F0E4DF] text-[var(--moka)] font-['MaisonNeue'] font-bold text-[9px] tracking-[2px] uppercase leading-[1.3] px-2 py-1">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-3">
                    {isPlaid ? (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={(e) => { e.stopPropagation(); open(); }}
                        className="min-w-0 text-left bg-transparent border-none p-0 cursor-pointer font-['FreeSerif'] font-bold text-[14px] md:text-[16px] leading-tight text-[#3E2416] underline-offset-4 decoration-[#A0716B] group-hover:underline"
                      >
                        {p.name}
                      </button>
                    ) : (
                      <span className="min-w-0 font-['FreeSerif'] font-bold text-[14px] md:text-[16px] leading-tight text-[#3E2416]">{p.name}</span>
                    )}
                    {p.colors > 0 && (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={(e) => { e.stopPropagation(); open(); }}
                        className="flex-none bg-transparent border-none p-0 cursor-pointer font-['MaisonNeue'] font-light text-[12px] text-[var(--warm)] underline underline-offset-4 decoration-[var(--primary)]"
                      >
                        {p.colors} coloris
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)]">{p.sub}</span>
                    <span className="flex-none font-['MaisonNeue'] font-light text-[13px] text-[var(--moka)]">{p.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <button type="button" aria-haspopup="dialog" onClick={openContact} className={`${BTN_DARK} py-4 px-8 text-center`}>
              Contactez-nous pour commander
            </button>
          </div>

        </section>
      </div>

      <section className="bg-[var(--grege-p)] px-6 py-14 md:px-12 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-['FreeSerif'] font-black text-[34px] md:text-[42px] text-[var(--moka)] leading-[1.05] mb-5">Vous avez un projet en tête ?</h2>
            <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] leading-[1.7]">
              Housse de coussin, dessus de lit, édredon, linge de table : nous les confectionnons à l’atelier, dans le tissu et les dimensions de votre choix. Parlez-nous de votre projet, nous vous conseillerons sur les matières et vous remettrons un devis détaillé.
            </p>
          </div>
          <div className="w-full md:w-[440px] shrink-0 flex flex-col gap-3 text-center">
            <Link to="/contact" className={`${BTN_DARK} py-4 px-5`}>Prendre rendez-vous</Link>
            <button type="button" aria-haspopup="dialog" onClick={openContact} className={`${BTN_LIGHT} py-4 px-5`}>Nous contacter</button>
          </div>
        </div>
      </section>

      {openPlaid && <PlaidModal product={openPlaid} onClose={() => setOpenPlaid(null)} onContact={openContact} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
