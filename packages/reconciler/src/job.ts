import { requestAnimationFrame, DOMHighResTimeStamp, DEBUG } from './utils';
import { Queue } from './queue';
import { Handle } from './handle';

const noop = () => {};

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
  procedure: Function;
  deadline: DOMHighResTimeStamp;

  constructor(fun: Function) {
    this.procedure = fun || noop;
  }

  public call () {
    this.procedure();
  }
}

export class IOJob extends Job { }
export class AnimationJob extends Job { }
export class NormalJob extends Job { }

export class RenderJob extends Job {}

export enum JobTypes {
  RENDER,
  ANIMATION,
  IO,
  NORMAL
}

export function createJob(fun: Function, type: JobTypes): Job {
  let job: Job;
  switch(type) {
    case JobTypes.RENDER:
      return new RenderJob(fun);
    default:
      return new NormalJob(fun);
  }
}
