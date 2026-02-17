'use client';

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdminsTable } from '@/app/components/admin/AdminsTable';
import { AdminFormModal } from '@/app/components/admin/AdminFormModal';
import { DeleteConfirmationModal } from '@/app/components/admin/DeleteConfirmationModal';
import { useAdminsPage } from './hooks';
import { PageHeader, AlertBanner, sharedStyles } from '../shared';

/**
 * AdminsPageContent Component
 * Following Single Responsibility Principle - only orchestrates admins CRUD UI
 */
export function AdminsPageContent() {
  const {
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
  } = useAdminsPage();

  return (
    <div>
      <PageHeader
        title="إدارة مسؤولين النظام"
        action={
          <button onClick={handleAdd} className={sharedStyles.buttonPrimary}>
            <FaPlus className="w-4 h-4" />
            إضافة مسؤول جديد
          </button>
        }
      />

      {error && <AlertBanner message={error} variant="error" />}

      <AdminsTable
        admins={admins}
        isLoading={isLoading}
        onToggle={handleToggle}
        onDelete={handleDeleteClick}
      />

      {isModalOpen && (
        <AdminFormModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
      )}

      {isDeleteModalOpen && adminToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="تأكيد حذف الأدمن"
          message="هل أنت متأكد من حذف هذا الأدمن؟"
          itemName={adminToDelete.name}
        />
      )}
    </div>
  );
}
