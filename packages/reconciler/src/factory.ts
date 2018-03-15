import { Job, JobTypes } from './job';
import { Scheduler } from './scheduler';

let scheduler = new Scheduler();

export function requestRenderRootJob(cb: Function) {
  if (cb) {
    scheduler.add(cb, 100, JobTypes.RENDER);
  }
}