'use strict';

(() => {
  const QUANTITY_SHOW_COMMENTS_STEP = 5;

  const preview = document.querySelector(`.big-picture`);
  const socialComments = preview.querySelector(`.social__comments`);
  const commentLoaderButton = preview.querySelector(`.comments-loader`);
  const closeButton = preview.querySelector(`#picture-cancel`);

  let shownCommentsQuantity = 0;
  let currentOpenedPhoto;

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
    commentLoaderButton.classList.add(`hidden`);
  };

  const showCommentCounter = () => {
    preview.querySelector(`#comments-counter`).textContent = shownCommentsQuantity;
  };

  const addCommentsToParent = (comments) => {
    let startingQuantityOfComments = shownCommentsQuantity;
    if (shownCommentsQuantity + QUANTITY_SHOW_COMMENTS_STEP < comments.length) {
      shownCommentsQuantity += QUANTITY_SHOW_COMMENTS_STEP;
    } else {
      shownCommentsQuantity = comments.length;
      hideCommentLoader();
    }
    showCommentCounter();
    for (; startingQuantityOfComments < shownCommentsQuantity; startingQuantityOfComments++) {
      socialComments.appendChild(createNewComment(comments[startingQuantityOfComments]));
    }
  };

  const fillPreviewByInfo = (photo) => {
    preview.querySelector(`.big-picture__img img`).src = photo.url;
    preview.querySelector(`.likes-count`).textContent = photo.likes;
    preview.querySelector(`.comments-count`).textContent = photo.comments.length;
    preview.querySelector(`.social__caption`).textContent = photo.description;
  };

  const onCommentLoaderButtonClick = () => {
    addCommentsToParent(currentOpenedPhoto.comments);
  };

  const addListenersToShowPreview = () => {
    closeButton.addEventListener(`click`, window.gallery.hideModal);
    document.addEventListener(`keydown`, window.gallery.onEscKeydown);
    commentLoaderButton.addEventListener(`click`, onCommentLoaderButtonClick);
  };

  const removeListenersToHidePreview = () => {
    closeButton.removeEventListener(`click`, window.gallery.hideModal);
    document.removeEventListener(`keydown`, window.gallery.onEscKeydown);
    commentLoaderButton.removeEventListener(`click`, onCommentLoaderButtonClick);
  };

  const render = (photo) => {
    currentOpenedPhoto = photo;
    shownCommentsQuantity = 0;
    window.util.cleanContent(socialComments);
    fillPreviewByInfo(photo);
    addCommentsToParent(photo.comments);
    addListenersToShowPreview();
  };

  window.preview = {
    render,
    removeListenersToHidePreview,
  };
})();
