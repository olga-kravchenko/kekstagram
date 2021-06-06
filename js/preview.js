'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileSelection = document.querySelector(`.img-upload__start input[type=file]`);
const preview = document.querySelector(`.img-upload__preview img`);
const previewOfEffects = document.querySelectorAll(`.effects__preview`);

const reader = new FileReader();

const changePreviewSrc = () => {
  preview.src = reader.result;
  previewOfEffects.forEach((previewEffect) => {
    previewEffect.style.backgroundImage = `url(${reader.result})`;
  })
};

const newPreview = () => {
  const file = fileSelection.files[0];
  const fileName = file.name.toLowerCase();

  const matchingTypes = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matchingTypes) {
    reader.addEventListener(`load`, changePreviewSrc);
    reader.readAsDataURL(file);
  }
};

const addListener = () => {
  fileSelection.addEventListener(`change`, newPreview);
};

window.preview = {
  addListener,
};
