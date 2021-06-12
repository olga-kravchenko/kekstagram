'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileSelection = document.querySelector(`.img-upload__start input[type=file]`);
const preview = document.querySelector(`.img-upload__preview img`);
const previewOfEffects = document.querySelectorAll(`.effects__preview`);

const reader = new FileReader();

const onReaderLoadChangeUrl = () => {
  preview.src = reader.result;
  previewOfEffects.forEach((previewEffect) => {
    previewEffect.style.backgroundImage = `url(${reader.result})`;
  });
};

const onNewPreviewChange = () => {
  const file = fileSelection.files[0];
  const fileName = file.name.toLowerCase();
  reader.readAsDataURL(file);
  const checkEndOfTheName = (type) => fileName.endsWith(type);
  const matchingTheFileType = FILE_TYPES.some(checkEndOfTheName);
  if (matchingTheFileType) {
    reader.addEventListener(`load`, onReaderLoadChangeUrl);
  }
};

const addListener = () => fileSelection.addEventListener(`change`, onNewPreviewChange);

window.preview = {
  addListener,
};
