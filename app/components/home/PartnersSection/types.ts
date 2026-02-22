/**
 * Type definitions for PartnersSection component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

export interface PartnerStat {
  value: string;
  label: string;
}

export interface PartnerContentBlock {
  title?: string;
  text: string;
}

export interface PartnerTheme {
  primary: string;
  accent: string;
  surface: string;
  textOnSurface: string;
  mutedOnSurface: string;
}

export interface PartnerCardData {
  id: string;
  name: string;
  shortLabel?: string;
  logoSrc: string;
  linkUrl?: string;
  kicker?: string;
  blocks: PartnerContentBlock[];
  stats?: PartnerStat[];
  theme: PartnerTheme;
}

