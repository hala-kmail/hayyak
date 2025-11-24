/**
 * useTheme - Hook to access theme context
 * 
 * Provides access to the current theme (light/dark/system) and theme variables.
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, isDark, themeVars } = useTheme();
 * 
 * // Change theme
 * setTheme('dark');
 * 
 * // Check if dark mode
 * if (isDark) {
 *   // Apply dark mode styles
 * }
 * ```
 */

import { useTheme as useThemeContext } from '@/providers/ThemeProvider';

export { useTheme } from '@/providers/ThemeProvider';
export type { ThemeKey } from '@/providers/ThemeProvider';

/**
 * useIsDark - Simplified hook to check if dark mode is active
 * 
 * @example
 * ```tsx
 * const isDark = useIsDark();
 * ```
 */
export function useIsDark(): boolean {
  const { isDark } = useThemeContext();
  return isDark;
}

