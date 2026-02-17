/**
 * Constants for NotFound component
 * Following Single Responsibility Principle - only contains constant values
 */

export const NOT_FOUND_CONTENT = {
  errorCode: '404',
  title: 'الصفحة غير موجودة',
  backLinkText: 'العودة للرئيسية',
  backLinkHref: '/',
} as const;
