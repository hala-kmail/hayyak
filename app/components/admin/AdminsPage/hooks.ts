'use client';

import { useCallback, useState } from 'react';
import { useAdmins, Admin } from '@/app/hooks/useAdmins';
import { useDeleteModal } from '../hooks/useDeleteModal';

/**
 * useAdminsPage Hook
 * Following Single Responsibility Principle - only handles admins page state and handlers
 * CRUD operations use Server Actions (AdminFormModal, DeleteConfirmationModal, ToggleAdminForm)
 */
export function useAdminsPage() {
  const { admins, isLoading, error, fetchAdmins } = useAdmins();
  const {
    isOpen: isDeleteModalOpen,
    itemToDelete: adminToDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal<Admin>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleDeleteClick = useCallback(
    (id: string) => {
      const admin = admins.find((a) => a.id === id);
      if (admin) {
        openDeleteModal(admin);
      }
    },
    [admins, openDeleteModal]
  );

  return {
    admins,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,
    adminToDelete,
    handleAdd,
    handleSuccess,
    handleDeleteClick,
    closeModal,
    closeDeleteModal,
  };
}
