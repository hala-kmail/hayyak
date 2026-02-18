'use client';

import React, { useCallback, useState } from 'react';
import { useAdmins, CreateAdminData, Admin } from '@/app/hooks/useAdmins';
import { useDeleteModal } from '../../hooks/useDeleteModal';

/**
 * useAdminsPage Hook
 * Following Single Responsibility Principle - only handles admins page state and handlers
 */
export function useAdminsPage() {
  const { admins, isLoading, error, createAdmin, deleteAdmin, toggleAdminStatus } = useAdmins();
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

  const handleSubmit = useCallback(
    async (data: CreateAdminData) => {
      try {
        await createAdmin(data);
        setIsModalOpen(false);
      } catch {
        // Error displayed in modal via hook
      }
    },
    [createAdmin]
  );

  const handleDeleteClick = useCallback(
    (id: string) => {
      const admin = admins.find((a) => a.id === id);
      if (admin) {
        openDeleteModal(admin);
      }
    },
    [admins, openDeleteModal]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (adminToDelete) {
      await deleteAdmin(adminToDelete.id);
      closeDeleteModal();
    }
  }, [adminToDelete, deleteAdmin, closeDeleteModal]);

  const handleToggle = useCallback(
    async (id: string) => {
      try {
        await toggleAdminStatus(id);
      } catch {
        // Error displayed via hook
      }
    },
    [toggleAdminStatus]
  );

  return {
    admins,
    isLoading,
    error,
    isModalOpen,
    isDeleteModalOpen,
    adminToDelete,
    handleAdd,
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleToggle,
    closeModal,
    closeDeleteModal,
  };
}
