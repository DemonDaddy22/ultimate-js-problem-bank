/**
 * Problem link - https://bigfrontend.dev/problem/implement-Array-prototype.flat
 */

function flat(arr, depth = 1) {
  // your implementation here
  let flattenedArray = arr;
  while (depth-- && arr.some(Array.isArray)) {
    flattenedArray = flatten(flattenedArray);
  }
  return flattenedArray;
}

function flatten(arr) {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (!Array.isArray(elm)) {
      array.push(elm);
    } else {
      array = array.concat(elm);
    }
  }
  return array;
}

// recursive approach
function recursiveflat(arr, depth = 1) {
  // your implementation here
  if (depth) {
    return arr.reduce((accu, curr) => {
      if (!Array.isArray(curr)) {
        accu.push(curr);
      } else {
        accu = accu.concat(recursiveflat(curr, depth - 1));
      }
      return accu;
    }, []);
  }
  return arr;
}

// iterative approach
function iterativeflat(arr, depth = 1) {
  // your implementation here
  const flattenedArray = [];
  const stack = arr.map((item) => ([item, depth]));

  while (stack.length) {
    const [top, dep] = stack.pop();
    if (!Array.isArray(top) || dep <= 0) {
      flattenedArray.push(top);
    } else {
      stack.push(...top.map((item) => ([item, dep - 1])));
    }
  }

  return flattenedArray.reverse();
}