import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// Test component that uses the theme context
function TestComponent() {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="isDark">{isDark ? 'true' : 'false'}</span>
      <button data-testid="toggle" onClick={toggleTheme}>
        Toggle
      </button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>
        Set Dark
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes and attributes
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Requirement 2.1-2.2: Light/dark theme colors', () => {
    it('should provide theme value to consumers', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(['light', 'dark']).toContain(themeElement.textContent);
    });

    it('should provide isDark boolean to consumers', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const isDarkElement = screen.getByTestId('isDark');
      expect(['true', 'false']).toContain(isDarkElement.textContent);
    });
  });

  describe('Requirement 2.4: LocalStorage persistence', () => {
    it('should persist theme selection to localStorage', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setDarkButton = getByTestId('set-dark');
      
      act(() => {
        setDarkButton.click();
      });

      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should persist toggle action to localStorage', () => {
      // Set initial theme to light
      localStorage.setItem('theme', 'light');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = getByTestId('toggle');
      
      act(() => {
        toggleButton.click();
      });

      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });

  describe('Requirement 2.5: Load theme from storage on init', () => {
    it('should initialize with stored light theme', () => {
      localStorage.setItem('theme', 'light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(themeElement.textContent).toBe('light');
    });

    it('should initialize with stored dark theme', () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(themeElement.textContent).toBe('dark');
    });
  });

  describe('Requirement 2.6: System color scheme preference fallback', () => {
    it('should default to system preference when no storage exists', () => {
      // Mock matchMedia for dark mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(themeElement.textContent).toBe('dark');
    });

    it('should default to light when system prefers light and no storage exists', () => {
      // Mock matchMedia for light mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(themeElement.textContent).toBe('light');
    });

    it('should prioritize localStorage over system preference', () => {
      localStorage.setItem('theme', 'light');

      // Mock matchMedia for dark mode preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeElement = screen.getByTestId('theme');
      expect(themeElement.textContent).toBe('light');
    });
  });

  describe('Theme toggle functionality', () => {
    it('should toggle theme from light to dark', () => {
      localStorage.setItem('theme', 'light');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = getByTestId('toggle');
      const themeElement = getByTestId('theme');

      expect(themeElement.textContent).toBe('light');

      act(() => {
        toggleButton.click();
      });

      expect(themeElement.textContent).toBe('dark');
    });

    it('should toggle theme from dark to light', () => {
      localStorage.setItem('theme', 'dark');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = getByTestId('toggle');
      const themeElement = getByTestId('theme');

      expect(themeElement.textContent).toBe('dark');

      act(() => {
        toggleButton.click();
      });

      expect(themeElement.textContent).toBe('light');
    });
  });

  describe('Theme setTheme functionality', () => {
    it('should set theme to light', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setLightButton = getByTestId('set-light');
      const themeElement = getByTestId('theme');

      act(() => {
        setLightButton.click();
      });

      expect(themeElement.textContent).toBe('light');
    });

    it('should set theme to dark', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setDarkButton = getByTestId('set-dark');
      const themeElement = getByTestId('theme');

      act(() => {
        setDarkButton.click();
      });

      expect(themeElement.textContent).toBe('dark');
    });
  });

  describe('Document element updates', () => {
    it('should set data-theme attribute to dark', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setDarkButton = getByTestId('set-dark');

      act(() => {
        setDarkButton.click();
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should set data-theme attribute to light', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setLightButton = getByTestId('set-light');

      act(() => {
        setLightButton.click();
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should add dark class when theme is dark', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setDarkButton = getByTestId('set-dark');

      act(() => {
        setDarkButton.click();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class when theme is light', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const setLightButton = getByTestId('set-light');

      act(() => {
        setLightButton.click();
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('useTheme hook error handling', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      console.error = originalError;
    });
  });
});
