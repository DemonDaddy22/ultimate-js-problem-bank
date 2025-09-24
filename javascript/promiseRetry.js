/**
 * Create a function which accepts a fn (which returns a promise_ and count.
 * It should resolve if the function returns a promise which is resolved,
 * but should reject if the promise is rejected for at least count number of times.
 */

function retryPromise(func, count) {
  let error = null;
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < count; i++) {
      try {
        const response = await func();
        return resolve(response);
      } catch (err) {
        error = err;
      }
    }
    reject(error);
  });
};