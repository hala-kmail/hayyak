/**
 * Constants for VoteModal component
 * Following Single Responsibility Principle - only contains constant values
 */

// تقليل وقت الانتظار بعد النجاح من 2 ثانية إلى 1.5 ثانية لتحسين تجربة المستخدم
export const SUCCESS_AUTO_CLOSE_DELAY = 1500;

export const ERROR_MESSAGES = {
  NO_NEIGHBORHOOD: 'لا يمكن التصويت حالياً. يرجى المحاولة لاحقاً.',
  NO_PHONE: 'يرجى إدخال رقم الهاتف للتصويت.',
  INVALID_PHONE: 'يرجى إدخال رقم هاتف صحيح (مثال: 0501234567 أو 00966501234567 أو 966501234567+).',
  ALREADY_VOTED: 'لقد قمت بالتصويت مسبقاً.',
  GENERIC_ERROR: 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.',
  NETWORK_ERROR: 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
} as const;

/** Saudi phone regex: +966XXXXXXXXX, 00966XXXXXXXXX, 05XXXXXXXX, or 5XXXXXXXX */
export const PHONE_REGEX = /^(\+966|00966|0)?5[0-9]{8}$/;

