import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="shell flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow mb-6 text-accent">Error 404</p>
      <h1 className="display text-[clamp(4rem,18vw,14rem)]">NO FRAME.</h1>
      <p className="mt-6 max-w-md text-white/50">The page you are looking for is not part of this archive.</p>
      <Link to="/" className="btn mt-10">
        <span>Return home</span>
        <ArrowUpRight size={14} />
      </Link>
    </main>
  )
}
