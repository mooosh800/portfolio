import { ArrowUp } from 'lucide-react'
import { links } from '@/data/links'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="shell py-14 lg:py-20">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <p className="eyebrow mb-4">Creative direction · Visual thinking</p>
            <p className="display text-[clamp(2.2rem,7vw,6rem)] leading-none">
              LAMA <span className="outline-text">ALHBABY</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-accent"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center border border-white/20 transition-colors group-hover:border-accent">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lama Alhbaby · All rights reserved</p>
          <p>
            Original artwork sourced from{' '}
            <a href={links.behance} target="_blank" rel="noreferrer" className="link-underline hover:text-accent">
              Behance
            </a>
          </p>
          <p>Saudi Arabia · Available for freelance</p>
        </div>
      </div>
    </footer>
  )
}
