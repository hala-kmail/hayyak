'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { TownsTable } from '@/app/components/admin/TownsTable';
import { TownFormModal } from '@/app/components/admin/TownFormModal';
import { DeleteConfirmationModal } from '@/app/components/admin/DeleteConfirmationModal';
import { useTowns, Town, CreateTownData, UpdateTownData } from '@/app/hooks/useTowns';
import { FaPlus, FaSearch } from 'react-icons/fa';

export default function TownsPage() {
  const { towns, isLoading, error, createTown, updateTown, deleteTown, searchTowns, fetchTowns } = useTowns();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTown, setEditingTown] = useState<Town | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [townToDelete, setTownToDelete] = useState<Town | null>(null);

  const handleAdd = () => {
    setEditingTown(null);
    setIsModalOpen(true);
  };

  const handleEdit = (town: Town) => {
    setEditingTown(town);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateTownData | UpdateTownData) => {
    try {
      if (editingTown) {
        await updateTown(editingTown.id, data);
      } else {
        await createTown(data as CreateTownData);
      }
      // عند النجاح، إغلاق الـ modal
      setIsModalOpen(false);
      setEditingTown(null);
    } catch (err) {
      // الخطأ سيُعرض في الـ modal من خلال الـ hook
      // لا نغلق الـ modal عند الفشل
    }
  };

  const handleDeleteClick = (id: string) => {
    const town = towns.find((t) => t.id === id);
    if (town) {
      setTownToDelete(town);
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (townToDelete) {
      await deleteTown(townToDelete.id);
      setIsDeleteModalOpen(false);
      setTownToDelete(null);
    }
  };

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    // في حال كان مربع البحث فارغاً، اجلب كل الأحياء
    if (!query || query.trim() === '') {
      await fetchTowns();
    } else {
      await searchTowns(query);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-navy-blue">الأحياء</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg hover:shadow-turquoise/30 transition-all"
          >
            <FaPlus className="w-4 h-4" />
            إضافة حي جديد
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-grey">
              <FaSearch className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              placeholder="ابحث عن حي..."
              className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue bg-white"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800">{error}</p>
          </div>
        )}

        <TownsTable
          towns={towns}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {isModalOpen && (
          <TownFormModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTown(null);
            }}
            onSubmit={handleSubmit}
            town={editingTown}
          />
        )}

        {isDeleteModalOpen && townToDelete && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setTownToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            title="تأكيد حذف الحي"
            message="هل أنت متأكد من حذف هذا الحي؟"
            itemName={townToDelete.name}
          />
        )}
      </div>
    </AdminLayout>
  );
}
