import { List } from './list';
import { Job } from './job';
import {
  convert,
  ExpirationTime,
  now
} from './utils';

export class PriorityList<T> extends List<T> {
  priority: ExpirationTime;
  head: List<T>;

  constructor() {
    super();
    this.head = new List<T>();
  }

  insert(k: ExpirationTime, n: PriorityList<T>) {
    let node = this.findNode(k);
    node.append(n);
  }

  findNode(k: ExpirationTime) {
    let node = this.head;
    while (node) {
      let inst = convert<List<T>, PriorityList<T>>(node);
      if (k == inst.priority) {
        return node;
      }
      node = this.next;
    }
    return node;
  }
}

export class Context {
  highQueue: PriorityList<Job>;
  lowQueue: PriorityList<Job>;

  getJob() {
    let list = this.highQueue || this.lowQueue;
    if (!list) return null;
    let head = list.head;
    return head ? head.next.val : null;
  }
}
