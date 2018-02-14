import {
  requestAnimationFrame,
  requestIdleCallback,
  DOMHighResTimeStamp,
  DEBUG
} from './utils';
import { Context } from './context';

const ScheduleUnit = 10;

export class Scheduler {
  private started_: boolean = false;
  private workInProgress: Context; // current running context

  public constructor() {
    this.started_ = false;
    this.workInProgress = new Context();
  }

  public getContext() {
    return this.workInProgress;
  }

  private schedule() {
    let job = this.workInProgress.getJob();
    if (job) {
      return job.call();
    }
    this.started_ = false;
  }

  private startLoop(): void {
    requestAnimationFrame((timestamp: DOMHighResTimeStamp) => {
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

}
