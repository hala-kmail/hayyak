'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { TownsTable } from '@/app/components/admin/TownsTable';
import { TownFormModal } from '@/app/components/admin/TownFormModal';
import { useTowns, Town, CreateTownData, UpdateTownData } from '@/app/hooks/useTowns';
import { FaPlus } from 'react-icons/fa';

export default function TownsPage() {
  const { towns, isLoading, error, createTown, updateTown, deleteTown } = useTowns();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTown, setEditingTown] = useState<Town | null>(null);

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

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحي؟')) {
      await deleteTown(id);
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

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800">{error}</p>
          </div>
        )}

        <TownsTable
          towns={towns}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
      </div>
    </AdminLayout>
  );
}
