'use strict';
const SettingZoom = {
  MIN_ZOOM : 25,
  MAX_ZOOM : 100,
  STEP : 25,
  INITIAL_ZOOM : 100,
};

const zoomOutButton = document.querySelector(`.scale__control--smaller`);
const zoomInButton = document.querySelector(`.scale__control--bigger`);
const zoomPercent = document.querySelector(`.scale__control--value`);

let currentZoom = SettingZoom.MAX_ZOOM;

const applyCurrentZoom = () => {
  zoomPercent.value = `${currentZoom}%`;
  bigImage.style.transform = `scale(${currentZoom / ONE_HUNGRED})`;
};

applyCurrentZoom();

zoomInButton.addEventListener(`click`, () => {
  if (currentZoom < SettingZoom.MAX_ZOOM) {
    currentZoom += SettingZoom.STEP;
    applyCurrentZoom();
  }
});

zoomOutButton.addEventListener(`click`, () => {
  if (currentZoom > SettingZoom.MIN_ZOOM) {
    currentZoom -= SettingZoom.STEP;
    applyCurrentZoom();
  }
});

fileUploadButton.addEventListener(`change`, () => {
  currentZoom = SettingZoom.MAX_ZOOM;
  applyCurrentZoom();
});
