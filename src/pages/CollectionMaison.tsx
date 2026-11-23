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
  { cat: 'plaids', name: 'Plaid Zebra', sub: '140 × 180 cm', colors: 5, price: '90 €', badge: 'Nouveauté', img: 'plaid-zebra-vieil-or.jpg', alt: 'Plaid Zebra plié, motif zébré en jacquard' },
  { cat: 'plaids', name: 'Plaid Uniwaffle', sub: '140 × 180 cm', colors: 6, price: '90 €', img: 'plaid-uniwaffle-vison.jpg', alt: 'Plaid Uniwaffle plié, tissage nid d’abeille' },
  { cat: 'plaids', name: 'Plaid Zen', sub: '140 × 180 cm', colors: 12, price: '90 €', img: 'plaid-zen-bleu-nuit.jpg', alt: 'Plaid Zen plié, armure fine deux tons' },
  { cat: 'plaids', name: 'Plaid Squares', sub: '140 × 180 cm', colors: 7, price: '90 €', img: 'plaid-squares-rose-poudre.jpg', alt: 'Plaid Squares plié, grands carreaux rose poudré' },
  { cat: 'plaids', name: 'Plaid Curly', sub: '140 × 180 cm', colors: 6, price: '106 €', img: 'plaid-curly-naturel.jpg', alt: 'Plaid Curly plié, laine mérinos et fil bouclette' },
  { cat: 'plaids', name: 'Plaid Stellar', sub: '140 × 180 ou 250 cm', colors: 6, price: 'Dès 90 €', img: 'plaid-stellar-corail.jpg', alt: 'Plaid Stellar plié, fil chiné corail' },
  { cat: 'plaids', name: 'Plaid Ruby', sub: '140 × 180 ou 250 cm', colors: 5, price: 'Dès 90 €', img: 'plaid-ruby-taupe.jpg', alt: 'Plaid Ruby plié, petit damier taupe' },
  { cat: 'dessus', name: 'Dessus de lit gaze de coton', sub: '130 × 220 cm', colors: 0, price: 'Dès 75 €', badge: 'Plusieurs coloris', img: 'dessus-de-lit-gaze.jpg', alt: 'Dessus de lit en gaze de coton à carreaux vichy terracotta, plié, avec pompons' },
  { cat: 'coussins', name: 'Coussin velours à franges', sub: '45 × 45 ou 30 × 50 cm', colors: 0, price: 'Dès 40 €', badge: 'Plusieurs coloris', img: 'coussin-franges.jpg', alt: 'Coussin en tissu crème bordé de franges brunes' },
  { cat: 'coussins', name: 'Coussin à volants', sub: '30 × 30 cm', colors: 0, price: '50 €', badge: 'Plusieurs coloris', img: 'coussin-volants.jpg', alt: 'Coussin rayé beige et blanc bordé de volants en lin écru' },
  { cat: 'trousses', name: 'Petite trousse matelassée', sub: '44 × 51 cm', colors: 0, price: '38 €', badge: 'Plusieurs coloris', img: 'trousse-petite.jpg', alt: 'Deux trousses matelassées à motifs floraux, framboise et moutarde' },
  { cat: 'trousses', name: 'Grande trousse matelassée', sub: '48 × 68 cm', colors: 0, price: '58 €', badge: 'Plusieurs coloris', img: 'trousse-grande.jpg', alt: 'Grande trousse matelassée à motif floral sur fond framboise' }
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
const BTN_DARK = "font-['DM_Sans'] font-semibold text-[12px] md:text-[13px] tracking-[0.14em] uppercase bg-[var(--moka)] text-[var(--linen)] border-none cursor-pointer no-underline transition-colors hover:bg-[var(--charcoal)]";

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
        <h2 id="contact-title" className={`${SERIF} text-[30px] leading-[1.15] m-0`}>Contactez-nous</h2>
        <p className="font-['DM_Sans'] font-light text-[14px] text-[var(--warm)] mt-2.5 mb-7">
          Appelez-nous ou écrivez-nous pour commander, ou pour toutes questions.
        </p>
        <div className="flex flex-col gap-[22px]">
          <div className="flex gap-3.5">
            <Phone size={20} strokeWidth={1.6} className="text-[#A0716B] flex-none mt-px" />
            <div className="flex flex-col gap-1.5">
              <span className="font-['DM_Sans'] font-semibold text-[11px] tracking-[0.16em] uppercase text-[#A0716B]">Téléphone</span>
              <a href="tel:+33759574098" className="font-['DM_Sans'] text-[15px] text-[#1D1D1B] no-underline">07 59 57 40 98</a>
              <a href="tel:+33603657997" className="font-['DM_Sans'] text-[15px] text-[#1D1D1B] no-underline">06 03 65 79 97</a>
            </div>
          </div>
          <div className="flex gap-3.5">
            <Mail size={20} strokeWidth={1.6} className="text-[#A0716B] flex-none mt-px" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-['DM_Sans'] font-semibold text-[11px] tracking-[0.16em] uppercase text-[#A0716B]">Email</span>
              <a href="mailto:contact@nuancesdecoration.com" className="font-['DM_Sans'] text-[15px] text-[#1D1D1B] no-underline break-all">contact@nuancesdecoration.com</a>
            </div>
          </div>
          <div className="flex gap-3.5">
            <MapPin size={20} strokeWidth={1.6} className="text-[#A0716B] flex-none mt-px" />
            <div className="flex flex-col gap-1.5">
              <span className="font-['DM_Sans'] font-semibold text-[11px] tracking-[0.16em] uppercase text-[#A0716B]">Showroom</span>
              <span className="font-['DM_Sans'] text-[15px] text-[#1D1D1B]">63 Avenue de Montredon, Marseille</span>
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
              <span aria-live="polite" className="absolute right-3 bottom-3 bg-[#F6F4F0] text-[#3E2416] font-['DM_Sans'] text-[12px] px-2 py-1">
                {Math.min(slideIndex, slides.length - 1) + 1} / {slides.length}
              </span>
            </>
          )}
        </div>
        <div className="px-6 py-8 md:px-9 md:pt-10 md:pb-9 flex flex-col gap-3.5">
          <h2 id="plaid-title" className={`${SERIF} text-[30px] leading-[1.15] m-0`}>{product.name}</h2>
          <p className="font-['DM_Sans'] font-light text-[14px] text-[var(--warm)] -mt-1.5 m-0">
            {product.sub} · <span className="text-[#3E2416] font-normal">{product.price}</span>
          </p>
          <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.65] text-[#1D1D1B] m-0">{info.desc}</p>
          <p className="font-['DM_Sans'] font-light text-[13px] text-[var(--warm)] m-0">
            <span className="font-semibold text-[11px] tracking-[0.14em] uppercase text-[#A0716B]">Composition</span>&nbsp;&nbsp;{info.comp}
          </p>
          <div className="border-t border-[#EDE6DE] pt-4 flex flex-col gap-2.5">
            <p className="font-['DM_Sans'] text-[14px] m-0">
              <span className="font-semibold text-[12px] tracking-[0.14em] uppercase text-[var(--moka)]">Coloris :</span>{' '}
              <span className="font-light text-[var(--moka)]">{current.name}</span>
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
                  className="w-10 h-10 p-1 bg-transparent cursor-pointer rounded-full"
                  style={{ border: `1.5px solid ${i === colorIndex ? '#A0716B' : 'transparent'}` }}
                >
                  <span className="block w-full h-full rounded-full border border-[#D9CFC4]" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={onContact} className={`${BTN_DARK} mt-auto py-[18px] px-6 text-center`}>
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
        title="Notre collection maison — Nuances Décoration"
        description="Plaids, coussins, dessus de lit et trousses : des pièces disponibles dans notre showroom au 63 Avenue de Montredon à Marseille, ou sur commande."
        path={pathname}
      />
      <div className="bg-white text-[#1D1D1B] px-4 pt-12 pb-16 md:px-12 md:pt-[72px] md:pb-24">
        <section className="max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className={`${SERIF} text-[40px] md:text-[60px] leading-[1.05] m-0`}>Notre collection maison</h1>
            <span aria-hidden="true" className="w-12 h-px bg-[#A0726A]" />
            <p className="font-['DM_Sans'] font-light text-[14px] text-[var(--warm)] m-0">
              Des pièces disponibles dans notre showroom au 63 Avenue de Montredon, ou sur commande.
            </p>
          </div>

          <nav aria-label="Catégories de la collection maison" className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={c.id === cat}
                onClick={() => setCat(c.id)}
                className={`min-h-[44px] px-3.5 border-none cursor-pointer font-['DM_Sans'] font-semibold text-[13px] tracking-[0.14em] uppercase ${
                  c.id === cat ? 'bg-[#3E2416] text-[#F6F4F0]' : 'bg-[#EFEAE3] text-[#3E2416]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {list.map((p) => {
              const isPlaid = Boolean(PLAIDS[p.name]);
              const open = () => isPlaid && setOpenPlaid(p);
              return (
                <div key={p.name} className={`group flex flex-col gap-1 min-w-0 ${isPlaid ? 'cursor-pointer' : ''}`} onClick={open}>
                  <div className="relative aspect-[4/5] bg-[#EFEAE3] mb-3 overflow-hidden">
                    <img src={`${BASE}${p.img}`} alt={p.alt} className="absolute inset-0 w-full h-full object-cover block" loading="lazy" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-[#F0E4DF] text-[#3E2416] font-['DM_Sans'] font-semibold text-[10px] tracking-[0.12em] uppercase leading-[1.3] px-[7px] py-1">
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
                        className="min-w-0 text-left bg-transparent border-none p-0 cursor-pointer font-['DM_Sans'] font-semibold text-[13px] md:text-[14px] tracking-[0.14em] uppercase leading-[1.3] text-[#3E2416] underline-offset-4 decoration-[#A0716B] group-hover:underline"
                      >
                        {p.name}
                      </button>
                    ) : (
                      <span className="min-w-0 font-['DM_Sans'] font-semibold text-[13px] md:text-[14px] tracking-[0.14em] uppercase leading-[1.3] text-[#3E2416]">{p.name}</span>
                    )}
                    {p.colors > 0 && (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={(e) => { e.stopPropagation(); open(); }}
                        className="flex-none bg-transparent border-none p-0 cursor-pointer font-['DM_Sans'] font-light text-[13px] text-[var(--warm)] underline underline-offset-4 decoration-[#A0716B]"
                      >
                        {p.colors} coloris
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-baseline gap-3">
                    <span className="font-['DM_Sans'] font-light text-[13px] md:text-[14px] text-[var(--warm)]">{p.sub}</span>
                    <span className="flex-none font-['DM_Sans'] text-[13px] md:text-[14px] text-[#3E2416]">{p.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <button type="button" aria-haspopup="dialog" onClick={openContact} className={`${BTN_DARK} py-[18px] px-8 text-center`}>
              Contactez-nous pour commander
            </button>
          </div>

          <div className="mt-[88px] bg-[var(--grege-p)] px-5 py-10 md:px-14 md:py-16 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-8 md:gap-16 items-center">
            <div className="flex flex-col gap-4">
              <h2 className={`${SERIF} text-[30px] md:text-[38px] leading-[1.15] m-0`}>Vous avez un projet en tête ?</h2>
              <p className="font-['DM_Sans'] font-light text-[14px] leading-[1.85] text-[var(--moka)] max-w-[560px] m-0">
                Housse de coussin, dessus de lit, édredon, linge de table : nous les confectionnons à l’atelier, dans le tissu et les dimensions de votre choix. Parlez-nous de votre projet, nous vous conseillerons sur les matières et vous remettrons un devis détaillé.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className={`${BTN_DARK} !text-[12px] py-[18px] px-5 text-center`}>
                Prendre rendez-vous
              </Link>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={openContact}
                className="font-['DM_Sans'] font-semibold text-[12px] tracking-[0.14em] uppercase bg-transparent border border-[var(--moka)] text-[var(--moka)] cursor-pointer py-[17px] px-5 text-center transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]"
              >
                Nous contacter
              </button>
            </div>
          </div>
        </section>
      </div>

      {openPlaid && <PlaidModal product={openPlaid} onClose={() => setOpenPlaid(null)} onContact={openContact} />}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
