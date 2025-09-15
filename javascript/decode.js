/**
 * Problem link - https://bigfrontend.dev/problem/decode-message
 */

function decode(message) {
  // your code here
  if (!message.length) {
    return '';
  }
  return decodePath({
    message,
    currX: 0,
    currY: 0,
    dirX: 1,
    code: '',
  });
}

function decodePath({ message, currX, currY, dirX, code }) {
  if (currY >= message?.[0]?.length ?? 0) {
    return code;
  }
  if (isValid(currX, message)) {
    code = code.concat(message[currX][currY]);
    return decodePath({ message, currX: currX + dirX, currY: currY + 1, dirX, code });
  } else {
    dirX = dirX > 0 ? -1 : 1;
    return decodePath({ message, currX: currX + (2 * dirX), currY, dirX, code });
  }
}

function isValid(currX, message) {
  return currX >= 0 && currX < (message?.length ?? 0);
}