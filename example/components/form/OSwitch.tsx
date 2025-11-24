/**
 * OSwitch - Toggle switch component with form integration
 * 
 * A switch/toggle component that integrates with react-hook-form.
 * 
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <OSwitch 
 *     name="notifications" 
 *     label="Enable Notifications"
 *   />
 * </FormProvider>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Switch, SwitchProps, ViewStyle } from 'react-native';
import { OText } from '../ui/OText';
import { OView } from '../ui/OView';

interface OSwitchProps extends Omit<SwitchProps, 'value' | 'onValueChange'> {
  /** Field name for form registration */
  name: string;
  /** Switch label */
  label?: string | React.ReactNode;
  /** Container styles */
  containerStyle?: ViewStyle;
  /** Label position */
  labelPosition?: 'left' | 'right';
}

export function OSwitch({
  name,
  label,
  containerStyle,
  labelPosition = 'right',
  ...switchProps
}: OSwitchProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  const primaryColor = useCSSVar('--color-primary-600');
  const gray300Color = useCSSVar('--color-gray-300');

  return (
    <OView
      className="flex-row items-center mb-4"
      style={containerStyle}>
      {label && labelPosition === 'left' && (
        <OText className="text-sm font-medium text-gray-700 mr-3">
          {label}
        </OText>
      )}
      <Switch
        value={!!value}
        onValueChange={onChange}
        trackColor={{ false: gray300Color, true: primaryColor }}
        thumbColor="#fff"
        {...switchProps}
      />
      {label && labelPosition === 'right' && (
        <OText className="text-sm font-medium text-gray-700 ml-3">
          {label}
        </OText>
      )}
    </OView>
  );
}

