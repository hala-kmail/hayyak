'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AdminStats } from '@/app/components/admin/AdminStats';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-black text-navy-blue mb-6">لوحة التحكم</h1>
        <AdminStats />
      </div>
    </AdminLayout>
  );
}
