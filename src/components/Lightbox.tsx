import { useCallback, useEffect } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ProjectImage } from '@/types'

interface LightboxProps {
  images: ProjectImage[]
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const next = useCallback(() => {
    if (index === null) return
    onChange((index + 1) % images.length)
  }, [index, images.length, onChange])

  const previous = useCallback(() => {
    if (index === null) return
    onChange((index - 1 + images.length) % images.length)
  }, [index, images.length, onChange])

  useEffect(() => {
    if (index === null) return
    document.body.classList.add('is-locked')
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onClose, next, previous])

  return (
    <AnimatePresence>
      {index !== null && images[index] && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black/97 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Project image gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
              Image <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(images.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center border border-white/25 transition-colors hover:border-accent hover:bg-accent"
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-24" onClick={(event) => event.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                width={images[index].width}
                height={images[index].height}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-[76vh] max-w-full object-contain"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previous}
                  className="absolute left-3 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 transition-colors hover:border-accent hover:bg-accent sm:left-8"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 transition-colors hover:border-accent hover:bg-accent sm:right-8"
                  aria-label="Next image"
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>

          <div className="px-5 pb-6 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:pb-8">
            {images[index].caption || images[index].alt}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
