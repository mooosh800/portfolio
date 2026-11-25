import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import HomePage from '@/pages/HomePage'
import ProjectPage from '@/pages/ProjectPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { theme } from '@/data/theme'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    const id = hash.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/work/')) return
    const base = 'Lama Alhbaby — Creative Direction & Visual Thinking'
    document.title = location.pathname === '/' ? base : `${base} — Page not found`
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-3 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.2em] focus:text-white"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollManager />
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: theme.motion.fast, ease: theme.motion.ease }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer />
      <ScrollToTopButton />
      <Cursor />
    </div>
  )
}
