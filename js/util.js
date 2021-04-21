'use strict';

(() => {
  const EMPTY_STRING = ``;

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
    cleaningPlace.innerHTML = EMPTY_STRING;
  };

  window.util = {
    getRandomNumber,
    createNewElement,
    cleanContent,
  };
})();
