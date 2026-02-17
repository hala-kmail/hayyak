'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import { CreateAdminData } from '@/app/hooks/useAdmins';
import { modalStyles } from './styles/modalStyles';

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
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />

      <div className={modalStyles.modalScrollable}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.title}>إضافة أدمن جديد</h2>
          <button onClick={onClose} className={modalStyles.closeBtn}>
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className={modalStyles.content}>
          <form onSubmit={handleSubmit} className={modalStyles.form}>
            <div>
              <label htmlFor="name" className={modalStyles.formLabel}>
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
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                minLength={6}
                className={modalStyles.formInput}
                placeholder="6 أحرف على الأقل"
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
                'إضافة'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
