'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { CreateAdminData } from '@/app/hooks/useAdmins';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdminData) => Promise<void>;
}

export function AdminFormModal({ isOpen, onClose, onSubmit }: AdminFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('الاسم مطلوب');
      return;
    }

    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!password.trim()) {
      setError('كلمة المرور مطلوبة');
      return;
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const data: CreateAdminData = {
        name: name.trim(),
        email: email.trim(),
        password: password,
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
          <h2 className="text-xl font-black text-navy-blue">إضافة أدمن جديد</h2>
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
                الاسم
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
                placeholder="مثال: محمد علي"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-navy-blue mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                placeholder="مثال: admin@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-navy-blue mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                placeholder="6 أحرف على الأقل"
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
                'إضافة'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
