declare const window: any;
declare const global: any;

const __DEBUG__: boolean = (typeof window !== 'undefined' ? window.__DEBUG__ : global.__DEBUG__) || false;

const noop = () => {};

export const requestIdleCallback: any = window.requestIdleCallback;
export const requestAnimationFrame: any = window.requestAnimationFrame;

export type DOMHighResTimeStamp = number;
export interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp
};

export const calculateFPS = (cb: (arg: number) => {}) => {
  let initFpsCounter = 0;
  let lastTimeStamp = 0;
  let loop = () => {
    window.requestAnimationFrame((timestamp: DOMHighResTimeStamp) => {
      initFpsCounter++;
      if (lastTimeStamp) {
        let fps = 1000 / (timestamp - lastTimeStamp);
        if (cb && initFpsCounter > 3) {
          initFpsCounter = 0;
          cb(fps)
        }
      }
      lastTimeStamp = timestamp;
      loop();
    });
  }
  loop();
}

export const DEBUG = __DEBUG__ ? console.log.bind(console) : noop;

export function convert<From, To>(inst: From): To {
  let ret: any = inst;
  return ret;
}

export const now = () => performance.now();
