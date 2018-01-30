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

export function createWork(run: () => void): Work {
  return { run };
}

export type Work = Work;
