/**
 * Problem link - https://bigfrontend.dev/problem/implement-Promise-any
 */

function any(promises) {
  // your code here
  return new Promise((resolve, reject) => {
    let errors = [];
    promises.forEach((promise, index) => {
      promise.then(resolve).catch((error) => {
        errors[index] = error;
        if (errors.length === promises.length) {
          reject(new AggregateError(
            'No Promise in Promise.any was resolved',
            errors,
          ));
        }
      })
    });
  });
}