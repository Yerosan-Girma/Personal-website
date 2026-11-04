/**
 * useOptimizedStagger Hook
 * 
 * Provides mobile-optimized stagger configuration for animations
 * Requirement 31: Reduce stagger animation complexity by 50% on mobile
 * Requirement 18.6: Maintain 60fps performance
 * Requirement 18.5: Respect prefers-reduced-motion
 */

import { useMemo } from 'react';
import { getStaggerDelay, prefersReducedMotion, isMobileDevice, getAnimationDuration } from '../utils/mobileAnimations';

interface StaggerConfig {
  staggerChildren: number;
  delayChildren: number;
}

interface ItemConfig {
  duration: number;
  delay: number;
  ease: number[];
}

/**
 * Get optimized stagger container animation config
 * Reduces stagger delay by 50% on mobile for better performance
 * 
 * @param baseStaggerDelay - Base delay between items in milliseconds (desktop)
 * @returns Stagger configuration for motion.div container
 */
export function useOptimizedStagger(baseStaggerDelay: number = 100) {
  const config = useMemo(() => {
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion) {
      return {
        staggerChildren: 0,
        delayChildren: 0,
      };
    }

    const optimizedDelay = getStaggerDelay(baseStaggerDelay);
    
    return {
      staggerChildren: optimizedDelay / 1000, // Convert to seconds for Framer Motion
      delayChildren: 0.05, // Small initial delay before stagger starts
    };
  }, [baseStaggerDelay]);

  return config;
}

/**
 * Get item animation config for staggered sequence
 * Used for each child item in a staggered container
 * 
 * @param baseDuration - Base animation duration in milliseconds (desktop)
 * @returns Animation config optimized for item
 */
export function useOptimizedStaggerItem(baseDuration: number = 500): ItemConfig {
  const config = useMemo(() => {
    const reducedMotion = prefersReducedMotion();
    
    if (reducedMotion) {
      return {
        duration: 0,
        delay: 0,
        ease: [0, 0, 1, 1],
      };
    }

    const optimizedDuration = getAnimationDuration(baseDuration);
    
    return {
      duration: optimizedDuration / 1000, // Convert to seconds for Framer Motion
      delay: 0,
      ease: [0.22, 1, 0.36, 1], // Smooth easing for 60fps
    };
  }, [baseDuration]);

  return config;
}

/**
 * Calculate item delay for manual stagger control
 * Useful when AnimatePresence is not available
 * 
 * @param index - Item index in sequence
 * @param baseStaggerDelay - Base delay between items (desktop)
 * @returns Delay in seconds
 */
export function useOptimizedItemDelay(index: number, baseStaggerDelay: number = 100): number {
  return useMemo(() => {
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) return 0;

    const optimizedDelay = getStaggerDelay(baseStaggerDelay);
    return (index * optimizedDelay) / 1000; // Convert to seconds
  }, [index, baseStaggerDelay]);
}

/**
 * Get container variants for staggered animations
 * Compatible with Framer Motion motion.div
 */
export function getOptimizedContainerVariants(baseStaggerDelay: number = 100) {
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }

  const optimizedDelay = getStaggerDelay(baseStaggerDelay);

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: optimizedDelay / 1000,
        delayChildren: 0.05,
      },
    },
  };
}

/**
 * Get item variants for staggered animations
 * Compatible with Framer Motion motion.div
 */
export function getOptimizedItemVariants(baseDuration: number = 500) {
  const reducedMotion = prefersReducedMotion();
  
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }

  const optimizedDuration = getAnimationDuration(baseDuration);

  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: optimizedDuration / 1000,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

/**
 * Batch optimization for multiple animations
 * Prevents excessive animations from causing jank on mobile
 * 
 * @param itemCount - Number of items to animate
 * @param baseStaggerDelay - Base delay between items
 * @returns Optimized config for all items
 */
export function getOptimizedBatchAnimation(itemCount: number, baseStaggerDelay: number = 100) {
  const reducedMotion = prefersReducedMotion();
  const isMobile = isMobileDevice();
  
  if (reducedMotion) {
    return {
      maxConcurrentAnimations: itemCount, // Animate all at once
      staggerDelay: 0,
      containerDuration: 0,
      itemDuration: 0,
    };
  }

  // On mobile: limit concurrent animations to prevent jank
  const maxConcurrent = isMobile ? Math.ceil(itemCount / 2) : itemCount;
  const optimizedStaggerDelay = getStaggerDelay(baseStaggerDelay);

  return {
    maxConcurrentAnimations: maxConcurrent,
    staggerDelay: optimizedStaggerDelay / 1000,
    containerDuration: (itemCount * optimizedStaggerDelay) / 1000,
    itemDuration: 0.5, // Base item animation duration in seconds
  };
}
