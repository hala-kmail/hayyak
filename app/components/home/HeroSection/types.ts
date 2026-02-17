/**
 * Type definitions for HeroSection component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

export interface HeroSectionProps {
  totalVotes?: number;
  neighborhoodsCount?: number;
  votesToday?: number;
}

export interface HeroStatsData {
  totalVotes: number;
  neighborhoodsCount: number;
  votesToday: number;
}

export interface HeroContentProps {
  stats: HeroStatsData;
}

export interface HeroStatItemProps {
  value: number;
  label: string;
}
