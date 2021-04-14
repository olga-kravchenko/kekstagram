'use strict';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  INITIAL: 100,
};

const zoomOutButton = document.querySelector(`.scale__control--smaller`);
const zoomInButton = document.querySelector(`.scale__control--bigger`);
const zoomPercent = document.querySelector(`.scale__control--value`);

let currentZoom = Zoom.INITIAL;

const applyCurrentZoom = () => {
  zoomPercent.value = `${currentZoom}%`;
  bigImage.style.transform = `scale(${currentZoom / ONE_HUNDRED})`;
};

zoomInButton.addEventListener(`click`, () => {
  if (currentZoom < Zoom.MAX) {
    currentZoom += Zoom.STEP;
    applyCurrentZoom();
  }
});

zoomOutButton.addEventListener(`click`, () => {
  if (currentZoom > Zoom.MIN) {
    currentZoom -= Zoom.STEP;
    applyCurrentZoom();
  }
});

fileUploadButton.addEventListener(`change`, () => {
  currentZoom = Zoom.MAX;
  applyCurrentZoom();
});
