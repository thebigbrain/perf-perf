import { Job } from './job';
import { PriorityQueue } from './queue';
import { requestAnimationFrame, requestIdleCallback, IdleDeadline } from '../../share/utils'

const ScheduleUnit = 10;

export class Scheduler {

  private jobQueue_: PriorityQueue<Job>;
  private handle_: any = null;

  public constructor () {}

  private schedule (): void {
    if (!this.jobQueue_.isEmpty()) {
      let job = this.jobQueue_.findHighestPriority();
      job.run();
    }
  }

  private startLoop (): void {
    this.handle_ = requestIdleCallback((deadline: IdleDeadline) => {
      this.startLoop();
      if (deadline.timeRemaining() > ScheduleUnit) {
        this.schedule();
      }
    }, {
      timeout: 1000
    });
  }

  public run (): void {
    this.startLoop();
  }

}