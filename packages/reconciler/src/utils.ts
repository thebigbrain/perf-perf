declare const window: any;

const __DEBUG__ = true;

const noop = () => {};

export const requestIdleCallback: any = window.requestIdleCallback;
export const requestAnimationFrame: any = window.requestAnimationFrame;

export type DOMHighResTimeStamp = number;
export interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp
};

export const DEBUG = __DEBUG__ ? console.log.bind(console) : noop;
