/**
 * Problem link - https://bigfrontend.dev/problem/implement-Promise-all
 */

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    const results = [];
    const promisesLength = promises.length;
    let nonPromiseCount = 0;

    if (!promisesLength) {
      resolve(results);
      return;
    }
    promises.forEach((promise) => {
      if (!(promise instanceof Promise)) {
        results.push(promise);
        nonPromiseCount++;
        if (nonPromiseCount === promisesLength) {
          resolve(results);
        }
      } else {
        promise.then((res) => {
          results.push(res);
          if (results.length === promisesLength) {
            resolve(results);
          }
        }).catch(reject)
      }
    });
  });
}