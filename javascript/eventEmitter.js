/**
 * Problem link - https://bigfrontend.dev/problem/create-an-Event-Emitter
 */

class EventEmitter {
  #events;

  constructor() {
    this.#events = {};
  }

  subscribe(eventName, callback) {
    if (!(eventName in this.#events)) {
      this.#events[eventName] = [];
    }
    this.#events[eventName].push(callback);

    return {
      release: () => {
        const index = this.#events[eventName].findIndex((func) => func === callback);
        this.#events[eventName].splice(index, 1);
      }
    };
  }

  emit(eventName, ...args) {
    const callbacks = this.#events[eventName] ?? [];
    for (let callback of callbacks) {
      callback(...args);
    }
  }
}