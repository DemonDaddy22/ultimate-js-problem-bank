/**
 * Problem link - https://bigfrontend.dev/problem/implement-Immutability-helper
 */

function update(data, command) {
  // your code here
  for (let [key, value] of Object.entries(command)) {
    switch (key) {
      case '$push':
        return [...data, ...value];
      case '$apply':
        return value(data);
      case '$set':
        return value;
      case '$merge':
        if (typeof data !== 'object' || data === null) {
          throw new Error('data must be an object');
        }
        return { ...data, ...value };
      default:
        if (Array.isArray(data)) {
          const copy = [...data];
          copy[key] = update(copy[key], value);
          return copy;
        } else {
          return {
            ...data,
            [key]: update(data[key], value),
          };
        }
    }
  }
}