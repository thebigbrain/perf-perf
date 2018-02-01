import { requestAnimationFrame, DOMHighResTimeStamp, DEBUG } from './utils';
import { Work } from './work';
// import { Iterator } from './iterator';
import { Queue } from './queue';

export enum JobStatus {
  NONE,
  INTERRUPTED,
  RUNNING,
  DONE
}

export class Job {
  private workQueue_: Queue<Work>;
  private status_: JobStatus;

  public constructor() {
    this.status_ = JobStatus.NONE;
    this.workQueue_ = new Queue<Work>();
  }

  public add(...work: Array<Work>): Job {
    for (let i = 0; i < work.length; i++) {
      this.workQueue_.add(work[i]); 
    }
    return this;
  }

  public size(): number {
    return this.workQueue_.size();
  }

  public status(): JobStatus {
    return this.status_;
  }

  public interrupt(): this {
    this.status_ = JobStatus.INTERRUPTED;
    return this;
  }

  public resume(): Job {
    this.status_ = JobStatus.NONE;
    return this;
  }

  public run(): Job {
    DEBUG('run job', this, this.status());
    if (this.running()) return this;
    this.status_ = JobStatus.RUNNING;
    if (this.interrupted()) this.resume();
    if (!this.done()) {
      let loop = (timestamp: DOMHighResTimeStamp) => {
        let iter = this.workQueue_.iterator();
        let work = iter.next();
        if (work) {
          DEBUG('run work', work);
          work.run();
          if (!this.interrupted()) requestAnimationFrame(loop);
        } else {
          DEBUG('job done', this);
          this.status_ = JobStatus.DONE;
        }
      }
      requestAnimationFrame(loop);
    }
    return this;
  }

  public interrupted() {
    return this.status_ === JobStatus.INTERRUPTED;
  }

  public running() {
    return this.status_ === JobStatus.RUNNING;
  }

  public done(): boolean {
    return this.status_ === JobStatus.DONE;
  }
}

export class JobQueue {
  private queue_: Queue<Job>;
  private unfinishedJob_: Job | undefined;

  constructor() {
    this.queue_ = new Queue<Job>();
  }

  public getHighestPriority(): Job | undefined {
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
    DEBUG('add job', job);
    this.queue_.add(job);
  }
}
