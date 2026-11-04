/**
 * Mobile Animation Optimization
 * 
 * Provides viewport-aware animation configurations to:
 * - Reduce animation complexity by 50% on mobile (<768px)
 * - Disable animations on very small screens (<480px)
 * - Respect prefers-reduced-motion preference
 * - Maintain 60fps performance across all devices
 */

/**
 * Detect if device is mobile (<768px)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Detect if device is very small screen (<480px)
 */
export function isVerySmallScreen(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 480;
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on device and preferences
 * Desktop: full duration
 * Mobile: 50% reduction
 * Reduced motion: 0 (instant)
 */
export function getAnimationDuration(baseDuration: number): number {
  if (prefersReducedMotion()) return 0;
  if (isMobileDevice()) return baseDuration * 0.5;
  return baseDuration;
}

/**
 * Get stagger delay based on device and preferences
 * Desktop: full delay
 * Mobile: 50% reduction (max 50ms per item)
 * Reduced motion: 0 (instant)
 */
export function getStaggerDelay(baseDelay: number): number {
  if (prefersReducedMotion()) return 0;
  if (isMobileDevice()) return Math.min(baseDelay * 0.5, 50);
  return baseDelay;
}

/**
 * Get animation timing easing
 * Uses standard easing functions optimized for 60fps
 */
export const animationEasings = {
  // Smooth ease for scale/opacity
  smooth: [0.22, 1, 0.36, 1],
  // Linear for transforms
  linear: [0, 0, 1, 1],
  // Ease out for entrances
  easeOut: [0.33, 1, 0.68, 1],
  // Ease in for exits
  easeIn: [0.32, 0, 0.67, 0],
};

/**
 * Mobile-optimized animation variants for scroll triggers
 */
export const mobileAnimationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      ease: animationEasings.easeOut,
    },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.3,
      ease: animationEasings.easeOut,
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.3,
      ease: animationEasings.easeOut,
    },
  },
};

/**
 * Hook for responsive animation configuration
 * Returns device-aware animation settings
 */
export function useResponsiveAnimation() {
  const isMobile = isMobileDevice();
  const isSmall = isVerySmallScreen();
  const reducedMotion = prefersReducedMotion();

  return {
    isMobile,
    isSmall,
    reducedMotion,
    durationMultiplier: reducedMotion ? 0 : isMobile ? 0.5 : 1,
    delayMultiplier: reducedMotion ? 0 : isMobile ? 0.5 : 1,
    shouldAnimate: !reducedMotion && !isSmall,
  };
}

/**
 * Calculate optimal particle count for interactive background
 * Reduces count by 75% on mobile and 95% on very small screens
 */
export function getOptimalParticleCount(width: number, height: number): number {
  const baseCount = Math.min(Math.floor((width * height) / 32000), 38);
  
  // Very small screens: minimal particles
  if (isVerySmallScreen()) return Math.max(2, Math.floor(baseCount * 0.05));
  
  // Mobile: reduced particles
  if (isMobileDevice()) return Math.max(4, Math.floor(baseCount * 0.25));
  
  // Desktop: full particle count
  return baseCount;
}

/**
 * Stagger configuration for item animations
 * Reduces stagger on mobile for better performance
 */
export function getStaggerConfig(baseStaggerDelay: number = 0.1) {
  const delay = getStaggerDelay(baseStaggerDelay * 1000) / 1000;
  
  return {
    staggerChildren: delay,
    delayChildren: 0,
  };
}

/**
 * Intersection Observer options for scroll animations
 * Optimized for mobile with margin adjustments
 */
export function getIntersectionObserverOptions() {
  const threshold = isMobileDevice() ? 0.05 : 0.1;
  const rootMargin = isMobileDevice() ? '0px 0px -50px 0px' : '0px 0px -100px 0px';

  return {
    threshold,
    rootMargin,
  };
}

/**
 * Debounce animation frame requests for scroll listeners
 * Ensures 16ms minimum between animation calculations (60fps)
 */
export function createAnimationFrameDebounce(callback: () => void, delay = 16) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}
