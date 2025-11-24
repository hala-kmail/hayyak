/**
 * Example: Form Screen with Validation
 * 
 * Demonstrates:
 * - React Hook Form integration
 * - Zod schema validation
 * - Form inputs with validation
 * - Loading states during submission
 * - Error handling
 * - Success feedback
 */

import { OButton, OSwitch, OTextInput, OView } from '@/base/components';
import { useToggle } from '@/base/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, ScrollView } from 'react-native';
import { z } from 'zod';

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  notifications: z.boolean().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

type FormData = z.infer<typeof formSchema>;

// Example API function
async function submitForm(data: FormData): Promise<void> {
  // Replace with actual API call
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit form');
}

export function FormScreenExample() {
  const [showPassword, toggleShowPassword] = useToggle(false);

  // React Hook Form setup
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      notifications: true,
      bio: '',
    },
  });

  // Mutation for form submission
  const mutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      Alert.alert('Success', 'Form submitted successfully!');
      methods.reset();
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message || 'Failed to submit form');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView className="flex-1">
      <OView className="p-4">
        <FormProvider {...methods}>
          {/* Name Input */}
          <OTextInput
            name="name"
            label="Name"
            placeholder="Enter your name"
            required
          />

          {/* Email Input */}
          <OTextInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            required
          />

          {/* Password Input */}
          <OTextInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            showPasswordToggle
            required
          />

          {/* Bio Input (Multiline) */}
          <OTextInput
            name="bio"
            label="Bio"
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
          />

          {/* Notifications Switch */}
          <OSwitch
            name="notifications"
            label="Enable notifications"
          />

          {/* Submit Button */}
          <OButton
            variant="primary"
            onPress={methods.handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}>
            Submit
          </OButton>

          {/* Reset Button */}
          <OButton
            variant="secondary"
            onPress={() => methods.reset()}
            disabled={mutation.isPending}
            className="mt-2">
            Reset
          </OButton>
        </FormProvider>
      </OView>
    </ScrollView>
  );
}

