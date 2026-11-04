/**
 * useOptimizedScrollAnimation Hook
 * 
 * Provides optimized scroll-triggered animations for mobile and desktop.
 * Ensures smooth 60fps performance by:
 * - Reducing animation duration/stagger on mobile (50% complexity reduction)
 * - Using requestAnimationFrame for smooth 60fps
 * - Optimizing Intersection Observer settings per device
 * - Respecting prefers-reduced-motion
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  isMobileDevice,
  getAnimationDuration,
  getStaggerDelay,
  getIntersectionObserverOptions,
  prefersReducedMotion,
} from '../utils/mobileAnimations';

interface UseOptimizedScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
  animationDuration: number;
  staggerDelay: number;
  shouldAnimate: boolean;
}

/**
 * Hook for scroll-triggered animations optimized for mobile
 * 
 * @param baseDuration - Base animation duration in milliseconds (desktop)
 * @param baseStaggerDelay - Base stagger delay in milliseconds (desktop)
 * @returns Animation configuration and in-view state
 */
export function useOptimizedScrollAnimation(
  baseDuration: number = 600,
  baseStaggerDelay: number = 100,
): UseOptimizedScrollAnimationReturn {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const shouldAnimate = !prefersReducedMotion();
  const animationDuration = getAnimationDuration(baseDuration);
  const staggerDelay = getStaggerDelay(baseStaggerDelay);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsInView(true);
      // Use AbortController to safely unobserve
      observer.unobserve(entry.target);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const observerOptions = getIntersectionObserverOptions();
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Use requestAnimationFrame to ensure observer is set up on next frame
    const frameId = requestAnimationFrame(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [handleIntersection]);

  return {
    ref,
    isInView: shouldAnimate ? isInView : false,
    animationDuration,
    staggerDelay,
    shouldAnimate,
  };
}

/**
 * Hook to detect viewport changes and update animation settings
 * Useful for components that need to respond to responsive breakpoints
 */
export function useViewportAnimation() {
  const [viewport, setViewport] = useState(() => ({
    isMobile: isMobileDevice(),
    prefersReduced: prefersReducedMotion(),
  }));

  useEffect(() => {
    let resizeTimeoutId: ReturnType<typeof setTimeout>;
    let prefersReducedMediaQuery: MediaQueryList;

    const handleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        setViewport((prev) => ({
          ...prev,
          isMobile: isMobileDevice(),
        }));
      }, 16); // Debounce to 60fps
    };

    const handlePrefersReducedMotion = () => {
      setViewport((prev) => ({
        ...prev,
        prefersReduced: prefersReducedMotion(),
      }));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Listen to prefers-reduced-motion changes
    prefersReducedMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMediaQuery.addEventListener('change', handlePrefersReducedMotion);

    return () => {
      clearTimeout(resizeTimeoutId);
      window.removeEventListener('resize', handleResize);
      prefersReducedMediaQuery.removeEventListener('change', handlePrefersReducedMotion);
    };
  }, []);

  return viewport;
}

/**
 * Get animation config for staggered children animations
 * Optimized for mobile to prevent jank
 */
export function getStaggerContainerConfig(index: number = 0, baseDelay: number = 100) {
  const isMobile = isMobileDevice();
  const staggerDelay = getStaggerDelay(baseDelay);
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      initial: {},
      animate: {},
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: staggerDelay / 1000,
      delayChildren: 0.05,
    },
  };
}

/**
 * Get individual item animation config in staggered sequence
 */
export function getStaggerItemConfig(baseDuration: number = 500) {
  const animationDuration = getAnimationDuration(baseDuration);
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      initial: { opacity: 0, y: 0 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: animationDuration / 1000,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}
