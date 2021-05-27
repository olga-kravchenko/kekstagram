'use strict';

(() => {
  let lastTimeout;

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const createNewElement = (tagName, className, text) => {
    const newElement = document.createElement(tagName);
    newElement.classList.add(className);
    if (text) {
      newElement.textContent = text;
    }
    return newElement;
  };

  const cleanContent = (cleaningPlace) => {
    cleaningPlace.innerHTML = window.constants.EMPTY_STRING;
  };

  const showErrorMessage = (errorMessage) => {
    const errorModal = document.createElement(`div`);
    errorModal.classList.add(`modal-error`);
    errorModal.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorModal);

    setTimeout(() => {
      errorModal.remove();
    }, 3000);
  };

  const debounce = (parameter) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      window.gallery.updatePhotos(parameter);
    }, 500);
  };

  window.util = {
    debounce,
    getRandomNumber,
    createNewElement,
    cleanContent,
    showErrorMessage,
  };
})();
