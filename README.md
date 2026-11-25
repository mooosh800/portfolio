# LAMA ALHBABY — Creative Portfolio

A dark editorial, cinematic portfolio for **Lama Alhbaby**, built as a digital experience rather than a template.

- **Stack:** React + TypeScript + Vite + Tailwind CSS + Motion + Lucide
- **Source of work:** [Behance — moooshalhbaby](https://www.behance.net/moooshalhbaby)
- **Deploy target:** Cloudflare Pages (`main` → automatic deployments)

---

## 1. Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run typecheck   # TypeScript check
npm run build       # production build → dist/
npm run preview     # preview the production build
```

> Node.js 20.19+ or 22+ is recommended.

---

## 2. Project structure

```
src/
  data/
    profile.ts        # verified biography facts
    links.ts          # EDITABLE email / Behance / LinkedIn / Instagram
    theme.ts          # visual identity tokens
    experience.ts     # verified experience + editable role/education/certificate arrays
    projects.ts       # AUTO-GENERATED from data/raw — 15 Behance projects
  components/         # Hero, Work, ProjectCard, Lightbox, Navigation, ...
  pages/              # HomePage, ProjectPage, NotFoundPage
  types.ts
public/
  images/projects/    # local, optimized original Behance artwork
  _redirects          # SPA fallback for Cloudflare Pages
  sitemap.xml
data/raw/             # raw extraction from Behance (audit trail)
scripts/prepare-assets.mjs
legacy/               # files from the repository before this rebuild (preserved)
```

### Adding / editing a project

1. Add the new raw entry to `data/raw/` (or edit an existing detail file).
2. Run `npm run assets`.
3. The script downloads the original Behance images, converts them to WebP, updates
   `src/data/projects.ts`, and regenerates the sitemap.

For a manual edit, change `src/data/projects.ts` directly — it is a plain TypeScript array.
Every project opens at `/work/:slug`.

### Changing contact links

Edit `src/data/links.ts`. Email and Instagram are intentionally empty because they are not
published on the source Behance profile; add real values there and they appear automatically in
the Contact section and footer. Nothing is fabricated.

### Changing colors / typography

Edit `src/data/theme.ts` and `tailwind.config.ts`.

---

## 3. Content integrity

- 15 published projects were extracted from the public Behance account (12 on page 1 + 3 on page 2).
- Covers and internal images are the **original Behance files**, downloaded and optimized locally.
- Publish dates, creative fields and profile statistics come from the public Behance data.
- Project descriptions on Behance are empty, so no narrative descriptions were invented; cards show
  only verified metadata.
- The Experience section shows only verified public information. No employers, dates, degrees or
  certificates were invented. Ready-to-fill arrays live in `src/data/experience.ts`.
- Behance marks the work as “All Rights Reserved”. The artwork is presented here with the account
  owner's authorization for this portfolio. Keep attribution in the footer when reusing.

---

## 4. Cloudflare Pages deployment

Connect the repository in the Cloudflare dashboard:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Environment variables | none required |

`public/_redirects` ensures deep links such as `/work/massar` resolve to the SPA.

Live URL: <https://portfolio-5ld.pages.dev/>

---

## 5. Git workflow

```bash
git status
git add .
git commit -m "Complete Creative Portfolio Website"
git push origin main
```

The repository history and pre-existing files are preserved; older site files live under `legacy/`.
