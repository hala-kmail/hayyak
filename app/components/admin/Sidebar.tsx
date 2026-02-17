'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaMapMarkedAlt, FaSignOutAlt, FaVoteYea, FaUsers, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { removeAccessToken, isSuperAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { layoutStyles } from './styles/layoutStyles';

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
      {isOpen && (
        <div className={layoutStyles.sidebarBackdrop} onClick={onClose} />
      )}

      <aside className={layoutStyles.sidebar(isOpen)} dir="rtl">
        <div className={layoutStyles.sidebarHeader}>
          <Link href="/admin" className={layoutStyles.sidebarLogo} onClick={onClose}>
            <Image
              src="/images/sakany.png"
              alt="سكني"
              width={40}
              height={40}
              className={layoutStyles.sidebarLogoImage}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className={layoutStyles.sidebarLogoText}>لوحة التحكم</span>
          </Link>
          <button
            onClick={onClose}
            className={layoutStyles.sidebarCloseBtn}
            aria-label="إغلاق القائمة"
          >
            <FaTimes className={layoutStyles.sidebarCloseIcon} />
          </button>
        </div>

        <nav className={layoutStyles.sidebarNav}>
          <ul className={layoutStyles.sidebarList}>
            {menuItems.map((item) => {
              const isActive = pathname
                ? item.href === '/admin'
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + '/')
                : false;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={layoutStyles.sidebarLink(isActive)}
                  >
                    {item.icon}
                    <span className={layoutStyles.sidebarLinkText}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={layoutStyles.sidebarFooter}>
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className={layoutStyles.sidebarLogout}
          >
            <FaSignOutAlt className={layoutStyles.sidebarLogoutIcon} />
            <span className={layoutStyles.sidebarLogoutText}>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
