'use strict';

(() => {
  const ONE_HUNDRED = 100;
  const Zoom = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    INITIAL: 100,
  };

  const uploadedPhoto = document.querySelector(`.img-upload__preview img`);
  const zoomOutButton = document.querySelector(`.scale__control--smaller`);
  const zoomInButton = document.querySelector(`.scale__control--bigger`);
  const zoomPercent = document.querySelector(`.scale__control--value`);
  let currentZoom = Zoom.INITIAL;

  const applyCurrentZoom = () => {
    zoomPercent.value = `${currentZoom}%`;
    uploadedPhoto.style.transform = `scale(${currentZoom / ONE_HUNDRED})`;
  };

  const addListeners = () => {
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
  };

  const reset = () => {
    currentZoom = Zoom.MAX;
    applyCurrentZoom();
  };

  window.zoom = {
    addListeners,
    reset,
  };
})();
