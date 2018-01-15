export class Queue<T> {

  private queue_: Array<T>;
  private iterator_: QueueIterator<T>;

  public add(item: T): void {
    this.queue_.push(item);
  }

  public iterator (): QueueIterator<T> {
    return this.iterator_;
  }

  public isEmpty (): boolean {
    return this.queue_.length === 0;
  }

  protected queue (): Array<T> {
    return this.queue_;
  }

}

export class PriorityQueue<T> extends Queue<T> {
  public findHighestPriority (): T {
    return this.queue()[0];
  }
}

export class QueueIterator<T> {

  private next_: T;

  next () {
    return this.next_;
  }

  get () {
    return this.next_;
  }
  
}