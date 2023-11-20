type Direction = 'up' | 'right' | 'down' | 'left'

export const staggerContainer = (
  staggerChildren?: number,
  delayChildren?: number
) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      duration: 0.5,
    },
  },
}

export const fadeIn = (
  direction?: Direction,
  duration?: number,
  delay?: number,
  type?: string
) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: 'easeOut',
    },
  },
})

export const rollingImg = (direction?: 'left' | 'right') => ({
  hidden: {
    x: direction === 'left' ? '-100%' : '100%',
    rotate: 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.8,
      delay: 0.5,
    },
  },
})
