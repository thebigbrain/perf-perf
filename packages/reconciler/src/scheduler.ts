import { Job } from './job';
import { PriorityQueue } from './queue';
import { requestAnimationFrame, requestIdleCallback, IdleDeadline } from '../../share/utils'

const ScheduleUnit = 10;

export class Scheduler {
  private jobQueue_: PriorityQueue<Job>;
  private handle_: any = null;
  private started_: boolean = false;

  public constructor() {
    this.started_ = false;
  }

  private schedule(): void {
    if (!this.jobQueue_.isEmpty()) {
      let job = this.jobQueue_.findHighestPriority();
      job.run();
    }
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
    this.started_ = true;
    this.startLoop();
  }

  public addJob(job: Job): void {
    this.jobQueue_.queue().add(job);
  }
}
