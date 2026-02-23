/**
 * Style constants for Header component
 * Following Single Responsibility Principle - only contains style definitions
 */

export const headerStyles = {
  header: (mobileMenuOpen: boolean) =>
    `fixed top-0 inset-x-0 pointer-events-none transition-all duration-300 ${
      mobileMenuOpen ? 'lg:z-[100] z-[30]' : 'z-[100]'
    }`,
  nav: (scrolled: boolean) =>
    `w-full transition-all duration-500 ${scrolled ? 'pt-0' : 'pt-3'}`,
  navContainer: (scrolled: boolean) =>
    `pointer-events-auto transition-all duration-500 ${
      scrolled ? 'bg-navy-blue shadow-lg' : 'bg-transparent'
    }`,
  navInner: 'max-w-7xl mx-auto flex items-center justify-between h-12 sm:h-20 px-4 sm:px-6 lg:px-8',
  logoLink: (mobileMenuOpen: boolean) =>
    `flex items-center gap-3 group transition-opacity duration-300 ${
      mobileMenuOpen
        ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'
        : 'opacity-100'
    }`,
  logoImage: 'object-contain transition-all duration-500 group-hover:scale-110',
  logoText: (scrolled: boolean) =>
    `font-headline font-bold text-xl sm:text-2xl transition-colors duration-500 hidden sm:block text-white`,
  lantern: 'hidden lg:block absolute pointer-events-none transition-all duration-500',
  lanternLeft: 'top-1/2 -translate-y-1/2 left-[-40px] w-10 h-14 opacity-80',
  lanternRight: 'top-1/2 -translate-y-1/2 right-[-40px] w-10 h-14 opacity-80 scale-x-[-1]',
  desktopNav: 'hidden lg:flex items-center gap-1',
  navLink: (scrolled: boolean) =>
    `px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative group ${
      scrolled
        ? 'text-white hover:text-gold hover:bg-white/10'
        : 'text-white/90 hover:text-white hover:bg-white/10'
    }`,
  navLinkUnderline: (scrolled: boolean) =>
    `absolute bottom-1 right-1/2 translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
      scrolled ? 'bg-gold' : 'bg-white'
    } w-0 group-hover:w-3/4`,
  mobileMenuButton: (scrolled: boolean) =>
    `lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
      scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
    }`,
  menuIcon: 'w-6 h-6',
  drawerOverlay: (drawerAnimateIn: boolean) =>
    `lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
      drawerAnimateIn ? 'opacity-100' : 'opacity-0'
    }`,
  drawer: (drawerAnimateIn: boolean) =>
    `lg:hidden fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-navy-blue z-[110] flex flex-col shadow-2xl transition-transform duration-300 ${
      drawerAnimateIn ? 'translate-x-0' : 'translate-x-full'
    }`,
  drawerHeader: 'p-6 border-b border-white/10',
  drawerHeaderInner: 'flex items-center justify-between mb-4',
  drawerLogoLink: 'flex items-center gap-3',
  drawerLogoImage: 'object-contain',
  drawerLogoText: 'font-black text-xl text-white',
  drawerNav: 'flex flex-col p-4 gap-2',
  drawerNavLink: 'px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-gold font-semibold transition-all duration-200',
} as const;
