'use strict';

const body = document.querySelector(`body`);
const fileUploadButton = body.querySelector(`#upload-file`);
const modalOfUploadedImage = body.querySelector(`.img-upload__overlay`);

const closeButton = modalOfUploadedImage.querySelector(`.img-upload__cancel`);
const effectLevel = modalOfUploadedImage.querySelector(`.effect-level`);
const inputHashTag = modalOfUploadedImage.querySelector(`.text__hashtags`);

const onEscKeydown = (evt) => {
  if (evt.key === `Escape` && inputHashTag !== document.activeElement) {
    evt.preventDefault();
    closeModal();
  }
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const showModal = () => {
  modalOfUploadedImage.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
};

const hideModal = () => {
  modalOfUploadedImage.classList.add(`hidden`);
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
  showModal();
  addCallBacksToCloseModal();
};

const closeModal = () => {
  hideModal();
  removeCallBacksToCloseModal();
};

fileUploadButton.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openModal();
});
