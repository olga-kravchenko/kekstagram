'use strict';

const uploadFile = document.querySelector(`#upload-file`);
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
const buttonCancel = document.querySelector(`.img-upload__cancel`);

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeUploadImage();
  }
};

const openUploadImage = () => {
  uploadOverlay.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closeUploadImage = () => {
  uploadOverlay.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  uploadFile.value = ``;
};

uploadFile.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openUploadImage();
});

buttonCancel.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  closeUploadImage();
});
