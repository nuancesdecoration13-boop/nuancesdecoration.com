import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ArticleCard, ProjectBlock, ReassuranceStrip } from '../components/BlogSections';
import { articles, articleCategories } from '../data/articles';
import { SHOW_BLOG } from '../config';
import { useBlogVisibility } from '../lib/blogVisibility';

export default function Conseils() {
  const [activeCategory, setActiveCategory] = useState<(typeof articleCategories)[number]>('Tout');
  const isBlogVisible = useBlogVisibility();
  const visibleArticles = articles.filter((article) => isBlogVisible || article.status === 'publié');
  const filteredArticles = useMemo(
    () => activeCategory === 'Tout' ? visibleArticles : visibleArticles.filter((article) => article.category === activeCategory),
    [activeCategory, isBlogVisible],
  );
  const featuredArticle = visibleArticles[0];
  const latestArticles = filteredArticles.filter((article) => article.slug !== featuredArticle.slug);

  return (
    <div className="bg-[var(--linen)]">
      <Seo title="Conseils & inspirations — Nuances Décoration" description="Les conseils de l'équipe Nuances Décoration pour choisir vos tissus, prendre vos mesures et préparer votre projet sur mesure." path="/conseils" noIndex={!SHOW_BLOG} />
      <section className="bg-[var(--deep)] px-6 py-14 md:px-12 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <h1 className="font-['FreeSerif'] font-black text-[46px] md:text-[68px] text-[var(--linen)] leading-[0.96]">Les conseils de l’équipe</h1>
          <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--linen)] leading-[1.8] max-w-md md:justify-self-end">Ce que nous apprenons chaque jour en coupant, en cousant et en posant. Des conseils concrets pour habiller vos fenêtres et vos assises.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <nav className="flex gap-7 md:gap-8 overflow-x-auto scrollbar-hide border-b border-[var(--pale)] py-6" aria-label="Filtrer les articles">
          {articleCategories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 bg-transparent border-0 p-0 font-['MaisonNeue'] font-bold text-[9px] tracking-[2px] uppercase cursor-pointer ${activeCategory === category ? 'text-[var(--moka)] border-b-2 border-[var(--primary)] pb-3 -mb-[25px]' : 'text-[var(--warm)]'}`}>
              {category}
            </button>
          ))}
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 py-8 md:py-10 items-center">
          <Link to={`/conseils/${featuredArticle.slug}`} className="relative block overflow-hidden aspect-[4/3] group">
            <img src={featuredArticle.image} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-3 left-3 bg-[var(--linen)] px-2 py-1 font-['MaisonNeue'] text-[9px] text-[var(--charcoal)]">{featuredArticle.imageCaption}</span>
          </Link>
          <div>
            <p className="font-['MaisonNeue'] font-bold text-[9px] tracking-[2px] uppercase text-[var(--primary)] mb-5">À LA UNE <span className="mx-2">—</span> {featuredArticle.category}</p>
            <h2 className="font-['FreeSerif'] font-black text-[34px] md:text-[42px] text-[var(--moka)] leading-[1.03] mb-5"><Link to={`/conseils/${featuredArticle.slug}`} className="no-underline text-inherit hover:text-[var(--primary)] transition-colors">{featuredArticle.title}</Link></h2>
            <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--charcoal)] leading-[1.7] mb-5">{featuredArticle.excerpt}</p>
            <div className="flex items-center gap-5"><span className="font-['MaisonNeue'] font-light text-[11px] text-[var(--primary)]">{featuredArticle.date} · {featuredArticle.readingTime}</span><Link to={`/conseils/${featuredArticle.slug}`} className="font-['MaisonNeue'] font-bold text-[10px] tracking-[2px] uppercase text-[var(--moka)] border-b border-[var(--primary)] pb-1 no-underline">LIRE L’ARTICLE</Link></div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <div className="flex items-baseline justify-between mb-7"><h2 className="font-['FreeSerif'] font-black text-[32px] md:text-[40px] text-[var(--moka)]">Derniers articles</h2><span className="font-['MaisonNeue'] text-[11px] text-[var(--primary)]">{filteredArticles.length} articles</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
            {latestArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
          {latestArticles.length === 0 && <p className="font-['MaisonNeue'] text-[14px] text-[var(--warm)] py-8">Aucun article dans cette catégorie.</p>}
          <div className="hidden md:flex justify-center items-center gap-7 py-14"><span className="bg-[var(--moka)] text-[var(--linen)] px-4 py-3 font-['MaisonNeue'] font-bold text-[11px]">1</span><button className="bg-transparent border-0 font-['MaisonNeue'] text-[12px] text-[var(--moka)] cursor-pointer">2</button><button className="bg-transparent border-0 font-['MaisonNeue'] text-[12px] text-[var(--moka)] cursor-pointer">3</button><button className="bg-transparent border-0 border-b border-[var(--primary)] pb-1 font-['MaisonNeue'] font-bold text-[10px] tracking-[2px] uppercase text-[var(--moka)] cursor-pointer">PAGE SUIVANTE</button></div>
          <button className="md:hidden w-full border border-[var(--moka)] bg-transparent py-4 font-['MaisonNeue'] font-bold text-[10px] tracking-[2px] uppercase text-[var(--moka)]">VOIR PLUS D’ARTICLES</button>
        </section>
      </div>

      <ProjectBlock />
      <ReassuranceStrip />
    </div>
  );
}
