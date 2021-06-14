'use strict';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  INITIAL: 100,
};

const modal = document.querySelector(`.img-upload__overlay`);
const uploadedPicture = modal.querySelector(`.img-upload__preview img`);
const zoomOutButton = modal.querySelector(`.scale__control--smaller`);
const zoomInButton = modal.querySelector(`.scale__control--bigger`);
const zoomPercent = modal.querySelector(`.scale__control--value`);

let currentZoom = Zoom.INITIAL;

const applyCurrentZoom = () => {
  zoomPercent.value = `${currentZoom}%`;
  uploadedPicture.style.transform = `scale(${currentZoom / window.constants.ONE_HUNDRED})`;
};

const onZoomInButtonClick = () => {
  if (currentZoom < Zoom.MAX) {
    currentZoom += Zoom.STEP;
    applyCurrentZoom();
  }
};

const onZoomOutButtonClick = () => {
  if (currentZoom > Zoom.MIN) {
    currentZoom -= Zoom.STEP;
    applyCurrentZoom();
  }
};

const addListeners = () => {
  zoomInButton.addEventListener(`click`, onZoomInButtonClick);
  zoomOutButton.addEventListener(`click`, onZoomOutButtonClick);
};

const reset = () => {
  currentZoom = Zoom.MAX;
  applyCurrentZoom();
};

window.zoom = {
  addListeners,
  reset,
};
