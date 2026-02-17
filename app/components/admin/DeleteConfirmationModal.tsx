'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-navy-blue">{title}</h2>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <FaExclamationTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <p className="text-base text-navy-blue font-semibold mb-2">{message}</p>
            {itemName && (
              <p className="text-lg text-navy-blue font-black">{itemName}</p>
            )}
            <p className="text-sm text-warm-grey mt-2">لا يمكن التراجع عن هذا الإجراء</p>
          </div>

          {/* Error Message */}
          {/* {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm font-bold text-red-800">{error}</p>
            </div>
          )} */}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-3 bg-gray-100 text-navy-blue rounded-xl font-black text-base hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-base hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
