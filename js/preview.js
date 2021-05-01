'use strict';

(() => {
  const preview = document.querySelector(`.big-picture`);
  const socialComments = preview.querySelector(`.social__comments`);

  const createNewComment = (comment) => {
    const newComment = window.util.createNewElement(`li`, `social__comment`);
    const avatar = window.util.createNewElement(`img`, `social__picture`);
    const text = window.util.createNewElement(`p`, `social__text`, comment.message);

    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    newComment.appendChild(avatar);
    newComment.appendChild(text);
    return newComment;
  };

  const addCommentsToParent = (parent, comments) => {
    window.util.cleanContent(socialComments);
    comments.forEach((comment) => {
      parent.appendChild(createNewComment(comment));
    });
  };

  const fillPreviewByInfo = (photo) => {
    preview.querySelector(`.big-picture__img img`).src = photo.url;
    preview.querySelector(`.likes-count`).textContent = photo.likes;
    preview.querySelector(`.comments-count`).textContent = photo.comments.length;
    preview.querySelector(`.social__caption`).textContent = photo.description;
  };

  const render = (photo) => {
    fillPreviewByInfo(photo);
    addCommentsToParent(socialComments, photo.comments);
  };

  window.preview = {
    render
  };
})();
