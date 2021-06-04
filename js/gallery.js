'use strict';

(() => {
  const QUANTITY_OF_RANDOM_PHOTOS = 10;

  const pictures = document.querySelector(`.pictures`);
  const defaultFilterButton = document.querySelector(`#filter-default`);
  const randomFilterButton = document.querySelector(`#filter-random`);
  const discussedFilterButton = document.querySelector(`#filter-discussed`);
  const imgFilters = document.querySelector(`.img-filters`);
  const filtersButton = document.querySelectorAll(`.img-filters__button`);

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
    const isButtonActive = button.classList.contains(`img-filters__button--active`);
    if (!isButtonActive) {
      switchActiveButton(button);
      window.util.debounce(button);
    }
  };

  const applyDefaultFilters = () => showPhotos(defaultFilterButton);
  const applyRandomFilters = () => showPhotos(randomFilterButton);
  const applyDiscussedFilters = () => showPhotos(discussedFilterButton);

  const onPicturesClick = (evt) => {
    const picture = evt.target.closest(`.picture`);
    if (picture) {
      const id = picture.dataset.id;
      window.preview.render(defaultPhotos[id]);
    }
  };

  const addListeners = () => {
    defaultFilterButton.addEventListener(`click`, applyDefaultFilters);
    randomFilterButton.addEventListener(`click`, applyRandomFilters);
    discussedFilterButton.addEventListener(`click`, applyDiscussedFilters);
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
  };

  window.gallery = {
    activate,
    render,
    removePictures,
  };
})();
