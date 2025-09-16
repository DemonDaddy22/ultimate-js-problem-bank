/**
 * Problem link - https://bigfrontend.dev/problem/find-corresponding-node-in-two-identical-DOM-tree
 */

// Recursive approach (DFS)
const findCorrespondingNode = (rootA, rootB, target) => {
  // your code here
  // traverse through tree A and tree B
  // if node of tree A matches target, return node of tree B at that iteration

  // check if target matches root
  if (rootA === target) {
    return rootB;
  }

  // recursively check for all children
  const childrenA = rootA ? Array.from(rootA.children) : [];
  const childrenB = rootB ? Array.from(rootB.children) : [];

  if (!childrenA.length) {
    return null;
  }

  for (let i = 0; i < childrenA.length; i++) {
    const node = findCorrespondingNode(childrenA[i], childrenB[i], target);
    if (node) {
      return node;
    }
  }
}

// Iterative approach (DFS)
const findCorrespondingNodeUsingStack = (rootA, rootB, target) => {
  // your code here
  const stack = [[rootA, rootB]];
  while (stack.length) {
    const [currA, currB] = stack.pop();
    if (currA === target) {
      return currB;
    }
    for (let i = 0; i < currA.children.length; i++) {
      stack.push([currA.children[i], currB.children[i]]);
    }
  }
}

// Iterative approach (BFS)
const findCorrespondingNodeUsingQueue = (rootA, rootB, target) => {
  // your code here
  const queue = [[rootA, rootB]];
  while (queue.length) {
    const [currA, currB] = queue.shift();
    if (currA === target) {
      return currB;
    }
    for (let i = 0; i < currA.children.length; i++) {
      queue.push([currA.children[i], currB.children[i]]);
    }
  }
}

// Using createTreeWalker API
const findCorrespondingNodeWalker = (rootA, rootB, target) => {
  // your code here
  const walkerA = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const walkerB = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  let [currA, currB] = [walkerA.currentNode, walkerB.currentNode];
  while (currA !== target) {
    [currA, currB] = [walkerA.nextNode(), walkerB.nextNode()];
  }

  return currB;
}