import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = 4173;
const SITE = 'https://nuancesdecoration.com';

// '/' EN DERNIER : il écrase dist/index.html (fallback SPA des autres routes)
const ROUTES = [
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
  '/',
];

// Anciennes URL -> nouvelles (GitHub Pages ne permet pas de vraie 301)
const REDIRECTS = {
  '/realisations/bateaux': '/realisations/nautique-sellerie-sur-mesure/',
};

const server = await preview({ preview: { port: PORT, strictPort: true } });
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
let errors = 0;

try {
  for (const route of ROUTES) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      const html = await page.content();
      const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, html);
      console.log(`✓ ${route}  (${Math.round(html.length / 1024)} Ko)`);
    } catch (e) {
      errors++;
      console.error(`✗ ${route} : ${e.message}`);
    }
  }

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
  const urls = ROUTES.map((r) => (r === '/' ? '/' : `${r}/`));
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
