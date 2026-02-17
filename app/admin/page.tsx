'use client';

import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AdminStats } from '@/app/components/admin/AdminStats';
import { PageHeader } from '@/app/components/admin/shared';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div>
        <PageHeader title="لوحة التحكم" />
        <AdminStats />
      </div>
    </AdminLayout>
  );
}
