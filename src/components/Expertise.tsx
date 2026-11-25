import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import Reveal from '@/components/Reveal'

const expertise = [
  'Creative Direction',
  'Art Direction',
  'Brand Identity',
  'Visual Communication',
  'Creative Strategy',
  'Digital Marketing',
  'SEO',
  'AI-Assisted Creative Production',
  'Visual Storytelling',
  'Fashion Design',
]

export default function Expertise() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="expertise" className="relative overflow-hidden border-t border-white/10 bg-charcoal py-24 lg:py-36">
      <div className="shell">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">03</span> Expertise
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">Capabilities</p>
        </div>

        <h2 className="display mb-14 text-[clamp(2.6rem,8.6vw,8.6rem)] lg:mb-20">
          <Reveal>
            <span className="block">WHAT I BRING</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block outline-text">TO THE TABLE.</span>
          </Reveal>
        </h2>

        <div className="border-t border-white/10">
          {expertise.map((item, index) => (
            <Reveal key={item} delay={index * 0.025}>
              <motion.div
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex items-center gap-5 border-b border-white/10 px-2 py-5 transition-colors duration-500 sm:px-5 sm:py-7 ${
                  hovered === index ? 'text-black' : 'text-paper'
                }`}
              >
                <motion.span
                  className="absolute inset-0 origin-left bg-accent"
                  initial={false}
                  animate={{ scaleX: hovered === index ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className={`relative font-mono text-[10px] ${hovered === index ? 'text-black/60' : 'text-accent'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative text-[clamp(1.1rem,3.3vw,2.6rem)] font-medium tracking-tight2">{item}</span>
                <ArrowUpRight
                  className={`relative ml-auto shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    hovered === index ? 'text-black' : 'text-muted'
                  }`}
                  size={20}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
