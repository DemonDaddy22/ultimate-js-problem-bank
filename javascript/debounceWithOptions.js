/**
 * Problem link - https://bigfrontend.dev/problem/implement-debounce-with-leading-and-trailing-option
 */

function debounce(func, wait, option = { leading: false, trailing: true }) {
  // your code here
  const { leading, trailing } = option;
  let timeoutId;

  return function (...args) {
    let alreadyCalled = false;
    if (!timeoutId && leading) {
      func.apply(this, args);
      alreadyCalled = true;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (trailing && !alreadyCalled) {
        func.apply(this, args);
      }
      timeoutId = undefined;
    }, wait);
  }
}