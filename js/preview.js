'use strict';

(() => {
  const preview = document.querySelector(`.big-picture`);
  const socialComments = document.querySelector(`.social__comments`);

  const addCommentsToParent = (parent, comments) => {
    window.util.cleanContent(socialComments);
    for (let comment of comments) {
      const newComment = window.util.createNewElement(`li`, `social__comment`);
      const avatar = window.util.createNewElement(`img`, `social__picture`);
      const text = window.util.createNewElement(`p`, `social__text`, comment.message);
      parent.appendChild(newComment);
      avatar.src = comment.avatar;
      avatar.alt = comment.name;
      newComment.appendChild(avatar);
      newComment.appendChild(text);
    }
  };

  const render = (photo) => {
    preview.querySelector(`.big-picture__img img`).src = photo.url;
    preview.querySelector(`.likes-count`).textContent = photo.likes;
    preview.querySelector(`.comments-count`).textContent = photo.comments.length;
    preview.querySelector(`.social__caption`).textContent = photo.description;
    addCommentsToParent(socialComments, photo.comments);
  };

  window.preview = {
    render
  };
})();
