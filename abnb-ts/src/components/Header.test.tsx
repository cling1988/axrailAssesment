import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('should render the Airbnb logo SVG', () => {
    const { container } = render(<Header />);
    
    // Check if SVG logo is present
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('fill', '#FF385C');
  });

  it('should render the "Getting started" button', () => {
    render(<Header />);
    
    const button = screen.getByRole('button', { name: /getting started/i });
    expect(button).toBeInTheDocument();
  });

  it('should have fixed positioning classes', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('fixed');
  });

  it('should be accessible with proper semantic HTML', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('header');
    expect(header?.tagName).toBe('HEADER');
  });
});
