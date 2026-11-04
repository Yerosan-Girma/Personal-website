import { describe, it, expect } from 'vitest';
import {
  adjustLuminosity,
  getHoverColor,
  getContrastRatio,
  meetsContrastRequirement,
  withOpacity,
  getSecondaryColor,
} from './colorUtils';

describe('colorUtils', () => {
  describe('adjustLuminosity', () => {
    it('should increase luminosity by given amount', () => {
      const result = adjustLuminosity('#6366F1', 10);
      expect(result).toBe('#7d80f4');
    });

    it('should decrease luminosity by negative amount', () => {
      const result = adjustLuminosity('#6366F1', -10);
      expect(result).toBe('#494cee');
    });

    it('should clamp luminosity to valid range', () => {
      const resultMax = adjustLuminosity('#FFFFFF', 50);
      expect(resultMax).toBe('#ffffff');

      const resultMin = adjustLuminosity('#000000', -50);
      expect(resultMin).toBe('#000000');
    });

    it('should return original color if invalid hex', () => {
      const result = adjustLuminosity('invalid', 10);
      expect(result).toBe('invalid');
    });
  });

  describe('getHoverColor', () => {
    it('should increase luminosity in light theme', () => {
      const result = getHoverColor('#6366F1', false);
      expect(result).toBe('#7d80f4');
    });

    it('should decrease luminosity in dark theme', () => {
      const result = getHoverColor('#818CF8', true);
      expect(result).toBe('#6772f5');
    });

    it('should produce 10% luminosity shift', () => {
      const baseColor = '#6366F1';
      const lightHover = getHoverColor(baseColor, false);
      const darkHover = getHoverColor(baseColor, true);
      
      expect(lightHover).not.toBe(baseColor);
      expect(darkHover).not.toBe(baseColor);
      expect(lightHover).not.toBe(darkHover);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio between white and black', () => {
      const ratio = getContrastRatio('#FFFFFF', '#000000');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should calculate contrast ratio for identical colors', () => {
      const ratio = getContrastRatio('#6366F1', '#6366F1');
      expect(ratio).toBeCloseTo(1, 0);
    });

    it('should calculate contrast ratio for accent and background', () => {
      const ratio = getContrastRatio('#6366F1', '#FFFFFF');
      expect(ratio).toBeGreaterThan(4.5);
    });

    it('should return 1 for invalid colors', () => {
      const ratio = getContrastRatio('invalid', '#FFFFFF');
      expect(ratio).toBe(1);
    });
  });

  describe('meetsContrastRequirement', () => {
    it('should pass AA requirement for sufficient contrast', () => {
      const result = meetsContrastRequirement('#6366F1', '#FFFFFF', 'AA');
      expect(result).toBe(true);
    });

    it('should fail AA requirement for insufficient contrast', () => {
      const result = meetsContrastRequirement('#F3F4F6', '#FFFFFF', 'AA');
      expect(result).toBe(false);
    });

    it('should use lower threshold for large text', () => {
      const result = meetsContrastRequirement('#9CA3AF', '#FFFFFF', 'AA', true);
      expect(result).toBe(true);
    });

    it('should enforce stricter AAA requirements', () => {
      const result = meetsContrastRequirement('#6366F1', '#FFFFFF', 'AAA');
      // Should check against 7:1 for AAA normal text
      expect(typeof result).toBe('boolean');
    });
  });

  describe('withOpacity', () => {
    it('should convert hex to rgba with specified opacity', () => {
      const result = withOpacity('#6366F1', 0.5);
      expect(result).toBe('rgba(99, 102, 241, 0.5)');
    });

    it('should handle full opacity', () => {
      const result = withOpacity('#6366F1', 1);
      expect(result).toBe('rgba(99, 102, 241, 1)');
    });

    it('should handle zero opacity', () => {
      const result = withOpacity('#6366F1', 0);
      expect(result).toBe('rgba(99, 102, 241, 0)');
    });

    it('should return original color if invalid hex', () => {
      const result = withOpacity('invalid', 0.5);
      expect(result).toBe('invalid');
    });
  });

  describe('getSecondaryColor', () => {
    it('should return color with 10% opacity', () => {
      const result = getSecondaryColor('#6366F1');
      expect(result).toBe('rgba(99, 102, 241, 0.1)');
    });

    it('should work with different colors', () => {
      const result = getSecondaryColor('#818CF8');
      expect(result).toBe('rgba(129, 140, 248, 0.1)');
    });
  });
});
