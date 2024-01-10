export class Queue<T> {
  headIdx: number | null = null;
  tailIdx: number | null = null;
  store: T[] = [];
  size: number;

  constructor(initialElements: T[], headIdx: number | null = null, tailIdx: number | null = null) {
    this.size = initialElements.length;
    this.store = [...initialElements];
    this.headIdx = headIdx ?? null;
    this.tailIdx = tailIdx ?? null;
  }
  
  enqueue(value: T) {
    if (this.tailIdx === null) {
      this.headIdx = 0;
      this.tailIdx = 0;
    } else if (!this.isFull()) {
      this.tailIdx = (this.tailIdx ?? 0) + 1;
    }

    this.store[this.tailIdx] = value;
  }

  dequeue() {
    if (this.headIdx === this.tailIdx) {
      this.tailIdx = null;
    } else {
      this.headIdx = (this.headIdx ?? 0) + 1;
    }
  }
  
  clear() {
    this.store = Array<T>(this.size);
  }

  elements() {
    return this.store;
  }

  isEmpty() {
    return this.headIdx === null || this.tailIdx === null;
  }
  
  isFull() {
    return this.tailIdx === this.size - 1;
  }

  getHeadIdx() {
    return this.headIdx;
  }
  
  getTailIdx() {
    return this.tailIdx;
  }
}
