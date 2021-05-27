'use strict';

(() => {
  const body = document.querySelector(`body`);
  const pictures = body.querySelector(`.pictures`);
  const preview = body.querySelector(`.big-picture`);
  const closeButton = preview.querySelector(`#picture-cancel`);
  const commentCounter = preview.querySelector(`.social__comment-count`);
  const commentLoader = preview.querySelector(`.comments-loader`);
  const filterDefault = document.querySelector(`#filter-default`);
  const filterRandom = document.querySelector(`#filter-random`);
  const filterDiscussed = document.querySelector(`#filter-discussed`);
  const imgFilters = document.querySelector(`.img-filters`);
  let photos;
  let uploadedPhotos = [];

  const showFilters = () => {
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const addId = (photosToRender) => {
    for (let i = 0; i < photosToRender.length; i++) {
      const photoToRender = photosToRender[i];
      photoToRender.id = i;
    }
  };

  const renderDefaultPhotos = (photosToRender, fragment) => {
    for (let i = 0; i < photosToRender.length; i++) {
      let photoToRender = photosToRender[i];
      const newPhoto = window.picture.render(photoToRender);
      photos = photosToRender;
      fragment.appendChild(newPhoto);
    }
  };

  const renderRandomPhotos = (photosToRender, fragment) => {
    let photoShown = [];
    while (photoShown.length < 10) {
      const randomNumber = window.util.getRandomNumber(0, photosToRender.length);
      let photoToRender = photosToRender[randomNumber];
      if (!photoShown.includes(photoToRender)) {
        photoShown.push(photoToRender);
        const newPhoto = window.picture.render(photoToRender);
        photos = photosToRender;
        fragment.appendChild(newPhoto);
      }
    }
  };

  const renderDiscussedPhotos = (photosToRender, fragment) => {
    let newPhotosToRender = [...photosToRender];
    for (let i = 0; i < newPhotosToRender.length; i++) {
      newPhotosToRender.sort((o1, o2) => o2.comments.length - o1.comments.length);
      let photoToRender = newPhotosToRender[i];
      const newPhoto = window.picture.render(photoToRender);
      photos = photosToRender;
      fragment.appendChild(newPhoto);
    }
  };

  const render = (photosToRender, button) => {
    const fragment = document.createDocumentFragment();
    if (button === filterRandom) {
      renderRandomPhotos(photosToRender, fragment);
    } else if (button === filterDefault) {
      renderDefaultPhotos(photosToRender, fragment);
    } else if (button === filterDiscussed) {
      renderDiscussedPhotos(photosToRender, fragment);
    } else {
      renderDefaultPhotos(photosToRender, fragment);
    }
    pictures.appendChild(fragment);
  };

  const removePictures = () => {
    document.querySelectorAll(`.picture`).forEach((element) => element.remove());
  };

  const applyFilterDefault = () => {
    removePictures();
    filterDefault.classList.add(`img-filters__button--active`);
    filterRandom.classList.remove(`img-filters__button--active`);
    filterDiscussed.classList.remove(`img-filters__button--active`);
    window.util.debounce(filterDefault);
  };

  const applyFilterRandom = () => {
    removePictures();
    filterRandom.classList.add(`img-filters__button--active`);
    filterDefault.classList.remove(`img-filters__button--active`);
    filterDiscussed.classList.remove(`img-filters__button--active`);
    window.util.debounce(filterRandom);
  };

  const applyFilterDiscussed = () => {
    removePictures();
    filterDiscussed.classList.add(`img-filters__button--active`);
    filterDefault.classList.remove(`img-filters__button--active`);
    filterRandom.classList.remove(`img-filters__button--active`);
    window.util.debounce(filterDiscussed);
  };

  filterDefault.addEventListener(`click`, applyFilterDefault);
  filterRandom.addEventListener(`click`, applyFilterRandom);
  filterDiscussed.addEventListener(`click`, applyFilterDiscussed);

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

  const updatePhotos = (button) => {
    render(uploadedPhotos, button);
  };

  const renderUpdatePhotos = (data) => {
    uploadedPhotos = data;
    updatePhotos();
  };

  const activate = (photosNew) => {
    addId(photosNew);
    renderUpdatePhotos(photosNew);
    addListeners();
    showFilters();
  };

  window.gallery = {
    activate,
    updatePhotos,
  };
})();
