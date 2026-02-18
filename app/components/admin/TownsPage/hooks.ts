'use client';

import { useCallback, useState } from 'react';
import { useTowns, Town } from '@/app/hooks/useTowns';
import { useDeleteModal } from '../hooks/useDeleteModal';

/**
 * useTownsPage Hook
 * Following Single Responsibility Principle - only handles towns page state and handlers
 * CRUD operations use Server Actions (TownFormModal, DeleteConfirmationModal)
 */
export function useTownsPage() {
  const { towns, isLoading, error, searchTowns, fetchTowns } = useTowns();
  const {
    isOpen: isDeleteModalOpen,
    itemToDelete: townToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal<Town>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTown, setEditingTown] = useState<Town | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = useCallback(() => {
    setEditingTown(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((town: Town) => {
    setEditingTown(town);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTown(null);
  }, []);

  const handleSuccess = useCallback(() => {
    fetchTowns();
  }, [fetchTowns]);

  const handleDeleteClick = useCallback(
    (id: string) => {
      const town = towns.find((t) => t.id === id);
      if (town) {
        openDeleteModal(town);
      }
    },
    [towns, openDeleteModal]
  );

  const handleSearchChange = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      if (!query || query.trim() === '') {
        await fetchTowns();
      } else {
        await searchTowns(query);
      }
    },
    [fetchTowns, searchTowns]
  );

  return {
    towns,
    isLoading,
    error,
    isModalOpen,
    editingTown,
    searchQuery,
    isDeleteModalOpen,
    townToDelete,
    handleAdd,
    handleEdit,
    handleSuccess,
    handleDeleteClick,
    handleSearchChange,
    closeModal,
    closeDeleteModal,
  };
}
