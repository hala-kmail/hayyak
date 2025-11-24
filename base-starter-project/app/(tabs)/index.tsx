import { OButton, OCard, OText, OView, ScreenLayout } from '@/base';
import { useCSSVar } from '@/base/hooks';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const primaryColor = useCSSVar('--color-primary-600');
  const textColor = useCSSVar('--color-text');

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OView className="py-6">
          {/* Hero Section */}
          <OView className="mb-8">
            <OText
              className="text-4xl font-bold mb-4"
              style={{ color: primaryColor }}>
              Welcome! 👋
            </OText>
            <OText
              className="text-lg mb-2"
              style={{ color: textColor }}>
              Base Starter Project
            </OText>
            <OText
              className="text-base"
              style={{ color: textColor }}>
              A complete React Native + Expo starter with reusable components,
              hooks, and utilities.
            </OText>
          </OView>

          {/* Features Cards */}
          <OView className="mb-6">
            <OText
              className="text-2xl font-bold mb-4"
              style={{ color: textColor }}>
              What's Included
            </OText>

            <OCard variant="elevated" className="mb-4">
              <OText className="text-lg font-semibold mb-2">
                🎨 50+ Reusable Components
              </OText>
              <OText className="text-sm text-gray-600 mb-3">
                Pre-built UI components, form inputs, layouts, and feedback states
              </OText>
              <OButton
                variant="primary"
                size="sm"
                onPress={() => router.push('/components')}>
                View Components
              </OButton>
            </OCard>

            <OCard variant="elevated" className="mb-4">
              <OText className="text-lg font-semibold mb-2">
                🎯 Custom Hooks
              </OText>
              <OText className="text-sm text-gray-600">
                7 custom hooks for theme, state management, and performance
              </OText>
            </OCard>

            <OCard variant="elevated" className="mb-4">
              <OText className="text-lg font-semibold mb-2">
                🛠️ Utilities
              </OText>
              <OText className="text-sm text-gray-600">
                30+ utility functions for formatting, validation, and storage
              </OText>
            </OCard>

            <OCard variant="elevated" className="mb-4">
              <OText className="text-lg font-semibold mb-2">
                🌓 Theme System
              </OText>
              <OText className="text-sm text-gray-600 mb-3">
                Built-in dark mode with 50+ CSS variables
              </OText>
              <OButton
                variant="secondary"
                size="sm"
                onPress={() => router.push('/theme')}>
                Try Theme
              </OButton>
            </OCard>
          </OView>

          {/* Quick Start */}
          <OCard variant="bordered" className="mb-4">
            <OText className="text-xl font-bold mb-3">Quick Start</OText>
            <OText className="text-sm text-gray-700 mb-2">
              1. Explore the tabs above
            </OText>
            <OText className="text-sm text-gray-700 mb-2">
              2. Check out the component showcase
            </OText>
            <OText className="text-sm text-gray-700 mb-2">
              3. Try the theme switcher
            </OText>
            <OText className="text-sm text-gray-700">
              4. Read the documentation in /base/docs
            </OText>
          </OCard>
        </OView>
      </ScrollView>
    </ScreenLayout>
  );
}

