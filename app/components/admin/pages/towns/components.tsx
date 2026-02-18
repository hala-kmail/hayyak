'use client';

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { TownsTable } from '../../tables';
import { TownFormModal, DeleteConfirmationModal } from '../../modals';
import { useTownsPage } from './hooks';
import { PageHeader, AlertBanner, SearchInput, sharedStyles } from '../../shared';

/**
 * TownsPageContent Component
 * Following Single Responsibility Principle - only orchestrates towns CRUD UI
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
    handleSubmit,
    handleDeleteClick,
    handleDeleteConfirm,
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
            <FaPlus className="w-4 h-4" />
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
          onSubmit={handleSubmit}
          town={editingTown}
        />
      )}

      {isDeleteModalOpen && townToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="تأكيد حذف الحي"
          message="هل أنت متأكد من حذف هذا الحي؟"
          itemName={townToDelete.name}
        />
      )}
    </div>
  );
}
