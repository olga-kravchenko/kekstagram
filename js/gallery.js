'use strict';

(() => {
  const body = document.querySelector(`body`);
  const pictures = body.querySelector(`.pictures`);
  const preview = body.querySelector(`.big-picture`);
  const closeButton = preview.querySelector(`#picture-cancel`);
  const commentCounter = preview.querySelector(`.social__comment-count`);
  const commentLoader = preview.querySelector(`.comments-loader`);
  let photos;

  const addId = (photosToRender) => {
    for (let i = 0; i < photosToRender.length; i++) {
      const photoToRender = photosToRender[i];
      photoToRender.id = i;
    }
  };

  const render = (photosToRender) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < photosToRender.length; i++) {
      let photoToRender = photosToRender[i];
      const newPhoto = window.picture.render(photoToRender);
      photos = photosToRender;
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

  const onPicturesClick = (evt) => {
    const picture = evt.target.closest(`.picture`);
    if (picture) {
      const id = picture.dataset.id;
      window.preview.render(photos[id]);
      showModal();
    }
  };

  const onEscKeydown = (evt) => {
    const isEscape = evt.key === `Escape`;
    const isPreviewShow = preview.classList.contains(`hidden`);
    if (isEscape && !isPreviewShow) {
      evt.preventDefault();
      hideModal();
    }
  };

  const addListeners = () => {
    pictures.addEventListener(`click`, onPicturesClick);
    closeButton.addEventListener(`click`, hideModal);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const activate = (photosNew) => {
    addId(photosNew);
    render(photosNew);
    addListeners();
  };

  window.gallery = {
    activate,
  };
})();
