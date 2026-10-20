import { Link } from 'react-router-dom';

const creationLinks = [
  { label: 'Rideaux', to: '/realisations/rideaux' },
  { label: 'Voilages', to: '/realisations/voilages' },
  { label: 'Stores', to: '/realisations/stores' },
  { label: 'Indoor', to: '/realisations/revetement-interieur' },
  { label: 'Outdoor', to: '/realisations/revetement-exterieur' },
  { label: 'Sellerie bateau', to: '/realisations/nautique-sellerie-sur-mesure' },
  { label: 'Professionnels', to: '/professionnels' },
];

const aboutLinks = [
  { label: 'Notre showroom', to: '/showroom' },
  { label: 'Notre histoire', to: '/histoire' },
  { label: 'Nos conseils', to: '/conseils' },
  { label: 'Contact', to: '/contact' },
];

const linkClassName =
  "font-['MaisonNeue'] font-normal text-[12px] leading-[1.6] text-white no-underline transition-colors hover:text-[#A0716B]";
const titleClassName =
  "font-['MaisonNeue'] font-normal text-[10px] tracking-[0.15em] uppercase text-white mb-5";

export default function Footer() {
  return (
    <footer className="bg-[#8d6963] px-6 py-10 md:px-12 md:py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-10 md:gap-y-12">
        <div className="col-span-2 flex flex-col items-center pt-6 text-center md:col-span-1 md:items-start md:pt-10 md:text-left">
          <img
            src={`${import.meta.env.BASE_URL}assets/shortlogo+baseline_negatif.png`}
            alt="Nuances Décoration — L'art du sur-mesure"
            className="h-24 w-auto object-contain md:h-28"
          />
          <p className="mt-5 max-w-[220px] font-['MaisonNeue'] text-[12px] leading-[1.6] text-white">
            Atelier de confection de décoration
            <div>sur mesure à Marseille.</div>
          </p>
        </div>

        <div>
          <h2 className={titleClassName}>Nos créations sur mesure</h2>
          <nav aria-label="Nos créations sur mesure" className="flex flex-col items-start gap-2">
            {creationLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className={titleClassName}>Nuances décoration</h2>
          <nav aria-label="Nuances décoration" className="flex flex-col items-start gap-2">
            {aboutLinks.map((link) => (
              <Link key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h2 className={titleClassName}>Nous trouver</h2>
          <div className="flex flex-col gap-2 font-['MaisonNeue'] text-[12px] leading-[1.6] text-white">
            <p>63 Av. de Montredon<br />13008 Marseille, France</p>
            <p>07 59 57 40 98<br />06 03 65 79 97</p>
            <p>Lun – Ven : 9h00 – 18h00<br />Samedi : sur rendez-vous<br />Dimanche : Fermé</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-3 border-t border-white/20 pt-5 font-['MaisonNeue'] text-[11px] text-white md:mt-12 md:flex-row md:justify-between">
        <span>© 2026 Nuances Décoration</span>
        <span className="flex flex-wrap justify-center gap-x-2">
          <Link to="/cgv" className={linkClassName}>Mentions légales</Link>
          <span aria-hidden="true">·</span>
          <Link to="/cgv" className={linkClassName}>Confidentialité</Link>
        </span>
      </div>
    </footer>
  );
}
