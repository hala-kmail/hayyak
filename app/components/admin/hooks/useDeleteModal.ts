'use client';

import { useState, useCallback } from 'react';

/**
 * useDeleteModal Hook
 * Following Single Responsibility Principle - only handles delete modal state
 * Following Dependency Inversion - generic over item type
 */
export function useDeleteModal<T extends { id: string }>() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const openDeleteModal = useCallback((item: T) => {
    setItemToDelete(item);
    setIsOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsOpen(false);
    setItemToDelete(null);
  }, []);

  return {
    isOpen,
    itemToDelete,
    openDeleteModal,
    closeDeleteModal,
  };
}
