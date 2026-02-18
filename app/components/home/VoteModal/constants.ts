/**
 * Constants for VoteModal component
 * Following Single Responsibility Principle - only contains constant values
 */

// تقليل وقت الانتظار بعد النجاح من 2 ثانية إلى 1.5 ثانية لتحسين تجربة المستخدم
export const SUCCESS_AUTO_CLOSE_DELAY = 1500;

export const ERROR_MESSAGES = {
  NO_NEIGHBORHOOD: 'لا يمكن التصويت حالياً. يرجى المحاولة لاحقاً.',
  ALREADY_VOTED: 'لقد قمت بالتصويت مسبقاً.',
  GENERIC_ERROR: 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.',
  NETWORK_ERROR: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
} as const;

