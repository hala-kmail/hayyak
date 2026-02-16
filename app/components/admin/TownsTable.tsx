'use client';

import React from 'react';
import { Town } from '@/app/hooks/useTowns';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TownsTableProps {
  towns: Town[];
  isLoading: boolean;
  onEdit: (town: Town) => void;
  onDelete: (id: string) => void;
}

export function TownsTable({ towns, isLoading, onEdit, onDelete }: TownsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-warm-grey">جاري تحميل الأحياء...</p>
      </div>
    );
  }

  if (towns.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <p className="text-warm-grey">لا توجد أحياء مسجلة</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">#</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">اسم الحي</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">العنوان</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-navy-blue">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {towns.map((town, index) => (
              <tr key={town.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-warm-grey">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-navy-blue">{town.name}</td>
                <td className="px-6 py-4 text-sm text-warm-grey">{town.address}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        onEdit(town);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-turquoise/10 text-turquoise hover:bg-turquoise hover:text-white transition-all"
                      title="تعديل"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onDelete(town.id);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      title="حذف"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
