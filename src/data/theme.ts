/** Central visual identity — edit here to retheme the whole experience. */
export const theme = {
  colors: {
    black: '#080808',
    charcoal: '#151515',
    offWhite: '#F2F0EC',
    accent: '#C9232D',
    muted: '#858585',
  },
  type: {
    display: '"Archivo Black", Impact, "Arial Black", sans-serif',
    body: 'Inter, Arial, sans-serif',
    mono: '"IBM Plex Mono", monospace',
    arabic: 'Alexandria, Teshawal, sans-serif',
  },
  motion: {
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    duration: 0.9,
    fast: 0.45,
  },
} as const
