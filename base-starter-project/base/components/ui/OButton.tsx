/**
 * OButton - Reusable button component with variants and loading states
 * 
 * A flexible button component that supports multiple variants (primary, success, warning, danger, secondary),
 * sizes (sm, md, lg), loading states, and custom icons.
 * 
 * @example
 * ```tsx
 * <OButton variant="primary" onPress={handleSubmit}>
 *   Submit
 * </OButton>
 * 
 * <OButton variant="danger" size="sm" loading={isLoading}>
 *   Delete
 * </OButton>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import { useTheme } from '@/providers/ThemeProvider';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { OText } from './OText';
import { OView } from './OView';

interface OButtonProps extends TouchableOpacityProps {
  /** Button style variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Button content or render function */
  children?:
    | React.ReactNode
    | ((props: { getTextColor: () => string; classNames: string }) => React.ReactNode);
  /** Show loading spinner */
  loading?: boolean;
  /** Icon component to display */
  icon?: React.ReactNode;
}

export function OButton({
  variant = 'primary',
  size = 'lg',
  className,
  style,
  children,
  loading = false,
  disabled,
  icon,
  ...props
}: OButtonProps) {
  const { themeVars } = useTheme();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `${disabled ? 'bg-primary-500' : 'bg-primary-500'}`;
      case 'success':
        return `${disabled ? 'bg-success-600' : 'bg-success-600'}`;
      case 'warning':
        return `${disabled ? 'bg-warning-600' : 'bg-warning-600'}`;
      case 'danger':
        return `${disabled ? 'bg-danger-600' : 'bg-danger-600'}`;
      case 'secondary':
        return `${disabled ? 'bg-gray-50' : 'bg-gray-50'}`;
      default:
        return `${disabled ? 'bg-primary-500' : 'bg-primary-500'}`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3';
      case 'md':
        return 'py-2 px-4';
      case 'lg':
        return 'py-3 px-6';
      default:
        return 'py-2 px-4';
    }
  };

  const whiteColor = useCSSVar('--color-white');
  const gray600Color = useCSSVar('--color-gray-600');
  const getTextColor = () => {
    return variant === 'secondary' ? gray600Color : whiteColor;
  };

  const buttonClasses = `${getVariantClasses()} ${getSizeClasses()} relative rounded-lg transition-colors duration-200 flex-row items-center justify-center ${className || ''}`;

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      className={buttonClasses}
      style={[themeVars, style]}
      {...props}>
      {icon}
      {loading && <ActivityIndicator color={getTextColor()} />}
      {typeof children === 'function' ? (
        children({ getTextColor, classNames: 'text-sm text-center font-medium' })
      ) : (
        <OText style={{ color: getTextColor() }} className={`text-sm text-center font-medium`}>
          {children}
        </OText>
      )}
      {disabled && (
        <OView className=" absolute top-0 bottom-0 left-0 right-0 bg-white opacity-50" />
      )}
    </TouchableOpacity>
  );
}

