/**
 * Design System Type Definitions
 * 
 * This file contains TypeScript types for the design system tokens
 * defined in the requirements and design documents.
 */

// Typography Types
export interface TypographyScale {
  xs: string;    // 12.8px
  sm: string;    // 14px
  base: string;  // 16px
  lg: string;    // 20px
  xl: string;    // 25px
  '2xl': string; // 31.25px
  '3xl': string; // 39px
  '4xl': string; // 48.8px
  '5xl': string; // 61px
  '6xl': string; // 76.3px
}

export interface FontWeights {
  light: 300;
  regular: 400;
  semibold: 600;
  bold: 700;
}

export interface LineHeights {
  body: 1.6;
  heading: 1.2;
}

export interface FontFamily {
  primary: string;   // Inter
  secondary: string; // Playfair Display
  mono: string;      // JetBrains Mono
}

// Color Types
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  inputBackground: string;
  ring: string;
}

export interface StateColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;
  state: StateColors;
}

// Spacing Types
export interface SpacingScale {
  0: string;   // 0
  1: string;   // 8px
  2: string;   // 16px
  3: string;   // 24px
  4: string;   // 32px
  5: string;   // 40px
  6: string;   // 48px
  8: string;   // 64px
  10: string;  // 80px
  12: string;  // 96px
  15: string;  // 120px
  20: string;  // 160px
}

export interface SectionSpacing {
  mobile: string;   // 60px
  tablet: string;   // 80px
  desktop: string;  // 120px
}

export interface ContainerPadding {
  mobile: string;   // 20px
  tablet: string;   // 40px
  desktop: string;  // 80px
}

// Breakpoint Types
export interface Breakpoints {
  mobile: string;   // 0px
  tablet: string;   // 768px
  desktop: string;  // 1024px
  wide: string;     // 1280px
}

export interface GridColumns {
  mobile: 4;
  tablet: 8;
  desktop: 12;
}

// Border Radius Types
export interface BorderRadius {
  sm: string;   // 8px
  md: string;   // 12px
  lg: string;   // 16px
  full: string; // 9999px
}

// Shadow Types
export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Complete Design System Interface
export interface DesignSystem {
  typography: {
    scale: TypographyScale;
    weights: FontWeights;
    lineHeights: LineHeights;
    fontFamily: FontFamily;
  };
  colors: ThemeConfig;
  spacing: {
    scale: SpacingScale;
    section: SectionSpacing;
    container: ContainerPadding;
  };
  breakpoints: Breakpoints;
  grid: GridColumns;
  borderRadius: BorderRadius;
  shadows: Shadows;
  maxWidth: string;
}

// Design Tokens Constants
export const DESIGN_TOKENS = {
  typography: {
    scale: {
      xs: '0.8rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.563rem',
      '2xl': '1.953rem',
      '3xl': '2.441rem',
      '4xl': '3.052rem',
      '5xl': '3.815rem',
      '6xl': '4.768rem',
    },
    weights: {
      light: 300,
      regular: 400,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      body: 1.6,
      heading: 1.2,
    },
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: '"Playfair Display", Georgia, Cambria, "Times New Roman", Times, serif',
      mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
  },
  colors: {
    light: {
      background: '#FFFFFF',
      foreground: '#1A1A1A',
      card: '#FFFFFF',
      cardForeground: '#1A1A1A',
      popover: '#FFFFFF',
      popoverForeground: '#1A1A1A',
      primary: '#6366F1',
      primaryForeground: '#FFFFFF',
      primaryHover: '#4F46E5',
      secondary: 'rgba(99, 102, 241, 0.1)',
      secondaryForeground: '#1A1A1A',
      muted: '#F3F4F6',
      mutedForeground: '#6B7280',
      accent: '#6366F1',
      accentForeground: '#FFFFFF',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      border: '#E5E7EB',
      input: '#E5E7EB',
      inputBackground: '#FFFFFF',
      ring: '#6366F1',
    },
    dark: {
      background: '#0F0F0F',
      foreground: '#E5E5E5',
      card: '#1A1A1A',
      cardForeground: '#E5E5E5',
      popover: '#1A1A1A',
      popoverForeground: '#E5E5E5',
      primary: '#818CF8',
      primaryForeground: '#0F0F0F',
      primaryHover: '#6366F1',
      secondary: 'rgba(129, 140, 248, 0.1)',
      secondaryForeground: '#E5E5E5',
      muted: '#1A1A1A',
      mutedForeground: '#9CA3AF',
      accent: '#818CF8',
      accentForeground: '#0F0F0F',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      border: '#2A2A2A',
      input: '#2A2A2A',
      inputBackground: '#1A1A1A',
      ring: '#818CF8',
    },
    state: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  spacing: {
    scale: {
      0: '0',
      1: '0.5rem',
      2: '1rem',
      3: '1.5rem',
      4: '2rem',
      5: '2.5rem',
      6: '3rem',
      8: '4rem',
      10: '5rem',
      12: '6rem',
      15: '7.5rem',
      20: '10rem',
    },
    section: {
      mobile: '3.75rem',
      tablet: '5rem',
      desktop: '7.5rem',
    },
    container: {
      mobile: '1.25rem',
      tablet: '2.5rem',
      desktop: '5rem',
    },
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  grid: {
    mobile: 4,
    tablet: 8,
    desktop: 12,
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  maxWidth: '1280px',
} as const;

// Utility Types
export type TypographySize = keyof TypographyScale;
export type FontWeight = keyof FontWeights;
export type SpacingSize = keyof SpacingScale;
export type Breakpoint = keyof Breakpoints;
export type RadiusSize = keyof BorderRadius;
export type ShadowSize = keyof Shadows;

// Component Prop Types
export interface ResponsiveSpacingProps {
  mobile?: SpacingSize;
  tablet?: SpacingSize;
  desktop?: SpacingSize;
}

export interface ResponsiveTypographyProps {
  mobile?: TypographySize;
  tablet?: TypographySize;
  desktop?: TypographySize;
}
