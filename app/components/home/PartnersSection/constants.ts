/**
 * Constants for PartnersSection component
 * Following Single Responsibility Principle - only contains constant values
 */

import type { PartnerCardData } from './types';

export const PARTNERS_SECTION_COPY = {
  title: 'شركاء النجاح',
  description:
    'نعمل مع شركاء موثوقين لتقديم تجربة متكاملة — كل شريك ببراندِه وقيمه وخدماته.',
} as const;

export const PARTNERS: PartnerCardData[] = [
  {
    id: 'sakani',
    name: 'سكني',
    shortLabel: 'Sakani',
    logoSrc: '/images/sakany.png',
    kicker: 'شريك استراتيجي',
    linkUrl: 'https://sakani.sa/',
    theme: {
      primary: '#2CB9B2', // turquoise-like
      accent: '#2CB9B2',
      surface: '#0B2B2A',
      textOnSurface: '#EFFFFE',
      mutedOnSurface: 'rgba(239, 255, 254, 0.78)',
    },
    blocks: [
      {
        title: 'منصة سكني',
        text:
          "منصة 'سكني' إحدى مبادرات الإسكان في المملكة، وتقدم حلولًا متكاملة لتملك المسكن الأول: من وحدات جاهزة وتحت الإنشاء، إلى الأراضي والبناء الذاتي وخدمات الحجز والتوثيق.",
      },
      {
        title: 'سابع جار ضمن سكني',
        text:
         "خدمة 'سابع جار' هي مبادرة مجتمعية أطلقتها منصة سكني التابعة لوزارة البلديات والإسكان في المملكة العربية السعودية، وتهدف بشكل أساسي إلى تعزيز الروابط الاجتماعية ومفاهيم الجيرة الإيجابية داخل الأحياء السكنية. ",
      },
    ],
  },
  {
    id: 'alhabib',
    name: 'محمد الحبيب',
    shortLabel: 'Al Habib',
    logoSrc: '/images/habeeb-dark.png',
    kicker: 'نبذة',
    linkUrl: 'https://www.alhabibinv.com/',
    theme: {
      primary: '#3144C0', // navy blue (as provided)
      accent: '#E68CDB', // gold (as provided)
      surface: '#0B1230',
      textOnSurface: '#F4F7FF',
      mutedOnSurface: 'rgba(244, 247, 255, 0.78)',
    },
    blocks: [
      {
        title: 'تاريخ عريق',
        text:
          'تعد شركة محمد الحبيب العقارية شركة عائلية خاصة. تأسست في عام 1972، وتخصصت في الاستثمارات العقارية وتطوير الأراضي الخام للمشاريع المميزة وإدارة تفاصيل المشاريع وتصميم المجمعات التجارية والسكنية التي تضيف قيمة للمدن والسكان. في عام 1975، بدأت الشركة مشاريعها التجارية مع أسواق مكة الذي يعتبر أول مركز تجاري مغلق بالكامل في المملكة العربية السعودية. أعدتنا على المضي قدمًا نحو التطور والتحسن المستمر.',
      },
      {
        title: 'الرؤية',
        text:
          'أن نكون الخيار الأول في التطوير العقاري في المملكة. اليوم، شركة محمد الحبيب للاستثمار العقاري حققت نموًا على مدى عقود، وتنوعت منتجاتها العقارية مع ترسيخ سمعتها المتميزة في سوق العقارات السعودية.',
      },
    ],
    stats: [
      { value: '50', label: 'مشروع' },
      { value: '10', label: 'مدن تم التطوير بها' },
    ],
  },
] as const;
