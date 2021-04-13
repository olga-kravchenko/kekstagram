'use strict';

const Message = {
  NO_ERROR: ``,
  ERROR_IN_HASHTAG: `Хэштег начинается с # и длинной не больше 19 символов`,
  ERROR_IN_QUANTITY: `Хэштегов должно быть не больше 5`,
};

const MAX_QUANTITY = 5;
const EMPTY_STRING = ``;
const re = /^#[\w\d]{1,19}(\s|$)/;

const form = document.querySelector(`.img-upload__form`);
const inputHashtag = form.querySelector(`.text__hashtags`);

let errorMessage;

const resetErrorMessage = () => {
  inputHashtag.setCustomValidity(Message.NO_ERROR);
  inputHashtag.reportValidity();
};

const checkHashtag = () => {
  let isValidity;
  let hashtags = inputHashtag.value.trim().split(` `);

  if (inputHashtag.value.trim() === EMPTY_STRING) {
    isValidity = true;
  } else if (hashtags.length > MAX_QUANTITY) {
    errorMessage = Message.ERROR_IN_QUANTITY;
  } else {
    for (let i = 0; i < hashtags.length; i++) {
      let hashtag = hashtags[i];
      let valid = re.test(hashtag);
      if (valid) {
        isValidity = true;
        errorMessage = Message.NO_ERROR;
      } else {
        isValidity = false;
        errorMessage = Message.ERROR_IN_HASHTAG;
        break;
      }
    }
  }
  return isValidity;
};

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  if (checkHashtag()) {
    form.submit();
  } else {
    inputHashtag.setCustomValidity(errorMessage);
  }
  inputHashtag.reportValidity();
});

inputHashtag.addEventListener(`input`, () => {
  resetErrorMessage();
});
