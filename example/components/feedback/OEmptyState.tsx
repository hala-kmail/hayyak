/**
 * OEmptyState - Empty state placeholder component
 * 
 * A component for displaying empty states with optional icon, title, and action button.
 * 
 * @example
 * ```tsx
 * <OEmptyState 
 *   title="No items found"
 *   message="Start by creating your first item"
 *   actionLabel="Create Item"
 *   onAction={() => console.log('Create')}
 * />
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ViewStyle } from 'react-native';
import { OButton } from '../ui/OButton';
import { OIcon } from '../ui/OIcon';
import { OText } from '../ui/OText';
import { OView } from '../ui/OView';

interface OEmptyStateProps {
  /** Icon component to display */
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  /** Main title text */
  title: string;
  /** Description message */
  message?: string;
  /** Action button label */
  actionLabel?: string;
  /** Action button press handler */
  onAction?: () => void;
  /** Container styles */
  style?: ViewStyle;
}

export function OEmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  style,
}: OEmptyStateProps) {
  const textColor = useCSSVar('--color-text');
  const mutedColor = useCSSVar('--color-text-muted');

  return (
    <OView 
      className="flex-1 items-center justify-center px-8 py-12"
      style={style}>
      {icon && (
        <OView className="mb-4">
          <OIcon icon={icon} size={64} type="muted" />
        </OView>
      )}
      <OText 
        className="text-xl font-bold text-center mb-2"
        style={{ color: textColor }}>
        {title}
      </OText>
      {message && (
        <OText 
          className="text-base text-center mb-6"
          style={{ color: mutedColor }}>
          {message}
        </OText>
      )}
      {actionLabel && onAction && (
        <OButton variant="primary" onPress={onAction}>
          {actionLabel}
        </OButton>
      )}
    </OView>
  );
}

