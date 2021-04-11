'use strict';
const form = document.querySelector(`.img-upload__form`);
const inputHashtag = form.querySelector(`.text__hashtags`);

let messageError;

const checkConditionSendingForm = () => {
  if (checkHashtag()) {
    form.submit();
  } else {
    inputHashtag.setCustomValidity(messageError);
  }
  inputHashtag.reportValidity();
};

const checkCorrectionOfInput = () => {
  inputHashtag.setCustomValidity(``);
  inputHashtag.reportValidity();
};

const checkHashtag = () => {
  let isValidity;

  if (inputHashtag.value.trim() === ``) {
    isValidity = true;
    inputHashtag.setCustomValidity(``);
  } else {
    let hashtags = inputHashtag.value.trim().split(` `);
    for (let i = 0; i < hashtags.length; i++) {
      const re = /^#[\w\d]{1,19}(\s|$)/;
      let hashtag = hashtags[i];
      let valid = re.test(hashtag);
      if (valid && hashtags.length <= 5) {
        isValidity = true;
        messageError = ``;
      } else {
        isValidity = false;
        messageError = `Начинаются с #, слово =19симв., коллич. слов < 6`;
        break;
      }
    }
  }
  return isValidity;
};

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  checkConditionSendingForm();
});

inputHashtag.addEventListener(`input`, () => {
  checkCorrectionOfInput();
  checkHashtag();
});
