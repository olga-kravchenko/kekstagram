'use strict';

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
const STEP = 25;

const zoomOutButton = document.querySelector(`.scale__control--smaller`);
const zoomInButton = document.querySelector(`.scale__control--bigger`);
const scalePercent = document.querySelector(`.scale__control--value`);

let currentZoom = MAX_ZOOM;

const applyCurrentZoom = () => {
  scalePercent.value = `${currentZoom}%`;
  bigImage.style.transform = `scale(${currentZoom / MAX_PERCENT})`;
};

applyCurrentZoom();

zoomInButton.addEventListener(`click`, () => {
  if (currentZoom < MAX_ZOOM) {
    currentZoom += STEP;
    applyCurrentZoom();
  }
});

zoomOutButton.addEventListener(`click`, () => {
  if (currentZoom > MIN_ZOOM) {
    currentZoom -= STEP;
    applyCurrentZoom();
  }
});

fileUploadButton.addEventListener(`change`, () => {
  currentZoom = MAX_ZOOM;
  applyCurrentZoom();
});

