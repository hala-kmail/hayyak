'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { Town } from '@/app/hooks/useTowns';
import { createTownAction, updateTownAction, type TownActionState } from '@/app/admin/actions/towns';
import { modalStyles } from './styles/modalStyles';

interface TownFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  town?: Town | null;
}

export function TownFormModal({ isOpen, onClose, onSuccess, town }: TownFormModalProps) {
  const isEdit = Boolean(town?.id);
  const action = isEdit ? updateTownAction : createTownAction;
  const [state, formAction, isPending] = useActionState<TownActionState | null, FormData>(
    action,
    null
  );

  useEffect(() => {
    if (state?.success) {
      onClose();
      onSuccess();
    }
  }, [state?.success, onClose, onSuccess]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />

      <div className={modalStyles.modalScrollable}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>
            {town ? 'تعديل الحي' : 'إضافة حي جديد'}
          </h2>
          <button onClick={onClose} className={modalStyles.closeBtn}>
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className={modalStyles.content}>
          <form action={formAction} className={modalStyles.form}>
            {isEdit && town && <input type="hidden" name="id" value={town.id} readOnly />}
            <div>
              <label htmlFor="name" className={modalStyles.formLabel}>
                اسم الحي
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={town?.name ?? ''}
                required
                className={modalStyles.formInput}
                placeholder="مثال: الرياض"
              />
            </div>

            <div>
              <label htmlFor="address" className={modalStyles.formLabel}>
                العنوان
              </label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={town?.address ?? ''}
                required
                className={modalStyles.formInput}
                placeholder="مثال: طريق الملك فهد، الرياض"
              />
            </div>

            {state?.error && (
              <div className={modalStyles.formError}>
                <p className={modalStyles.formErrorText}>{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={modalStyles.submitBtn}
            >
              {isPending ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                town ? 'تعديل' : 'إضافة'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
