import { Job, JobQueue } from './job';
import { Iterator } from './iterator';
import { requestAnimationFrame, requestIdleCallback, DOMHighResTimeStamp, DEBUG } from './utils';

const ScheduleUnit = 10;

export class Scheduler {
  private jobQueue_: JobQueue;
  private handle_: any = null;
  private started_: boolean = false;

  public constructor() {
    this.started_ = false;
    this.jobQueue_ = new JobQueue();
  }

  private schedule(): void {
    let job = this.jobQueue_.next();
    if (job) {
      job.run();
    } else {
      this.started_ = false;
    }
  }

  private startLoop(): void {
    this.handle_ = requestAnimationFrame((timestamp: DOMHighResTimeStamp) => {
      if (this.started_) {
        this.schedule();
        if (this.started_) this.startLoop();
      }
    });
  }

  public run(): void {
    if (this.started_) return;
    this.started_ = true;
    this.startLoop();
  }

  public addJob(job: Job): void {
    this.jobQueue_.add(job);
    this.run();
  }
}
