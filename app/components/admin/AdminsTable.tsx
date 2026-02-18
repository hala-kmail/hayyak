'use client';

import React from 'react';
import { Admin } from '@/app/hooks/useAdmins';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toggleAdminAction } from '@/app/admin/actions/admins';
import { ToggleAdminForm } from './ToggleAdminForm';
import { LoadingState, EmptyState } from './shared';
import { formatDate } from './utils';
import { tableStyles } from './styles/tableStyles';

interface AdminsTableProps {
  admins: Admin[];
  isLoading: boolean;
  onToggleSuccess: () => void;
  onDelete: (id: string) => void;
}

export function AdminsTable({ admins, isLoading, onToggleSuccess, onDelete }: AdminsTableProps) {
  if (isLoading) {
    return <LoadingState message="جاري تحميل مسؤولين النظام..." />;
  }

  if (admins.length === 0) {
    return <EmptyState message="لا يوجد أدمنز مسجلين" />;
  }

  return (
    <div className={tableStyles.container}>
      <div className={tableStyles.wrapper}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.head}>
            <tr>
              <th className={tableStyles.thW16}>#</th>
              <th className={tableStyles.th}>الاسم</th>
              <th className={tableStyles.th}>البريد الإلكتروني</th>
              <th className={tableStyles.thMin150}>الدور</th>
              <th className={tableStyles.thMin100}>الحالة</th>
              <th className={tableStyles.th}>تاريخ الإنشاء</th>
              <th className={tableStyles.thMin140}>الإجراءات</th>
            </tr>
          </thead>
          <tbody className={tableStyles.body}>
            {admins.map((admin, index) => (
              <tr key={admin.id} className={tableStyles.row}>
                <td className={tableStyles.cell}>{index + 1}</td>
                <td className={tableStyles.cellSemibold}>{admin.name}</td>
                <td className={tableStyles.cell}>{admin.email}</td>
                <td className={tableStyles.cellCenter}>
                  <div className="flex items-center justify-center">
                    <span className={tableStyles.roleBadge(admin.role === 'super_admin')}>
                      {admin.role === 'super_admin' ? 'سوبر أدمن' : 'أدمن'}
                    </span>
                  </div>
                </td>
                <td className={tableStyles.cellCenter}>
                  <div className="flex items-center justify-center">
                    <span className={tableStyles.statusBadge(admin.isActive)}>
                      {admin.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </td>
                <td className={tableStyles.cell}>{formatDate(admin.createdAt)}</td>
                <td className={tableStyles.cellCenter}>
                  <div className={tableStyles.actions}>
                    {admin.role !== 'super_admin' && (
                      <>
                        <ToggleAdminForm
                          adminId={admin.id}
                          isActive={admin.isActive}
                          action={toggleAdminAction}
                          onSuccess={onToggleSuccess}
                        />
                        <button
                          onClick={() => {
                            onDelete(admin.id);
                          }}
                          className={tableStyles.btnDeleteAction}
                          title="حذف"
                        >
                          <FaTrash className={tableStyles.iconScale} />
                          <span className={tableStyles.iconHidden}>حذف</span>
                        </button>
                      </>
                    )}
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
