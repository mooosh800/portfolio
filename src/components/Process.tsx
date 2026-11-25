import { motion } from 'motion/react'
import Reveal from '@/components/Reveal'

const steps = [
  { title: 'Research', text: 'Understand the context, audience and the question behind the brief.' },
  { title: 'Concept Development', text: 'Explore directions until one idea carries enough weight to lead.' },
  { title: 'Strategy', text: 'Turn the concept into a clear system, tone and visual logic.' },
  { title: 'Art Direction', text: 'Shape the look, feel and composition of every touchpoint.' },
  { title: 'Execution', text: 'Produce the work with care across design, image and motion.' },
  { title: 'Refinement', text: 'Edit, polish and align the final details into one coherent whole.' },
]

export default function Process() {
  return (
    <section id="process" className="relative bg-black py-24 lg:py-36">
      <div className="shell">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">04</span> Creative Process
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">From thought to form</p>
        </div>

        <h2 className="display mb-16 text-[clamp(2.6rem,9vw,9rem)] lg:mb-24">
          <Reveal>
            <span className="block">FROM THOUGHT</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block outline-text">TO FORM.</span>
          </Reveal>
        </h2>

        <div className="relative grid gap-0 lg:grid-cols-2 lg:gap-x-20">
          <div className="absolute left-[13px] top-4 hidden h-[calc(100%-2rem)] w-px bg-white/10 lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex gap-6 border-b border-white/10 py-8 lg:gap-10 lg:py-10">
              <motion.div
                className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 bg-black"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <span className="h-2 w-2 bg-accent" />
              </motion.div>
              <Reveal delay={index * 0.04} className="flex-1">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                  <h3 className="text-[clamp(1.25rem,2.8vw,2.2rem)] font-medium tracking-tight2">{step.title}</h3>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">{step.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
