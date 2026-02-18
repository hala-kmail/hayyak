'use client';

import React, { useEffect } from 'react';
import { useActionState } from 'react';
import { FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { modalStyles } from './styles/modalStyles';

interface DeleteActionState {
  success?: boolean;
  error?: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  action: (prevState: DeleteActionState | null, formData: FormData) => Promise<DeleteActionState>;
  id: string;
  title: string;
  message: string;
  itemName?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onSuccess,
  action,
  id,
  title,
  message,
  itemName,
}: DeleteConfirmationModalProps) {
  const [state, formAction, isPending] = useActionState<DeleteActionState | null, FormData>(
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

      <div className={modalStyles.modal}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>{title}</h2>
          <button
            onClick={onClose}
            disabled={isPending}
            className={modalStyles.closeBtnDisabled}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className={modalStyles.content}>
          <div className={modalStyles.warningIconWrapper}>
            <div className={modalStyles.warningIcon}>
              <FaExclamationTriangle className={modalStyles.warningIconSvg} />
            </div>
          </div>

          <div className={modalStyles.messageWrapper}>
            <p className={modalStyles.messageText}>{message}</p>
            {itemName && <p className={modalStyles.itemName}>{itemName}</p>}
            <p className={modalStyles.messageHint}>لا يمكن التراجع عن هذا الإجراء</p>
          </div>

          {state?.error && (
            <div className={modalStyles.formError}>
              <p className={modalStyles.formErrorText}>{state.error}</p>
            </div>
          )}

          <form action={formAction} className={modalStyles.buttonsGroup}>
            <input type="hidden" name="id" value={id} readOnly />
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className={modalStyles.cancelBtn}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={modalStyles.confirmBtn}
            >
              {isPending ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                'حذف'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
