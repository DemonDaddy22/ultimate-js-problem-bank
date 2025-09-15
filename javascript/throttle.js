/**
 * Problem link - https://bigfrontend.dev/problem/implement-basic-throttle
 */

function throttle(func, wait) {
  // your code here
  let timeoutId;
  let lastArgs = null;

  return function (...args) {
    if (timeoutId) {
      // if a function call is made during the wait period, stash the args
      lastArgs = args;
    } else {
      func.apply(this, args);
      timeoutId = setTimeout(() => {
        if (lastArgs) {
          // if a function call was made during the wait period, execute it now
          func.apply(this, lastArgs);
          lastArgs = null;
        }
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }, wait);
    }
  }
}