import { Job } from './job';
import { Scheduler } from './scheduler';
import { Work } from './work';

let schedulerSingleton: Scheduler | null = null;

export function getScheduler () {
  if (schedulerSingleton === null) {
    schedulerSingleton = new Scheduler();
  }
  return schedulerSingleton;
}

export function createJob() {
  return new Job();
}

export type Work = Work;
