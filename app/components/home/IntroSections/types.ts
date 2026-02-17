/**
 * Type definitions for IntroSections component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

export interface SectionItem {
  id: string;
  title: string;
  description: string;
  textColor: string;
  accentColor: string;
  delay: number;
  logo?: string | null;
  logoFallback?: string;
  linkUrl?: string;
}

export interface IntroSectionProps {
  section: SectionItem;
  isVisible: boolean;
  habeebError: boolean;
  onHabeebError: () => void;
}
