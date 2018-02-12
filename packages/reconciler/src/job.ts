import { requestAnimationFrame, DOMHighResTimeStamp, DEBUG } from './utils';
// import { Iterator } from './iterator';
import { Queue } from './queue';

export enum JobStatus {
  NONE,
  INTERRUPTED,
  RUNNING,
  DONE
}

export enum JobPriority {
  HIGH,
  LOW
}

export interface Job {
  priority: number;
  status: JobStatus;
  procedure: (...args: Array<any>) => any;
  interrupt(): Job;
  resume(): Job;
  run(): Job;
  done(): boolean;
}

export class JobBase {
  
}

export class IOJob {}
export class AnimJob {}
export class NormJob {}

export class JobQueue {
  private queue_: Queue<Job>;
  private unfinishedJob_: Job | undefined;

  constructor() {
    this.queue_ = new Queue<Job>();
  }

  public next(): Job | undefined {
    let job = this.unfinishedJob_;
    let iter = this.queue_.iterator();
    if (job) {
      if (job.done()) job = iter.next();
    } else {
      job = iter.next();
    }
    this.unfinishedJob_ = job;
    return job;
  }

  public add(job: Job) {
    this.queue_.add(job);
  }
}
