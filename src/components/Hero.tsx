import { motion, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { theme } from '@/data/theme'

const lineVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { delay: 0.18 + i * 0.11, duration: 1.05, ease: theme.motion.ease },
  }),
}

export default function Hero() {
  const reduced = useReducedMotion()
  const cover = projects[0]?.cover

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[76px] lg:pt-[88px]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {cover && (
          <motion.img
            src={cover.src}
            alt=""
            className="h-full w-full object-cover opacity-[0.13] grayscale"
            initial={{ scale: 1.14, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.13 }}
            transition={{ duration: 2.4, ease: theme.motion.ease }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,35,45,0.09),transparent_45%)]" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-16 lg:py-24">
        <div className="mb-10 flex items-center gap-4 overflow-hidden">
          <motion.span
            className="h-[7px] w-[7px] shrink-0 bg-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          />
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.8, ease: theme.motion.ease }}
          >
            Independent creative · Saudi Arabia · Selected work 2025—2026
          </motion.p>
        </div>

        <h1 className="display text-[clamp(3.6rem,14.7vw,15.5rem)]">
          {['LAMA', 'ALHBABY'].map((word, index) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${index === 1 ? 'outline-text' : ''}`}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 border-t border-white/10 pt-8 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
          <div className="space-y-1 font-mono text-[clamp(0.72rem,1.35vw,1.05rem)] uppercase tracking-[0.16em] sm:tracking-[0.22em]">
            {profile.heroLines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${index === 2 ? 'text-accent' : ''}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index + 2}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: theme.motion.ease }}
          >
            <p className="text-[15px] leading-relaxed text-white/65 sm:text-base">{profile.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="btn btn--solid" onClick={() => scrollTo('work')}>
                <span>Explore My Work</span>
                <ArrowDownRight size={14} />
              </button>
              <button type="button" className="btn" onClick={() => scrollTo('about')}>
                <span>About Me</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="shell relative z-10 pb-7">
        <div className="flex items-end justify-between gap-6">
          <motion.button
            type="button"
            onClick={() => scrollTo('about')}
            className="group flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <span className="relative block h-14 w-px overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                animate={reduced ? { y: '0%' } : { y: ['-100%', '200%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            Scroll to discover
          </motion.button>
          <div className="hidden text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-muted sm:block">
            <span className="block">Behance / moooshalhbaby</span>
            <span className="block text-accent">{projects.length} selected projects</span>
          </div>
        </div>
      </div>
    </section>
  )
}
