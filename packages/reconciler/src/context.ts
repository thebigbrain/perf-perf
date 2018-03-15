import { List, createNode, Node, appendBefore, unlink } from './list';
import { Job, JobTypes, createJob } from './job';
import {
  convert,
  now,
  DEBUG
} from './utils';
import { ExpirationTime, msToExpirationTime } from './expiration-time';

export class WorkList<T> {
  priority: ExpirationTime;
  list: List<T>;

  constructor(p: ExpirationTime) {
    this.priority = p;
    this.list = new List();
  }
}

export class PriorityList<T> {
  private list: List<WorkList<T>>;

  constructor() {
    this.list = new List();
  }

  public insert(k: number, n: Node<T>) {
    let tail = this.findListHead(msToExpirationTime(k));
    if (tail) appendBefore(tail, n);
  }

  public head() {
    return this.list.head;
  }

  public tail() {
    return this.list.tail;
  }

  public isEmpty() {
    return this.list.isEmpty();
  }

  private findListHead(k: ExpirationTime): Node<T> | null {
    let head = this.list.head;
    let tail = this.list.tail;
    let node = head.next;
    while (node !== tail) {
      if (node.value) {
        if (k == node.value.priority) {
          return node.value.list.tail;
        }
      }
      node = node.next;
    }
    if (node == tail) {
      appendBefore(node, createNode(new WorkList(k)));
      node = tail.prev;
    }
    return node.value ? node.value.list.tail : null;
  }
}

export class Context {
  highQueue: PriorityList<Job>;
  lowQueue: PriorityList<Job>;

  constructor() {
    this.highQueue = new PriorityList();
    this.lowQueue = new PriorityList();
  }

  public getJob() {
    let queue = this.getWorkInProgress();
    DEBUG('get job', queue);
    if (!queue || queue.isEmpty()) return;
    let head = queue.head();
    let tail = queue.tail();
    let node = head.next;
    if (node === tail) return;
    if (node.value) {
      let list = node.value.list;
      if (list.isEmpty()) return;
      let n = list.head.next;
      unlink(n);
      return n.value;
    }
  }

  public add(callback: Function, deadline: number, type: JobTypes) {
    let job = createJob(callback, type);
    let queue = this.getJobQueue(type);
    queue.insert(now() + deadline, new Node(job));
  }

  private getWorkInProgress(): PriorityList<Job> {
    return this.highQueue.isEmpty() ? this.lowQueue : this.highQueue;
  }

  private getJobQueue(type: JobTypes): PriorityList<Job> {
    let queue: PriorityList<Job>;
    switch (type) {
      case JobTypes.NORMAL:
        queue = this.lowQueue;
        break;
      default:
        queue = this.highQueue;
        break;
    }
    return queue;
  }
}
