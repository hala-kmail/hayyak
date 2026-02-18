'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { createAdminAction, type AdminActionState } from '@/app/admin/actions/admins';
import { modalStyles } from './styles/modalStyles';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminFormModal({ isOpen, onClose, onSuccess }: AdminFormModalProps) {
  const [state, formAction, isPending] = useActionState<AdminActionState | null, FormData>(
    createAdminAction,
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
          <h2 className={modalStyles.title}>إضافة أدمن جديد</h2>
          <button onClick={onClose} className={modalStyles.closeBtn}>
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className={modalStyles.content}>
          <form action={formAction} className={modalStyles.form}>
            <div>
              <label htmlFor="name" className={modalStyles.formLabel}>
                الاسم
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={modalStyles.formInput}
                placeholder="مثال: محمد علي"
              />
            </div>

            <div>
              <label htmlFor="email" className={modalStyles.formLabel}>
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={modalStyles.formInput}
                placeholder="مثال: admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={modalStyles.formLabel}>
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className={modalStyles.formInput}
                placeholder="6 أحرف على الأقل"
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
                  <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                'إضافة'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
