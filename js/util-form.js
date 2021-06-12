'use strict';

const main = document.querySelector(`main`);
const successModalTemplate = document.querySelector(`#success`).content;
const errorModalTemplate = document.querySelector(`#error`).content;

const renderSuccessModal = () => {
  const modalSuccess = successModalTemplate.cloneNode(true);
  main.appendChild(modalSuccess);
  return modalSuccess;
};

const onSuccessButtonClick = (evt) => {
  evt.preventDefault();
  document.querySelector(`.success`).remove();
};

const renderErrorModal = () => {
  const modalError = errorModalTemplate.cloneNode(true);
  main.appendChild(modalError);
  return modalError;
};

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  document.querySelector(`.error`).remove();
};

const onEscapeKeydown = (evt) => {
  const success = main.querySelector(`.success`);
  const error = main.querySelector(`.error`);
  if (evt.key === `Escape` && success) {
    onSuccessButtonClick(evt);
  } else if (evt.key === `Escape` && error) {
    onErrorButtonClick(evt);
  }
};

const onDocumentClick = (evt) => {
  const success = main.querySelector(`.success`);
  const error = main.querySelector(`.error`);
  if (evt.target === success) {
    onSuccessButtonClick(evt);
  } else if (evt.target === error) {
    onErrorButtonClick(evt);
  }
};

const addListenersOnSuccess = () => {
  const successButton = main.querySelector(`.success__button`);
  successButton.addEventListener(`click`, onSuccessButtonClick);
  document.addEventListener(`click`, onDocumentClick);
  document.addEventListener(`keydown`, onEscapeKeydown);
};

const addListenersOnError = () => {
  const errorButton = main.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`click`, onDocumentClick);
  document.addEventListener(`keydown`, onEscapeKeydown);
};

const showSuccessModal = () => {
  renderSuccessModal();
  addListenersOnSuccess();
};

const showErrorModal = () => {
  renderErrorModal();
  addListenersOnError();
};

window.utilForm = {
  showSuccessModal,
  showErrorModal,
};
