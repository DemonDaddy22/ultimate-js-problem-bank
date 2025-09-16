/**
 * Problem link - https://bigfrontend.dev/problem/implement-a-simple-DOM-wrapper-to-support-method-chaining-like-jQuery
 */

function $(el) {
  // your code here
  return {
    css: function (propertyName, value) {
      el.style[propertyName] = value;
      return this;
    },
  };
}