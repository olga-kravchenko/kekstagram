'use strict';

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const MIN_STEP = 25;

const buttonMinus = document.querySelector(`.scale__control--smaller`);
const buttonPlus = document.querySelector(`.scale__control--bigger`);
const scalePercent = document.querySelector(`.scale__control--value`);

const bigImage1 = document.querySelector(`.img-upload__preview img`);

let counter = MAX_SCALE;

const getScaleImageAndPercent = () => {
  scalePercent.value = `${counter}%`;
  bigImage1.style.transform = `scale(${counter / 100})`;
};


getScaleImageAndPercent();

buttonPlus.addEventListener(`click`, () => {
  if (counter < MAX_SCALE) {
    counter += MIN_STEP;
    getScaleImageAndPercent();
  }
});

buttonMinus.addEventListener(`click`, () => {
  if (counter > MIN_SCALE) {
    counter -= MIN_STEP;
    getScaleImageAndPercent();
  }
});

buttonUploadFile.addEventListener(`change`, () => {
  counter = MAX_SCALE;
  getScaleImageAndPercent();
});

