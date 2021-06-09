'use strict';

const INITIAL_PERCENT = 100;
const MAX_PERCENT = 100;
const LINE_LENGTH = 453;
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

const modal = document.querySelector(`.img-upload__overlay`);
const uploadedPicture = modal.querySelector(`.img-upload__preview img`);
const effectsGroup = modal.querySelector(`.effects`);
const effectLevel = modal.querySelector(`.effect-level`);
const effectLine = effectLevel.querySelector(`.effect-level__line`);
const pin = effectLevel.querySelector(`.effect-level__pin`);
const levelDepth = effectLevel.querySelector(`.effect-level__depth`);

let currentEffect = FilterEffect.ORIGIN;
let currentPercent = INITIAL_PERCENT;
let currentValue = LINE_LENGTH;

const calculateCurrentValue = (evt) => {
  const type = evt.type;
  if (type === `click`) {
    currentValue = evt.offsetX;
  } else if (type === `mousemove`) {
    currentValue += evt.movementX;
  }
};

const calculateCurrentPercent = () => {
  currentPercent = currentValue * MAX_PERCENT / LINE_LENGTH;
  currentPercent = currentPercent < 0 ? 0 : currentPercent;
  currentPercent = currentPercent > 100 ? 100 : currentPercent;
};

const setEffectLineAndPin = (evt) => {
  calculateCurrentValue(evt);
  calculateCurrentPercent();
  pin.style.left = `${currentPercent}%`;
  levelDepth.style.width = `${currentPercent}%`;
};

const resetCurrentPercent = () => {
  currentPercent = INITIAL_PERCENT;
  pin.style.left = `${currentPercent}%`;
  levelDepth.style.width = `${currentPercent}%`;
  currentValue = LINE_LENGTH;
};

const toggleEffectLevel = () => {
  if (currentEffect === `none`) {
    effectLevel.classList.add(`hidden`);
  } else {
    effectLevel.classList.remove(`hidden`);
  }
};

const getEffectValue = (maxValue) => (currentPercent * maxValue) / window.constants.ONE_HUNDRED;

const addEffect = () => {
  let filterEffect;
  let filter;
  toggleEffectLevel();
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
  uploadedPicture.style.filter = filterEffect;
  uploadedPicture.className = window.constants.EMPTY_STRING;
  if (filter) {
    uploadedPicture.classList.add(`effects__preview--${filter}`);
  }
};

const reset = () => {
  resetCurrentPercent();
  currentEffect = FilterEffect.ORIGIN;
  document.querySelector(`input#effect-none`).checked = true;
  addEffect();
};

const onEffectLineClick = (evt) => {
  if (evt.target !== pin) {
    setEffectLineAndPin(evt);
    addEffect();
  }
};

const onEffectGroupChange = (evt) => {
  resetCurrentPercent();
  currentEffect = evt.target.value;
  addEffect();
};

const onDocumentMouseMove = (evt) => {
  setEffectLineAndPin(evt);
  addEffect();
};

const onDocumentMouseUp = () => {
  document.removeEventListener(`mousemove`, onDocumentMouseMove);
  document.removeEventListener(`mouseup`, onDocumentMouseUp);
};

const addMouseListenersToDocument = () => {
  document.addEventListener(`mousemove`, onDocumentMouseMove);
  document.addEventListener(`mouseup`, onDocumentMouseUp);
};

const addListeners = () => {
  pin.addEventListener(`mousedown`, addMouseListenersToDocument);
  effectLine.addEventListener(`click`, onEffectLineClick);
  effectsGroup.addEventListener(`change`, onEffectGroupChange);
};

window.filters = {
  addListeners,
  reset,
};
