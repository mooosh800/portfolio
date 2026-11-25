import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { theme } from '@/data/theme'

const items = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'process', label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? 'border-b border-white/10 bg-black/85 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
          <button
            type="button"
            onClick={() => go('top')}
            className="group flex items-center gap-3"
            title="Back to top"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden border border-accent">
              <span className="absolute inset-0 bg-accent transition-transform duration-500 ease-cinematic group-hover:translate-y-0 translate-y-full" />
              <span className="relative font-mono text-[10px] font-medium text-paper mix-blend-difference">LA</span>
            </span>
            <span className="text-left font-mono text-[10px] uppercase leading-[1.35] tracking-[0.24em] sm:text-[11px]">
              Lama Alhbaby
              <span className="block text-[8px] tracking-[0.28em] text-muted">Creative Direction</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className="group flex items-baseline gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-paper"
              >
                <span className="text-[8px] text-accent">0{index + 1}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://www.behance.net/moooshalhbaby"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 border border-white/20 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-accent hover:bg-accent sm:inline-flex"
            >
              Behance <ArrowUpRight size={12} />
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-white/20 xl:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-white/5">
          <motion.div
            className="h-px origin-left bg-accent"
            style={{ scaleX: 0 }}
            animate={{ scaleX: scrolled ? 1 : 0 }}
            transition={{ duration: 0.8, ease: theme.motion.ease }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black px-6 pb-10 pt-32 xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: theme.motion.ease }}
          >
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.5, ease: theme.motion.ease }}
                  className="group flex items-center gap-5 border-b border-white/10 py-4 text-left"
                >
                  <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
                  <span className="display text-[clamp(2.1rem,9vw,4rem)] transition-colors duration-300 group-hover:text-accent">
                    {item.label}
                  </span>
                  <ArrowUpRight className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.button>
              ))}
            </nav>
            <div className="flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              <span>Saudi Arabia · Available for freelance</span>
              <span className="text-accent">LA / 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
