/**
 * Problem link - https://bigfrontend.dev/problem/first-bad-version
 */

function firstBadVersion(isBad) {
  // firstBadVersion receives a check function isBad
  // and should return a closure which accepts a version number(integer)
  let currVersion = 0;
  return (version) => {
    // write your code to return the first bad version
    // if none found, return -1
    while (currVersion <= version) {
      if (isBad(currVersion)) {
        return currVersion;
      }
      currVersion++;
    }
    return -1;
  }
}