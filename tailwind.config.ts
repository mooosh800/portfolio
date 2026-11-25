import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        charcoal: '#151515',
        paper: '#F2F0EC',
        accent: '#C9232D',
        muted: '#858585',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'Arial Black', 'sans-serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        arabic: ['Alexandria', 'Tajawal', 'sans-serif'],
      },
      letterSpacing: {
        brutal: '-0.065em',
        tight2: '-0.035em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        blink: 'blink 2.4s ease-in-out infinite',
        lineGrow: 'lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
