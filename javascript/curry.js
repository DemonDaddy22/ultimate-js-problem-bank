/**
 * Problem link - https://bigfrontend.dev/problem/implement-curry
 */

function curry(fn) {
  function curried(...args) {
    if (args.length < fn.length) {
      return (...newArgs) => curried.apply(this, [...args, ...newArgs]);
    } else {
      return fn.apply(this, args);
    }
  };
  return curried;
};

const sum = (a, b, c) => a + b + c;

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1, 2, 3));