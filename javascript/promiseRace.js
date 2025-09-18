/**
 * Problem link - https://bigfrontend.dev/problem/implement-Promise-race
 */

function race(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      promise.then(resolve).catch(reject);
    }
  });
}