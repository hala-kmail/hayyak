/**
 * OView - Base view component with theme integration
 * 
 * A wrapper around React Native's View component that automatically
 * applies theme variables and supports NativeWind className styling.
 * 
 * @example
 * ```tsx
 * <OView className="flex-1 p-4 bg-surface">
 *   <OText>Content here</OText>
 * </OView>
 * ```
 */

import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface OViewProps extends ViewProps {
  className?: string;
}

export function OView({ className, style, children, ...props }: OViewProps) {
  const { themeVars } = useTheme();

  return (
    <View className={className} style={[themeVars, style]} {...props}>
      {children}
    </View>
  );
}

