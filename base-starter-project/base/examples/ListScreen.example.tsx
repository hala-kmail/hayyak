/**
 * Example: List Screen with Data Fetching
 * 
 * Demonstrates:
 * - React Query integration for data fetching
 * - Loading, error, and empty states
 * - Pull-to-refresh functionality
 * - List rendering with FlatList
 * - Base components usage
 */

import { OButton, OCard, OEmptyState, OErrorState, OLoadingSpinner, OText, OView } from '@/base/components';
import { useDebounce } from '@/base/hooks';
import { formatDate } from '@/base/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, RefreshControl, TextInput } from 'react-native';

// Example data type
interface Item {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: 'active' | 'completed';
}

// Example API function
async function fetchItems(search?: string): Promise<Item[]> {
  // Replace with actual API call
  const response = await fetch(`/api/items?search=${search || ''}`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
}

export function ListScreenExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  // React Query hook
  const {
    data: items,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['items', debouncedSearch],
    queryFn: () => fetchItems(debouncedSearch),
  });

  // Loading state
  if (isLoading) {
    return <OLoadingSpinner centered />;
  }

  // Error state
  if (error) {
    return (
      <OErrorState
        message={error.message || 'Failed to load items'}
        onRetry={refetch}
      />
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <OEmptyState
        title="No items found"
        message={searchTerm ? 'Try adjusting your search' : 'Create your first item to get started'}
        actionLabel="Create Item"
        onAction={() => console.log('Navigate to create')}
      />
    );
  }

  // Render list item
  const renderItem = ({ item }: { item: Item }) => (
    <OCard variant="bordered" className="mb-3">
      <OView className="flex-row justify-between items-start mb-2">
        <OText className="text-lg font-semibold flex-1">{item.title}</OText>
        <OView
          className={`px-2 py-1 rounded ${
            item.status === 'active' ? 'bg-success-100' : 'bg-gray-100'
          }`}>
          <OText className="text-xs">{item.status}</OText>
        </OView>
      </OView>
      <OText className="text-gray-600 mb-2">{item.description}</OText>
      <OText className="text-xs text-gray-500">{formatDate(item.createdAt)}</OText>
    </OCard>
  );

  return (
    <OView className="flex-1 p-4">
      {/* Search Input */}
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search items..."
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {/* List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <OEmptyState
            title="No results"
            message="No items match your search"
          />
        }
      />
    </OView>
  );
}

