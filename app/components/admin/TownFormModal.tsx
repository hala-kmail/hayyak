'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { Town, CreateTownData, UpdateTownData } from '@/app/hooks/useTowns';

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
      // عند النجاح، الصفحة الأم ستغلق الـ modal
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء الحفظ');
      setIsSubmitting(false);
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
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-navy-blue">
            {town ? 'تعديل الحي' : 'إضافة حي جديد'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-navy-blue mb-2">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                placeholder="مثال: الرياض"
              />
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-navy-blue mb-2">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                placeholder="مثال: طريق الملك فهد، الرياض"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm font-bold text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-turquoise text-white rounded-xl font-black text-base hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
