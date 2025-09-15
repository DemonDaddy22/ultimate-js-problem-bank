/**
 * Problem link - https://bigfrontend.dev/problem/implement-general-memoization-function
 */

function memo(func, resolver) {
  // your code here
  const store = {};
  return function (...args) {
    const key = resolver ? resolver(...args) : args.join('_');
    if (!store[key]) {
      store[key] = func.apply(this, args);
    }
    return store[key];
  }
}