export class List<T> {
  val: T;
  prev: List<T>;
  next: List<T>;

  public append(n: List<T>) {
    n.prev = this.prev;
    n.next = this.next;
    this.prev.next = n;
    this.next.prev = n;
  }

  public unlink() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }
}

export class ForwardList<T> {}
