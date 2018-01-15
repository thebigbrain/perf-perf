import { Job } from './job';
import { PriorityQueue } from './queue';

declare const window;
declare type DOMHighResTimeStamp = number;
declare interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp
};

const requestIdleCallback = window.requestIdleCallback;
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

  public run (): void {
    this.handle_ = requestIdleCallback((deadline: IdleDeadline) => {
      this.run();
      if (deadline.timeRemaining() > ScheduleUnit) {
        this.schedule();
      }
    }, {
      timeout: 1000
    });
  }

}