import { Job, JobQueue } from './job';
import { Iterator } from './iterator';
import { requestAnimationFrame, requestIdleCallback, IdleDeadline, DEBUG } from './utils';

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
    let job = this.jobQueue_.getHighestPriority();
    if(job) job.run();
  }

  private startLoop(): void {
    this.handle_ = requestIdleCallback((deadline: IdleDeadline) => {
      this.startLoop();
      if (deadline.timeRemaining() > ScheduleUnit) {
        this.schedule();
      }
    }, {
        timeout: 1000
      });
  }

  public run(): void {
    if (this.started_) return;
    DEBUG('scheduler started!');
    this.started_ = true;
    this.startLoop();
  }

  public addJob(job: Job): void {
    this.jobQueue_.add(job);
  }
}
