import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should render all three main sections', () => {
    render(<Footer />);
    
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Hosting')).toBeInTheDocument();
    expect(screen.getByText('Airbnb')).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 Airbnb, Inc./i)).toBeInTheDocument();
  });

  it('should render legal links', () => {
    render(<Footer />);
    
    const termsLink = screen.getByRole('link', { name: /Terms/i });
    const privacyLink = screen.getByRole('link', { name: /^Privacy$/i });
    
    expect(termsLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', 'https://www.airbnb.com/terms');
    expect(privacyLink).toHaveAttribute('href', 'https://www.airbnb.com/terms/privacy_policy');
  });

  it('should render support section links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /Help Center/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /AirCover/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Anti-discrimination/i })).toBeInTheDocument();
  });

  it('should render hosting section links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /Airbnb your home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /AirCover for Hosts/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Hosting resources/i })).toBeInTheDocument();
  });

  it('should render Airbnb section links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /Newsroom/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Careers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Investors/i })).toBeInTheDocument();
  });

  it('should render social media links with correct attributes', () => {
    render(<Footer />);
    
    const facebookLink = screen.getByLabelText('Facebook');
    const twitterLink = screen.getByLabelText('Twitter');
    const instagramLink = screen.getByLabelText('Instagram');
    
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/airbnb');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/airbnb');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/airbnb');
    
    // Check if they open in new tab
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('target', '_blank');
  });

  it('should render language and currency selectors', () => {
    render(<Footer />);
    
    expect(screen.getByText(/English \(US\)/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ USD/i)).toBeInTheDocument();
  });

  it('should be rendered as a footer element', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});
