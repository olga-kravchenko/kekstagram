'use strict';

const buttonUploadFile = document.querySelector(`#upload-file`);
const modalOfUploadedImage = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const buttonClose = document.querySelector(`.img-upload__cancel`);
const effectLevel = document.querySelector(`.effect-level`);

const onEscKeydown = function (evt) {
  if (evt.key === `Escape`) {
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


