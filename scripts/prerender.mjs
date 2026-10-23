import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const SITE = 'https://nuancesdecoration.com';
const MAX_PAGES = 500;

// Points de départ. Le script suit ensuite tous les liens internes trouvés :
// une nouvelle page reliée depuis le site est prise en compte automatiquement.
// N'ajouter ici que les pages reliées nulle part.
const SEEDS = [
  '/',
  '/realisations/rideaux',
  '/realisations/voilages',
  '/realisations/stores',
  '/realisations/revetement-interieur',
  '/realisations/revetement-exterieur',
  '/realisations/banquettes',
  '/realisations/nautique-sellerie-sur-mesure',
  '/realisations/banquettes-exterieur-sur-mesure',
  '/histoire',
  '/contact',
  '/professionnels',
  '/showroom',
  '/cgv',
];

// Anciennes URL -> nouvelles (GitHub Pages ne permet pas de vraie 301)
const REDIRECTS = {
  '/realisations/bateaux': '/realisations/nautique-sellerie-sur-mesure/',
};

const norm = (p) => {
  const s = p.replace(/\/+$/, '');
  return s === '' ? '/' : s;
};

const server = await preview({ preview: { port: PORT, strictPort: true } });
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();

const queue = SEEDS.map(norm);
const seen = new Set(queue);
const saved = [];
let homeHtml = null;
let errors = 0;

try {
  while (queue.length && saved.length < MAX_PAGES) {
    const route = queue.shift();
    if (REDIRECTS[route]) continue;
    try {
      await page.goto(ORIGIN + route, { waitUntil: 'networkidle0', timeout: 30000 });

      const finalRoute = norm(new URL(page.url()).pathname);
      if (finalRoute !== route) {
        console.log(`· ${route} redirige vers ${finalRoute} : ignorée`);
        continue;
      }

      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.href));
      for (const href of links) {
        const u = new URL(href);
        if (u.origin !== ORIGIN) continue;
        if (/\.[a-z0-9]+$/i.test(u.pathname)) continue;
        const r = norm(u.pathname);
        if (!seen.has(r)) {
          seen.add(r);
          queue.push(r);
        }
      }

      const html = await page.content();
      if (route === '/') {
        homeHtml = html; // écrit à la fin : dist/index.html sert de fallback pendant le parcours
      } else {
        const file = path.join(DIST, route, 'index.html');
        await mkdir(path.dirname(file), { recursive: true });
        await writeFile(file, html);
      }
      saved.push(route);
      console.log(`✓ ${route}  (${Math.round(html.length / 1024)} Ko)`);
    } catch (e) {
      errors++;
      console.error(`✗ ${route} : ${e.message}`);
    }
  }

  if (homeHtml) await writeFile(path.join(DIST, 'index.html'), homeHtml);

  for (const [from, to] of Object.entries(REDIRECTS)) {
    const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8">
<title>Page déplacée — Nuances Décoration</title>
<link rel="canonical" href="${SITE}${to}">
<meta http-equiv="refresh" content="0; url=${to}">
</head><body><p>Cette page a été déplacée : <a href="${to}">${SITE}${to}</a></p></body></html>`;
    const file = path.join(DIST, from, 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`↪ ${from} -> ${to}`);
  }

  // Sitemap : mêmes URL que les canonical (avec / final)
  const urls = saved
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
    .map((r) => (r === '/' ? '/' : `${r}/`));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}
</urlset>
`;
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`🗺  sitemap.xml (${urls.length} URL)`);
} finally {
  await browser.close();
  server.httpServer.close();
}
process.exit(errors ? 1 : 0);
