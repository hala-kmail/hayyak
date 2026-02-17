/**
 * Constants for Header component
 * Following Single Responsibility Principle - only contains constant values
 */

import type { NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { href: '/vote', label: 'التصويت' },
  { href: '/award', label: 'الجائزة' },
  { href: '/partner', label: 'شراء' },
];

export const DRAWER_DURATION_MS = 280;
export const SCROLL_THRESHOLD = 50;

export const LOGO_CONFIG = {
  defaultSize: 56,
  scrolledSize: 50,
  mobileSize: 48,
} as const;
