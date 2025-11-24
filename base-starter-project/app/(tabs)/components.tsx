import {
  OBadge,
  OButton,
  OCard,
  OEmptyState,
  OErrorState,
  OLoadingSpinner,
  OSkeleton,
  OText,
  OView,
  ScreenLayout,
} from '@/base';
import { useCSSVar } from '@/base/hooks';
import React from 'react';
import { ScrollView } from 'react-native';

export default function ComponentsScreen() {
  const textColor = useCSSVar('--color-text');

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OView className="py-6">
          <OText className="text-3xl font-bold mb-6" style={{ color: textColor }}>
            Component Showcase
          </OText>

          {/* Buttons */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Buttons</OText>
            <OView className="gap-2">
              <OButton variant="primary">Primary Button</OButton>
              <OButton variant="success">Success Button</OButton>
              <OButton variant="warning">Warning Button</OButton>
              <OButton variant="danger">Danger Button</OButton>
              <OButton variant="secondary">Secondary Button</OButton>
              <OButton variant="primary" loading>
                Loading...
              </OButton>
              <OButton variant="primary" disabled>
                Disabled
              </OButton>
            </OView>
          </OCard>

          {/* Button Sizes */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Button Sizes</OText>
            <OView className="gap-2">
              <OButton variant="primary" size="sm">
                Small Button
              </OButton>
              <OButton variant="primary" size="md">
                Medium Button
              </OButton>
              <OButton variant="primary" size="lg">
                Large Button
              </OButton>
            </OView>
          </OCard>

          {/* Badges */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Badges</OText>
            <OView className="flex-row flex-wrap gap-2">
              <OBadge variant="primary">Primary</OBadge>
              <OBadge variant="success">Success</OBadge>
              <OBadge variant="warning">Warning</OBadge>
              <OBadge variant="danger">Danger</OBadge>
              <OBadge variant="secondary">Secondary</OBadge>
            </OView>
          </OCard>

          {/* Cards */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Cards</OText>
            <OCard variant="elevated" className="mb-3">
              <OText className="font-semibold">Elevated Card</OText>
              <OText className="text-sm text-gray-600">
                Card with shadow elevation
              </OText>
            </OCard>
            <OCard variant="bordered" className="mb-3">
              <OText className="font-semibold">Bordered Card</OText>
              <OText className="text-sm text-gray-600">Card with border</OText>
            </OCard>
            <OCard variant="flat">
              <OText className="font-semibold">Flat Card</OText>
              <OText className="text-sm text-gray-600">Card without styling</OText>
            </OCard>
          </OCard>

          {/* Loading States */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Loading States</OText>
            <OView className="mb-4">
              <OText className="text-sm mb-2">Loading Spinner:</OText>
              <OLoadingSpinner />
            </OView>
            <OView>
              <OText className="text-sm mb-2">Skeletons:</OText>
              <OSkeleton height={20} className="mb-2" />
              <OSkeleton height={20} width="80%" className="mb-2" />
              <OSkeleton height={20} width="60%" />
            </OView>
          </OCard>

          {/* Empty State */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Empty State</OText>
            <OEmptyState
              title="No items found"
              message="Try creating your first item"
              actionLabel="Create Item"
              onAction={() => console.log('Create pressed')}
            />
          </OCard>

          {/* Error State */}
          <OCard variant="bordered" className="mb-6">
            <OText className="text-xl font-semibold mb-4">Error State</OText>
            <OErrorState
              message="Failed to load data"
              onRetry={() => console.log('Retry pressed')}
            />
          </OCard>
        </OView>
      </ScrollView>
    </ScreenLayout>
  );
}

