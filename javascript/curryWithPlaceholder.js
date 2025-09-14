/**
 * Problem link - https://bigfrontend.dev/problem/implement-curry-with-placeholder
 */

function curry(fn) {
  const placeholder = curry.placeholder;
  function curried(...args) {
    const placeholderExists = doesPlaceholderExist(args, placeholder, fn.length);
    if (args.length >= fn.length && !placeholderExists) {
      return fn.apply(this, args);
    }
    return (...newArgs) => {
      let iterator = 0;
      const updatedArgs = args.map((arg) => {
        if (arg !== placeholder) {
          return arg;
        }
        if (iterator < newArgs.length) {
          return newArgs[iterator++];
        }
        return arg;
      });
      while (iterator < newArgs.length) {
        updatedArgs.push(newArgs[iterator++]);
      }
      console.log({ updatedArgs })
      return curried.apply(this, updatedArgs);
    };
  }
  return curried;
}

function doesPlaceholderExist(args, placeholder, length) {
  return args.slice(0, length).some((arg) => arg === placeholder);
}


curry.placeholder = Symbol()