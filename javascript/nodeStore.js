/**
 * Problem link - https://bigfrontend.dev/problem/create-a-simple-store-for-DOM-node
 */

class NodeStore {
  #store;
  constructor() {
    this.#store = {};
  }

  /**
  * @param {Node} node
  * @param {any} value
  */
  set(node, value) {
    const key = node.dataset.key || Date.now();
    node.dataset.key = key;
    this.#store[key] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    const key = node.dataset.key;
    return this.#store[key];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    const key = node.dataset.key;
    return key in this.#store;
  }
}