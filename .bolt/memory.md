# Project memory

## Product intent & audience

- French-language website for a home/maison collection brand
- Features a product collection page (`Collection maison`) with plaid/home textile items
- Audience: French-speaking customers browsing home décor/textiles

## Brand personality & voice

- All visible UI text is in French (must be preserved)
- Refined, editorial tone; not generic/cookie-cutter
- Detail-oriented: precise dimension formatting matters

## Visual design & UX direction

- Custom fonts in use: `MaisonNeue` (primary/headings), `DM_Sans` (secondary)
- CSS custom property `--warm` for warm accent text color (approx `#7B514A`)
- Product card layout: image + product name + size/sub line
- Product names: `text-[14px] md:text-[16px] leading-tight`
- Size/sub line: `font-['MaisonNeue'] font-light text-[13px] text-[var(--warm)]` — lowercase, not uppercase
- Dimension format: `NNNxNN cm` using lowercase `x` (not `×`), e.g. `140x180 cm`, `140x180 cm ou 140x250 cm`
- Navigation: desktop + mobile menus; links rendered uppercase via existing classes
- Menu label for collection page: "Notre collection maison" (both desktop & mobile)

## Decisions, constraints & rationale

- Stack: Vite + React, JSX, Tailwind CSS, Lucide React icons (per `.bolt/prompt`)
- No extra UI/icon packages unless explicitly requested
- Production-quality, non-cookie-cutter designs expected
- When editing, preserve all existing French text and unrelated styling/behavior

## Open questions & assumptions

- `MaisonNeue` assumed available via local font files or CSS import (not a package install)
- Full product list and other pages not yet reviewed; styling patterns inferred from `CollectionMaison.tsx` may apply site-wide
- Exact value of `--warm` and other theme tokens not confirmed beyond this page