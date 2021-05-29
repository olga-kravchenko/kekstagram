'use strict';

(() => {
  const QUANTITY_SHOW_COMMENTS_STEP = 5;

  const preview = document.querySelector(`.big-picture`);
  const socialComments = preview.querySelector(`.social__comments`);
  const commentCounter = preview.querySelector(`.social__comment-count`);
  const commentLoader = preview.querySelector(`.comments-loader`);

  let shownCommentsQuantity = 0;

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

  const hideCommentLoader = () => {
    commentLoader.classList.add(`hidden`);
  };

  const showCounterAndCommentLoader = () => {
    commentCounter.classList.remove(`hidden`);
    commentLoader.classList.remove(`hidden`);
  };

  const addCommentsToParent = (comments) => {
    let start = shownCommentsQuantity;
    if (shownCommentsQuantity + QUANTITY_SHOW_COMMENTS_STEP < comments.length) {
      shownCommentsQuantity += QUANTITY_SHOW_COMMENTS_STEP;
      showCounterAndCommentLoader();
    } else {
      shownCommentsQuantity = comments.length;
      hideCommentLoader();
    }

    preview.querySelector(`#comments-counter`).textContent = shownCommentsQuantity;

    for (start; start < shownCommentsQuantity; start++) {
      socialComments.appendChild(createNewComment(comments[start]));
    }
  };

  const fillPreviewByInfo = (photo) => {
    preview.querySelector(`.big-picture__img img`).src = photo.url;
    preview.querySelector(`.likes-count`).textContent = photo.likes;
    preview.querySelector(`.comments-count`).textContent = photo.comments.length;
    preview.querySelector(`.social__caption`).textContent = photo.description;
  };

  const render = (photo) => {
    shownCommentsQuantity = 0;
    window.util.cleanContent(socialComments);
    commentLoader.addEventListener(`click`, () => {
      addCommentsToParent(photo.comments);
    });
    fillPreviewByInfo(photo);
    addCommentsToParent(photo.comments);
  };

  window.preview = {
    render,
  };
})();
