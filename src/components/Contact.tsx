import { ArrowUpRight, Mail } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { links } from '@/data/links'

const channels = [
  { label: 'Behance', value: 'moooshalhbaby', href: links.behance, external: true },
  { label: 'LinkedIn', value: 'View verified profile', href: links.linkedin, external: true },
  ...(links.email ? [{ label: 'Email', value: links.email, href: `mailto:${links.email}`, external: false }] : []),
  ...(links.instagram ? [{ label: 'Instagram', value: links.instagram.split('/').filter(Boolean).pop() || '@', href: links.instagram, external: true }] : []),
]

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-black py-24 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,35,45,0.12),transparent_45%)]" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="eyebrow">
            <span className="mr-3 text-accent">06</span> Contact
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">Open for freelance</p>
        </div>

        <h2 className="display text-[clamp(2.8rem,10.5vw,10.5rem)]">
          <Reveal>
            <span className="block">HAVE A VISION?</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block outline-text">LET'S MAKE</span>
          </Reveal>
          <Reveal delay={0.14}>
            <span className="block text-accent">IT REAL.</span>
          </Reveal>
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="max-w-sm text-base leading-relaxed text-white/60">
                Have a project in mind, a story to shape or a brand that needs a point of view? Start the conversation.
              </p>
              <a
                href={links.behance}
                target="_blank"
                rel="noreferrer"
                className="btn btn--solid mt-8"
              >
                <span>Message on Behance</span>
                <Mail size={14} />
              </a>
            </div>
          </Reveal>

          <div className="border-t border-white/10">
            {channels.map((channel, index) => (
              <Reveal key={channel.label} delay={index * 0.05}>
                <a
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noreferrer' : undefined}
                  className="group grid grid-cols-[0.8fr_1.2fr_auto] items-center gap-4 border-b border-white/10 py-6 transition-colors duration-500 hover:text-accent sm:py-7"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted">{channel.label}</span>
                  <span className="truncate text-lg font-medium sm:text-2xl">{channel.value}</span>
                  <ArrowUpRight
                    size={20}
                    className="text-muted transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
