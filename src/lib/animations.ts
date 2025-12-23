import { Variants } from 'framer-motion'

/**
 * Framer Motion Animation Variants for Circuit Sorcerer Theme
 * Consistent animations across the entire site
 */

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Fade in from top
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Scale up fade in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Stagger faster for grids
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Hover scale animation
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

// Glow pulse animation
export const glowPulse: Variants = {
  initial: { opacity: 0.8 },
  animate: {
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Glitch effect
export const glitchVariants: Variants = {
  initial: { x: 0, y: 0 },
  glitch: {
    x: [0, -2, 2, -2, 2, 0],
    y: [0, 2, -2, 2, -2, 0],
    transition: { duration: 0.4 },
  },
}

// Typing/Reveal animation
export const typewriter = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
}

// Rotate animation
export const rotate360: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Slide in from bottom (for mobile menu)
export const slideInBottom: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// Lightning strike effect
export const lightningStrike: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    pathLength: [0, 1, 1, 1],
    transition: {
      duration: 0.8,
      times: [0, 0.1, 0.9, 1],
      ease: 'easeInOut',
    },
  },
}

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

// Electric charge animation (for buttons)
export const electricCharge: Variants = {
  rest: {
    boxShadow: '0 0 5px rgba(0, 255, 255, 0.5)',
  },
  hover: {
    boxShadow: [
      '0 0 5px rgba(0, 255, 255, 0.5)',
      '0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.5)',
      '0 0 35px rgba(255, 244, 79, 0.9), 0 0 70px rgba(255, 244, 79, 0.6)',
    ],
    transition: {
      duration: 1.5,
      times: [0, 0.5, 1],
      ease: 'easeInOut',
    },
  },
}

// Floating animation (for decorative elements)
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Draw SVG path animation
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  },
}
