'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { FaToggleOn, FaToggleOff, FaSpinner } from 'react-icons/fa';
import { toggleAdminAction, type AdminActionState } from '@/app/admin/actions/admins';
import { tableStyles } from './styles/tableStyles';

interface ToggleAdminFormProps {
  adminId: string;
  isActive: boolean;
  action: (prevState: AdminActionState | null, formData: FormData) => Promise<AdminActionState>;
  onSuccess: () => void;
}

export function ToggleAdminForm({
  adminId,
  isActive,
  action,
  onSuccess,
}: ToggleAdminFormProps) {
  const [state, formAction, isPending] = useActionState<AdminActionState | null, FormData>(
    action,
    null
  );

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state?.success, onSuccess]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={adminId} readOnly />
      <button
        type="submit"
        disabled={isPending}
        className={tableStyles.btnToggle(isActive)}
        title={isActive ? 'تعطيل' : 'تفعيل'}
      >
        {isPending ? (
          <FaSpinner className={`${tableStyles.iconScale} animate-spin`} />
        ) : isActive ? (
          <>
            <FaToggleOn className={tableStyles.iconScale} />
            <span className={tableStyles.iconHidden}>تعطيل</span>
          </>
        ) : (
          <>
            <FaToggleOff className={tableStyles.iconScale} />
            <span className={tableStyles.iconHidden}>تفعيل</span>
          </>
        )}
      </button>
    </form>
  );
}
