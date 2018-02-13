export class List<T> {
  val: T;
  head: List<T>;
  tail: List<T>;
  prev: List<T>;
  next: List<T>;

  public append(n: List<T>) {
    n.prev = this.prev;
    n.next = this.next;
    this.prev.next = n;
    this.next.prev = n;
  }
}

export class ForwardList<T> {}
