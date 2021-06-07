'use strict';

const QUANTITY_OF_RANDOM_PICTURES = 10;

const pictures = document.querySelector(`.pictures`);
const FilterButtonsGroup = document.querySelector(`.img-filters`);
const filterButtons = FilterButtonsGroup.querySelectorAll(`.img-filters__button`);
const defaultFilterButton = FilterButtonsGroup.querySelector(`#filter-default`);
const randomFilterButton = FilterButtonsGroup.querySelector(`#filter-random`);
const discussedFilterButton = FilterButtonsGroup.querySelector(`#filter-discussed`);

let defaultPictures;

const addId = () => {
  for (let i = 0; i < defaultPictures.length; i++) {
    const pictureToRender = defaultPictures[i];
    pictureToRender.id = i;
  }
};

const appendDefaultPicturesToFragment = (fragment) => {
  for (let i = 0; i < defaultPictures.length; i++) {
    const picture = window.picture.create(defaultPictures[i]);
    fragment.appendChild(picture);
  }
};

const appendRandomPicturesToFragment = (fragment) => {
  let shownPictures = [];
  while (shownPictures.length < QUANTITY_OF_RANDOM_PICTURES) {
    const randomNumber = window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, defaultPictures.length);
    let randomPicture = defaultPictures[randomNumber];
    if (!shownPictures.includes(randomPicture)) {
      shownPictures.push(randomPicture);
      const picture = window.picture.create(randomPicture);
      fragment.appendChild(picture);
    }
  }
};

const appendDiscussedPicturesToFragment = (fragment) => {
  let copiedPicture = [...defaultPictures];
  for (let i = 0; i < copiedPicture.length; i++) {
    copiedPicture.sort((o1, o2) => o2.comments.length - o1.comments.length);
    const picture = window.picture.create(copiedPicture[i]);
    fragment.appendChild(picture);
  }
};

const render = (clickedButton) => {
  const fragment = document.createDocumentFragment();
  switch (clickedButton) {
    case randomFilterButton:
      appendRandomPicturesToFragment(fragment);
      break;
    case discussedFilterButton:
      appendDiscussedPicturesToFragment(fragment);
      break;
    default:
      appendDefaultPicturesToFragment(fragment);
      break;
  }
  pictures.appendChild(fragment);
};

const removePictures = () => {
  pictures.querySelectorAll(`.picture`).forEach((element) => element.remove());
};

const switchActiveButton = (button) => {
  filterButtons.forEach((b) => b.classList.remove(`img-filters__button--active`));
  button.classList.add(`img-filters__button--active`);
};

const showPictures = (button) => {
  const isButtonActive = button.classList.contains(`img-filters__button--active`);
  if (!isButtonActive) {
    switchActiveButton(button);
    window.util.debounce(button);
  }
};

const applyDefaultFilters = () => showPictures(defaultFilterButton);
const applyRandomFilters = () => showPictures(randomFilterButton);
const applyDiscussedFilters = () => showPictures(discussedFilterButton);

const onPictureClick = (evt) => {
  const picture = evt.target.closest(`.picture`);
  if (picture) {
    const id = picture.dataset.id;
    window.bigPicture.show(defaultPictures[id]);
  }
};

const addListeners = () => {
  defaultFilterButton.addEventListener(`click`, applyDefaultFilters);
  randomFilterButton.addEventListener(`click`, applyRandomFilters);
  discussedFilterButton.addEventListener(`click`, applyDiscussedFilters);
  pictures.addEventListener(`click`, onPictureClick);
};

const showFilters = () => {
  FilterButtonsGroup.classList.remove(`img-filters--inactive`);
};

const activate = (newPictures) => {
  defaultPictures = newPictures;
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
