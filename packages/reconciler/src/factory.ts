import { Job } from './job';
import { Scheduler } from './scheduler';

let schedulerSingleton: Scheduler | null = null;

export function getScheduler () {
  if (schedulerSingleton === null) {
    schedulerSingleton = new Scheduler();
  }
  return schedulerSingleton;
}

export function createJob() {
  
}

