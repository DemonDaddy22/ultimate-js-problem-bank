/**
 * Problem link - https://bigfrontend.dev/problem/create-your-own-Promise
 */

const PROMISE_STATES = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  #state = PROMISE_STATES.PENDING;
  #value;
  #isSettled = false;
  #fulfilledCallbacks = [];
  #rejectedCallbacks = [];
  #resolveBind = this.#resolve.bind(this);
  #rejectBind = this.#reject.bind(this);

  constructor(executor) {
    // your code here
    try {
      executor(this.#resolveBind, this.#rejectBind);
    } catch (err) {
      this.#reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // your code here
    return new MyPromise((resolve, reject) => {
      this.#fulfilledCallbacks.push((res) => {
        if (!onFulfilled) {
          resolve(res);
          return;
        }
        try {
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      });

      this.#rejectedCallbacks.push((res) => {
        if (!onRejected) {
          reject(res);
          return;
        }
        try {
          resolve(onRejected(res));
        } catch (err) {
          reject(err);
        }
      });

      this.#executeCallbacks();
    });
  }

  catch(onRejected) {
    // your code here
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then((res) => {
      callback();
      return res;
    }, (res) => {
      callback();
      throw res;
    });
  }

  #executeCallbacks() {
    switch (this.#state) {
      case PROMISE_STATES.FULFILLED:
        this.#fulfilledCallbacks.forEach((cb) => cb(this.#value));
        this.#fulfilledCallbacks = [];
        break;
      case PROMISE_STATES.REJECTED:
        this.#rejectedCallbacks.forEach((cb) => cb(this.#value));
        this.#rejectedCallbacks = [];
        break;
      default:
        break;
    }
  };

  #resolve(value) {
    queueMicrotask(() => {
      if (this.#state !== PROMISE_STATES.PENDING || this.#isSettled) {
        return;
      }
      this.#isSettled = true;
      if (value instanceof MyPromise) {
        value.then((res) => {
          this.#isSettled = false;
          this.#resolveBind(res);
        }, (res) => {
          this.#isSettled = false;
          this.#rejectBind(res)
        });
        return;
      }

      this.#state = PROMISE_STATES.FULFILLED;
      this.#value = value;
      this.#executeCallbacks();
    });
  }

  #reject(value) {
    queueMicrotask(() => {
      if (this.#state !== PROMISE_STATES.PENDING || this.#isSettled) {
        return;
      }
      this.#isSettled = true;
      if (value instanceof MyPromise) {
        value.then((res) => {
          this.#isSettled = false;
          this.#resolveBind(res);
        }, (res) => {
          this.#isSettled = false;
          this.#rejectBind(res)
        });
        return;
      }

      this.#state = PROMISE_STATES.REJECTED;
      this.#value = value;
      this.#executeCallbacks();
    });
  }

  static resolve(value) {
    // your code here
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(value) {
    // your code here
    return new MyPromise((_, reject) => reject(value));
  }
}