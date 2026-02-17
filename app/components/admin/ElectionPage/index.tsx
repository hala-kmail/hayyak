'use client';

import React from 'react';
import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { FaSync } from 'react-icons/fa';
import { ElectionStatusCard, ElectionForm } from './components';
import { useElectionForm } from './hooks';
import { PageHeader, AlertBanner, sharedStyles } from '../shared';

/**
 * ElectionPage
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates election config page
 * - Dependency Inversion: Depends on hooks and components abstractions
 */
export default function ElectionPage() {
  const {
    config,
    status,
    isLoading,
    error,
    isSaving,
    saveError,
    saveSuccess,
    formData,
    handleSubmit,
    handleModeChange,
    updateFormField,
    refresh,
  } = useElectionForm();

  return (
    <AdminLayout>
      <div>
        <PageHeader
          title="إدارة حالة التصويت"
          action={
            <button
              onClick={refresh}
              disabled={isLoading}
              className={sharedStyles.buttonSecondary}
            >
              <FaSync className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              تحديث
            </button>
          }
        />

        {error && <AlertBanner message={error} variant="error" />}
        {saveError && <AlertBanner message={saveError} variant="error" />}
        {saveSuccess && (
          <AlertBanner message="تم حفظ الإعدادات بنجاح!" variant="success" />
        )}

        {status && <ElectionStatusCard status={status} />}

        <ElectionForm
          formData={formData}
          config={config}
          isLoading={isLoading}
          isSaving={isSaving}
          onModeChange={handleModeChange}
          onFieldChange={updateFormField}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
}
