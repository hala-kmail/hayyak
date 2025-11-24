/**
 * Example: Theme Usage
 * 
 * Demonstrates:
 * - Using theme hooks
 * - CSS variables
 * - Dark/light mode switching
 * - Theme-aware components
 */

import { OButton, OCard, OText, OView } from '@/base/components';
import { useCSSVar, useIsDark, useTheme } from '@/base/hooks';
import React from 'react';

export function ThemeUsageExample() {
  const { theme, setTheme } = useTheme();
  const isDark = useIsDark();

  // Access specific CSS variables
  const primaryColor = useCSSVar('--color-primary-600');
  const backgroundColor = useCSSVar('--color-background');
  const textColor = useCSSVar('--color-text');

  return (
    <OView className="flex-1 p-4" style={{ backgroundColor }}>
      <OCard variant="elevated" className="mb-4">
        <OText className="text-2xl font-bold mb-4" style={{ color: textColor }}>
          Theme Example
        </OText>

        <OText className="text-base mb-2" style={{ color: textColor }}>
          Current theme: {theme}
        </OText>
        <OText className="text-base mb-4" style={{ color: textColor }}>
          Dark mode: {isDark ? 'Yes' : 'No'}
        </OText>

        {/* Theme Switcher Buttons */}
        <OView className="mb-4">
          <OText className="text-sm font-semibold mb-2" style={{ color: textColor }}>
            Switch Theme:
          </OText>
          <OView className="flex-row gap-2">
            <OButton
              variant={theme === 'light' ? 'primary' : 'secondary'}
              onPress={() => setTheme('light')}
              className="flex-1">
              Light
            </OButton>
            <OButton
              variant={theme === 'dark' ? 'primary' : 'secondary'}
              onPress={() => setTheme('dark')}
              className="flex-1">
              Dark
            </OButton>
            <OButton
              variant={theme === 'system' ? 'primary' : 'secondary'}
              onPress={() => setTheme('system')}
              className="flex-1">
              System
            </OButton>
          </OView>
        </OView>

        {/* CSS Variable Usage */}
        <OView className="border-t border-gray-200 pt-4">
          <OText className="text-sm font-semibold mb-2" style={{ color: textColor }}>
            CSS Variables:
          </OText>
          <OView className="mb-2">
            <OText className="text-xs text-gray-500">Primary Color:</OText>
            <OView
              className="h-8 rounded mt-1"
              style={{ backgroundColor: primaryColor }}
            />
          </OView>
          <OView className="mb-2">
            <OText className="text-xs text-gray-500">Background Color:</OText>
            <OView
              className="h-8 rounded mt-1 border border-gray-300"
              style={{ backgroundColor }}
            />
          </OView>
          <OView>
            <OText className="text-xs text-gray-500">Text Color:</OText>
            <OView
              className="h-8 rounded mt-1"
              style={{ backgroundColor: textColor }}
            />
          </OView>
        </OView>
      </OCard>

      {/* Color Palette */}
      <OCard variant="bordered">
        <OText className="text-lg font-semibold mb-3" style={{ color: textColor }}>
          Color Palette
        </OText>
        <OView className="flex-row flex-wrap gap-2">
          {[
            'primary',
            'success',
            'warning',
            'danger',
          ].map((variant) => (
            <OButton
              key={variant}
              variant={variant as any}
              className="flex-1 min-w-[100px]">
              {variant}
            </OButton>
          ))}
        </OView>
      </OCard>
    </OView>
  );
}

