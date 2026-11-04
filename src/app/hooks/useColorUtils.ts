import { useTheme } from "../context/ThemeContext";
import { 
  adjustLuminosity, 
  getHoverColor, 
  getContrastRatio, 
  meetsContrastRequirement,
  withOpacity,
  getSecondaryColor
} from "../utils/colorUtils";

/**
 * Hook for theme-aware color utilities
 * Provides functions that automatically adjust based on current theme
 */
export function useColorUtils() {
  const { isDark } = useTheme();

  /**
   * Get hover color with 10% luminosity shift based on current theme
   * Requirement 2.10: Hover colors with 10% luminosity shift
   */
  const getThemedHoverColor = (color: string): string => {
    return getHoverColor(color, isDark);
  };

  /**
   * Adjust luminosity based on theme
   * Light theme: positive values lighten
   * Dark theme: positive values darken (for better contrast)
   */
  const adjustThemedLuminosity = (color: string, amount: number): string => {
    const adjustment = isDark ? -amount : amount;
    return adjustLuminosity(color, adjustment);
  };

  return {
    // Theme-aware functions
    getThemedHoverColor,
    adjustThemedLuminosity,
    
    // Direct utility functions (theme-agnostic)
    adjustLuminosity,
    getHoverColor,
    getContrastRatio,
    meetsContrastRequirement,
    withOpacity,
    getSecondaryColor,
    
    // Theme state
    isDark,
  };
}
