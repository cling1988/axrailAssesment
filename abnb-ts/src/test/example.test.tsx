import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple component to demonstrate testing
function SimpleButton({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

function SimpleCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

describe('Simple Testing Examples', () => {
  // Example 1: Basic rendering test
  it('should render a button with text', () => {
    render(<SimpleButton>Click me</SimpleButton>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  // Example 2: Testing props
  it('should display card with correct title and description', () => {
    render(<SimpleCard title="Hello World" description="This is a test" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });

  // Example 3: Testing classes
  it('should have correct CSS class', () => {
    render(<SimpleButton>Styled Button</SimpleButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn');
  });

  // Example 4: Multiple elements
  it('should render heading and paragraph', () => {
    render(<SimpleCard title="Title" description="Description" />);
    
    const heading = screen.getByRole('heading', { name: /title/i });
    const paragraph = screen.getByText(/description/i);
    
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Testing Different Query Methods', () => {
  it('demonstrates getBy vs queryBy', () => {
    render(<SimpleButton>Test</SimpleButton>);
    
    // getBy throws error if not found
    const existing = screen.getByRole('button');
    expect(existing).toBeInTheDocument();
    
    // queryBy returns null if not found
    const nonExisting = screen.queryByRole('link');
    expect(nonExisting).not.toBeInTheDocument();
  });
});
