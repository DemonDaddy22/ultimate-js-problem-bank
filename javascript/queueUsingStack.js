/**
 * Problem link - https://bigfrontend.dev/problem/implement-a-queue-by-using-stack
 */

/*
class Stack {
  push(element) { // add element to stack }
  peek() { // get the top element }
  pop() { // remove the top element}
  size() { // count of element }
}
*/

/* Array is disabled in your code */

// you need to complete the following Class
class Queue {
  #forwardStack;
  #backwardStack;

  constructor() {
    this.#forwardStack = new Stack();
    this.#backwardStack = new Stack();
  }

  enqueue(element) {
    // add new element to the rear
    this.#forwardStack.push(element);
    let size = this.#backwardStack.size();
    while (this.#backwardStack.size()) {
      this.#forwardStack.push(this.#backwardStack.pop());
    }
    this.#backwardStack.push(element);
    while (size--) {
      this.#backwardStack.push(this.#forwardStack.pop());
    }
  }
  peek() {
    // get the head element
    return this.#backwardStack.peek();
  }
  size() {
    // return count of element
    return this.#forwardStack.size();
  }
  dequeue() {
    // remove the head element
    const head = this.#backwardStack.pop();
    let size = this.#backwardStack.size();
    while (this.#forwardStack.size()) {
      this.#backwardStack.push(this.#forwardStack.pop());
    }
    this.#backwardStack.pop();
    while (size--) {
      this.#forwardStack.push(this.#backwardStack.pop());
    }
    return head;
  }
}