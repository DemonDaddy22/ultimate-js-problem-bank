/**
 * Problem link - https://bigfrontend.dev/problem/implement-basic-debounce
 */

function debounce(func, wait) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
}