/**
 * Problem link - https://bigfrontend.dev/problem/detect-data-type-in-JavaScript
 */

function detectType(data) {
  // your code here
  if (data === null) {
    return 'null';
  }
  if (data === undefined) {
    return 'undefined';
  }
  return data.constructor.name.toLowerCase();
}