'use strict';

const QUANTITY_SHOW_COMMENTS_STEP = 5;

const body = document.querySelector(`body`);
const preview = body.querySelector(`.big-picture`);
const closeButton = preview.querySelector(`#picture-cancel`);
const commentCounter = preview.querySelector(`.social__comment-count`);
const commentsGroup = preview.querySelector(`.social__comments`);
const commentLoaderButton = preview.querySelector(`.comments-loader`);

let quantityOfCommentsShown = 0;
let currentOpenedPicture;

const showCounterAndCommentLoader = () => {
  commentCounter.classList.remove(`hidden`);
  commentLoaderButton.classList.remove(`hidden`);
};

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
  preview.querySelector(`#comments-counter`).textContent = quantityOfCommentsShown;
};

const addCommentsToParent = (comments) => {
  let startingQuantityOfComments = quantityOfCommentsShown;
  if (quantityOfCommentsShown + QUANTITY_SHOW_COMMENTS_STEP < comments.length) {
    quantityOfCommentsShown += QUANTITY_SHOW_COMMENTS_STEP;
  } else {
    quantityOfCommentsShown = comments.length;
    hideCommentLoader();
  }
  showCommentCounter();
  for (; startingQuantityOfComments < quantityOfCommentsShown; startingQuantityOfComments++) {
    commentsGroup.appendChild(createNewComment(comments[startingQuantityOfComments]));
  }
};

const fillPreviewByInfo = (picture) => {
  preview.querySelector(`.big-picture__img img`).src = picture.url;
  preview.querySelector(`.likes-count`).textContent = picture.likes;
  preview.querySelector(`.comments-count`).textContent = picture.comments.length;
  preview.querySelector(`.social__caption`).textContent = picture.description;
};

const onCommentLoaderButtonClick = () => {
  addCommentsToParent(currentOpenedPicture.comments);
};

const addListeners = () => {
  closeButton.addEventListener(`click`, hideModal);
  document.addEventListener(`keydown`, onEscKeydown);
  commentLoaderButton.addEventListener(`click`, onCommentLoaderButtonClick);
};

const removeListeners = () => {
  closeButton.removeEventListener(`click`, hideModal);
  document.removeEventListener(`keydown`, onEscKeydown);
  commentLoaderButton.removeEventListener(`click`, onCommentLoaderButtonClick);
};

const showModal = () => {
  preview.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
};

const hideModal = () => {
  preview.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
};

const openModal = (picture) => {
  showModal();
  showCounterAndCommentLoader();
  window.util.cleanContent(commentsGroup);
  fillPreviewByInfo(picture);
  addCommentsToParent(picture.comments);
  addListeners();
}

const closeModal = () => {
  hideModal()
  removeListeners();
}

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  const isPreviewShow = preview.classList.contains(`hidden`);
  if (isEscape && !isPreviewShow) {
    evt.preventDefault();
    closeModal();
  }
};

const show = (picture) => {
  currentOpenedPicture = picture;
  quantityOfCommentsShown = 0;
  openModal(picture);
};

window.preview = {
  show,
};

