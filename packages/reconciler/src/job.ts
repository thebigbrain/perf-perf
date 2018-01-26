import { requestAnimationFrame, DOMHighResTimeStamp } from '../../share/utils';
import { Work } from './work';
import { Queue } from './queue';

enum JobStatus {
  INTERRUPTED,
  DONE
}


export class Job {

  private workQueue_: Queue<Work>;
  private current_: Work;
  private interrupted_: boolean = false;

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

  public interrupt (): void {
    this.interrupted_ = true;
  }

  public run (): void {
    this.interrupted_ = false;
    let loop = (timestamp: DOMHighResTimeStamp) => {
      let work: Work = this.workQueue_.iterator().next();
      if(!this.interrupted_) {
        requestAnimationFrame(loop); 
      }
    }
    requestAnimationFrame(loop);
  }

}
