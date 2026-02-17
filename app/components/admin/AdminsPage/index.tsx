'use client';

import React from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AdminsPageContent } from './components';
import { useSuperAdminGuard } from '../hooks';

/**
 * AdminsPage
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates admins page with auth guard
 * - Dependency Inversion: Depends on hooks and components abstractions
 */
export default function AdminsPage() {
  const isAllowed = useSuperAdminGuard();

  if (!isAllowed) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminsPageContent />
    </AdminLayout>
  );
}
