/**
 * مفاتيح ألوان اللوحة للاستخدام مع useCSSVar.
 * القيم الفعلية في styles/globals.css – استخدم كلاسات Tailwind: bg-primary-turquoise, text-navy-blue، إلخ.
 */
export const themeColorKeys = [
  '--primary-turquoise',
  '--primary-gold',
  '--primary-grey',
  '--lime-green',
  '--grey-blue',
  '--navy-blue',
  '--warm-grey',
  '--sand-brown',
  '--quite-purple',
  '--gray-bg',
] as const;

export type ThemeColorKey = (typeof themeColorKeys)[number];
