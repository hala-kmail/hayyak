'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSuperAdmin } from '@/lib/auth';

/**
 * useSuperAdminGuard Hook
 * Following Single Responsibility Principle - only handles super admin redirect
 */
export function useSuperAdminGuard() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const allowed = isSuperAdmin();
    if (!allowed) {
      router.push('/admin');
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  return isAllowed;
}
