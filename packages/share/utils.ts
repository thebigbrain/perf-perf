declare const window: any;

export const requestIdleCallback: any = window.requestIdleCallback;
export const requestAnimationFrame: any = window.requestAnimationFrame;

export type DOMHighResTimeStamp = number;
export interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp
};