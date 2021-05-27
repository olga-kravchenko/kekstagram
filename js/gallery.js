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
  let photos;
  let newArrPhotos = [];

  const addId = (photosToRender) => {
    for (let i = 0; i < photosToRender.length; i++) {
      const photoToRender = photosToRender[i];
      photoToRender.id = i;
    }
  };

  const renderPhotos = (photosToRender, fragment) => {
    for (let i = 0; i < photosToRender.length; i++) {
      let photoToRender = photosToRender[i];
      const newPhoto = window.picture.render(photoToRender);
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
        fragment.appendChild(newPhoto);
      }
    }
  };

  const renderSortPhotos = (photosToRender, fragment) => {
    let photoSortShown = [...photosToRender];
    for (let i = 0; i < photoSortShown.length; i++) {
      photoSortShown.sort((o1, o2) => o2.comments.length - o1.comments.length);
      let photoToRender = photoSortShown[i];
      const newPhoto = window.picture.render(photoToRender);
      fragment.appendChild(newPhoto);
    }
  };

  const render = (photosToRender, bottom) => {
    const fragment = document.createDocumentFragment();
    if (bottom === filterRandom) {
      renderRandomPhotos(photosToRender, fragment);
    } else if (bottom === filterDefault) {
      renderPhotos(photosToRender, fragment);
    } else if (bottom === filterDiscussed) {
      renderSortPhotos(photosToRender, fragment);
    } else {
      renderPhotos(photosToRender, fragment);
    }
    pictures.appendChild(fragment);
  };

  const updatePhotos = (bottom) => {
    render(newArrPhotos, bottom);
  };

  const renderUpdatePhotos = (data) => {
    newArrPhotos = data;
    window.myCoolPhotos = data;
    updatePhotos();
  };

  const removePictures = () => {
    document.querySelectorAll(`.picture`).forEach((e)=>e.remove());
  };

  filterDefault.addEventListener(`click`, () => {
    removePictures();
    filterDefault.classList.add(`img-filters__button--active`);
    filterRandom.classList.remove(`img-filters__button--active`);
    filterDiscussed.classList.remove(`img-filters__button--active`);
    updatePhotos(filterDefault);
  });

  filterRandom.addEventListener(`click`, () => {
    removePictures();
    filterRandom.classList.add(`img-filters__button--active`);
    filterDefault.classList.remove(`img-filters__button--active`);
    filterDiscussed.classList.remove(`img-filters__button--active`);
    updatePhotos(filterRandom);
  });

  filterDiscussed.addEventListener(`click`, () => {
    removePictures();
    filterDiscussed.classList.add(`img-filters__button--active`);
    filterDefault.classList.remove(`img-filters__button--active`);
    filterRandom.classList.remove(`img-filters__button--active`);
    updatePhotos(filterDiscussed);
  });

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

  const imgFilters = document.querySelector(`.img-filters`);
  const showFilters = () => {
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const activate = (photosNew) => {
    addId(photosNew);
    renderUpdatePhotos(photosNew);
    addListeners();
    showFilters();
  };

  window.gallery = {
    activate,
  };
})();
