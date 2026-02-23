/**
 * Type definitions for HeroSection component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import type { NeighborhoodItem } from '../data';

export interface HeroSectionProps {
  /** الحي المتصدر (الأعلى أصواتاً) لعرضه في القسم الأيسر */
  leadingNeighborhood?: NeighborhoodItem | null;
  isElectionOpen: boolean;
}

export interface HeroContentProps {
  leadingNeighborhood: NeighborhoodItem | null;
  isElectionOpen: boolean;
}

export interface HeroCTAProps {
  isElectionOpen: boolean;
}

export interface HeroLeadingNeighborhoodProps {
  neighborhood: NeighborhoodItem;
}
