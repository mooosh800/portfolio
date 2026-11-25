import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { theme } from '@/data/theme'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export default function Reveal({ children, delay = 0, y = 40, className, once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -10% 0px' }}
      transition={{ duration: 0.85, delay, ease: theme.motion.ease }}
    >
      {children}
    </motion.div>
  )
}
