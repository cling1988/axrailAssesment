import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('should render the Airbnb logo', () => {
    render(<Header />);
    
    // Check if logo text is present
    const logo = screen.getByText(/airbnb/i);
    expect(logo).toBeInTheDocument();
  });

  it('should render the header element', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should have sticky positioning classes', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });

  it('should be accessible with proper semantic HTML', () => {
    const { container } = render(<Header />);
    
    const header = container.querySelector('header');
    expect(header?.tagName).toBe('HEADER');
  });
});
