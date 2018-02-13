export class Handle<T> {
  private val: T;

  value(): T {
    return this.val;
  }
}
