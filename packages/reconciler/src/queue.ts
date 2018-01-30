import { Iterator, Container } from './iterator';

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
  protected queue_: Array<T>;

  constructor () {
    super();
    this.queue_ = new Array(MaxBufferSize);
    this.end_ = this.start_ = this.currentIndex_;
  }

  private getIndex (index: number): number {
    return index < this.currentSize_ ? this.currentIndex_ + index : -1;
  }

  // @override
  public add(item: T): void {
    this.queue_[this.currentIndex_++] = item;
    if (this.currentIndex_ === this.queue_.length) {
      this.currentIndex_ = 0;
    }
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
    return this.queue_[this.getIndex(index)];
  }

  // @implement
  public size(): number {
    return this.currentSize_;
  }
}

export class PriorityQueue<T> {
  private queue_: DynamicQueue<T>;
  private iter_: Iterator<T>;

  constructor () {
    this.queue_ = new DynamicQueue<T>();
  }

  public queue (): DynamicQueue<T> {
    return this.queue_;
  }

  public findHighestPriority(): T {
    if (!this.iter_) this.iter_ = this.queue_.iterator();
    return this.iter_.next();
  }

  public isEmpty(): boolean {
    return this.queue_.isEmpty();
  }
}
