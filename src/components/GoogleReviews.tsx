import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GOOGLE_URL =
  'https://www.google.com/maps/place/Nuances+D%C3%A9coration+-+Magasin+de+rideaux+et+banquettes+sur+mesure/@43.2432924,5.3678472,17z/data=!3m1!4b1!4m6!3m5!1s0x12c9c7ae3fb31ea3:0xb422bc77892a44b8!8m2!3d43.2432885!4d5.3704221!16s%2Fg%2F11zdhn2vnw';

const REVIEWS = [
  {
    name: 'Juliette F.',
    project: 'Rideaux sur mesure',
    text: 'Une super équipe ! Chloé et Jeanne sont professionnelles et proposent des prestations de qualité et sur mesure ! Pour ma part elles m’ont fait des rideaux sur mesure qui tombent parfaitement ! La communication est très fluide et le résultat parfait ! Encore un grand merci pour ce beau travail ! Je reviendrais sans hésiter !',
  },
  {
    name: 'Justine C.',
    project: 'Banquettes extérieures et rideaux',
    text: 'Visite chez Nuances Décoration, j’ai été très bien accueilli et conseillé par Jeanne et Chloé pour aménager mon extérieur : banquettes et coussins magnifiques. J’ai aussi commandé des rideaux sur mesure pour mon salon : rendu parfait. Je recommande vivement ! Merci à vous !',
  },
  {
    name: 'Caroline A.',
    project: 'Banquette extérieure',
    text: 'Une équipe jeune et dynamique qui mérite de réussir ! Travail sur mesure de très bonne qualité. Je leur ai confié mon projet de banquette extérieure. Elles m’ont bien conseillé sur le choix des mousses et des tissus. Respect des délais. Encore bravo et merci. Des rideaux sont en cours….',
  },
];

function Stars({ size }: { size: number }) {
  return (
    <span role="img" aria-label="5 étoiles sur 5" className="flex gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="#A0716B" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review, lines }: { review: (typeof REVIEWS)[number]; lines: number }) {
  return (
    <figure className="m-0 bg-[var(--linen)] px-5 pt-5 pb-[18px] flex flex-col gap-2.5">
      <Stars size={11} />
      <blockquote
        className="m-0 font-['MaisonNeue'] font-light text-[13px] leading-[1.65] text-[var(--charcoal)] overflow-hidden"
        style={{ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical' }}
      >
        {review.text}
      </blockquote>
      <figcaption className="font-['MaisonNeue'] font-bold text-[10px] tracking-[2px] uppercase text-[var(--moka)]">
        {review.name}{' '}
        <span className="font-light text-[12px] tracking-normal normal-case text-[var(--warm)]">· {review.project}</span>
      </figcaption>
    </figure>
  );
}

const LINK =
  "font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase text-[var(--moka)] underline decoration-[var(--primary)] underline-offset-[5px] hover:text-[var(--charcoal)]";

export default function GoogleReviews() {
  const [index, setIndex] = useState(0);
  const n = REVIEWS.length;
  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  return (
    <section className="bg-white px-5 pt-6 pb-14 md:px-12 md:pt-8 md:pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-6 md:gap-10 items-center">
        <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
          <p className="m-0 font-['MaisonNeue'] font-thin text-[10px] tracking-[4px] uppercase text-[var(--primary)]">
            Retours d’expérience
          </p>
          <h2 className="m-0 font-['FreeSerif'] font-black text-[28px] md:text-[36px] text-[var(--moka)] leading-[1.1]">
            Les avis de nos clients
          </h2>
          <div className="flex items-center gap-2">
            <Stars size={14} />
            <span className="font-['MaisonNeue'] font-light text-[12px] text-[var(--moka)]">5/5 sur Google</span>
          </div>
          <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className={`${LINK} hidden md:inline-block mt-1.5`}>
            Voir tous les avis
          </a>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} review={r} lines={4} />
          ))}
        </div>

        {/* Mobile: one card at a time */}
        <div className="md:hidden flex flex-col items-center gap-5">
          <div className="w-full">
            <ReviewCard review={REVIEWS[index]} lines={5} />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Avis précédent"
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border border-[var(--moka)] bg-transparent flex items-center justify-center cursor-pointer text-[var(--moka)]"
            >
              <ChevronLeft size={16} />
            </button>
            <div role="group" aria-label="Avis" className="flex gap-[2px]">
              {REVIEWS.map((r, k) => (
                <button
                  key={r.name}
                  type="button"
                  aria-label={`Avis ${k + 1}`}
                  aria-current={k === index}
                  onClick={() => setIndex(k)}
                  className="w-6 h-11 bg-transparent border-none p-0 cursor-pointer flex items-center justify-center"
                >
                  <span className={`block w-2 h-2 rounded-full ${k === index ? 'bg-[var(--moka)]' : 'bg-[#C9B8AC]'}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Avis suivant"
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border border-[var(--moka)] bg-transparent flex items-center justify-center cursor-pointer text-[var(--moka)]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className={`${LINK} py-2`}>
            Voir tous les avis
          </a>
        </div>
      </div>

    </section>
  );
}
