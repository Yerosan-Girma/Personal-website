/**
 * Color utility functions for theme-aware color manipulation
 * Implements hover color generation with 10% luminosity shift (Requirement 2.10)
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert RGB to hex
 */
function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Adjust luminosity of a color by a percentage
 * @param color - Hex color string (e.g., '#6366F1')
 * @param amount - Percentage to adjust (-100 to 100). Positive increases lightness, negative decreases
 * @returns Adjusted hex color string
 */
export function adjustLuminosity(color: string, amount: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  const hsl = rgbToHsl(rgb);
  
  // Adjust lightness by the specified amount (clamped between 0 and 100)
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));

  const adjustedRgb = hslToRgb(hsl);
  return rgbToHex(adjustedRgb);
}

/**
 * Generate hover color with 10% luminosity shift (Requirement 2.10)
 * In light theme: +10% luminosity (lighter)
 * In dark theme: -10% luminosity (darker for better contrast)
 * @param color - Hex color string
 * @param isDarkTheme - Whether dark theme is active
 * @returns Hover color hex string
 */
export function getHoverColor(color: string, isDarkTheme: boolean): string {
  // Light theme: increase luminosity by 10%
  // Dark theme: decrease luminosity by 10%
  const adjustment = isDarkTheme ? -10 : 10;
  return adjustLuminosity(color, adjustment);
}

/**
 * Calculate contrast ratio between two colors (WCAG)
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (rgb: RGB): number => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
      const v = val / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color meets WCAG contrast requirements (Requirement 2.8)
 * @param foreground - Foreground hex color
 * @param background - Background hex color
 * @param level - WCAG level ('AA' or 'AAA')
 * @param isLargeText - Whether text is large (18pt+ regular or 14pt+ bold)
 * @returns Whether contrast requirement is met
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);

  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7;
  }

  // AA level
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Convert color to rgba with opacity
 * @param color - Hex color string
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function withOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Generate secondary color with 10% opacity (Requirement 2.7)
 * @param color - Base hex color
 * @returns RGBA color string with 10% opacity
 */
export function getSecondaryColor(color: string): string {
  return withOpacity(color, 0.1);
}
