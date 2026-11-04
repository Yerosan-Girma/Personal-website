/**
 * Design System Utility Functions
 * 
 * Helper functions for working with design system tokens
 */

import { DESIGN_TOKENS } from '../types/design-system';

/**
 * Get a color value from the design system
 */
export function getColor(
  theme: 'light' | 'dark',
  colorKey: keyof typeof DESIGN_TOKENS.colors.light
): string {
  return DESIGN_TOKENS.colors[theme][colorKey];
}

/**
 * Get a spacing value from the design system
 */
export function getSpacing(size: keyof typeof DESIGN_TOKENS.spacing.scale): string {
  return DESIGN_TOKENS.spacing.scale[size];
}

/**
 * Get section spacing based on device type
 */
export function getSectionSpacing(device: 'mobile' | 'tablet' | 'desktop'): string {
  return DESIGN_TOKENS.spacing.section[device];
}

/**
 * Get container padding based on device type
 */
export function getContainerPadding(device: 'mobile' | 'tablet' | 'desktop'): string {
  return DESIGN_TOKENS.spacing.container[device];
}

/**
 * Get a typography size from the design system
 */
export function getTypographySize(size: keyof typeof DESIGN_TOKENS.typography.scale): string {
  return DESIGN_TOKENS.typography.scale[size];
}

/**
 * Get a font weight from the design system
 */
export function getFontWeight(weight: keyof typeof DESIGN_TOKENS.typography.weights): number {
  return DESIGN_TOKENS.typography.weights[weight];
}

/**
 * Get a border radius value from the design system
 */
export function getBorderRadius(size: keyof typeof DESIGN_TOKENS.borderRadius): string {
  return DESIGN_TOKENS.borderRadius[size];
}

/**
 * Get a shadow value from the design system
 */
export function getShadow(size: keyof typeof DESIGN_TOKENS.shadows): string {
  return DESIGN_TOKENS.shadows[size];
}

/**
 * Get breakpoint value from the design system
 */
export function getBreakpoint(breakpoint: keyof typeof DESIGN_TOKENS.breakpoints): string {
  return DESIGN_TOKENS.breakpoints[breakpoint];
}

/**
 * Calculate contrast ratio between two colors
 * Implements WCAG contrast ratio calculation
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  // Calculate relative luminance
  const getLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map((val) => {
      const sRGB = val / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(hexToRgb(foreground));
  const l2 = getLuminance(hexToRgb(background));

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Adjust luminosity of a color by a percentage
 * Positive values lighten, negative values darken
 */
export function adjustLuminosity(color: string, amount: number): string {
  // Convert hex to HSL
  const hexToHsl = (hex: string): [number, number, number] => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [h * 360, s * 100, l * 100];
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const [h, s, l] = hexToHsl(color);
  const newL = Math.max(0, Math.min(100, l + amount));
  return hslToHex(h, s, newL);
}

/**
 * Get responsive value based on current viewport width
 */
export function getResponsiveValue<T>(
  mobile: T,
  tablet: T,
  desktop: T,
  currentWidth: number
): T {
  const breakpoints = {
    tablet: 768,
    desktop: 1024,
  };

  if (currentWidth >= breakpoints.desktop) {
    return desktop;
  } else if (currentWidth >= breakpoints.tablet) {
    return tablet;
  } else {
    return mobile;
  }
}

/**
 * Generate CSS custom property name
 */
export function cssVar(name: string): string {
  return `var(--${name})`;
}

/**
 * Create responsive padding classes
 */
export function responsivePadding(): string {
  return 'px-5 md:px-10 lg:px-20';
}

/**
 * Create responsive section spacing classes
 */
export function responsiveSectionSpacing(): string {
  return 'py-15 md:py-20 lg:py-30';
}

/**
 * Create responsive grid column classes
 */
export function responsiveGridColumns(): string {
  return 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12';
}
