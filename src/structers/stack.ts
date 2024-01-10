export class Stack<T> {
  store: T[] = [];

  constructor(initialElements?: T[]) {
    if (initialElements) {
      this.store = [...initialElements];
    }
  }

  push(value: T) {
    this.store.push(value);
  }

  pop() {
    return this.store.pop();
  }

  clear() {
    this.store = [];
  }

  elements() {
    return this.store;
  }

  size() {
    return this.store.length;
  }
}
