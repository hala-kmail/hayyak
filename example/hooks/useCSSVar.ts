/**
 * useCSSVar - Hook to access CSS variable values from theme
 * 
 * Provides a single source of truth for accessing theme CSS variables.
 * Works across web and native platforms.
 * 
 * @example
 * ```tsx
 * const bgColor = useCSSVar('--color-background');
 * const primaryColor = useCSSVar('--color-primary-600');
 * ```
 */

import { useTheme } from '@/providers/ThemeProvider';

export function useCSSVar(
  variableName: keyof ReturnType<typeof useTheme>['themeVarsValues'],
): string {
  const { themeVarsValues } = useTheme();

  // Ensure variable name starts with --
  const cssVarName = variableName.startsWith('--') ? variableName : `--${variableName}`;

  // On native, extract from themeVars object
  if (themeVarsValues && themeVarsValues[cssVarName]) {
    const value = themeVarsValues[cssVarName];
    return value.includes('rgb') ? value : `rgb(${value})`;
  }

  console.warn(`CSS variable ${cssVarName} not found`);
  return 'rgb(0, 0, 0)'; // fallback
}

/**
 * useCSSVars - Hook to access multiple CSS variables at once
 * 
 * Efficiently retrieves multiple CSS variable values in a single call.
 * 
 * @example
 * ```tsx
 * const { bg, text, border } = useCSSVars([
 *   '--color-background', 
 *   '--color-text', 
 *   '--color-border'
 * ]);
 * ```
 */
export function useCSSVars(variableNames: string[]): Record<string, string> {
  const { themeVarsValues } = useTheme();
  const result: Record<string, string> = {};

  variableNames.forEach((varName) => {
    const cssVarName = varName.startsWith('--') ? varName : `--${varName}`;

    if (themeVarsValues && themeVarsValues[cssVarName]) {
      const value = themeVarsValues[cssVarName];
      result[varName] = value.includes('rgb') ? value : `rgb(${value})`;
    } else {
      result[varName] = 'rgb(0, 0, 0)';
    }
  });

  return result;
}

