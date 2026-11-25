import { motion } from 'motion/react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import Reveal from '@/components/Reveal'

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-black py-24 lg:py-36">
      <div className="shell">
        <div className="mb-12 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">01</span> About
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">Behind the work</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <div>
            <h2 className="display text-[clamp(2.6rem,8.4vw,8.4rem)]">
              <Reveal>
                <span className="block">BEHIND</span>
              </Reveal>
              <Reveal delay={0.08}>
                <span className="block outline-text">THE VISION.</span>
              </Reveal>
            </h2>

            <Reveal delay={0.15}>
              <div className="mt-12 max-w-2xl space-y-6 text-[15px] leading-[1.85] text-white/65 sm:text-base">
                {profile.aboutBody.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? 'text-paper/85' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:pt-12">
            <Reveal delay={0.1}>
              <p className="eyebrow mb-5">At a glance</p>
              <dl className="grid grid-cols-2 border-t border-white/10">
                {[
                  ['Role', 'Creative Director'],
                  ['Base', profile.location],
                  ['Practice', 'Graphic design · UGC · Photography'],
                  ['Status', 'Available for freelance'],
                ].map(([term, value], index) => (
                  <div
                    key={term}
                    className={`border-b border-white/10 py-5 ${index % 2 === 0 ? 'pr-5' : 'pl-5 sm:pl-8'}`}
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted">{term}</dt>
                    <dd className="mt-2 text-sm leading-snug text-paper/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-4 border border-white/10 p-6">
                {[
                  { value: String(projects.length).padStart(2, '0'), label: 'Projects' },
                  { value: String(profile.stats.appreciations).padStart(2, '0'), label: 'Appreciations' },
                  { value: String(profile.stats.projectViews).padStart(3, '0'), label: 'Views' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <motion.p
                      className="display text-[clamp(1.6rem,4vw,3rem)] text-accent"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                Public figures from the source Behance profile.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
