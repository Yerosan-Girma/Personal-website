import { useEffect, useState } from 'react';

/**
 * Hook to detect if device supports touch and apply touch-specific behavior
 * 
 * Requirement 23: Touch Device Interactions
 * - Detects touch capability (23.1)
 * - Detects hover capability (removes hover effects on touch devices) (23.3)
 * - Used to apply different interaction patterns on mobile vs desktop
 * 
 * @returns Object with touch device detection flags
 */
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    // Check for touch support
    // Modern method: check if device supports touch
    const hasTouch = () => {
      return (
        (typeof window !== 'undefined' &&
          ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0)) ||
        false
      );
    };

    // Check for hover support
    // CSS Media Query: (hover: hover) = device supports hover
    const checkHoverSupport = () => {
      if (typeof window === 'undefined') return true;
      return window.matchMedia('(hover: hover)').matches;
    };

    setIsTouchDevice(hasTouch());
    setSupportsHover(checkHoverSupport());

    // Listen for changes (e.g., external mouse/keyboard connection)
    const hoverMediaQuery = window.matchMedia('(hover: hover)');
    const handleHoverChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    hoverMediaQuery.addEventListener('change', handleHoverChange);
    return () => hoverMediaQuery.removeEventListener('change', handleHoverChange);
  }, []);

  return {
    isTouchDevice,
    supportsHover,
    /**
     * Whether to use hover effects
     * Only enable hover effects on devices that support them
     */
    shouldUseHoverEffects: supportsHover,
    /**
     * Whether to apply touch-optimized styling
     * On touch devices: use larger touch targets, tap feedback
     */
    shouldApplyTouchOptimization: isTouchDevice,
  };
}

/**
 * Enhanced touch event handler with passive listeners (Requirement 23.7)
 * 
 * @param element DOM element to attach listeners to
 * @param handlers Object with touch event handlers
 * @returns Cleanup function to remove event listeners
 */
export function attachPassiveTouchListeners(
  element: HTMLElement | Window,
  handlers: {
    onTouchStart?: (e: TouchEvent) => void;
    onTouchMove?: (e: TouchEvent) => void;
    onTouchEnd?: (e: TouchEvent) => void;
  }
) {
  const options = { passive: true }; // Requirement 23.7

  const onTouchStart = (e: TouchEvent) => handlers.onTouchStart?.(e);
  const onTouchMove = (e: TouchEvent) => handlers.onTouchMove?.(e);
  const onTouchEnd = (e: TouchEvent) => handlers.onTouchEnd?.(e);

  if (handlers.onTouchStart) {
    element.addEventListener('touchstart', onTouchStart, options);
  }
  if (handlers.onTouchMove) {
    element.addEventListener('touchmove', onTouchMove, options);
  }
  if (handlers.onTouchEnd) {
    element.addEventListener('touchend', onTouchEnd, options);
  }

  // Return cleanup function
  return () => {
    if (handlers.onTouchStart) {
      element.removeEventListener('touchstart', onTouchStart);
    }
    if (handlers.onTouchMove) {
      element.removeEventListener('touchmove', onTouchMove);
    }
    if (handlers.onTouchEnd) {
      element.removeEventListener('touchend', onTouchEnd);
    }
  };
}

/**
 * Detect if touch feedback should be shown
 * Requirement 23.6: Provide visual feedback within 100ms of touch start
 * 
 * @param event Touch event
 * @returns Whether to show tap feedback
 */
export function shouldShowTapFeedback(event: TouchEvent): boolean {
  const touch = event.touches[0];
  if (!touch) return false;

  const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
  if (!target) return false;

  // Check if element is interactive
  const isInteractive =
    target.tagName === 'BUTTON' ||
    target.tagName === 'A' ||
    target.role === 'button' ||
    target.onclick !== null ||
    target.closest('button, a, [role="button"]');

  return !!isInteractive;
}

/**
 * Get optimal timing for tap feedback animation
 * Requirement 23.6: Visual feedback within 100ms of touch start
 * 
 * @returns Transition duration in milliseconds
 */
export function getTapFeedbackTiming(): number {
  return 100; // 100ms for immediate responsive feel on mobile
}

/**
 * Check if menu should be closed when user taps outside
 * Requirement 32: Verify mobile menu close behavior doesn't trap users
 * 
 * @param event Touch/Mouse event
 * @param menuElement The menu container element
 * @param triggerElement The element that opens the menu (hamburger button)
 * @returns Whether menu should close
 */
export function shouldCloseMobileMenu(
  event: Event,
  menuElement: HTMLElement | null,
  triggerElement: HTMLElement | null
): boolean {
  if (!menuElement) return false;

  const target = event.target as HTMLElement;

  // Don't close if user clicked on trigger (hamburger) button
  if (triggerElement && triggerElement.contains(target)) {
    return false;
  }

  // Don't close if user clicked inside menu
  if (menuElement.contains(target)) {
    return false;
  }

  // Close if user clicked outside menu
  return true;
}
