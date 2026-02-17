'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMapMarkedAlt, FaSignOutAlt, FaVoteYea, FaUsers, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { removeAccessToken, isSuperAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface SidebarItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
      label: 'مسؤولين النظام',
      icon: <FaUsers className="w-5 h-5" />,
    },
  ];

  const menuItems = isSuper ? [...baseMenuItems, ...superAdminMenuItems] : baseMenuItems;

  const handleLogout = () => {
    removeAccessToken();
    router.push('/admin/login');
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
        dir="rtl"
      >
        {/* Logo with close button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
            <Image
              src="/images/sakany.png"
              alt="سكني"
              width={40}
              height={40}
              className="object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="font-black text-xl text-navy-blue">لوحة التحكم</span>
          </Link>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="إغلاق القائمة"
          >
            <FaTimes className="w-5 h-5 text-navy-blue" />
          </button>
        </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            // للصفحة الرئيسية، يجب أن يكون المسار مطابقاً تماماً
            // للصفحات الأخرى، يمكن أن يبدأ المسار بـ href + '/'
            const isActive = item.href === '/admin' 
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
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
          onClick={() => {
            handleLogout();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-semibold">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
    </>
  );
}
