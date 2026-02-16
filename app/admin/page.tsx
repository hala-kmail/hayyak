'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-black text-navy-blue mb-6">لوحة التحكم</h1>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-warm-grey">مرحباً بك في لوحة التحكم</p>
        </div>
      </div>
    </AdminLayout>
  );
}
