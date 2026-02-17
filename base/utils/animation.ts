/**
 * Easing functions for smooth animations
 * Following Single Responsibility Principle - only handles easing calculations
 */

export type EasingFunction = (t: number) => number;

/**
 * Ease out quart function for smooth deceleration
 * @param t - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeOutQuart: EasingFunction = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

/**
 * Linear easing function
 * @param t - Progress value between 0 and 1
 * @returns Same value (linear)
 */
export const easeLinear: EasingFunction = (t: number): number => {
  return t;
};

/**
 * Ease in out cubic function
 * @param t - Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeInOutCubic: EasingFunction = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
