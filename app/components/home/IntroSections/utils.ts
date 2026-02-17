/**
 * Utility functions for IntroSections component
 * Following Single Responsibility Principle - only contains business logic
 */

import { SectionItem } from './types';

/**
 * Gets the logo source for a section, handling fallback logic
 */
export function getLogoSrc(
  section: SectionItem,
  habeebError: boolean
): string | null {
  if (!section.logo) {
    return null;
  }

  const isAlhabib = section.id === 'alhabib';
  if (isAlhabib && habeebError && section.logoFallback) {
    return section.logoFallback;
  }

  return section.logo;
}

/**
 * Checks if a section is the Alhabib section
 */
export function isAlhabibSection(sectionId: string): boolean {
  return sectionId === 'alhabib';
}
