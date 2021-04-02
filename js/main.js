'use strict';
const PHOTO_DESCRIPTION = [`Вкусно`, `Выходные`, `Смелость`, `Красотааа..`, `Счатливый`];
const MASSAGE = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`];
const USER_NAME = [`Марк`, `Леонид`, `Катя`, `Барбара`, `Шанель`];
const pictures = document.querySelector(`.pictures`);
const picture = document.querySelector(`#picture`).content;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createCommentsArray = () => {
  const commentsUnderPhoto = [];
  for (let i = 0; i < 4; i++) {
    commentsUnderPhoto.push({
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: MASSAGE[getRandomNumber(0, MASSAGE.length)],
      name: USER_NAME[getRandomNumber(0, USER_NAME.length)],
    });
  }
  return commentsUnderPhoto;
};

const createPhotoArray = (quantityPhotos) => {
  const photoUsers = [];
  for (let i = 0; i < quantityPhotos; i++) {
    photoUsers.push({
      url: `photos/${i + 1}.jpg`,
      description: PHOTO_DESCRIPTION[getRandomNumber(0, PHOTO_DESCRIPTION.length)],
      likes: getRandomNumber(15, 200),
      comments: createCommentsArray(),
    });
  }
  return photoUsers;
};

const createDomElementPhoto = (jsObject) => {
  const newDomElementPhoto = picture.cloneNode(true);

  newDomElementPhoto.querySelector(`.picture__img`).src = jsObject.url;
  newDomElementPhoto.querySelector(`.picture__likes`).textContent = jsObject.likes;
  newDomElementPhoto.querySelector(`.picture__comments`).textContent = jsObject.comments.length;

  return newDomElementPhoto;
};

const fillDomElementByPhoto = (objectArray) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < objectArray.length; i++) {
    const newPhoto = createDomElementPhoto(objectArray[i]);
    fragment.appendChild(newPhoto);
  }
  pictures.appendChild(fragment);
};

const photoArray = createPhotoArray(25);
fillDomElementByPhoto(photoArray);


