import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Scissors, Sparkles, Waves } from 'lucide-react';

export function ArticleCard({ article, compact = false }: { article: { title: string; slug: string; category: string; excerpt?: string; date?: string; readingTime: string; image: string; imageCaption?: string }; compact?: boolean }) {
  return (
    <article className={compact ? 'flex gap-4 group' : 'group'}>
      <Link to={`/conseils/${article.slug}`} className={compact ? 'relative block w-28 h-24 shrink-0 overflow-hidden' : 'relative block overflow-hidden aspect-[4/3] mb-5'}>
        <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {!compact && article.imageCaption && <span className="absolute bottom-2 left-2 bg-[var(--linen)] px-2 py-1 font-['MaisonNeue'] text-[9px] text-[var(--charcoal)]">{article.imageCaption}</span>}
      </Link>
      <div className={compact ? 'min-w-0' : ''}>
        <span className="font-['MaisonNeue'] font-bold text-[9px] tracking-[2px] uppercase text-[var(--primary)]">{article.category}</span>
        <h3 className={`${compact ? 'text-[19px] mt-2 mb-2' : 'text-[24px] mt-3 mb-3'} font-['FreeSerif'] font-black text-[var(--moka)] leading-[1.08]`}>
          <Link to={`/conseils/${article.slug}`} className="no-underline text-inherit transition-colors hover:text-[var(--primary)]">{article.title}</Link>
        </h3>
        {!compact && article.excerpt && <p className="font-['MaisonNeue'] font-light text-[13px] text-[var(--charcoal)] leading-[1.65] mb-4">{article.excerpt}</p>}
        <p className="font-['MaisonNeue'] font-light text-[11px] text-[var(--primary)]">{article.date && `${article.date} · `}{article.readingTime}</p>
      </div>
    </article>
  );
}

export function ProjectBlock() {
  return (
    <section className="bg-[var(--grege-p)] px-6 py-14 md:px-12 md:py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="font-['FreeSerif'] font-black text-[34px] md:text-[42px] text-[var(--moka)] leading-[1.05] mb-5">Vous avez un projet ?</h2>
          <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] leading-[1.7]">Nous venons chez vous avec les échantillons, nous prenons les mesures et nous vous remettons un devis détaillé. Pour toute question, nous sommes aussi disponibles par téléphone, par e-mail ou directement dans notre showroom.</p>
        </div>
        <div className="w-full md:w-[440px] shrink-0 flex flex-col gap-3 text-center">
          <Link to="/contact" className="font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase bg-[var(--moka)] text-[var(--linen)] py-4 px-5 no-underline transition-colors hover:bg-[var(--charcoal)]">PRENDRE RENDEZ-VOUS</Link>
          <Link to="/contact" className="font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase border border-[var(--moka)] text-[var(--moka)] py-4 px-5 no-underline transition-colors hover:bg-[var(--moka)] hover:text-[var(--linen)]">NOUS CONTACTER</Link>
        </div>
      </div>
    </section>
  );
}

export function ReassuranceStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const items = [
    { label: 'CONSEILS', text: "Choix des tissus et des têtes, à l'atelier ou chez vous.", icon: Sparkles },
    { label: 'PRISE DE MESURES', text: 'Nous relevons les cotes sur place, au millimètre.', icon: Ruler },
    { label: 'CONFECTION LOCALE', text: 'Chaque pièce est coupée et cousue dans notre atelier à Marseille.', icon: Scissors },
    { label: 'POSE', text: 'Tringles, rails et stores posés par nos soins.', icon: Waves },
  ];

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    setActiveIndex(Math.round(slider.scrollLeft / slider.clientWidth));
  };

  const scrollToItem = (index: number) => {
    sliderRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <section className="bg-white px-6 py-10 md:px-12 md:py-12 border-t border-[var(--pale)]">
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="max-w-6xl mx-auto flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:gap-6"
      >
        {items.map(({ label, text, icon: Icon }) => (
          <div key={label} className="min-w-full snap-start flex flex-col items-center text-center md:min-w-0 md:flex-row md:items-start md:text-left md:gap-3">
            <Icon size={32} strokeWidth={1.3} className="text-[var(--primary)] shrink-0 mb-7 md:mb-0 md:mt-0.5 md:w-[17px] md:h-[17px]" />
            <div><p className="font-['MaisonNeue'] font-bold text-[13px] md:text-[10px] tracking-[2px] text-[var(--moka)] mb-4 md:mb-2">{label}</p><p className="font-['MaisonNeue'] font-light text-[16px] md:text-[12px] text-[var(--charcoal)] leading-[1.5] max-w-[340px] md:max-w-none">{text}</p></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8 md:hidden" aria-label="Position dans les garanties">
        {items.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            aria-label={`Afficher ${label.toLowerCase()}`}
            aria-current={activeIndex === index}
            onClick={() => scrollToItem(index)}
            className={`w-4 h-4 rounded-full border-0 p-0 ${activeIndex === index ? 'bg-[#3E2416]' : 'bg-[#A0716B]/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
