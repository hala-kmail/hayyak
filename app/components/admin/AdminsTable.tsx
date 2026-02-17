'use client';

import React from 'react';
import { Admin } from '@/app/hooks/useAdmins';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

interface AdminsTableProps {
  admins: Admin[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AdminsTable({ admins, isLoading, onToggle, onDelete }: AdminsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-warm-grey">جاري تحميل مسؤولين النظام...</p>
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <p className="text-warm-grey">لا يوجد أدمنز مسجلين</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue w-16">#</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">الاسم</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[150px]">الدور</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[100px]">الحالة</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">تاريخ الإنشاء</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-navy-blue min-w-[140px]">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.map((admin, index) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-warm-grey">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-navy-blue">{admin.name}</td>
                <td className="px-6 py-4 text-sm text-warm-grey">{admin.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        admin.role === 'super_admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {admin.role === 'super_admin' ? 'سوبر أدمن' : 'أدمن'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        admin.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {admin.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-warm-grey">{formatDate(admin.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {admin.role !== 'super_admin' && (
                      <>
                        <button
                          onClick={() => {
                            onToggle(admin.id);
                          }}
                          className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md ${
                            admin.isActive
                              ? 'bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                          }`}
                          title={admin.isActive ? 'تعطيل' : 'تفعيل'}
                        >
                          {admin.isActive ? (
                            <>
                              <FaToggleOn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              <span className="hidden sm:inline">تعطيل</span>
                            </>
                          ) : (
                            <>
                              <FaToggleOff className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              <span className="hidden sm:inline">تفعيل</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            onDelete(admin.id);
                          }}
                          className="group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-red-50 text-red-700 hover:bg-red-100 border-2 border-red-200 transition-all shadow-sm hover:shadow-md"
                          title="حذف"
                        >
                          <FaTrash className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="hidden sm:inline">حذف</span>
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
