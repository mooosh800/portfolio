import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import { projects, projectCategories } from '@/data/projects'
import { theme } from '@/data/theme'
import type { ProjectCategory } from '@/types'

type Filter = 'All' | ProjectCategory

const filters: Filter[] = ['All', ...projectCategories]

export default function Work() {
  const [active, setActive] = useState<Filter>('All')

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((project) => project.category === active)),
    [active],
  )

  return (
    <section id="work" className="relative bg-black py-24 lg:py-36">
      <div className="shell">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">02</span> Selected Work
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            {String(visible.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} projects
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-end justify-between gap-8 lg:mb-16">
          <h2 className="display text-[clamp(2.8rem,10vw,10rem)]">
            <Reveal>
              <span className="block">SELECTED</span>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="block outline-text">WORK.</span>
            </Reveal>
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-xs pb-2 text-sm leading-relaxed text-white/50">
              A living archive of visual work — identities, editorial pieces, motion and cultural projects, presented in
              their original order from Behance.
            </p>
          </Reveal>
        </div>

        <div className="mb-12 flex flex-wrap gap-2 border-y border-white/10 py-4" role="tablist" aria-label="Filter projects by discipline">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active === filter}
              onClick={() => setActive(filter)}
              className={`relative px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                active === filter ? 'text-black' : 'text-muted hover:text-paper'
              }`}
            >
              {active === filter && (
                <motion.span
                  layoutId="work-filter"
                  className="absolute inset-0 bg-accent"
                  transition={{ duration: 0.45, ease: theme.motion.ease }}
                />
              )}
              <span className="relative">{filter}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-14 lg:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
