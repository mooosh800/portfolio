import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import Lightbox from '@/components/Lightbox'
import Reveal from '@/components/Reveal'
import { projects } from '@/data/projects'
import { theme } from '@/data/theme'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!project) return
    const title = `${project.title} — Lama Alhbaby`
    document.title = title
    const meta = document.querySelector('meta[property="og:title"]')
    meta?.setAttribute('content', title)
    const image = document.querySelector('meta[property="og:image"]')
    image?.setAttribute('content', `${window.location.origin}${project.cover.src}`)
    return () => {
      document.title = 'Lama Alhbaby — Creative Direction & Visual Thinking'
      meta?.setAttribute('content', 'Lama Alhbaby — Creative Direction. Visual Thinking.')
      image?.setAttribute('content', `${window.location.origin}/og-cover.jpg`)
    }
  }, [project])

  if (!project) {
    return (
      <main className="shell flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
        <p className="eyebrow mb-5 text-accent">404 / Project not found</p>
        <h1 className="display text-5xl sm:text-8xl">LOST FRAME.</h1>
        <Link to="/" className="btn mt-10">
          <span>Back to home</span>
          <ArrowUpRight size={14} />
        </Link>
      </main>
    )
  }

  const index = projects.findIndex((item) => item.id === project.id)
  const next = projects[(index + 1) % projects.length]
  const previous = projects[(index - 1 + projects.length) % projects.length]

  return (
    <main id="main-content" className="pt-[76px] lg:pt-[88px]">
      <section className="shell pb-14 pt-14 lg:pb-20 lg:pt-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <Link to="/#work" className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-accent">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> All work
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: theme.motion.ease }}>
          <p className="eyebrow mb-6">
            <span className="mr-3 text-accent">{project.category}</span> · {project.year}
          </p>
          <h1 className="display text-[clamp(2.8rem,10vw,10rem)]">{project.title}</h1>
          {project.title !== project.titleLatin && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">{project.titleLatin}</p>
          )}
          <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">{project.summary}</p>
            <div className="flex flex-wrap items-center gap-3">
              {project.disciplines.map((discipline) => (
                <span key={discipline} className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  {discipline}
                </span>
              ))}
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--solid ml-auto"
              >
                <span>View on Behance</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="shell">
        <motion.figure
          className="relative overflow-hidden bg-charcoal"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: theme.motion.ease }}
        >
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            className="max-h-[86vh] w-full object-contain"
            fetchPriority="high"
          />
        </motion.figure>
      </div>

      <section className="shell py-20 lg:py-28">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">Gallery</span> Original project images
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            {String(project.images.length).padStart(2, '0')} frames · click to expand
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {project.images.map((image, imageIndex) => {
            const ratio = image.width / image.height
            const span =
              ratio < 0.85
                ? 'lg:col-span-5 lg:col-start-4'
                : ratio < 1.25
                  ? 'lg:col-span-7 lg:col-start-3'
                  : 'lg:col-span-12'
            return (
              <Reveal key={`${image.src}-${imageIndex}`} delay={(imageIndex % 3) * 0.05} className={span}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(imageIndex)}
                  className="group relative block w-full overflow-hidden bg-charcoal"
                  aria-label={`Open image ${imageIndex + 1} of ${project.images.length}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain transition-transform duration-700 ease-cinematic group-hover:scale-[1.015]"
                  />
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
                    <Maximize2 size={15} />
                  </span>
                  <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.22em] text-white/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {String(imageIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
          <p className="max-w-xl text-sm leading-relaxed text-white/45">
            All visuals are the original artworks published on the source Behance project. Motion pieces are presented
            via their original cover — view the Behance project for full videos.
          </p>
          <a href={project.behanceUrl} target="_blank" rel="noreferrer" className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Open original project ↗
          </a>
        </div>
      </section>

      <nav className="border-t border-white/10 bg-charcoal" aria-label="Project navigation">
        <div className="shell grid gap-0 sm:grid-cols-2">
          <Link to={`/work/${previous.slug}`} className="group border-b border-white/10 px-0 py-12 sm:border-b-0 sm:border-r sm:pr-10">
            <p className="eyebrow mb-4 flex items-center gap-2"><ArrowLeft size={13} /> Previous</p>
            <p className="display text-[clamp(1.6rem,4vw,3.4rem)] transition-colors group-hover:text-accent">{previous.title}</p>
          </Link>
          <Link to={`/work/${next.slug}`} className="group py-12 sm:pl-10 sm:text-right">
            <p className="eyebrow mb-4 flex items-center gap-2 sm:justify-end">Next <ArrowRight size={13} /></p>
            <p className="display text-[clamp(1.6rem,4vw,3.4rem)] transition-colors group-hover:text-accent">{next.title}</p>
          </Link>
        </div>
      </nav>

      <Lightbox images={project.images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />
    </main>
  )
}
