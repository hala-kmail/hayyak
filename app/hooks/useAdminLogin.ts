'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken, setUserRole } from '@/lib/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseAdminLoginReturn {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (credentials: LoginCredentials) => Promise<void>;
  clearError: () => void;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api'}/auth/login`;

export function useAdminLogin(): UseAdminLoginReturn {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: LoginCredentials) => {
    setError(null);
    const emailTrimmed = email.trim();
    
    // التحقق من صحة البريد الإلكتروني
    if (!emailTrimmed) {
      setError('البريد الإلكتروني مطلوب.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }
    
    if (!password) {
      setError('كلمة المرور مطلوبة.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailTrimmed,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data.message;
        const errorText = Array.isArray(msg) ? msg.join(' ') : (msg || data.error || 'فشل تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مرة أخرى.');
        setError(errorText);
        setIsLoading(false);
        return;
      }

      // حفظ accessToken و role في localStorage
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        
        // حفظ role إذا كان موجوداً
        if (data.role) {
          setUserRole(data.role);
        }
        
        // إعادة التوجيه إلى لوحة التحكم
        router.push('/admin');
      } else {
        setError('لم يتم استلام رمز الوصول. يرجى المحاولة مرة أخرى.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleLogin,
    clearError,
  };
}
