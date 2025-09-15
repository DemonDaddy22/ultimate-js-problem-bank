/**
 * Problem link - https://bigfrontend.dev/problem/can-you-shuffle-an-array
 */

function shuffle(arr) {
  // modify the arr inline to change the order randomly
  let i = 0;
  let splicedArr = arr.slice();
  let element;
  while (i < arr.length) {
    [splicedArr, element] = getShuffledElement(splicedArr);
    arr[i++] = element;
  }
}


function getShuffledElement(arr) {
  // returns an element and splice of remaining array
  const length = arr.length;
  const randomIndex = Math.floor(Math.random() * length);
  const element = arr[randomIndex];
  arr = arr.slice(0, randomIndex).concat(arr.slice(randomIndex + 1));
  return [arr, element];
}