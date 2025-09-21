/**
 * Problem link - https://bigfrontend.dev/problem/implement-Promise-allSettled
 */

/**
 * @param {Array<any>} promises - notice that input might contain non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    const result = [];
    if (!promises.length) {
      resolve(result);
      return;
    }
    promises.forEach((promise, index) => {
      if (!(promise instanceof Promise)) {
        result[index] = {
          status: 'fulfilled',
          value: promise,
        };
        if (promises.length === result.length) {
          resolve(result);
        }
      } else {
        promise.then((data) => {
          result[index] = {
            status: 'fulfilled',
            value: data,
          };
        }).catch(error => {
          result[index] = {
            status: 'rejected',
            reason: error,
          };
        }).finally(() => {
          if (promises.length === result.length) {
            resolve(result);
          }
        });
      }
    });
  });
}