'use client';

import React from 'react';
import { Town } from '@/app/hooks/useTowns';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LoadingState, EmptyState } from './shared';
import { tableStyles } from './styles/tableStyles';

interface TownsTableProps {
  towns: Town[];
  isLoading: boolean;
  onEdit: (town: Town) => void;
  onDelete: (id: string) => void;
}

export function TownsTable({ towns, isLoading, onEdit, onDelete }: TownsTableProps) {
  if (isLoading) {
    return <LoadingState message="جاري تحميل الأحياء..." />;
  }

  if (towns.length === 0) {
    return <EmptyState message="لا توجد أحياء مسجلة" />;
  }

  return (
    <div className={tableStyles.container}>
      <div className={tableStyles.wrapper}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.head}>
            <tr>
              <th className={tableStyles.th}>#</th>
              <th className={tableStyles.th}>اسم الحي</th>
              <th className={tableStyles.th}>العنوان</th>
              <th className={tableStyles.th}>عدد الأصوات</th>
              <th className={tableStyles.thCenter}>الإجراءات</th>
            </tr>
          </thead>
          <tbody className={tableStyles.body}>
            {towns.map((town, index) => (
              <tr key={town.id} className={tableStyles.row}>
                <td className={tableStyles.cell}>{index + 1}</td>
                <td className={tableStyles.cellSemibold}>{town.name}</td>
                <td className={tableStyles.cell}>{town.address}</td>
                <td className={tableStyles.cell}>{town.votes}</td>
                <td className={tableStyles.cellCenter}>
                  <div className={tableStyles.actionsSmall}>
                    <button
                      onClick={() => {
                        onEdit(town);
                      }}
                      className={tableStyles.btnEdit}
                      title="تعديل"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onDelete(town.id);
                      }}
                      className={tableStyles.btnDelete}
                      title="حذف"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
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
