/**
 * Admin layout styles for AdminLayout and Sidebar
 * Following Single Responsibility Principle - only contains style definitions
 */

export const layoutStyles = {
  layout: 'min-h-screen bg-gray-bg',
  mobileMenuBtn:
    'lg:hidden fixed top-3 right-3 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-bg transition-colors',
  mobileMenuIcon: 'w-4 h-4 text-navy-blue',
  main: 'lg:mr-52 p-3 lg:p-5 pt-16 lg:pt-5',

  sidebarBackdrop: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
  sidebar: (isOpen: boolean) =>
    `fixed right-0 top-0 h-full w-52 bg-white shadow-lg border-l border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
    }`,
  sidebarHeader: 'p-4 border-b border-gray-200 flex items-center justify-between',
  sidebarLogo: 'flex items-center gap-2',
  sidebarLogoImage: 'object-contain',
  sidebarLogoText: 'font-bold text-base text-navy-blue',
  sidebarCloseBtn: 'lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors',
  sidebarCloseIcon: 'w-4 h-4 text-navy-blue',
  sidebarNav: 'flex-1 p-3',
  sidebarList: 'space-y-1',
  sidebarLink: (isActive: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
      isActive ? 'bg-gold text-white shadow-sm' : 'text-navy-blue hover:bg-gray-100'
    }`,
  sidebarLinkText: 'font-medium',
  sidebarFooter: 'p-3 border-t border-gray-200',
  sidebarLogout:
    'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 text-sm',
  sidebarLogoutIcon: 'w-4 h-4',
  sidebarLogoutText: 'font-medium',
} as const;
