import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';

describe('Card Component', () => {
  it('renders card with base styling', () => {
    render(
      <Card data-testid="card">
        <CardContent>Test content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toBeDefined();
    expect(card.className).toContain('rounded-xl');
    expect(card.className).toContain('border');
    expect(card.className).toContain('shadow-md');
  });

  it('applies hover effect when hover prop is true', () => {
    render(
      <Card hover={true} data-testid="hover-card">
        <CardContent>Hover content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('hover-card');
    expect(card.className).toContain('hover:shadow-xl');
    expect(card.className).toContain('hover:scale-[1.02]');
    expect(card.className).toContain('hover:border-accent');
    expect(card.className).toContain('transition-all');
    expect(card.className).toContain('duration-300');
  });

  it('does not apply hover effect when hover prop is false', () => {
    render(
      <Card hover={false} data-testid="no-hover-card">
        <CardContent>No hover content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('no-hover-card');
    expect(card.className).not.toContain('hover:shadow-xl');
    expect(card.className).not.toContain('hover:scale-[1.02]');
  });

  it('uses 12-16px border radius (rounded-xl)', () => {
    render(
      <Card data-testid="card">
        <CardContent>Test content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    // rounded-xl in Tailwind is 12px (0.75rem)
    expect(card.className).toContain('rounded-xl');
  });

  it('accepts custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        <CardContent>Test content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card.className).toContain('custom-class');
  });

  it('renders with CardHeader and CardTitle', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Description')).toBeDefined();
    expect(screen.getByText('Test content')).toBeDefined();
  });
});
