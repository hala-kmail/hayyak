'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { Town, CreateTownData, UpdateTownData } from '@/app/hooks/useTowns';
import { modalStyles } from './styles';

interface TownFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTownData | UpdateTownData) => Promise<void>;
  town?: Town | null;
}

export function TownFormModal({ isOpen, onClose, onSubmit, town }: TownFormModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (town) {
        setName(town.name);
        setAddress(town.address);
      } else {
        setName('');
        setAddress('');
      }
      setError(null);
      setIsSubmitting(false);
    }
  }, [town, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('اسم الحي مطلوب');
      return;
    }

    if (!address.trim()) {
      setError('العنوان مطلوب');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const data: CreateTownData | UpdateTownData = {
        name: name.trim(),
        address: address.trim(),
      };
      await onSubmit(data);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الحفظ');
      setIsSubmitting(false);
    }
  };

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
          <form onSubmit={handleSubmit} className={modalStyles.form}>
            <div>
              <label htmlFor="name" className={modalStyles.formLabel}>
                اسم الحي
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
                className={modalStyles.formInput}
                placeholder="مثال: طريق الملك فهد، الرياض"
              />
            </div>

            {error && (
              <div className={modalStyles.formError}>
                <p className={modalStyles.formErrorText}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={modalStyles.submitBtn}
            >
              {isSubmitting ? (
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
