/**
 * ScreenLayout - Base layout wrapper for screens
 * 
 * A consistent layout component that provides padding, safe area handling,
 * and optional scroll functionality.
 * 
 * @example
 * ```tsx
 * <ScreenLayout>
 *   <OText>Screen content</OText>
 * </ScreenLayout>
 * 
 * <ScreenLayout scrollable={false} noPadding>
 *   <OText>Custom layout</OText>
 * </ScreenLayout>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ScrollView, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OView } from '../ui/OView';

interface ScreenLayoutProps extends ViewProps {
  /** Whether the content should be scrollable */
  scrollable?: boolean;
  /** Whether to remove default padding */
  noPadding?: boolean;
  /** Children components */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Custom container styles */
  containerStyle?: ViewStyle;
}

export function ScreenLayout({
  scrollable = true,
  noPadding = false,
  children,
  className,
  style,
  containerStyle,
  ...props
}: ScreenLayoutProps) {
  const backgroundColor = useCSSVar('--color-background');

  const containerClasses = `flex-1 ${!noPadding ? 'px-4 py-6' : ''} ${className || ''}`;

  if (scrollable) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor }, style]} {...props}>
        <ScrollView
          contentContainerStyle={[
            { flexGrow: 1, paddingHorizontal: noPadding ? 0 : 16, paddingVertical: noPadding ? 0 : 24 },
            containerStyle,
          ]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, style]} {...props}>
      <OView className={containerClasses} style={containerStyle}>
        {children}
      </OView>
    </SafeAreaView>
  );
}

