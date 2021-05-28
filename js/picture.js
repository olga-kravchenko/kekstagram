'use strict';

(() => {
  const pictureTemplate = document.querySelector(`#picture`).content;

  const create = (photo) => {
    const newPhoto = pictureTemplate.cloneNode(true);
    newPhoto.querySelector(`.picture`).dataset.id = photo.id;
    newPhoto.querySelector(`.picture__img`).src = photo.url;
    newPhoto.querySelector(`.picture__likes`).textContent = photo.likes;
    newPhoto.querySelector(`.picture__comments`).textContent = photo.comments.length;
    return newPhoto;
  };

  window.picture = {
    create,
  };
})();
