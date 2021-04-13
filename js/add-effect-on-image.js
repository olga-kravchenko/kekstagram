'use strict';
const MaxEffect = {
  CHROME: 1,
  SEPIA: 1,
  MARVIN: 100,
  PHOBOS: 3,
  HEAT: 3,
};

const Filter = {
  ORIGIN: `none`,
  CHROME: `chrome`,
  SEPIA: `sepia`,
  MARVIN: `marvin`,
  PHOBOS: `phobos`,
  HEAT: `heat`,
};

const FilterEffect = {
  ORIGIN: `none`,
  CHROME: `grayscale`,
  SEPIA: `sepia`,
  MARVIN: `invert`,
  PHOBOS: `blur`,
  HEAT: `brightness`,
};

const MAX_PERCENT = 100;
const LINE_LENGTH = 453;

const effectsGroup = document.querySelector(`.effects`);
const bigImage = document.querySelector(`.img-upload__preview img`);

const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectPin = effectLevelLine.querySelector(`.effect-level__pin`);
const effectDepth = effectLevelLine.querySelector(`.effect-level__depth`);

let currentEffect = FilterEffect.ORIGIN;
let currentPercent = MAX_PERCENT;

const applyCurrentEffect = (evt) => {
  currentPercent = Math.floor((evt.offsetX * MAX_PERCENT) / LINE_LENGTH);
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;
};

const resetCurrentEffect = (evt) => {
  currentPercent = MAX_PERCENT;
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;
  currentEffect = evt.target.value;
};

const addEffect = (filterEffect, filter) => {
  bigImage.style.filter = filterEffect;
  bigImage.className = `${filter}`;
  if (filter) {
    bigImage.classList.add(`effects__preview--${filter}`);
  }
};

const toggleEffectLine = () => {
  if (currentEffect === `none`) {
    effectLevel.classList.add(`hidden`);
  } else {
    effectLevel.classList.remove(`hidden`);
  }
};

const addFilterEffect = () => {
  let filterEffect;
  let filter;
  toggleEffectLine();

  switch (currentEffect) {
    case Filter.ORIGIN:
      filterEffect = `${FilterEffect.ORIGIN}`;
      break;
    case Filter.CHROME:
      filterEffect = `${FilterEffect.CHROME}(${(currentPercent * MaxEffect.CHROME) / MAX_PERCENT})`;
      filter = Filter.CHROME;
      break;
    case Filter.SEPIA:
      filterEffect = `${FilterEffect.SEPIA}(${(currentPercent * MaxEffect.SEPIA) / MAX_PERCENT})`;
      filter = Filter.SEPIA;
      break;
    case Filter.MARVIN:
      filterEffect = `${FilterEffect.MARVIN}(${(currentPercent * MaxEffect.MARVIN) / MAX_PERCENT}%)`;
      filter = Filter.MARVIN;
      break;
    case Filter.PHOBOS:
      filterEffect = `${FilterEffect.PHOBOS}(${(currentPercent * MaxEffect.PHOBOS) / MAX_PERCENT}px)`;
      filter = Filter.PHOBOS;
      break;
    case Filter.HEAT:
      filterEffect = `${FilterEffect.HEAT}(${(currentPercent * MaxEffect.HEAT) / MAX_PERCENT})`;
      filter = Filter.HEAT;
      break;
  }
  addEffect(filterEffect, filter);
};

effectLevelLine.addEventListener(`click`, (evt) => {
  applyCurrentEffect(evt);
  addFilterEffect();
});

effectsGroup.addEventListener(`change`, (evt) => {
  resetCurrentEffect(evt);
  addFilterEffect();
});
