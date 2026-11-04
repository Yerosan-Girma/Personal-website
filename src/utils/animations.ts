/**
 * Animation Variants Library
 * 
 * Framer Motion animation variants and utilities for consistent animations
 * across the portfolio application.
 * 
 * **Validates: Requirements 5.7, 5.8, 5.9, 5.10, 6.6, 6.7**
 */

import { Variants, Transition } from 'motion/react';

/**
 * Standard easing curve for smooth, natural animations
 * Uses custom cubic-bezier for premium feel
 */
export const EASING = {
  ease: [0.22, 1, 0.36, 1], // Smooth ease-out
  easeOut: 'easeOut',
  linear: 'linear',
} as const;

/**
 * Standard animation durations in seconds
 */
export const DURATION = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.6,
  verySlow: 0.8,
  bar: 1.0,
  count: 2.0,
} as const;

/**
 * Fade in with slide up effect
 * Used for text elements, cards, and general content
 * 
 * @example
 * <motion.div variants={fadeInUp} initial="initial" animate="animate">
 */
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.ease,
    },
  },
};

/**
 * Simple fade in effect
 * Used for subtle element appearances
 * 
 * @example
 * <motion.div variants={fadeIn} initial="initial" animate="animate">
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION.slow,
    },
  },
};

/**
 * Scale in with fade effect
 * Used for buttons, icons, and interactive elements
 * 
 * @example
 * <motion.button variants={scaleIn} initial="initial" animate="animate">
 */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASING.easeOut,
    },
  },
};

/**
 * Slide in from right with fade effect
 * Used for images and side content
 * 
 * @example
 * <motion.img variants={slideInRight} initial="initial" animate="animate">
 */
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slow,
    },
  },
};

/**
 * Container for staggered children animations
 * Use with child variants for sequential reveals
 * 
 * @param delayBetweenChildren - Delay in seconds between each child animation (default: 0.1)
 * @param delayChildren - Initial delay before children start animating (default: 0)
 * 
 * @example
 * <motion.div variants={staggerContainer(0.15)} initial="initial" animate="animate">
 *   <motion.div variants={fadeInUp} />
 *   <motion.div variants={fadeInUp} />
 * </motion.div>
 */
export const staggerContainer = (
  delayBetweenChildren: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delayBetweenChildren,
      delayChildren,
    },
  },
});

/**
 * Configuration for Framer Motion timing
 * Consistent transition settings across the application
 */
export const transitionConfig = {
  /**
   * Standard transition for most animations
   */
  default: {
    duration: DURATION.slow,
    ease: EASING.ease,
  } as Transition,

  /**
   * Fast transition for hover effects
   */
  fast: {
    duration: DURATION.fast,
    ease: EASING.ease,
  } as Transition,

  /**
   * Slow transition for large movements
   */
  slow: {
    duration: DURATION.verySlow,
    ease: EASING.ease,
  } as Transition,

  /**
   * Transition for proficiency bars and progress indicators
   */
  bar: {
    duration: DURATION.bar,
    ease: EASING.easeOut,
  } as Transition,

  /**
   * Transition for counting animations
   */
  count: {
    duration: DURATION.count,
    ease: EASING.linear,
  } as Transition,

  /**
   * Spring transition for bouncy effects
   */
  spring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  } as Transition,
};

/**
 * Hover animation for cards and interactive elements
 */
export const hoverScale = {
  scale: 1.02,
  transition: transitionConfig.fast,
};

/**
 * Hover animation for buttons with slight lift
 */
export const hoverLift = {
  scale: 1.05,
  y: -2,
  transition: transitionConfig.fast,
};

/**
 * Tap animation for buttons
 */
export const tapScale = {
  scale: 0.95,
};

/**
 * Page transition variants for route changes
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionConfig.default,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: transitionConfig.fast,
  },
};

/**
 * Modal/Dialog entrance animation
 */
export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitionConfig.default,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: transitionConfig.fast,
  },
};

/**
 * Overlay/Backdrop fade animation
 */
export const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
    },
  },
};
