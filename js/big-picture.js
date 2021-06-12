'use strict';

const STEP_QUANTITY_OF_COMMENTS_SHOWN = 5;

const body = document.querySelector(`body`);
const bigPicture = body.querySelector(`.big-picture`);
const closeButton = bigPicture.querySelector(`#picture-cancel`);
const commentCounter = bigPicture.querySelector(`.social__comment-count`);
const commentsGroup = bigPicture.querySelector(`.social__comments`);
const commentLoaderButton = bigPicture.querySelector(`.comments-loader`);
const counterOfShownComments = commentCounter.querySelector(`#comments-counter`);

let quantityOfCommentsShown = 0;
let currentOpenedPicture;

const showCounterAndCommentLoaderButton = () => {
  commentCounter.classList.remove(`hidden`);
  commentLoaderButton.classList.remove(`hidden`);
};

const createNewComment = (comment) => {
  const newComment = window.util.createNewElement(`li`, `social__comment`);
  const avatar = window.util.createNewElement(`img`, `social__picture`);
  const message = window.util.createNewElement(`p`, `social__text`, comment.message);
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  newComment.appendChild(avatar);
  newComment.appendChild(message);
  return newComment;
};

const hideCommentLoader = () => commentLoaderButton.classList.add(`hidden`);

const showCommentCounter = () => {
  counterOfShownComments.textContent = quantityOfCommentsShown;
};

const addCommentsToParent = (comments) => {
  let startingQuantityOfComments = quantityOfCommentsShown;
  if (quantityOfCommentsShown + STEP_QUANTITY_OF_COMMENTS_SHOWN < comments.length) {
    quantityOfCommentsShown += STEP_QUANTITY_OF_COMMENTS_SHOWN;
  } else {
    quantityOfCommentsShown = comments.length;
    hideCommentLoader();
  }
  showCommentCounter();
  for (; startingQuantityOfComments < quantityOfCommentsShown; startingQuantityOfComments++) {
    commentsGroup.appendChild(createNewComment(comments[startingQuantityOfComments]));
  }
};

const fillBigPictureByInfo = (picture) => {
  bigPicture.querySelector(`.big-picture__img img`).src = picture.url;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
};

const onCommentLoaderButtonClick = () => addCommentsToParent(currentOpenedPicture.comments);

const showModal = () => {
  bigPicture.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
};

const hideModal = () => {
  bigPicture.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
};

const openModal = (picture) => {
  showModal();
  showCounterAndCommentLoaderButton();
  window.util.cleanContent(commentsGroup);
  fillBigPictureByInfo(picture);
  addCommentsToParent(picture.comments);
  addListeners();
};

const closeModal = () => {
  hideModal();
  removeListeners();
};

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  const isBigPictureShow = bigPicture.classList.contains(`hidden`);
  if (isEscape && !isBigPictureShow) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = () => {
  closeModal();
}

const addListeners = () => {
  closeButton.addEventListener(`click`, onCloseButtonClick);
  document.addEventListener(`keydown`, onEscKeydown);
  commentLoaderButton.addEventListener(`click`, onCommentLoaderButtonClick);
};

const removeListeners = () => {
  closeButton.removeEventListener(`click`, onCloseButtonClick);
  document.removeEventListener(`keydown`, onEscKeydown);
  commentLoaderButton.removeEventListener(`click`, onCommentLoaderButtonClick);
};

const show = (picture) => {
  currentOpenedPicture = picture;
  quantityOfCommentsShown = 0;
  openModal(picture);
};

window.bigPicture = {
  show,
};
