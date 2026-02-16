'use client';

import React from 'react';
import { FaLock, FaUser, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/sakani.png"
              alt="سكني"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-black text-navy-blue mb-2">تسجيل الدخول للإدارة</h1>
          <p className="text-warm-grey text-sm">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* البريد الإلكتروني */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-navy-blue mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-grey">
                  <FaUser className="w-5 h-5" />
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
                  className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-navy-blue mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-grey">
                  <FaLock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    onPasswordChange(e.target.value);
                  }}
                  required
                  className="w-full pr-12 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-turquoise focus:outline-none transition-colors text-navy-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-right flex-1">
                    <p className="text-sm font-bold text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-turquoise text-white rounded-xl font-black text-base hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        <p className="text-center text-xs text-warm-grey mt-6">
          هذه الصفحة مخصصة للمسؤولين فقط
        </p>
      </div>
    </div>
  );
}
