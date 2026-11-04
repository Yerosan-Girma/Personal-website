import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button Component', () => {
  describe('Variants', () => {
    it('should render primary variant with correct styles', () => {
      render(<Button variant="primary">Primary Button</Button>);
      const button = screen.getByRole('button', { name: /primary button/i });
      
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-accent', 'text-accent-foreground');
    });

    it('should render secondary variant with correct styles', () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      const button = screen.getByRole('button', { name: /secondary button/i });
      
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('should render outline variant with correct styles', () => {
      render(<Button variant="outline">Outline Button</Button>);
      const button = screen.getByRole('button', { name: /outline button/i });
      
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('border-2', 'border-accent', 'text-accent', 'bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('should render small size with correct styles', () => {
      render(<Button size="small">Small Button</Button>);
      const button = screen.getByRole('button', { name: /small button/i });
      
      expect(button).toHaveClass('h-8', 'px-4', 'py-2', 'text-sm');
    });

    it('should render medium size (default) with correct styles', () => {
      render(<Button size="medium">Medium Button</Button>);
      const button = screen.getByRole('button', { name: /medium button/i });
      
      expect(button).toHaveClass('h-10', 'px-6', 'py-3', 'text-base');
    });

    it('should render large size with correct styles', () => {
      render(<Button size="large">Large Button</Button>);
      const button = screen.getByRole('button', { name: /large button/i });
      
      expect(button).toHaveClass('h-12', 'px-8', 'py-4', 'text-lg');
    });

    it('should default to medium size when no size is specified', () => {
      render(<Button>Default Size Button</Button>);
      const button = screen.getByRole('button', { name: /default size button/i });
      
      expect(button).toHaveClass('h-10', 'px-6', 'py-3', 'text-base');
    });
  });

  describe('Hover and Focus States (Requirement 2.8, 20.2)', () => {
    it('should have hover transition classes', () => {
      render(<Button variant="primary">Hover Button</Button>);
      const button = screen.getByRole('button', { name: /hover button/i });
      
      expect(button).toHaveClass('hover:bg-accent-hover', 'hover:shadow-lg', 'hover:scale-105');
    });

    it('should have 3px focus indicator (Requirement 20.2)', () => {
      render(<Button>Focus Button</Button>);
      const button = screen.getByRole('button', { name: /focus button/i });
      
      expect(button).toHaveClass('focus:ring-[3px]', 'focus:ring-ring/50');
      expect(button).toHaveClass('focus-visible:outline-[3px]', 'focus-visible:outline-ring');
    });

    it('should have 300ms transition duration', () => {
      render(<Button>Transition Button</Button>);
      const button = screen.getByRole('button', { name: /transition button/i });
      
      expect(button).toHaveClass('transition-all', 'duration-300');
    });
  });

  describe('Accessibility (Requirement 20.4, 20.7)', () => {
    it('should be keyboard navigable and focusable', async () => {
      const user = userEvent.setup();
      render(<Button>Keyboard Button</Button>);
      const button = screen.getByRole('button', { name: /keyboard button/i });
      
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('should be activatable with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Enter Button</Button>);
      const button = screen.getByRole('button', { name: /enter button/i });
      
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be activatable with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Space Button</Button>);
      const button = screen.getByRole('button', { name: /space button/i });
      
      button.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have proper button role', () => {
      render(<Button>Accessible Button</Button>);
      const button = screen.getByRole('button', { name: /accessible button/i });
      
      expect(button).toBeInTheDocument();
    });

    it('should accept and pass through ARIA attributes', () => {
      render(
        <Button aria-label="Custom Label" aria-describedby="description">
          ARIA Button
        </Button>
      );
      const button = screen.getByRole('button', { name: /custom label/i });
      
      expect(button).toHaveAttribute('aria-label', 'Custom Label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('should properly communicate disabled state', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button', { name: /disabled button/i });
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });
  });

  describe('Interaction', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Button</Button>);
      const button = screen.getByRole('button', { name: /click button/i });
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled>Disabled Click Button</Button>);
      const button = screen.getByRole('button', { name: /disabled click button/i });
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should default to type="button" to prevent form submission', () => {
      render(<Button>Form Button</Button>);
      const button = screen.getByRole('button', { name: /form button/i });
      
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should allow custom type attribute', () => {
      render(<Button type="submit">Submit Button</Button>);
      const button = screen.getByRole('button', { name: /submit button/i });
      
      expect(button).toHaveAttribute('type', 'submit');
    });
  });

  describe('Styling Customization', () => {
    it('should accept custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);
      const button = screen.getByRole('button', { name: /custom button/i });
      
      expect(button).toHaveClass('custom-class');
    });

    it('should merge custom className with variant classes', () => {
      render(<Button variant="primary" className="custom-class">Merged Button</Button>);
      const button = screen.getByRole('button', { name: /merged button/i });
      
      expect(button).toHaveClass('custom-class', 'bg-accent');
    });
  });

  describe('Edge Cases', () => {
    it('should render children correctly', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('should handle all variant and size combinations', () => {
      const variants = ['primary', 'secondary', 'outline'] as const;
      const sizes = ['small', 'medium', 'large'] as const;
      
      variants.forEach(variant => {
        sizes.forEach(size => {
          const { unmount } = render(
            <Button variant={variant} size={size}>
              {`${variant}-${size}`}
            </Button>
          );
          
          const button = screen.getByRole('button', { name: new RegExp(`${variant}-${size}`, 'i') });
          expect(button).toBeInTheDocument();
          
          unmount();
        });
      });
    });
  });
});
