'use strict';

const body = document.querySelector(`body`);
const fileUploadButton = body.querySelector(`#upload-file`);
const uploadModal = body.querySelector(`.img-upload__overlay`);

const closeButton = uploadModal.querySelector(`#upload-cancel`);
const effectLevel = uploadModal.querySelector(`.effect-level`);
const hashTagInput = uploadModal.querySelector(`.text__hashtags`);
const commentInput = uploadModal.querySelector(`.text__description`);

const onEscKeydown = (evt) => {
  const isEscape = evt.key === `Escape`;
  const isHashtagOutOfFocus = hashTagInput !== document.activeElement;
  const isCommentOutOfFocus = commentInput !== document.activeElement;

  if (isEscape && isHashtagOutOfFocus && isCommentOutOfFocus) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const showUploadModal = () => {
  uploadModal.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
};

const hideUploadModal = () => {
  uploadModal.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  fileUploadButton.value = ``;
};

const addCallBacksToCloseModal = () => {
  document.addEventListener(`keydown`, onEscKeydown);
  closeButton.addEventListener(`click`, onCloseButtonClick);
};

const removeCallBacksToCloseModal = () => {
  document.removeEventListener(`keydown`, onEscKeydown);
  closeButton.removeEventListener(`click`, onCloseButtonClick);
};

const openModal = () => {
  showUploadModal();
  addCallBacksToCloseModal();
};

const closeModal = () => {
  hideUploadModal();
  removeCallBacksToCloseModal();
};

fileUploadButton.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openModal();
});
