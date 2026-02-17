'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { isAuthenticated } from '@/lib/auth';
import { FaBars } from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-30 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="فتح القائمة"
      >
        <FaBars className="w-5 h-5 text-navy-blue" />
      </button>

      {/* Main content */}
      <main className="lg:mr-64 p-4 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
