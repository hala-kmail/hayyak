/**
 * Example: Detail Screen with Data Fetching
 * 
 * Demonstrates:
 * - Fetching single item details
 * - Loading skeletons
 * - Error handling
 * - Refresh functionality
 * - Action buttons
 * - Card layout
 */

import {
  OBadge,
  OButton,
  OCard,
  OErrorState,
  OLoadingSpinner,
  OSkeleton,
  OText,
  OView,
} from '@/base/components';
import { formatDate, formatCurrency } from '@/base/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Alert, ScrollView } from 'react-native';

// Example data type
interface ItemDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  creator: {
    name: string;
    email: string;
  };
}

// Example API functions
async function fetchItemDetail(id: number): Promise<ItemDetail> {
  const response = await fetch(`/api/items/${id}`);
  if (!response.ok) throw new Error('Failed to fetch item');
  return response.json();
}

async function approveItem(id: number): Promise<void> {
  const response = await fetch(`/api/items/${id}/approve`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to approve item');
}

async function rejectItem(id: number): Promise<void> {
  const response = await fetch(`/api/items/${id}/reject`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to reject item');
}

interface DetailScreenExampleProps {
  itemId: number;
}

export function DetailScreenExample({ itemId }: DetailScreenExampleProps) {
  const queryClient = useQueryClient();

  // Fetch item details
  const {
    data: item,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['item', itemId],
    queryFn: () => fetchItemDetail(itemId),
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: () => approveItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item', itemId] });
      Alert.alert('Success', 'Item approved successfully');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: () => rejectItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item', itemId] });
      Alert.alert('Success', 'Item rejected');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  // Loading state with skeleton
  if (isLoading) {
    return (
      <ScrollView className="flex-1 p-4">
        <OCard>
          <OSkeleton height={30} width="60%" className="mb-2" />
          <OSkeleton height={20} width="40%" className="mb-4" />
          <OSkeleton variant="text" count={3} />
        </OCard>
      </ScrollView>
    );
  }

  // Error state
  if (error) {
    return (
      <OErrorState
        message={error.message || 'Failed to load item'}
        onRetry={refetch}
      />
    );
  }

  if (!item) return null;

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      {/* Header Card */}
      <OCard variant="elevated" className="mb-4">
        <OView className="flex-row justify-between items-start mb-3">
          <OText className="text-2xl font-bold flex-1">{item.title}</OText>
          <OBadge variant={getStatusBadgeVariant(item.status)}>
            {item.status}
          </OBadge>
        </OView>

        <OText className="text-lg text-primary-600 font-semibold mb-3">
          {formatCurrency(item.price, 'USD')}
        </OText>

        <OText className="text-gray-700 mb-4">{item.description}</OText>

        {/* Metadata */}
        <OView className="border-t border-gray-200 pt-3">
          <OView className="flex-row justify-between mb-2">
            <OText className="text-sm text-gray-500">Created</OText>
            <OText className="text-sm font-medium">{formatDate(item.createdAt)}</OText>
          </OView>
          <OView className="flex-row justify-between mb-2">
            <OText className="text-sm text-gray-500">Updated</OText>
            <OText className="text-sm font-medium">{formatDate(item.updatedAt)}</OText>
          </OView>
          <OView className="flex-row justify-between">
            <OText className="text-sm text-gray-500">Creator</OText>
            <OText className="text-sm font-medium">{item.creator.name}</OText>
          </OView>
        </OView>
      </OCard>

      {/* Actions */}
      {item.status === 'pending' && (
        <OCard variant="bordered">
          <OText className="text-lg font-semibold mb-3">Actions</OText>
          <OView className="flex-row gap-2">
            <OView className="flex-1">
              <OButton
                variant="success"
                onPress={() => approveMutation.mutate()}
                loading={approveMutation.isPending}>
                Approve
              </OButton>
            </OView>
            <OView className="flex-1">
              <OButton
                variant="danger"
                onPress={() => rejectMutation.mutate()}
                loading={rejectMutation.isPending}>
                Reject
              </OButton>
            </OView>
          </OView>
        </OCard>
      )}
    </ScrollView>
  );
}

