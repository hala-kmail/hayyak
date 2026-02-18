'use client';

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdminsTable } from '@/app/components/admin/AdminsTable';
import { AdminFormModal } from '@/app/components/admin/AdminFormModal';
import { DeleteConfirmationModal } from '@/app/components/admin/DeleteConfirmationModal';
import { deleteAdminAction } from '@/app/admin/actions/admins';
import { useAdminsPage } from './hooks';
import { PageHeader, AlertBanner, sharedStyles } from '../shared';

/**
 * AdminsPageContent Component
 * Following Single Responsibility Principle - only orchestrates admins CRUD UI
 * Uses Server Actions + useActionState for create/delete
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
    handleSuccess,
    handleDeleteClick,
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
        onToggleSuccess={handleSuccess}
        onDelete={handleDeleteClick}
      />

      {isModalOpen && (
        <AdminFormModal isOpen={isModalOpen} onClose={closeModal} onSuccess={handleSuccess} />
      )}

      {isDeleteModalOpen && adminToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={handleSuccess}
          action={deleteAdminAction}
          id={adminToDelete.id}
          title="تأكيد حذف الأدمن"
          message="هل أنت متأكد من حذف هذا الأدمن؟"
          itemName={adminToDelete.name}
        />
      )}
    </div>
  );
}
