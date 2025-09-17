/**
 * Problem link - https://bigfrontend.dev/problem/create-a-sum
 */

function sum(num) {
  // your code here
  let res = num;
  function adder(nextNum) {
    return sum(res + nextNum);
  }

  adder.valueOf = () => res;
  return adder;
}