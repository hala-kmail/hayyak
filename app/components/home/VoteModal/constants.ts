/**
 * Constants for VoteModal component
 * Following Single Responsibility Principle - only contains constant values
 */

export const SUCCESS_AUTO_CLOSE_DELAY = 2000;

export const ERROR_MESSAGES = {
  NO_NEIGHBORHOOD: 'لا يمكن التصويت حالياً. يرجى المحاولة لاحقاً.',
  ALREADY_VOTED: 'لقد قمت بالتصويت مسبقاً من هذا الجهاز.',
  GENERIC_ERROR: 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.',
  NETWORK_ERROR: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
} as const;

export const PRIVACY_DISCLAIMER =
  'نستخدم تقنية بصمة الجهاز لمنع التصويت المكرر. لا نجمع أي معلومات شخصية عنك.';
