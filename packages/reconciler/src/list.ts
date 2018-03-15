export class Node<T> {
  prev: Node<T>;
  next: Node<T>;

  constructor (public value?: T) {}
}

export class List<T> {
  head: Node<T>;
  tail: Node<T>;

  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public isEmpty() {
    return this.head.next === this.tail;
  }
}

export function unlink<T>(n: Node<T>) {
  let next = n.next;
  let prev = n.prev;
  prev.next = next;
  next.prev = prev;
}

export function appendAfter<T>(pos: Node<T>, node: Node<T>) {
  let next = pos.next;
  node.prev = pos;
  node.next = next;
  pos.next = node;
  next.prev = node;
}

export function appendBefore<T>(pos: Node<T>, node: Node<T>) {
  appendAfter(pos.prev, node);
}

export function createNode<T>(value: T): Node<T> {
  return new Node(value);
}
