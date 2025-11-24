/**
 * OText - Base text component with theme integration
 * 
 * A wrapper around React Native's Text component that automatically
 * applies theme variables and supports NativeWind className styling.
 * 
 * @example
 * ```tsx
 * <OText className="text-lg font-bold">Hello World</OText>
 * <OText style={{ color: 'red' }}>Styled Text</OText>
 * ```
 */

import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { Text, TextProps } from 'react-native';

interface OTextProps extends TextProps {
  className?: string;
}

export function OText({ className, style, children, ...props }: OTextProps) {
  const { themeVars } = useTheme();

  return (
    <Text className={className} style={[themeVars, style]} {...props}>
      {` `}
      {children}
      {` `}
    </Text>
  );
}

