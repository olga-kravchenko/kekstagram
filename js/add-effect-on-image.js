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

const INITIAL_PERCENT = 100;
const MAX_PERCENT = 100;
const ONE_HUNDRED = 100;
const LINE_LENGTH = 453;
const EMPTY_STRING = ``;

const effectsGroup = document.querySelector(`.effects`);
const bigImage = document.querySelector(`.img-upload__preview img`);

const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectPin = effectLevelLine.querySelector(`.effect-level__pin`);
const effectDepth = effectLevelLine.querySelector(`.effect-level__depth`);

let currentEffect = FilterEffect.ORIGIN;
let currentPercent = INITIAL_PERCENT;

const setEffectLineAndPin = (evt) => {
  currentPercent = Math.floor((evt.offsetX * MAX_PERCENT) / LINE_LENGTH);
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;
};

const resetCurrentPercent = () => {
  currentPercent = INITIAL_PERCENT;
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;

};

const toggleEffectLine = () => {
  if (currentEffect === `none`) {
    effectLevel.classList.add(`hidden`);
  } else {
    effectLevel.classList.remove(`hidden`);
  }
};

const getEffectValue = (maxValue) => {
  return (currentPercent * maxValue) / ONE_HUNDRED;
};

const addEffect = () => {
  let filterEffect;
  let filter;
  toggleEffectLine();

  switch (currentEffect) {
    case Filter.ORIGIN:
      filterEffect = `${FilterEffect.ORIGIN}`;
      break;
    case Filter.CHROME:
      filterEffect = `${FilterEffect.CHROME}(${getEffectValue(MaxEffect.CHROME)})`;
      filter = Filter.CHROME;
      break;
    case Filter.SEPIA:
      filterEffect = `${FilterEffect.SEPIA}(${getEffectValue(MaxEffect.SEPIA)})`;
      filter = Filter.SEPIA;
      break;
    case Filter.MARVIN:
      filterEffect = `${FilterEffect.MARVIN}(${getEffectValue(MaxEffect.MARVIN)}%)`;
      filter = Filter.MARVIN;
      break;
    case Filter.PHOBOS:
      filterEffect = `${FilterEffect.PHOBOS}(${getEffectValue(MaxEffect.PHOBOS)}px)`;
      filter = Filter.PHOBOS;
      break;
    case Filter.HEAT:
      filterEffect = `${FilterEffect.HEAT}(${getEffectValue(MaxEffect.HEAT)})`;
      filter = Filter.HEAT;
      break;
  }

  bigImage.style.filter = filterEffect;
  bigImage.className = EMPTY_STRING;
  if (filter) {
    bigImage.classList.add(`effects__preview--${filter}`);
  }
};

effectLevelLine.addEventListener(`click`, (evt) => {
  setEffectLineAndPin(evt);
  addEffect();
});

effectsGroup.addEventListener(`change`, (evt) => {
  resetCurrentPercent();
  currentEffect = evt.target.value;
  addEffect();
});
