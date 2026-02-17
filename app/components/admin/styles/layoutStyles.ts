/**
 * Admin layout styles for AdminLayout and Sidebar
 * Following Single Responsibility Principle - only contains style definitions
 */

export const layoutStyles = {
  layout: 'min-h-screen bg-gray-50',
  mobileMenuBtn:
    'lg:hidden fixed top-4 right-4 z-30 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors',
  mobileMenuIcon: 'w-5 h-5 text-navy-blue',
  main: 'lg:mr-64 p-4 lg:p-8 pt-20 lg:pt-8',

  sidebarBackdrop: 'fixed inset-0 bg-black/50 z-40 lg:hidden',
  sidebar: (isOpen: boolean) =>
    `fixed right-0 top-0 h-full w-64 bg-white shadow-lg border-l border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
    }`,
  sidebarHeader: 'p-6 border-b border-gray-200 flex items-center justify-between',
  sidebarLogo: 'flex items-center gap-3',
  sidebarLogoImage: 'object-contain',
  sidebarLogoText: 'font-black text-xl text-navy-blue',
  sidebarCloseBtn: 'lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors',
  sidebarCloseIcon: 'w-5 h-5 text-navy-blue',
  sidebarNav: 'flex-1 p-4',
  sidebarList: 'space-y-2',
  sidebarLink: (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive ? 'bg-turquoise text-white shadow-md' : 'text-navy-blue hover:bg-gray-100'
    }`,
  sidebarLinkText: 'font-semibold',
  sidebarFooter: 'p-4 border-t border-gray-200',
  sidebarLogout:
    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200',
  sidebarLogoutIcon: 'w-5 h-5',
  sidebarLogoutText: 'font-semibold',
} as const;
