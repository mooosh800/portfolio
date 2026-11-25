/**
 * Prepares the portfolio data and local image library from the raw Behance
 * extraction stored in ./data/raw. Running this script is optional: the
 * generated files are committed so contributors only need `npm install`.
 *
 * Usage: npm run assets
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const rawDir = resolve(root, 'data/raw')
const outDir = resolve(root, 'public/images/projects')
const generatedDir = resolve(root, 'src/data')

let sharp = null
try {
  sharp = (await import('sharp')).default
} catch {
  console.warn('[assets] sharp not installed — original files will be copied instead of WebP conversion.')
}

const readJson = async (name) => JSON.parse(await readFile(resolve(rawDir, name), 'utf8'))

const slugOverrides = {
  258368901: 'documentary-focus',
  254913477: 'posters',
  254913437: 'wasm',
  254913319: 'hers',
  247395969: 'fa6een-agency',
  247275625: 'la-grassy-identity',
  244748361: 'founding-day-2026',
  224331475: 'thumbnails',
  240546657: 'fawn-caffe-identity',
  240546127: 'saudi-national-day',
  240455611: 'candy-craftwork',
  234123569: 'octoput',
  233936857: 'massar',
  221479271: 'founding-day-2025',
  221401155: 'sticooosh',
}

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function categoryFor(project) {
  const fields = (project.fields || []).map((f) => f.trim().toLowerCase())
  const has = (...words) => fields.some((f) => words.some((w) => f.includes(w)))
  const name = project.name.toLowerCase()
  const hasVideo = (project.modules || []).some((m) => m.type === 'VideoModule')

  if (name.includes('poster')) return 'Editorial Design'
  if (has('creative director', 'creative direction')) return 'Creative Direction'
  if (has('brand design', 'branding', 'brand identity', 'identity', 'logo')) return 'Brand Identity'
  if (has('video ads', 'filming', 'video editor') || (hasVideo && fields.length === 0)) return 'Digital Campaigns'
  if (has('coding', 'web', 'ui', 'ux')) return 'Digital & Experimental'
  if (has('illustrator', 'illustration')) return 'Visual Communication'
  return 'Visual Communication'
}

const toHex = ({ r = 0, g = 0, b = 0 } = {}) =>
  `#${[r, g, b].map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')).join('')}`.toUpperCase()

async function download(url, file) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; LamaPortfolioBuilder/1.0)',
      Referer: 'https://www.behance.net/',
    },
  })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await mkdir(dirname(file), { recursive: true })

  if (sharp) {
    const maxWidth = 1500
    const pipeline = sharp(buffer, { failOn: 'none' }).rotate()
    const meta = await pipeline.metadata().catch(() => null)
    if (meta?.width && meta.width > maxWidth) pipeline.resize({ width: maxWidth, withoutEnlargement: true })
    await pipeline.webp({ quality: 84, effort: 5 }).toFile(file)
    return { width: Math.min(meta?.width || 1200, maxWidth), height: Math.round((meta?.height || 900) * Math.min(1, maxWidth / (meta?.width || 1200))) }
  }

  const ext = url.includes('.png') ? 'png' : 'jpg'
  const target = file.replace(/\.webp$/, `.${ext}`)
  await writeFile(target, buffer)
  return { width: 1200, height: 900, file: target }
}

async function main() {
  const profile = await readJson('profile-projects.json')
  const details = [
    ...(await readJson('projects-01.json')),
    ...(await readJson('projects-02.json')),
    ...(await readJson('projects-03.json')),
  ]
  const byId = new Map(details.map((p) => [p.id, p]))
  const projects = []

  for (const item of profile) {
    const detail = byId.get(item.id) || {}
    const slug = slugOverrides[item.id] || slugify(item.name) || `project-${item.id}`
    const fields = [...new Set((detail.fields || []).map((f) => f.trim()).filter(Boolean))]
    const modules = detail.modules || []
    const images = []
    const coverFile = resolve(outDir, slug, 'cover.webp')

    process.stdout.write(`[assets] ${item.name} (${item.id}) — cover... `)
    const coverMeta = await download(item.cover, coverFile)
    images.push({
      src: `/images/projects/${slug}/cover.webp`,
      width: coverMeta.width,
      height: coverMeta.height,
      alt: `${item.name} — original Behance cover artwork`,
      caption: 'Original cover artwork',
    })
    console.log('ok')

    const sourceImages = modules.filter((m) => m.type === 'ImageModule' && m.src)
    for (let i = 0; i < sourceImages.length; i += 1) {
      const m = sourceImages[i]
      const file = resolve(outDir, slug, `${String(i + 1).padStart(2, '0')}.webp`)
      process.stdout.write(`  image ${i + 1}/${sourceImages.length}... `)
      const meta = await download(m.src, file)
      const src = meta.file
        ? meta.file.replace(/\\/g, '/').split('/images/')[1]
        : `projects/${slug}/${String(i + 1).padStart(2, '0')}.webp`
      images.push({
        src: `/images/${src}`,
        width: m.w || meta.width,
        height: m.h || meta.height,
        alt: `${item.name} — original artwork ${i + 1}`,
        caption: m.caption || '',
      })
      console.log('ok')
    }

    if (images.length === 1 && modules.some((m) => m.type === 'VideoModule')) {
      images[0].caption = 'Original cover artwork · video project (watch in full on Behance)'
    }

    const year = new Date(item.publishedOn * 1000).getUTCFullYear()
    projects.push({
      id: item.id,
      slug,
      title: item.name,
      titleLatin: slugOverrides[item.id] ? slugOverrides[item.id].replace(/-/g, ' ') : item.name,
      year,
      publishedOn: new Date(item.publishedOn * 1000).toISOString(),
      category: categoryFor({ ...detail, name: item.name }),
      disciplines: fields,
      summary:
        fields.length > 0
          ? `Original Behance project · Creative fields: ${fields.join(', ')} · ${images.length} visual${images.length > 1 ? 's' : ''}.`
          : `Original Behance project · ${images.length} visual${images.length > 1 ? 's' : ''}.`,
      behanceUrl: item.url,
      sourceColor: toHex(item.colors),
      appreciations: item.stats?.appreciations || 0,
      views: item.stats?.views || 0,
      cover: images[0],
      images,
    })
  }

  await mkdir(generatedDir, { recursive: true })
  const body = `/* AUTO-GENERATED from data/raw — run \`npm run assets\` to refresh. */\nimport type { Project } from '@/types'\n\nexport const projects: Project[] = ${JSON.stringify(projects, null, 2)}\n\nexport const projectCategories = ${JSON.stringify(
    [...new Set(projects.map((p) => p.category))],
    null,
    2,
  )} as const\n`
  await writeFile(resolve(generatedDir, 'projects.ts'), body, 'utf8')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://portfolio.pages.dev/</loc><priority>1.0</priority></url>\n${projects
    .map((p) => `  <url><loc>https://portfolio.pages.dev/work/${p.slug}</loc><priority>0.7</priority></url>`)
    .join('\n')}\n</urlset>\n`
  await writeFile(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8')

  console.log(`[assets] generated ${projects.length} projects and ${projects.reduce((n, p) => n + p.images.length, 0)} local images.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
