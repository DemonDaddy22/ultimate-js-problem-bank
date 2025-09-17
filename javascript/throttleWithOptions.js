/**
 * Problem link - https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option
 */

function throttle(func, wait, option = { leading: true, trailing: true }) {
  // your code here
  const { leading, trailing } = option;
  let stashedArgs = null;
  let timeoutId;

  const setTimedFunction = () => {
    if (stashedArgs && trailing) {
      func.apply(this, stashedArgs);
      timeoutId = setTimeout(setTimedFunction, wait); // schedule the next call in case another call was stashed
      stashedArgs = null;
    } else {
      timeoutId = undefined;
    }
  };

  return function (...args) {
    if (timeoutId) {
      stashedArgs = args;
    } else {
      if (leading) {
        func.apply(this, args);
      }
      timeoutId = setTimeout(setTimedFunction, wait);
    }
  }
}