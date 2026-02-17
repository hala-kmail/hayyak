'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AdminsTable } from '@/app/components/admin/AdminsTable';
import { AdminFormModal } from '@/app/components/admin/AdminFormModal';
import { useAdmins, CreateAdminData } from '@/app/hooks/useAdmins';
import { isSuperAdmin } from '@/lib/auth';
import { FaPlus } from 'react-icons/fa';

export default function AdminsPage() {
  const router = useRouter();
  const { admins, isLoading, error, createAdmin, deleteAdmin, toggleAdminStatus } = useAdmins();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // التحقق من أن المستخدم هو سوبر أدمن
  useEffect(() => {
    if (!isSuperAdmin()) {
      router.push('/admin');
    }
  }, [router]);

  if (!isSuperAdmin()) {
    return null; // Will redirect
  }

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateAdminData) => {
    try {
      await createAdmin(data);
      setIsModalOpen(false);
    } catch (err) {
      // الخطأ سيُعرض في الـ modal من خلال الـ hook
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الأدمن؟')) {
      await deleteAdmin(id);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleAdminStatus(id);
    } catch (err) {
      // الخطأ سيُعرض في الصفحة من خلال الـ hook
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-navy-blue">إدارة مسؤولين النظام</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg hover:shadow-turquoise/30 transition-all"
          >
            <FaPlus className="w-4 h-4" />
            إضافة أدمن جديد
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-red-800">{error}</p>
          </div>
        )}

        <AdminsTable
          admins={admins}
          isLoading={isLoading}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <AdminFormModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </AdminLayout>
  );
}
