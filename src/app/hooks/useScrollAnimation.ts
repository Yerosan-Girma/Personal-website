import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isInView: boolean;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer
 * Triggers once when element enters viewport and cleans up automatically
 * 
 * Requirements:
 * - 18.3: Intersection Observer API for scroll-triggered animations
 * - 18.8: Scroll optimization with debounced listeners
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // One-time trigger: unobserve after animation triggers
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
