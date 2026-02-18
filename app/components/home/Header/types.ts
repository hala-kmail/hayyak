/**
 * Type definitions for Header component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

export interface NavLink {
  href: string;
  label: string;
  sectionId?: string;
}

export interface HeaderLogoProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
}

export interface NavLinksProps {
  scrolled: boolean;
}

export interface MobileMenuButtonProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  onClick: () => void;
}

export interface MobileDrawerProps {
  mobileMenuOpen: boolean;
  drawerAnimateIn: boolean;
  onClose: () => void;
}
