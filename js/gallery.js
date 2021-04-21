'use strict';

(() => {
  const body = document.querySelector(`body`);
  const preview = document.querySelector(`.big-picture`);
  const closeButton = preview.querySelector(`#picture-cancel`);
  const commentCounter = document.querySelector(`.social__comment-count`);
  const commentLoader = document.querySelector(`.comments-loader`);
  const pictures = document.querySelector(`.pictures`);
  let photos;

  const render = (photosNew) => {
    const fragment = document.createDocumentFragment();
    for (let photoNew of photosNew) {
      const newPhoto = window.picture.render(photoNew);
      photos = photosNew;
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
        window.preview.render(photos[id]);
        showModal();
      }
    });

    closeButton.addEventListener(`click`, hideModal);

    const onEscKeydown = (evt) => {
      const isEscape = evt.key === `Escape`;
      const isPreviewShow = preview.classList.contains(`hidden`);
      if (isEscape && !isPreviewShow) {
        evt.preventDefault();
        hideModal();
      }
    };

    document.addEventListener(`keydown`, onEscKeydown);
  };

  const activate = (photosNew) => {
    addListeners();
    render(photosNew);
  };

  window.gallery = {
    activate,
  };
})();
