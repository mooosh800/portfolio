import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { theme } from '@/data/theme'

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

const layoutClasses = [
  'lg:col-span-12',
  'lg:col-span-7',
  'lg:col-span-5 lg:mt-24',
  'lg:col-span-5',
  'lg:col-span-7 lg:mt-20',
  'lg:col-span-12',
]

const aspectClasses = [
  'aspect-[16/8] sm:aspect-[21/9]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[16/9]',
  'aspect-[21/9] sm:aspect-[24/8]',
]

export default function ProjectCard({ project, index, className = '' }: ProjectCardProps) {
  const position = index % layoutClasses.length

  return (
    <motion.article
      className={`group relative ${layoutClasses[position]} ${className}`}
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.06, ease: theme.motion.ease }}
    >
      <Link to={`/work/${project.slug}`} className="block" aria-label={`View project ${project.title}`}>
        <div className={`relative overflow-hidden bg-charcoal ${aspectClasses[position]}`}>
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading="lazy"
            decoding="async"
            className="project-image h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 sm:left-6 sm:top-6">
            <span className="h-1.5 w-1.5" style={{ backgroundColor: project.sourceColor }} />
            {String(index + 1).padStart(2, '0')} / {String(project.year)}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div>
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.24em] text-accent">{project.category}</p>
              <h3 className="display text-[clamp(1.35rem,3.2vw,3.2rem)] leading-none text-paper">{project.title}</h3>
              {project.title !== project.titleLatin && (
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">{project.titleLatin}</p>
              )}
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/40 bg-black/30 backdrop-blur-sm transition-all duration-500 group-hover:border-accent group-hover:bg-accent">
              <ArrowUpRight size={17} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>{project.disciplines.length ? project.disciplines.join(' · ') : 'Visual communication'}</span>
        <a
          href={project.behanceUrl}
          target="_blank"
          rel="noreferrer"
          className="link-underline shrink-0 transition-colors hover:text-accent"
        >
          Original ↗
        </a>
      </div>
    </motion.article>
  )
}
