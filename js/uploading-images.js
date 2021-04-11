'use strict';

const body = document.querySelector(`body`);
const buttonUploadFile = body.querySelector(`#upload-file`);
const modal = body.querySelector(`.img-upload__overlay`);

const buttonClose = modal.querySelector(`.img-upload__cancel`);
const effectLevel = modal.querySelector(`.effect-level`);
const inputHashTag = modal.querySelector(`.text__hashtags`);

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
  modal.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  effectLevel.classList.add(`hidden`);
};

const hideModal = () => {
  modal.classList.add(`hidden`);
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
