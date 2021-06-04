'use strict';

(() => {
  const pictureTemplate = document.querySelector(`#picture`).content;

  const create = (picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector(`.picture`).dataset.id = picture.id;
    newPicture.querySelector(`.picture__img`).src = picture.url;
    newPicture.querySelector(`.picture__likes`).textContent = picture.likes;
    newPicture.querySelector(`.picture__comments`).textContent = picture.comments.length;
    return newPicture;
  };

  window.picture = {
    create,
  };
})();
