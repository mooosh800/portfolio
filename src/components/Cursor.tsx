import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }
    let frame = 0

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      const interactive = (event.target as HTMLElement | null)?.closest('a, button, [data-cursor="active"]')
      ring.current?.classList.toggle('is-active', Boolean(interactive))
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16
      if (ring.current) ring.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    frame = window.requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
