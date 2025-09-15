/**
 * Problem link - https://bigfrontend.dev/problem/what-is-composition-create-a-pipe
 */

function pipe(funcs) {
  // your code here
  return function (arg) {
    return funcs.reduce((accu, curr) => {
      return curr(accu);
    }, arg);
  };
}