/**
 * Constants for Header component
 * Following Single Responsibility Principle - only contains constant values
 */

import type { NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { href: '/#vote', label: 'التصويت', sectionId: 'vote' },
  { href: '/#prize', label: 'الجائزة', sectionId: 'prize' },
  { href: '/#partners', label: 'الشركاء', sectionId: 'partners' },
];

export const DRAWER_DURATION_MS = 280;
export const SCROLL_THRESHOLD = 50;

export const LOGO_CONFIG = {
  defaultSize: 72,
  scrolledSize: 64,
  mobileSize: 56,
} as const;

