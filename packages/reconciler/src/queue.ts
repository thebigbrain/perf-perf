export class Queue<T> {

  protected queue_: Array<T>;
  private iterator_: QueueIterator<T> = new QueueIterator<T>(this);

  public add(item: T): void {
    this.queue_.unshift(item);
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
    return this.iterator().next();
  }
}

export class QueueIterator<T> {

  private next_: T;

  constructor (queue: Queue<T>) {

  }

  next () {
    return this.next_;
  }

  get () {
    return this.next_;
  }
  
}