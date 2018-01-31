import { Iterator, Container } from './iterator';
import { DEBUG } from './utils';

const MaxBufferSize = 1000;

export class QueueBase<T> {
  protected queue_: Array<T> = [];

  public add(item: T): void {
    this.queue_.push(item);
  }

  public iterator(): Iterator<T> {
    return new Iterator<T>(this);
  }

  public isEmpty(): boolean {
    return this.queue_.length === 0;
  }

  protected queue(): Array<T> {
    return this.queue_;
  }
}

export class Queue<T> extends QueueBase<T> implements Container<T> {
  // @implement
  public get(index: number): T {
    return this.queue_[index];
  }

  // @implement
  public size(): number {
    return this.queue_.length;
  }
}

export class DynamicQueue<T> extends QueueBase<T> implements Container<T> {
  private currentIndex_: number;
  private start_: number;
  private end_: number;
  private currentSize_: number;
  private queueState_: Array<boolean>;
  protected queue_: Array<T>;

  constructor () {
    super();
    this.queue_ = new Array(MaxBufferSize);
    this.queueState_ = new Array(MaxBufferSize);
    this.end_ = this.start_ = this.currentIndex_ = 0;
  }

  private getIndex (index: number): number {
    return index < this.currentSize_ ? this.start_ + index : -1;
  }

  // @override
  public add(item: T): void {
    this.queue_[this.currentIndex_] = item;
    this.queueState_[this.currentIndex_] = true;
    this.currentIndex_++;
    if (this.currentIndex_ === this.queue_.length) {
      this.currentIndex_ = 0;
    }
    DEBUG('add job', item, this.currentIndex_);
  }

  // @override
  public iterator(): Iterator<T> {
    this.start_ = this.end_;
    this.end_ = this.currentIndex_;
    this.currentSize_ = this.start_ > this.end_ ? this.queue_.length - this.start_ + this.end_ : this.end_ - this.start_;
    return new Iterator<T>(this);
  }

  // @override
  public queue(): Array<T> {
    let queue = [];
    for (let i = 0; i < this.size(); i++) {
      queue.push(this.get(i));
    }
    return queue;
  }

  // @override
  public isEmpty(): boolean {
    return this.start_ === this.end_;
  }

  // @implement
  public get(index: number): T {
    index = this.getIndex(index);
    let cur = this.queue_[index];
    if (this.queueState_[index]) {
      this.queueState_[index] = false;
      return cur;
    }
    return this.queue_[-1];
  }

  // @implement
  public size(): number {
    return this.currentSize_;
  }
}
