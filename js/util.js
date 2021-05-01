'use strict';

(() => {
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

  const showErrorModal = (errorMessage) => {
    const errorModal = document.createElement(`div`);
    errorModal.classList.add(`modal-error`);
    errorModal.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorModal);

    setTimeout(() => {
      errorModal.remove();
    }, 3000);
  };

  window.util = {
    getRandomNumber,
    createNewElement,
    cleanContent,
    showErrorModal,
  };
})();
