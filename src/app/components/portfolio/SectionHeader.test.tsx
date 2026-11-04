import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<SectionHeader title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies center alignment by default', () => {
    const { container } = render(<SectionHeader title="Test Title" />);
    const headerDiv = container.firstChild as HTMLElement;
    expect(headerDiv.className).toContain('text-center');
  });

  it('applies left alignment when specified', () => {
    const { container } = render(<SectionHeader title="Test Title" align="left" />);
    const headerDiv = container.firstChild as HTMLElement;
    expect(headerDiv.className).toContain('text-left');
  });

  it('renders all parts when all props provided', () => {
    render(
      <SectionHeader
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
        align="left"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('uses serif font for title', () => {
    render(<SectionHeader title="Test Title" />);
    const title = screen.getByText('Test Title');
    expect(title.className).toContain('font-serif');
  });

  it('applies proper typography hierarchy', () => {
    render(
      <SectionHeader
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
      />
    );
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H2');
    expect(title.className).toContain('text-4xl');
    expect(title.className).toContain('md:text-5xl');
  });
});
