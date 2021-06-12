'use strict';

const QUANTITY_OF_RANDOM_PICTURES = 10;
const FILTER_SWITCHING_TIME = 500;

const pictures = document.querySelector(`.pictures`);
const FilterButtonsGroup = document.querySelector(`.img-filters`);
const filterButtons = FilterButtonsGroup.querySelectorAll(`.img-filters__button`);
const defaultFilterButton = FilterButtonsGroup.querySelector(`#filter-default`);
const randomFilterButton = FilterButtonsGroup.querySelector(`#filter-random`);
const discussedFilterButton = FilterButtonsGroup.querySelector(`#filter-discussed`);

let defaultPictures;
let lastTimeout;

const addId = () => {
  for (let i = 0; i < defaultPictures.length; i++) {
    const pictureToRender = defaultPictures[i];
    pictureToRender.id = i;
  }
};

const appendPictureToFragment = (fragment, currentPicture) => {
  const picture = window.picture.create(currentPicture);
  fragment.appendChild(picture);
}

const appendDefaultPicturesToFragment = (fragment) => {
  for (let i = 0; i < defaultPictures.length; i++) {
    appendPictureToFragment(fragment,defaultPictures[i]);
  }
};

const appendRandomPicturesToFragment = (fragment) => {
  let shownPictures = [];
  while (shownPictures.length < QUANTITY_OF_RANDOM_PICTURES) {
    const randomNumber = window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, defaultPictures.length);
    let randomPicture = defaultPictures[randomNumber];
    if (!shownPictures.includes(randomPicture)) {
      shownPictures.push(randomPicture);
      appendPictureToFragment(fragment,randomPicture);
    }
  }
};

const appendDiscussedPicturesToFragment = (fragment) => {
  let copiedPicture = [...defaultPictures];
  for (let i = 0; i < copiedPicture.length; i++) {
    copiedPicture.sort((o1, o2) => o2.comments.length - o1.comments.length);
    appendPictureToFragment(fragment,copiedPicture[i]);
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

const removePictures = () => pictures.querySelectorAll(`.picture`).forEach((element) => element.remove());

const switchActiveButton = (button) => {
  filterButtons.forEach((b) => b.classList.remove(`img-filters__button--active`));
  button.classList.add(`img-filters__button--active`);
};

const debounce = (button) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    removePictures();
    render(button);
  }, FILTER_SWITCHING_TIME);
};

const showPictures = (button) => {
  const isButtonActive = button.classList.contains(`img-filters__button--active`);
  if (!isButtonActive) {
    switchActiveButton(button);
    debounce(button);
  }
};

const onDefaultFilterButtonClick = () => showPictures(defaultFilterButton);
const onRandomFilterButtonClick = () => showPictures(randomFilterButton);
const onDiscussedFilterButtonClick = () => showPictures(discussedFilterButton);

const onPictureClick = (evt) => {
  const picture = evt.target.closest(`.picture`);
  if (picture) {
    const id = picture.dataset.id;
    window.bigPicture.show(defaultPictures[id]);
  }
};

const addListeners = () => {
  defaultFilterButton.addEventListener(`click`, onDefaultFilterButtonClick);
  randomFilterButton.addEventListener(`click`, onRandomFilterButtonClick);
  discussedFilterButton.addEventListener(`click`, onDiscussedFilterButtonClick);
  pictures.addEventListener(`click`, onPictureClick);
};

const showFilters = () => FilterButtonsGroup.classList.remove(`img-filters--inactive`);

const activate = (newPictures) => {
  defaultPictures = newPictures;
  addId();
  render();
  addListeners();
  showFilters();
};

window.gallery = {
  activate,
};
