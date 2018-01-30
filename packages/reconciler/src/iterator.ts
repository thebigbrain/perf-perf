export interface Container<T> {
  get(index: number): T;
  size(): number;
}

export class Iterator<T> {
  private current_: number;
  private size_: number;
  private container_: any;

  constructor(container: any) {
    this.container_ = container;
    this.current_ = 0;
    this.size_ = this.container_.size();
  }

  hasNext(): boolean {
    return this.current_ < this.size_;
  }

  next(): T {
    let next = this.container_.get(this.current_);
    this.current_++;
    return next;
  }
}
