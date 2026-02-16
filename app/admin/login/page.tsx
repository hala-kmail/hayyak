'use client';

import React from 'react';
import { useAdminLogin } from '@/app/hooks/useAdminLogin';
import { LoginForm } from '@/app/components/admin/LoginForm';

export default function AdminLoginPage() {
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleLogin,
  } = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <LoginForm
      email={email}
      password={password}
      isLoading={isLoading}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
