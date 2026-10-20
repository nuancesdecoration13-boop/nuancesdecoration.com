import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const articles = [
  {
    category: 'Bien choisir',
    title: 'Quel tissu choisir pour vos rideaux ?',
    image: `${import.meta.env.BASE_URL}conseil-domicile.jpg`,
  },
  {
    category: 'Prise de mesures',
    title: 'Les bonnes mesures pour un projet réussi',
    image: `${import.meta.env.BASE_URL}prise-mesure.jpg`,
  },
  {
    category: 'Entretien',
    title: 'Entretenir vos rideaux au fil des saisons',
    image: `${import.meta.env.BASE_URL}finissions.jpg`,
  },
];

export default function Conseils() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Nos conseils — Nuances Décoration, Marseille"
        description="Choisir un tissu, prendre ses mesures, entretenir ses rideaux : nos conseils d'atelier pour vous aider à préparer votre projet."
        path="/conseils"
      />

      <section className="bg-[var(--grege-p)] px-6 py-16 md:px-12 md:py-24 text-center">
        <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[4px] uppercase text-[var(--primary)] mb-5 block">
          NOS CONSEILS
        </span>
        <h1 className="font-['FreeSerif'] font-black text-[44px] md:text-[60px] text-[var(--moka)] leading-[1.05] mb-6">
          Conseils & inspirations
        </h1>
        <div className="w-16 h-[2px] bg-[var(--primary)] mx-auto mb-8"></div>
        <p className="font-['MaisonNeue'] font-light text-[14px] text-[var(--warm)] leading-[1.9] max-w-2xl mx-auto">
          Choisir un tissu, prendre ses mesures, entretenir ses rideaux : nos conseils d'atelier pour vous aider à préparer votre projet.
        </p>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article) => (
              <article key={article.title} className="group">
                <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-[var(--grege-p)]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-['MaisonNeue'] font-thin text-[9px] tracking-[3px] uppercase text-[var(--primary)]">
                  {article.category}
                </span>
                <h2 className="font-['FreeSerif'] font-black text-[24px] text-[var(--moka)] leading-[1.15] mt-3 mb-5">
                  {article.title}
                </h2>
                <Link
                  to="/conseils"
                  className="inline-block font-['MaisonNeue'] font-bold text-[10px] tracking-[2.5px] uppercase text-[var(--moka)] no-underline border-b border-[var(--primary)] pb-1 transition-colors hover:text-[var(--primary)]"
                >
                  LIRE L'ARTICLE
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
