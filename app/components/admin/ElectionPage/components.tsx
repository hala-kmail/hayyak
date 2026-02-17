'use client';

import React from 'react';
import { FaSave } from 'react-icons/fa';
import {
  formatDateTimeLocal,
  parseDateTimeLocal,
  formatDateTimeAr,
} from '../utils';
import type { UpdateElectionConfigData } from '@/app/hooks/useElectionConfig';
import type { ElectionStatus } from '@/app/hooks/useElectionConfig';
import { electionStyles } from './styles';

interface ElectionStatusCardProps {
  status: ElectionStatus;
}

/**
 * ElectionStatusCard Component
 * Following Single Responsibility Principle - only displays election status
 */
export function ElectionStatusCard({ status }: ElectionStatusCardProps) {
  return (
    <div className={electionStyles.statusCard}>
      <h2 className={electionStyles.statusTitle}>حالة التصويت الحالية</h2>
      <div className={electionStyles.statusGrid}>
        <div className={electionStyles.statusRow}>
          <span className={electionStyles.statusLabel}>الحالة:</span>
          <span
            className={
              status.isOpen ? electionStyles.statusBadgeOpen : electionStyles.statusBadgeClosed
            }
          >
            {status.isOpen ? 'مفتوح' : 'مغلق'}
          </span>
        </div>
        <div className={electionStyles.statusRow}>
          <span className={electionStyles.statusLabel}>الوضع:</span>
          <span className={electionStyles.statusBadgeMode}>
            {status.mode === 'manual' ? 'يدوي' : 'تلقائي'}
          </span>
        </div>
        {status.startAt && (
          <div className={electionStyles.statusRow}>
            <span className={electionStyles.statusLabel}>تاريخ البدء:</span>
            <span className={electionStyles.statusValue}>
              {formatDateTimeAr(status.startAt, { timezone: status.timezone })}
            </span>
          </div>
        )}
        {status.endAt && (
          <div className={electionStyles.statusRow}>
            <span className={electionStyles.statusLabel}>تاريخ الانتهاء:</span>
            <span className={electionStyles.statusValue}>
              {formatDateTimeAr(status.endAt, { timezone: status.timezone })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface ElectionFormProps {
  formData: UpdateElectionConfigData;
  config: unknown;
  isLoading: boolean;
  isSaving: boolean;
  onModeChange: (mode: 'manual' | 'scheduled') => void;
  onFieldChange: <K extends keyof UpdateElectionConfigData>(
    field: K,
    value: UpdateElectionConfigData[K]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * ElectionForm Component
 * Following Single Responsibility Principle - only handles election config form
 */
export function ElectionForm({
  formData,
  config,
  isLoading,
  isSaving,
  onModeChange,
  onFieldChange,
  onSubmit,
}: ElectionFormProps) {
  return (
    <div className={electionStyles.formCard}>
      <h2 className={electionStyles.formTitle}>تعديل إعدادات التصويت</h2>

      {isLoading && !config ? (
        <div className={electionStyles.formLoading}>
          <p className={electionStyles.formLoadingText}>جاري التحميل...</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={electionStyles.formSpace}>
          <div>
            <label className={electionStyles.formLabel}>وضع التصويت</label>
            <div className={electionStyles.formRadioGroup}>
              <label className={electionStyles.formRadioLabel}>
                <input
                  type="radio"
                  name="mode"
                  value="manual"
                  checked={formData.mode === 'manual'}
                  onChange={() => {
                    onModeChange('manual');
                  }}
                  className={electionStyles.formRadioInput}
                />
                <span className="font-semibold text-navy-blue">يدوي</span>
              </label>
              <label className={electionStyles.formRadioLabel}>
                <input
                  type="radio"
                  name="mode"
                  value="scheduled"
                  checked={formData.mode === 'scheduled'}
                  onChange={() => {
                    onModeChange('scheduled');
                  }}
                  className={electionStyles.formRadioInput}
                />
                <span className="font-semibold text-navy-blue">تلقائي</span>
              </label>
            </div>
          </div>

          {formData.mode === 'manual' && (
            <div>
              <label className={electionStyles.formCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.manualOpen || false}
                  onChange={(e) => {
                    onFieldChange('manualOpen', e.target.checked);
                  }}
                  className={electionStyles.formCheckboxInput}
                />
                <span className="font-semibold text-navy-blue">فتح التصويت يدوياً</span>
              </label>
              <p className={electionStyles.formHint}>
                عند تفعيل هذا الخيار، سيتم فتح التصويت فوراً بغض النظر عن التواريخ
              </p>
            </div>
          )}

          <div>
            <label className={electionStyles.formLabelSmall}>تاريخ ووقت البدء</label>
            <input
              type="datetime-local"
              value={formatDateTimeLocal(formData.startAt ?? null)}
              onChange={(e) => {
                onFieldChange('startAt', parseDateTimeLocal(e.target.value));
              }}
              className={electionStyles.formInput}
            />
            <p className={electionStyles.formHint}>
              في الوضع التلقائي، سيتم فتح التصويت تلقائياً عند هذا التاريخ
            </p>
          </div>

          <div>
            <label className={electionStyles.formLabelSmall}>تاريخ ووقت الانتهاء</label>
            <input
              type="datetime-local"
              value={formatDateTimeLocal(formData.endAt ?? null)}
              onChange={(e) => {
                onFieldChange('endAt', parseDateTimeLocal(e.target.value));
              }}
              className={electionStyles.formInput}
            />
            <p className={electionStyles.formHint}>
              في الوضع التلقائي، سيتم إغلاق التصويت تلقائياً عند هذا التاريخ
            </p>
          </div>

          <div className={electionStyles.formActions}>
            <button
              type="submit"
              disabled={isSaving || isLoading}
              className={electionStyles.formSubmit}
            >
              <FaSave className="w-4 h-4" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
