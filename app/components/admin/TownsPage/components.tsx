'use client';

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { TownsTable } from '@/app/components/admin/TownsTable';
import { TownFormModal } from '@/app/components/admin/TownFormModal';
import { DeleteConfirmationModal } from '@/app/components/admin/DeleteConfirmationModal';
import { deleteTownAction } from '@/app/admin/actions/towns';
import { useTownsPage } from './hooks';
import { PageHeader, AlertBanner, SearchInput, sharedStyles } from '../shared';

/**
 * TownsPageContent Component
 * Following Single Responsibility Principle - only orchestrates towns CRUD UI
 * Uses Server Actions + useActionState for create/update/delete
 */
export function TownsPageContent() {
  const {
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
  } = useTownsPage();

  return (
    <div>
      <PageHeader
        title="الأحياء"
        action={
          <button onClick={handleAdd} className={sharedStyles.buttonPrimary}>
            <FaPlus className="w-3.5 h-3.5" />
            إضافة حي جديد
          </button>
        }
      />

      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="ابحث عن حي..."
      />

      {error && <AlertBanner message={error} variant="error" />}

      <TownsTable
        towns={towns}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {isModalOpen && (
        <TownFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSuccess={handleSuccess}
          town={editingTown}
        />
      )}

      {isDeleteModalOpen && townToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onSuccess={handleSuccess}
          action={deleteTownAction}
          id={townToDelete.id}
          title="تأكيد حذف الحي"
          message="هل أنت متأكد من حذف هذا الحي؟"
          itemName={townToDelete.name}
        />
      )}
    </div>
  );
}
