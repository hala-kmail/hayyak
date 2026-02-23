'use client';

import React, { useState } from 'react';
import { FaLock, FaUser, FaExclamationTriangle, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

interface LoginFormProps {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-sm w-full">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/Grey.png"
              alt="سكني"
              width={56}
              height={56}
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-navy-blue mb-1.5">تسجيل الدخول للإدارة</h1>
          <p className="text-warm-grey text-xs">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-5">
          <form onSubmit={onSubmit} className="space-y-4">
            {/* البريد الإلكتروني */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-navy-blue mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey">
                  <FaUser className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                  }}
                  required
                  autoComplete="email"
                  className="w-full pr-10 pl-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors text-navy-blue"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-navy-blue mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey">
                  <FaLock className="w-4 h-4" />
                </div>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-grey hover:text-navy-blue transition-colors"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    onPasswordChange(e.target.value);
                  }}
                  required
                  className="w-full pr-10 pl-10 py-2 text-sm border border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors text-navy-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-right flex-1">
                    <p className="text-xs font-semibold text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 text-sm bg-gold text-white rounded-lg font-semibold hover:shadow-md hover:shadow-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-warm-grey mt-4">
          هذه الصفحة مخصصة للمسؤولين فقط
        </p>
      </div>
    </div>
  );
}
