'use strict';

(() => {
  const MAX_QUANTITY = 5;
  const Message = {
    NO_ERROR: ``,
    ERROR_IN_HASHTAG: `Хэштег начинается с # и длинной не больше 19 символов`,
    ERROR_IN_QUANTITY: `Хэштегов должно быть не больше 5`,
  };
  const regex = /^#[\w\d]{1,19}(\s|$)/;
  const form = document.querySelector(`.img-upload__form`);
  const hashtagInput = form.querySelector(`.text__hashtags`);
  let currentErrorMessage;

  const resetErrorMessage = () => {
    hashtagInput.setCustomValidity(Message.NO_ERROR);
    hashtagInput.reportValidity();
  };

  const checkWithRegex = (hashtags) => {
    let isValidity;
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
    return isValidity;
  };

  const checkHashtag = () => {
    let isValidity;
    let hashtags = hashtagInput.value.trim().split(` `);
    if (hashtagInput.value.trim() === window.constants.EMPTY_STRING) {
      isValidity = true;
    } else if (hashtags.length > MAX_QUANTITY) {
      currentErrorMessage = Message.ERROR_IN_QUANTITY;
    } else {
      isValidity = checkWithRegex(hashtags);
    }
    return isValidity;
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    if (checkHashtag()) {
      form.submit();
    } else {
      hashtagInput.setCustomValidity(currentErrorMessage);
      hashtagInput.reportValidity();
    }
  };

  const addListeners = () => {
    form.addEventListener(`submit`, onSubmitForm);
    hashtagInput.addEventListener(`input`, resetErrorMessage);
  };

  window.hashtag = {
    addListeners,
  };
})();
