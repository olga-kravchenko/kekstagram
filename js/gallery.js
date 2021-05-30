'use strict';

(() => {
  const QUANTITY_OF_RANDOM_PHOTOS = 10;

  const body = document.querySelector(`body`);
  const pictures = body.querySelector(`.pictures`);
  const preview = body.querySelector(`.big-picture`);
  const closeButton = preview.querySelector(`#picture-cancel`);
  const defaultFilterButton = document.querySelector(`#filter-default`);
  const randomFilterButton = document.querySelector(`#filter-random`);
  const discussedFilterButton = document.querySelector(`#filter-discussed`);
  const imgFilters = document.querySelector(`.img-filters`);
  const filtersButton = body.querySelectorAll(`.img-filters__button`);

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
    while (shownPhotos.length < QUANTITY_OF_RANDOM_PHOTOS) {
      const randomNumber = window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, defaultPhotos.length);
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
    switch (clickedButton) {
      case randomFilterButton:
        appendRandomPhotosToFragment(fragment);
        break;
      case discussedFilterButton:
        appendDiscussedPhotosToFragment(fragment);
        break;
      default:
        appendDefaultPhotosToFragment(fragment);
        break;
    }
    pictures.appendChild(fragment);
  };

  const removePictures = () => {
    pictures.querySelectorAll(`.picture`).forEach((element) => element.remove());
  };

  const switchActiveButton = (button) => {
    filtersButton.forEach((b) => b.classList.remove(`img-filters__button--active`));
    button.classList.add(`img-filters__button--active`);
  };

  const showPhotos = (button) => {
    const buttonActive = button.classList.contains(`img-filters__button--active`);
    if (!buttonActive) {
      switchActiveButton(button);
      window.util.debounce(button);
    }
  };

  const applyFilterDefault = () => showPhotos(defaultFilterButton);
  const applyFilterRandom = () => showPhotos(randomFilterButton);
  const applyFilterDiscussed = () => showPhotos(discussedFilterButton);

  const showModal = () => {
    preview.classList.remove(`hidden`);
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
      addListenersToShow();
    }
  };

  const onEscKeydown = (evt) => {
    const isEscape = evt.key === `Escape`;
    const isPreviewShow = preview.classList.contains(`hidden`);
    if (isEscape && !isPreviewShow) {
      evt.preventDefault();
      hideModal();
      removeListenersToHide();
    }
  };

  const addListenersToShow = () => {
    closeButton.addEventListener(`click`, hideModal);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const removeListenersToHide = () => {
    closeButton.removeEventListener(`click`, hideModal);
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const addListeners = () => {
    defaultFilterButton.addEventListener(`click`, applyFilterDefault);
    randomFilterButton.addEventListener(`click`, applyFilterRandom);
    discussedFilterButton.addEventListener(`click`, applyFilterDiscussed);
    pictures.addEventListener(`click`, onPicturesClick);
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
    addListeners();
  };

  window.gallery = {
    activate,
    render,
    removePictures,
  };
})();
