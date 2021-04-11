'use strict';

const body = document.querySelector(`body`);
const buttonUploadFile = body.querySelector(`#upload-file`);
const modalOfUploadedImage = body.querySelector(`.img-upload__overlay`);

const buttonClose = modalOfUploadedImage.querySelector(`.img-upload__cancel`);
const effectLevel = modalOfUploadedImage.querySelector(`.effect-level`);
const inputHashTag = modalOfUploadedImage.querySelector(`.text__hashtags`);

const onEscKeydown = function (evt) {
  if (evt.key === `Escape` && inputHashTag !== document.activeElement) {
    evt.preventDefault();
    closeModal();
  }
};

const onButtonCloseClick = (evt) => {
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
  buttonUploadFile.value = ``;
};

const addCallBacksToCloseModal = () => {
  document.addEventListener(`keydown`, onEscKeydown);
  buttonClose.addEventListener(`click`, onButtonCloseClick);
};

const removeCallBacksToCloseModal = () => {
  document.removeEventListener(`keydown`, onEscKeydown);
  buttonClose.removeEventListener(`click`, onButtonCloseClick);
};

const openModal = () => {
  showModal();
  addCallBacksToCloseModal();
};

const closeModal = () => {
  hideModal();
  removeCallBacksToCloseModal();
};

buttonUploadFile.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openModal();
});
