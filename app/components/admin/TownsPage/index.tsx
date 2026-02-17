'use client';

import React from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { TownsPageContent } from './components';

/**
 * TownsPage
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates towns page
 * - Dependency Inversion: Depends on components abstractions
 */
export default function TownsPage() {
  return (
    <AdminLayout>
      <TownsPageContent />
    </AdminLayout>
  );
}
