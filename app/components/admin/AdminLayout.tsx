'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { isAuthenticated } from '@/lib/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const authStatus = isAuthenticated();
    setAuthenticated(authStatus);
    
    if (!authStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  // During SSR and initial render, return null to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // After mount, check authentication
  if (!authenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <main className="mr-64 p-8">
        {children}
      </main>
    </div>
  );
}
