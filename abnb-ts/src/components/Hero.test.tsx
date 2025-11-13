import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';

// Mock the Modal component to simplify testing
vi.mock('./Modal', () => ({
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div data-testid="mock-modal">
      {isOpen && (
        <div>
          <span>Modal is open</span>
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  ),
}));

describe('Hero Component', () => {
  it('should render the hero section with heading and description', () => {
    render(<Hero />);
    
    // Check if main heading is rendered
    const heading = screen.getByRole('heading', { 
      name: /Airbnb it easily with Airbnb Setup/i 
    });
    expect(heading).toBeInTheDocument();
    
    // Check if description text is present
    const description = screen.getByText(/We'll provide you with one-on-one guidance/i);
    expect(description).toBeInTheDocument();
  });

  it('should render the "Get started" button', () => {
    render(<Hero />);
    
    const button = screen.getByRole('button', { name: /Get started/i });
    expect(button).toBeInTheDocument();
  });

  it('should render the map iframe', () => {
    render(<Hero />);
    
    const iframe = screen.getByTitle(/Google Map/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src');
  });

  it('should open modal when "Get started" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    // Initially modal should not be visible
    expect(screen.queryByText('Modal is open')).not.toBeInTheDocument();
    
    // Click the "Get started" button
    const button = screen.getByRole('button', { name: /Get started/i });
    await user.click(button);
    
    // Modal should now be visible
    expect(screen.getByText('Modal is open')).toBeInTheDocument();
  });

  it('should close modal when close is triggered', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    
    // Open the modal
    const openButton = screen.getByRole('button', { name: /Get started/i });
    await user.click(openButton);
    
    expect(screen.getByText('Modal is open')).toBeInTheDocument();
    
    // Close the modal
    const closeButton = screen.getByRole('button', { name: /Close/i });
    await user.click(closeButton);
    
    // Modal should be closed
    expect(screen.queryByText('Modal is open')).not.toBeInTheDocument();
  });

  it('should have proper styling classes on main elements', () => {
    render(<Hero />);
    
    const button = screen.getByRole('button', { name: /Get started/i });
    expect(button).toHaveClass('bg-gradient-to-r');
  });
});
