/**
 * Constants for IntroSections component
 * Following Single Responsibility Principle - only contains constant values
 */

import type { SectionItem } from './types';

export const INTRO_SECTIONS_HEADER = {
  title: 'شركاء النجاح',
  description:
    'حملة حيك تفوز بحوامة رمضان بالشراكة مع منصة سكني وشركائها، لنخدمك ونخدم حيك.',
} as const;

export const LOGO_HABEEB = '/images/habeeb.svg';
export const LOGO_SAKANI = '/images/sakany.png';

export const INTRO_SECTIONS_DATA: SectionItem[] = [
  {
    id: 'sakani',
    title: 'سكني',
    description: `منصة 'سكني' الإلكترونية، إحدى مبادرات وزارة البلديات والإسكان السعودية، تقدم حلولاً شاملة لتملك المسكن الأول؛ من وحدات جاهزة وتحت الإنشاء، إلى الأراضي المجانية والبناء الذاتي. استفد من خدمات التحقق الفوري من الاستحقاق، الحجز الإلكتروني، الحاسبة التمويلية، وتوقيع العقود رقمياً.`,
    textColor: 'text-turquoise',
    accentColor: 'bg-turquoise',
    logo: LOGO_SAKANI,
    delay: 0,
  },
  {
    id: 'alhabib',
    title: 'الحبيب',
    description: `شريكك الموثوق في التطوير العقاري منذ 1972، نجمع بين تاريخ عريق وخبرة تمتد لأكثر من 50 مشروعًا و350 خبيرًا، لنحول طموحاتك إلى واقع بقيم الثقة والجودة والابتكار.`,
    textColor: 'text-sand-brown',
    accentColor: 'bg-sand-brown',
    logo: LOGO_HABEEB,
    logoFallback: LOGO_HABEEB,
    delay: 100,
    linkUrl: 'https://www.alhabibinv.com/',
  },
  {
    id: 'seventh-neighbor',
    title: 'خدمة سابع جار',
    description: `خدمة 'سابع جار' هي حل رقمي مبتكر متاح عبر منصة سكني (تطبيق أو موقع)، يهدف إلى تعزيز إدارة الأصول والمرافق السكنية بشراكات تقنية نوعية. استمتع بتجربة متكاملة ترفع كفاءة الخدمات العقارية، ويمكنك الوصول إليها بسهولة عبر التطبيق أو الاتصال بالرقم الموحد 199090.`,
    textColor: 'text-quite-purple',
    accentColor: 'bg-quite-purple',
    logo: null,
    delay: 200,
  },
];
