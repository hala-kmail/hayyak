'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMapMarkedAlt, FaSignOutAlt, FaVoteYea, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import { removeAccessToken, isSuperAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    setIsSuper(isSuperAdmin());
  }, []);

  const baseMenuItems: SidebarItem[] = [
    {
      href: '/admin',
      label: 'الرئيسية',
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      href: '/admin/towns',
      label: 'الأحياء',
      icon: <FaMapMarkedAlt className="w-5 h-5" />,
    },
    {
      href: '/admin/election',
      label: 'حالة التصويت',
      icon: <FaVoteYea className="w-5 h-5" />,
    },
  ];

  const superAdminMenuItems: SidebarItem[] = [
    {
      href: '/admin/admins',
      label: 'الأدمنز',
      icon: <FaUsers className="w-5 h-5" />,
    },
  ];

  const menuItems = isSuper ? [...baseMenuItems, ...superAdminMenuItems] : baseMenuItems;

  const handleLogout = () => {
    removeAccessToken();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 flex flex-col" dir="rtl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/sakany.png"
            alt="سكني"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-black text-xl text-navy-blue">لوحة التحكم</span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-turquoise text-white shadow-md'
                      : 'text-navy-blue hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-semibold">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
