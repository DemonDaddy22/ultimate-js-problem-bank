/**
 * Problem link - https://bigfrontend.dev/problem/implement-clearAllTimeout
 */

function clearAllTimeout() {
  // your code here
  let mostRecentTimeoutId = setTimeout(() => { }, 0);
  while (mostRecentTimeoutId) {
    clearTimeout(mostRecentTimeoutId--);
  }
}