interface MarqueeProps {
  items: string[]
  accentEvery?: number
}

export default function Marquee({ items, accentEvery = 3 }: MarqueeProps) {
  const content = [...items, ...items]
  return (
    <div className="hairline-marquee relative overflow-hidden border-y border-white/10 bg-charcoal/40 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap px-8">
            <span
              className={`display text-[clamp(1.1rem,2.6vw,2.2rem)] ${
                index % accentEvery === 0 ? 'text-accent' : 'text-paper/35'
              }`}
            >
              {item}
            </span>
            <span className="h-1 w-1 rotate-45 bg-paper/30" />
          </span>
        ))}
      </div>
    </div>
  )
}
