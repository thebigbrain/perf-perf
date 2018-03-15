// export * from './src/factory';

import { Job, JobTypes } from './src/job';
import { Scheduler } from './src/scheduler';

let scheduler = new Scheduler();

export function requestRenderRootJob(cb: Function) {
  if (cb) {
    scheduler.add(cb, 100, JobTypes.RENDER);
  }
}