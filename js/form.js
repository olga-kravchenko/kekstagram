'use strict';

(() => {
  const body = document.querySelector(`body`);
  const form = body.querySelector(`#upload-select-image`);
  const uploadButton = body.querySelector(`#upload-file`);
  const modal = body.querySelector(`.img-upload__overlay`);
  const closeButton = modal.querySelector(`#upload-cancel`);
  const effectLevel = modal.querySelector(`.effect-level`);
  const hashTagInput = modal.querySelector(`.text__hashtags`);
  const commentInput = modal.querySelector(`.text__description`);

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

  const onUploadButtonChange = (evt) => {
    evt.preventDefault();
    openModal();
  };

  const showModal = () => {
    modal.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    effectLevel.classList.add(`hidden`);
  };

  const hideModal = () => {
    modal.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    window.filters.reset();
    window.zoom.reset();
    form.reset();
  };

  const openModal = () => {
    addCallBacksToCloseModal();
    showModal();
  };

  const closeModal = () => {
    removeCallBacksToCloseModal();
    hideModal();
  };

  const addCallBacksToCloseModal = () => {
    document.addEventListener(`keydown`, onEscKeydown);
    closeButton.addEventListener(`click`, onCloseButtonClick);
  };

  const removeCallBacksToCloseModal = () => {
    document.removeEventListener(`keydown`, onEscKeydown);
    closeButton.removeEventListener(`click`, onCloseButtonClick);
  };

  const addListenersToUpload = () => {
    uploadButton.addEventListener(`change`, onUploadButtonChange);
  };

  const activate = () => {
    window.filters.addListeners();
    window.zoom.addListeners();
    window.hashtag.addListeners();
    addListenersToUpload();
  };

  window.form = {
    activate,
  };
})();
