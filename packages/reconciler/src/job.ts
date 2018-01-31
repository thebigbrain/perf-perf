import { requestAnimationFrame, DOMHighResTimeStamp, DEBUG } from './utils';
import { Work } from './work';
// import { Iterator } from './iterator';
// import { Queue, DynamicQueue, QueueBase } from './queue';

enum JobStatus {
  NONE,
  INTERRUPTED,
  DONE
}

export class Job {
  private workQueue_: Array<Work>;
  private status_: JobStatus;

  public constructor() {
    this.status_ = JobStatus.NONE;
    this.workQueue_ = new Array<Work>();
  }

  public add(work: Work): void {
    this.workQueue_.push(work);
  }

  public size(): number {
    return this.workQueue_.length;
  }

  public interrupt(): void {
    this.status_ = JobStatus.INTERRUPTED;
  }

  public resume(): void {
    this.status_ = JobStatus.NONE;
  }

  public run(): void {
    DEBUG('run job', this, this.workQueue_);
    if(this.interrupted()) this.resume();
    if (this.status_ === JobStatus.NONE) {
      let loop = (timestamp: DOMHighResTimeStamp) => {
        let work = this.workQueue_.shift();
        DEBUG('run work', work);
        if (work) {
          work.run();
          if(!this.interrupted()) requestAnimationFrame(loop);
        } else {
          this.status_ = JobStatus.DONE;
        }
      }
      requestAnimationFrame(loop);
    }
  }

  public interrupted () {
    return this.status_ === JobStatus.INTERRUPTED;
  }

  public done(): boolean {
    return this.status_ === JobStatus.DONE;
  }
}

export class JobQueue {
  private queue_: Array<Job>;
  private unfinishedJob_: Job | undefined;

  constructor () {
    this.queue_ = new Array<Job>();
  }

  public getHighestPriority(): Job | undefined {
    let job = this.unfinishedJob_;
    if (job) {
      if(job.done()) job = this.queue_.shift();
    } else {
      job = this.queue_.shift();
    }
    this.unfinishedJob_ = job;
    return job;
  }

  public add(job: Job) {
    DEBUG('add job', job);
    this.queue_.push(job);
  }
}

