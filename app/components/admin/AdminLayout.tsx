'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { isAuthenticated } from '@/lib/auth';
import { FaBars } from 'react-icons/fa';
import { layoutStyles } from './styles/layoutStyles';

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

  if (!mounted) {
    return null;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className={layoutStyles.layout} dir="rtl">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <button
        onClick={() => setIsSidebarOpen(true)}
        className={layoutStyles.mobileMenuBtn}
        aria-label="فتح القائمة"
      >
        <FaBars className={layoutStyles.mobileMenuIcon} />
      </button>

      <main className={layoutStyles.main}>{children}</main>
    </div>
  );
}
