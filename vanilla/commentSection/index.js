(function () {
  const commentInput = document.getElementById('comment-input');
  const comments = document.getElementById('comments');
  const commentSubmitBtn = document.getElementById('submit-comment');

  const authors = ['Arjun', 'Kritika', 'Surya', 'Sakshi'];
  const data = [];

  let id = 0;
  let selectedCommentId = null;

  const getRandomNumber = (baseValue = 0) => {
    return Math.floor(Math.random() * baseValue);
  };

  const getMatchingCommentData = (commentId, commentsData) => {
    let matchingData = null;
    for (let comment of commentsData) {
      if (comment.id === commentId) {
        return comment;
      } else {
        matchingData ??= getMatchingCommentData(commentId, comment.replies);
      }
    }
    return matchingData;
  };

  const getMatchingCommentNode = (commentId) => {
    const walker = document.createTreeWalker(comments, NodeFilter.SHOW_ELEMENT);
    let curr = walker.currentNode;
    while (curr.dataset.id !== commentId) {
      curr = walker.nextNode();
    }
    return curr;
  };

  const createElement = (el, classes = []) => {
    const element = document.createElement(el);
    element.classList.add(...classes);
    return element;
  };

  const createComment = (content) => {
    const commentData = {
      id: `${++id}`,
      author: authors[getRandomNumber(authors.length)],
      comment: content,
      replies: [],
    };
    const commentElement = createElement('div', ['comment']);
    const commentBody = createElement('p', ['comment-body']);
    const commentInfo = createElement('div', ['comment-info']);
    const commentAuthor = createElement('span');
    const commentDivider = createElement('span');
    const commentButton = createElement('button', ['comment-reply']);

    commentElement.dataset.id = commentData.id;
    commentBody.textContent = content;
    commentAuthor.textContent = commentData.author;
    commentDivider.textContent = '|';
    commentButton.textContent = 'Reply';

    let fragment = document.createDocumentFragment();
    fragment.appendChild(commentAuthor);
    fragment.appendChild(commentDivider);
    fragment.appendChild(commentButton);

    commentInfo.appendChild(fragment);
    commentElement.appendChild(commentBody);
    commentElement.appendChild(commentInfo);

    return { commentData, commentElement };
  };

  const addComment = (content, currCommentId) => {
    const { commentData, commentElement } = createComment(content);
    // add commentData to data
    // add commentElement to DOM
    if (!currCommentId) {
      data.push(commentData);
      comments.appendChild(commentElement);
    } else {
      commentElement.classList.add('reply');
      const matchingCommentData = getMatchingCommentData(currCommentId, data);
      const matchingCommentNode = getMatchingCommentNode(currCommentId);
      matchingCommentData.replies.push(commentData);
      matchingCommentNode.appendChild(commentElement);
    }
  };

  commentSubmitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addComment(commentInput.value, selectedCommentId);
    commentInput.value = '';
    selectedCommentId = null;
    setTimeout(() => commentInput.focus(), 0);
  });

  comments.addEventListener('click', (e) => {
    const node = e.target;
    if (node.classList.contains('comment-reply')) {
      const commentNode = node.closest('.comment');
      selectedCommentId = commentNode.dataset.id;
      setTimeout(() => commentInput.focus(), 0);
    }
  });
})();