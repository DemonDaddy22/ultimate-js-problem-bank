/**
 * Problem link - https://bigfrontend.dev/problem/improve-a-function
 */

function excludeItems(items, excludes) {
  excludes.forEach(({ k, v }) => {
    items = items.filter((item) => item[k] !== v);
  });
  return items;
}