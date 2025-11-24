import { OButton, OCard, OText, OView, ScreenLayout } from '@/base';
import { useCSSVar, useIsDark, useTheme } from '@/base/hooks';
import React from 'react';
import { ScrollView } from 'react-native';

export default function ThemeScreen() {
  const { theme, setTheme } = useTheme();
  const isDark = useIsDark();
  const textColor = useCSSVar('--color-text');
  const primaryColor = useCSSVar('--color-primary-600');
  const successColor = useCSSVar('--color-success-600');
  const warningColor = useCSSVar('--color-warning-600');
  const dangerColor = useCSSVar('--color-danger-600');
  const backgroundColor = useCSSVar('--color-background');
  const surfaceColor = useCSSVar('--color-surface');

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OView className="py-6">
          <OText className="text-3xl font-bold mb-6" style={{ color: textColor }}>
            Theme System
          </OText>

          {/* Current Theme */}
          <OCard variant="elevated" className="mb-6">
            <OText className="text-xl font-semibold mb-3">Current Theme</OText>
            <OText className="text-base mb-2" style={{ color: textColor }}>
              Theme: <OText className="font-bold">{theme}</OText>
            </OText>
            <OText className="text-base mb-4" style={{ color: textColor }}>
              Mode: <OText className="font-bold">{isDark ? 'Dark' : 'Light'}</OText>
            </OText>

            {/* Theme Switcher */}
            <OView className="flex-row gap-2">
              <OView className="flex-1">
                <OButton
                  variant={theme === 'light' ? 'primary' : 'secondary'}
                  onPress={() => setTheme('light')}>
                  Light
                </OButton>
              </OView>
              <OView className="flex-1">
                <OButton
                  variant={theme === 'dark' ? 'primary' : 'secondary'}
                  onPress={() => setTheme('dark')}>
                  Dark
                </OButton>
              </OView>
              <OView className="flex-1">
                <OButton
                  variant={theme === 'system' ? 'primary' : 'secondary'}
                  onPress={() => setTheme('system')}>
                  System
                </OButton>
              </OView>
            </OView>
          </OCard>

          {/* Color Palette */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Color Palette</OText>

            <OView className="mb-3">
              <OText className="text-sm mb-2">Primary Color</OText>
              <OView
                className="h-12 rounded-lg"
                style={{ backgroundColor: primaryColor }}
              />
            </OView>

            <OView className="mb-3">
              <OText className="text-sm mb-2">Success Color</OText>
              <OView
                className="h-12 rounded-lg"
                style={{ backgroundColor: successColor }}
              />
            </OView>

            <OView className="mb-3">
              <OText className="text-sm mb-2">Warning Color</OText>
              <OView
                className="h-12 rounded-lg"
                style={{ backgroundColor: warningColor }}
              />
            </OView>

            <OView className="mb-3">
              <OText className="text-sm mb-2">Danger Color</OText>
              <OView
                className="h-12 rounded-lg"
                style={{ backgroundColor: dangerColor }}
              />
            </OView>

            <OView className="mb-3">
              <OText className="text-sm mb-2">Background Color</OText>
              <OView
                className="h-12 rounded-lg border border-gray-300"
                style={{ backgroundColor }}
              />
            </OView>

            <OView>
              <OText className="text-sm mb-2">Surface Color</OText>
              <OView
                className="h-12 rounded-lg border border-gray-300"
                style={{ backgroundColor: surfaceColor }}
              />
            </OView>
          </OCard>

          {/* Button Variants in Current Theme */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">
              Buttons in Current Theme
            </OText>
            <OView className="gap-2">
              <OButton variant="primary">Primary</OButton>
              <OButton variant="success">Success</OButton>
              <OButton variant="warning">Warning</OButton>
              <OButton variant="danger">Danger</OButton>
              <OButton variant="secondary">Secondary</OButton>
            </OView>
          </OCard>

          {/* Usage Info */}
          <OCard variant="bordered">
            <OText className="text-xl font-semibold mb-3">Usage</OText>
            <OText className="text-sm text-gray-600 mb-2">
              Access theme colors using the <OText className="font-mono">useCSSVar</OText> hook:
            </OText>
            <OView className="bg-gray-100 p-3 rounded">
              <OText className="font-mono text-xs">
                const color = useCSSVar('--color-primary-600');
              </OText>
            </OView>
          </OCard>
        </OView>
      </ScrollView>
    </ScreenLayout>
  );
}

