'use strict';

(() => {
  const preview = document.querySelector(`.big-picture`);
  const socialComments = document.querySelector(`.social__comments`);

  const addCommentsToParent = (parent, comments) => {
    window.util.cleanContent(socialComments);
    for (let i = 0; i < comments.length; i++) {
      const newComment = window.util.createNewElement(`li`, `social__comment`);
      parent.appendChild(newComment);
      const avatar = window.util.createNewElement(`img`, `social__picture`);
      avatar.src = comments[i].avatar;
      avatar.alt = comments[i].name;
      newComment.appendChild(avatar);
      const text = window.util.createNewElement(`p`, `social__text`, comments[i].message);
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
