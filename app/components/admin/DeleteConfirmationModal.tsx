'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { modalStyles } from './styles/modalStyles';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  itemName?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsDeleting(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await onConfirm();
      onClose();
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الحذف');
      setIsDeleting(false);
    }
  };

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />

      <div className={modalStyles.modal}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>{title}</h2>
          <button
            onClick={onClose}
            disabled={isDeleting}
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

          <div className={modalStyles.buttonsGroup}>
            <button onClick={onClose} disabled={isDeleting} className={modalStyles.cancelBtn}>
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className={modalStyles.confirmBtn}
            >
              {isDeleting ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  جاري الحذف...
                </>
              ) : (
                'حذف'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
