'use client';

import { useState, useEffect, useCallback } from 'react';
import { useElectionConfig, UpdateElectionConfigData } from '@/app/hooks/useElectionConfig';

/**
 * useElectionForm Hook
 * Following Single Responsibility Principle - only handles election form state
 */
export function useElectionForm() {
  const { config, status, isLoading, error, updateConfig, refresh } = useElectionConfig();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState<UpdateElectionConfigData>({
    mode: 'manual',
    manualOpen: false,
    startAt: null,
    endAt: null,
  });

  useEffect(() => {
    if (config) {
      setFormData({
        mode: config.mode,
        manualOpen: config.manualOpen,
        startAt: config.startAt || null,
        endAt: config.endAt || null,
      });
    }
  }, [config]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      try {
        await updateConfig(formData);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } catch (err: unknown) {
        setSaveError(err instanceof Error ? err.message : 'حدث خطأ في حفظ الإعدادات.');
      } finally {
        setIsSaving(false);
      }
    },
    [formData, updateConfig]
  );

  const handleModeChange = useCallback((mode: 'manual' | 'scheduled') => {
    setFormData((prev) => ({
      ...prev,
      mode,
      ...(mode === 'scheduled' ? { manualOpen: false } : {}),
    }));
  }, []);

  const updateFormField = useCallback(<K extends keyof UpdateElectionConfigData>(
    field: K,
    value: UpdateElectionConfigData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
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
  };
}
