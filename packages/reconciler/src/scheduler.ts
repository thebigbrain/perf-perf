import {
  requestAnimationFrame,
  requestIdleCallback,
  DOMHighResTimeStamp,
  DEBUG
} from './utils';
import { Context } from './context';
import { JobTypes } from './job';

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

  public add(callback: Function, deadline: number, type: JobTypes) {
    DEBUG('add a job', type);
    let context = this.getContext();
    context.add(callback, deadline, type);
    this.run();
  }

  private schedule() {
    let job = this.getContext().getJob();
    DEBUG('job', job)
    if (job) {
      return job.call();
    }
    this.started_ = false;
  }

  private startLoop(): void {
    if (this.started_) {
      DEBUG('loop started')
      requestAnimationFrame((timestamp: DOMHighResTimeStamp) => {
        this.schedule();
        if (this.started_) this.startLoop();
      });
    }
  }

  public run(): void {
    if (this.started_) return;
    this.started_ = true;
    this.startLoop();
  }

}
