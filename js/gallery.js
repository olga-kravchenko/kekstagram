'use strict';

(() => {
  const body = document.querySelector(`body`);
  const pictures = body.querySelector(`.pictures`);
  const preview = body.querySelector(`.big-picture`);
  const closeButton = preview.querySelector(`#picture-cancel`);
  const commentCounter = preview.querySelector(`.social__comment-count`);
  const commentLoader = preview.querySelector(`.comments-loader`);

  const defaultFilterButton = document.querySelector(`#filter-default`);
  const randomFilterButton = document.querySelector(`#filter-random`);
  const discussedFilterButton = document.querySelector(`#filter-discussed`);
  const imgFilters = document.querySelector(`.img-filters`);

  let defaultPhotos;

  const addId = () => {
    for (let i = 0; i < defaultPhotos.length; i++) {
      const photoToRender = defaultPhotos[i];
      photoToRender.id = i;
    }
  };

  const appendDefaultPhotosToFragment = (fragment) => {
    for (let i = 0; i < defaultPhotos.length; i++) {
      const photo = window.picture.create(defaultPhotos[i]);
      fragment.appendChild(photo);
    }
  };

  const appendRandomPhotosToFragment = (fragment) => {
    let shownPhotos = [];
    while (shownPhotos.length < 10) {
      const randomNumber = window.util.getRandomNumber(0, defaultPhotos.length);
      let randomPhoto = defaultPhotos[randomNumber];
      if (!shownPhotos.includes(randomPhoto)) {
        shownPhotos.push(randomPhoto);
        const photo = window.picture.create(randomPhoto);
        fragment.appendChild(photo);
      }
    }
  };

  const appendDiscussedPhotosToFragment = (fragment) => {
    let copiedPhotos = [...defaultPhotos];
    for (let i = 0; i < copiedPhotos.length; i++) {
      copiedPhotos.sort((o1, o2) => o2.comments.length - o1.comments.length);
      const photo = window.picture.create(copiedPhotos[i]);
      fragment.appendChild(photo);
    }
  };

  const render = (clickedButton) => {
    const fragment = document.createDocumentFragment();
    if (clickedButton === randomFilterButton) {
      appendRandomPhotosToFragment(fragment);
    } else if (clickedButton === discussedFilterButton) {
      appendDiscussedPhotosToFragment(fragment);
    } else {
      appendDefaultPhotosToFragment(fragment);
    }
    pictures.appendChild(fragment);
  };

  const removePictures = () => {
    document.querySelectorAll(`.picture`).forEach((element) => element.remove());
  };

  const filtersButton = document.querySelectorAll(`.img-filters__button`);

  const addActiveButton = (button) => {
    filtersButton.forEach((b) => b.classList.remove(`img-filters__button--active`));
    button.classList.add(`img-filters__button--active`);
  };

  const checkButton = (button) => {
    if (!button.classList.contains(`img-filters__button--active`)) {
      addActiveButton(button);
      window.util.debounce(button);
    }
  };

  const applyFilterDefault = () => checkButton(defaultFilterButton);
  const applyFilterRandom = () => checkButton(randomFilterButton);
  const applyFilterDiscussed = () => checkButton(discussedFilterButton);

  const showModal = () => {
    preview.classList.remove(`hidden`);
    // commentCounter.classList.add(`hidden`);
    // commentLoader.classList.add(`hidden`);
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
      window.preview.render(defaultPhotos[id]);
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
    defaultFilterButton.addEventListener(`click`, applyFilterDefault);
    randomFilterButton.addEventListener(`click`, applyFilterRandom);
    discussedFilterButton.addEventListener(`click`, applyFilterDiscussed);
    pictures.addEventListener(`click`, onPicturesClick);
    closeButton.addEventListener(`click`, hideModal);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const showFilters = () => {
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const activate = (photosNew) => {
    defaultPhotos = photosNew;
    addId();
    render();
    addListeners();
    showFilters();
  };

  window.gallery = {
    activate,
    render,
    removePictures,
  };
})();
