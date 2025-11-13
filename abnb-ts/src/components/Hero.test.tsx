import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock the Modal component with named export
vi.mock('./Modal', () => ({
  EstimateModal: () => <div data-testid="mock-estimate-modal">Estimate Modal</div>,
}));

// Mock the slider component
vi.mock('./ui/slider', () => ({
  Slider: ({ defaultValue, onValueChange }: any) => (
    <input
      data-testid="mock-slider"
      type="range"
      defaultValue={defaultValue[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
    />
  ),
}));

// Mock the utils
vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('Hero Component', () => {
  it('should render the hero section with heading', () => {
    render(<Hero />);
    
    // Check if main heading is rendered with earnings calculation
    const heading = screen.getByRole('heading', { 
      name: /Your home could make/i 
    });
    expect(heading).toBeInTheDocument();
  });

  it('should display initial calculation with default values', () => {
    render(<Hero />);
    
    // Should show initial calculation (9 nights × RM194)
    expect(screen.getByText(/9 nights/i)).toBeInTheDocument();
  });

  it('should render the map iframe', () => {
    render(<Hero />);
    
    const iframe = screen.getByTitle(/Google Map - Kuala Lumpur/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src');
  });

  it('should render the EstimateModal component', () => {
    render(<Hero />);
    
    const modal = screen.getByTestId('mock-estimate-modal');
    expect(modal).toBeInTheDocument();
  });

  it('should render the slider component', () => {
    render(<Hero />);
    
    const slider = screen.getByTestId('mock-slider');
    expect(slider).toBeInTheDocument();
  });

  it('should calculate earnings based on nights and cost', () => {
    render(<Hero />);
    
    // Default: 9 nights × RM194 = RM1,746
    const heading = screen.getByRole('heading');
    expect(heading.textContent).toContain('1,746');
  });
});
