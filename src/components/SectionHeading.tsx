import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'

interface SectionHeadingProps {
  index: string
  label: string
  lines: [string, string]
  trailing?: ReactNode
}

export default function SectionHeading({ index, label, lines, trailing }: SectionHeadingProps) {
  return (
    <div className="mb-12 lg:mb-20">
      <Reveal>
        <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">{index}</span> {label}
          </p>
          {trailing && <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">{trailing}</div>}
        </div>
      </Reveal>
      <h2 className="display text-[clamp(2.6rem,9vw,9rem)]">
        <Reveal>
          <span className="block">{lines[0]}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="block outline-text">{lines[1]}</span>
        </Reveal>
      </h2>
    </div>
  )
}
