'use strict';

(() => {
  const body = document.querySelector(`body`);
  const preview = document.querySelector(`.big-picture`);
  const cancelButton = preview.querySelector(`#picture-cancel`);
  const commentCounter = document.querySelector(`.social__comment-count`);
  const commentLoader = document.querySelector(`.comments-loader`);
  const pictures = document.querySelector(`.pictures`);
  let photos;

  const render = (newPhotos) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < newPhotos.length; i++) {
      const newPhoto = window.picture.render(newPhotos[i]);
      photos = newPhotos;
      fragment.appendChild(newPhoto);
    }
    pictures.appendChild(fragment);
  };

  const showModal = () => {
    preview.classList.remove(`hidden`);
    commentCounter.classList.add(`hidden`);
    commentLoader.classList.add(`hidden`);
    body.classList.add(`modal-open`);
  };

  const hideModal = () => {
    preview.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  };

  const addListeners = () => {
    pictures.addEventListener(`click`, (evt) => {
      const picture = evt.target.closest(`.picture`);
      if (picture) {
        const id = picture.dataset.id;
        showModal();
        window.preview.render(photos[id]);
      }
    });

    cancelButton.addEventListener(`click`, hideModal);

    const onEscKey = (evt) => {
      const isEscape = evt.key === `Escape`;
      const isBigPhotoHidden = !preview.classList.contains(`hidden`);
      if (isEscape && isBigPhotoHidden) {
        evt.preventDefault();
        hideModal();
      }
    };

    document.addEventListener(`keydown`, onEscKey);
  };

  const activate = (photosNew) => {
    addListeners();
    render(photosNew);
  };

  window.gallery = {
    activate,
  };
})();
