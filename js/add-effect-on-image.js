'use strict';
const MAX_CHROME_EFFECT_VALUE = 1;
const MAX_SEPIA_EFFECT_VALUE = 1;
const MAX_MARVIN_EFFECT_VALUE = 100;
const MAX_PHOBOS_EFFECT_VALUE = 3;
const MAX_HEAT_EFFECT_VALUE = 3;

const effectsGroup = document.querySelector(`.effects`);
const bigImage = document.querySelector(`.img-upload__preview img`);

const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectPin = document.querySelector(`.effect-level__pin`);
const effectDepth = document.querySelector(`.effect-level__depth`);
let currentEffect = `none`;
let currentPercent = 100;

effectLevelLine.addEventListener(`click`, (evt) => {
  currentPercent = Math.floor((evt.offsetX * 100) / 453);
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;
  addFilterEffect();
});

effectsGroup.addEventListener(`change`, (evt) => {
  currentPercent = 100;
  effectPin.style.left = `${currentPercent}%`;
  effectDepth.style.width = `${currentPercent}%`;
  currentEffect = evt.target.value;
  addFilterEffect();
});


const getEffect = (filterEffect, filterClass) => {
  bigImage.style.filter = filterEffect;
  bigImage.className = ``;
  bigImage.classList.add(filterClass);
  effectLevel.classList.remove(`hidden`);
};

const addFilterEffect = () => {
  if (currentEffect === `none`) {
    bigImage.style.filter = ``;
    bigImage.className = ``;
    effectLevel.classList.add(`hidden`);
  } else if (currentEffect === `chrome`) {
    getEffect(`grayscale(${(currentPercent * MAX_CHROME_EFFECT_VALUE) / 100})`, `effects__preview--chrome`);
  } else if (currentEffect === `sepia`) {
    getEffect(`sepia(${(currentPercent * MAX_SEPIA_EFFECT_VALUE) / 100})`, `effects__preview--sepia`);
  } else if (currentEffect === `marvin`) {
    getEffect(`invert(${(currentPercent * MAX_MARVIN_EFFECT_VALUE) / 100}%)`, `effects__preview--marvin`);
  } else if (currentEffect === `phobos`) {
    getEffect(`blur(${(currentPercent * MAX_PHOBOS_EFFECT_VALUE) / 100}px)`, `effects__preview--phobos`);
  } else if (currentEffect === `heat`) {
    getEffect(`brightness(${(currentPercent * MAX_HEAT_EFFECT_VALUE) / 100})`, `effects__preview--heat`);
  }
};
