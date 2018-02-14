import { requestAnimationFrame, DOMHighResTimeStamp, DEBUG } from './utils';
import { Queue } from './queue';
import { Handle } from './handle';

export type func = (...args: Array<any>) => any;

export enum JobStatus {
  NONE,
  INTERRUPTED,
  RUNNING,
  DONE
}

export interface JobStats { }

export enum JobPriority {
  HIGH,
  LOW
}

export class Job {
  owner: any;
  priority: JobPriority;
  status: JobStatus;
  stats: JobStats;
  procedure: func;
  deadline: DOMHighResTimeStamp;

  public call () {}
}

export class IOJob { }
export class AnimJob { }
export class NormJob { }

