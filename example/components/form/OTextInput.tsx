/**
 * OTextInput - Form text input with validation
 * 
 * A text input component integrated with react-hook-form for
 * form validation and state management.
 * 
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <OTextInput 
 *     name="email" 
 *     label="Email" 
 *     required 
 *     placeholder="Enter your email"
 *   />
 *   <OTextInput 
 *     name="password" 
 *     label="Password" 
 *     secureTextEntry 
 *     showPasswordToggle
 *   />
 * </FormProvider>
 * ```
 */

import { useCSSVar } from '@/base/hooks';
import { IconEye, IconEyeOff } from '@/icons';
import React, { forwardRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { OIcon } from '../ui/OIcon';
import { OText } from '../ui/OText';
import { OView } from '../ui/OView';

interface OTextInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  /** Field name for form registration */
  name: string;
  /** Input label */
  label?: string | React.ReactNode;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is read-only */
  readonly?: boolean;
  /** Label orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Additional CSS classes */
  className?: string;
  /** Container styles */
  containerStyle?: ViewStyle;
  /** Input type */
  type?: 'text' | 'numeric';
  /** Show password visibility toggle */
  showPasswordToggle?: boolean;
}

export const OTextInput = forwardRef<TextInput, OTextInputProps>(
  (
    {
      name,
      label,
      required = false,
      readonly = false,
      orientation = 'vertical',
      placeholder,
      className,
      style,
      containerStyle,
      type = 'text',
      showPasswordToggle = false,
      secureTextEntry,
      returnKeyType,
      onSubmitEditing,
      ...textInputProps
    },
    ref,
  ) => {
    const { control } = useFormContext();
    const {
      field: { onChange, onBlur, value },
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: { required: required ? 'This field is required' : false },
    });

    const [showPassword, setShowPassword] = useState(false);
    const placeholderColor = useCSSVar('--color-text-muted');

    // Determine if we should show password toggle
    const shouldShowPasswordToggle = showPasswordToggle && secureTextEntry;
    const isPasswordVisible = shouldShowPasswordToggle ? showPassword : !secureTextEntry;

    // Ensure minimum height for text inputs to prevent collapse
    const inputStyle: TextStyle = {
      minHeight: textInputProps.multiline ? 80 : 48,
      ...(style as TextStyle),
    };

    const handleOnChange = (text: string) => {
      onChange(text);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleOnBlur = (e: any) => {
      onBlur();
      textInputProps?.onBlur?.(e);
    };

    // Determine if error is a warning
    const isWarning = error?.type === 'warning';
    const borderColor = error
      ? isWarning
        ? 'border-warning-600'
        : 'border-danger-600'
      : 'border-gray-300';

    const inputContent = (
      <OView className={`relative ${orientation === 'horizontal' ? 'flex-1' : ''}`}>
        {label && orientation === 'vertical' && (
          <OView className="absolute -top-2 left-3 z-10 bg-background px-1">
            <OView className="flex-row items-center">
              <OText className="text-xs font-medium text-gray-600">{label}</OText>
              {required && <OText className="text-xs text-danger-600 ml-1">*</OText>}
            </OView>
          </OView>
        )}
        <OView className="relative">
          <TextInput
            ref={ref}
            className={`border rounded-lg px-3 ios:pt-2 py-3 text-base ${
              readonly ? 'text-gray-500 bg-gray-50' : 'text-gray-900 bg-background'
            } ${borderColor} ${shouldShowPasswordToggle ? 'pr-12' : ''} ${className || ''}`}
            style={inputStyle}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            value={value ? value?.toString?.() : ''}
            onChangeText={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={textInputProps.onFocus}
            editable={!readonly}
            secureTextEntry={!isPasswordVisible}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            {...textInputProps}
          />
          {shouldShowPasswordToggle && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <OIcon icon={isPasswordVisible ? IconEyeOff : IconEye} size="sm" type="secondary" />
            </TouchableOpacity>
          )}
        </OView>
      </OView>
    );

    return (
      <OView
        className="mb-4"
        style={{
          flexShrink: 0,
          ...containerStyle,
        }}>
        <OView className={orientation === 'horizontal' ? 'flex-row items-center' : ''}>
          {orientation === 'horizontal' && label && (
            <OView className="mr-3 min-w-0 flex-shrink-0">
              <OText className="text-sm font-medium text-gray-700">{label}</OText>
              {required && <OText className="text-sm text-danger-600 ml-1">*</OText>}
            </OView>
          )}
          {inputContent}
        </OView>
        {error && (
          <OText className={`text-sm mt-1 ${isWarning ? 'text-warning-600' : 'text-danger-600'}`}>
            {error.message}
          </OText>
        )}
      </OView>
    );
  },
);

OTextInput.displayName = 'OTextInput';

