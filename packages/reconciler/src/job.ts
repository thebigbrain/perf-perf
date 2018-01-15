import { Work } from './work';
import { Queue } from './queue';

export class Job {

  private workQueue_: Queue<Work>;
  private current_: Work;

  public constructor () {}

  public next (): Work {
    this.current_ = this.workQueue_.iterator().next();
    return this.current_;
  }

  public current (): Work {
    return this.current_;
  }

  public add (work: Work): void {
    this.workQueue_.add(work);
  }

  public isEmpty (): boolean {
    return this.workQueue_.isEmpty();
  }

  public run (): void {}

}
