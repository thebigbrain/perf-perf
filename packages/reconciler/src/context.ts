import { List } from './list';
import { Job } from './job';
import { DOMHighResTimeStamp, toInstance } from './utils';

export class PriorityList<T> extends List<T> {
  priority: DOMHighResTimeStamp;

  insert(k: DOMHighResTimeStamp, n: PriorityList<T>) {
    let node = this.head;
    while(node) {
      let inst = toInstance<List<T>, PriorityList<T>>(node);
      if (k == inst.priority) {
        node.append(n);
        break;
      }
      node = node.next;
    }
  }
  
}

export class Context {
  highQueue: PriorityList<List<Job>>;
  lowQueue: PriorityList<List<Job>>;

  getJob() {
    let list = this.highQueue.head || this.lowQueue.head;
    return list ? list.val.head.val : null;
  }
}
