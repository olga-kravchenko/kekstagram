'use strict';

const Message = {
  NO_ERROR: ``,
  ERROR_IN_HASHTAG: `Хэштег начинается с # и длинной не больше 19 символов`,
  ERROR_IN_QUANTITY: `Хэштегов должно быть не больше 5`,
};

const MAX_QUANTITY = 5;
const regex = /^#[\w\d]{1,19}(\s|$)/;

const form = document.querySelector(`.img-upload__form`);
const hashtagInput = form.querySelector(`.text__hashtags`);

let currentErrorMessage;

const resetErrorMessage = () => {
  hashtagInput.setCustomValidity(Message.NO_ERROR);
  hashtagInput.reportValidity();
};

const checkHashtag = () => {
  let isValidity;
  let hashtags = hashtagInput.value.trim().split(` `);

  if (hashtagInput.value.trim() === EMPTY_STRING) {
    isValidity = true;
  } else if (hashtags.length > MAX_QUANTITY) {
    currentErrorMessage = Message.ERROR_IN_QUANTITY;
  } else {
    for (const hashtag of hashtags) {
      if (regex.test(hashtag)) {
        isValidity = true;
        currentErrorMessage = Message.NO_ERROR;
      } else {
        isValidity = false;
        currentErrorMessage = Message.ERROR_IN_HASHTAG;
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
    hashtagInput.setCustomValidity(currentErrorMessage);
    hashtagInput.reportValidity();
  }
});

hashtagInput.addEventListener(`input`, resetErrorMessage);
