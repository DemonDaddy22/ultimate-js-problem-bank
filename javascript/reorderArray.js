/**
 * Problem link - https://bigfrontend.dev/problem/reorder-array-with-new-indexes
 */

// with extra space
function sort(items, newOrder) {
  // reorder items inline
  const tempItems = [];
  for (let i = 0; i < items.length; i++) {
    tempItems[newOrder[i]] = items[i];
  }
  for (i = 0; i < items.length; i++) {
    items[i] = tempItems[i];
  }
}

// without extra space
function sortInPlace(items, newOrder) {
  // reorder items inline
  let i = 0;
  while (i < items.length) {
    const index = newOrder.findIndex((item) => item === i);
    [items[i], items[index]] = [items[index], items[i]];
    [newOrder[i], newOrder[index]] = [newOrder[index], newOrder[i]];
    i++;
  }
}