import { requestAnimationFrame, DOMHighResTimeStamp } from '../../share/utils';
import { Work } from './work';
import { Queue } from './queue';

enum JobStatus {
  NONE,
  INTERRUPTED,
  DONE
}

export class Job {
  private workQueue_: Queue<Work>;
  private current_: Work;
  private status_: JobStatus = JobStatus.NONE;

  public constructor() { }

  public next(): Work {
    this.current_ = this.workQueue_.iterator().next();
    return this.current_;
  }

  public current(): Work {
    return this.current_;
  }

  public add(work: Work): void {
    if (this.isEmpty()) return;
    this.workQueue_.add(work);
  }

  public isEmpty(): boolean {
    return !this.workQueue_ || this.workQueue_.isEmpty();
  }

  public interrupt(): void {
    this.status_ = JobStatus.INTERRUPTED;
  }

  public run(): void {
    if (this.status_ === JobStatus.NONE) {
      let loop = (timestamp: DOMHighResTimeStamp) => {
        let iter = this.workQueue_.iterator();
        if (iter.hasNext()) {
          let work = iter.next();
          this.current_ = work;
          work.run();
          requestAnimationFrame(loop);
        } else {
          this.done();
        }
      }
      requestAnimationFrame(loop);
    }
  }

  private done() {
    this.status_ = JobStatus.DONE;
  }
}
