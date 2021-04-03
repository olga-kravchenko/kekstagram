'use strict';
const PHOTO_DESCRIPTIONS = [`Вкусно`, `Выходные`, `Смелость`, `Красотааа..`, `Счатливый`];
const MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`];
const USER_NAMES = [`Марк`, `Леонид`, `Катя`, `Барбара`, `Шанель`];
const MIN_ARRAY_VALUE = 0;

const MIN_QUANTITY_AVATARS = 1;
const MAX_QUANTITY_AVATARS = 6;

const MIN_QUANTITY_LIKES = 15;
const MAX_QUANTITY_LIKES = 200;

const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 10;

const pictures = document.querySelector(`.pictures`);
const picture = document.querySelector(`#picture`).content;

const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push({
      avatar: `img/avatar-${getRandomNumber(MAX_QUANTITY_AVATARS, MIN_QUANTITY_AVATARS)}.svg`,
      message: MESSAGES[getRandomNumber(MESSAGES.length, MIN_ARRAY_VALUE)],
      name: USER_NAMES[getRandomNumber(USER_NAMES.length, MIN_ARRAY_VALUE)],
    });
  }
  return comments;
};

const getPhotos = (quantity) => {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    photos.push({
      url: `photos/${i + 1}.jpg`,
      description: PHOTO_DESCRIPTIONS[getRandomNumber(PHOTO_DESCRIPTIONS.length, MIN_ARRAY_VALUE)],
      likes: getRandomNumber(MAX_QUANTITY_LIKES, MIN_QUANTITY_LIKES),
      comments: getRandomComments(getRandomNumber(MAX_QUANTITY_COMMENTS, MIN_QUANTITY_COMMENTS)),
    });
  }
  return photos;
};

const getPhotoDomElement = (photo) => {
  const newPhoto = picture.cloneNode(true);

  newPhoto.querySelector(`.picture__img`).src = photo.url;
  newPhoto.querySelector(`.picture__likes`).textContent = photo.likes;
  newPhoto.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return newPhoto;
};

const fillDomElementByPhoto = (photos) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    const newPhoto = getPhotoDomElement(photos[i]);
    fragment.appendChild(newPhoto);
  }
  pictures.appendChild(fragment);
};

const photos = getPhotos(25);
fillDomElementByPhoto(photos);

//
// const bigPhoto = document.querySelector(`.big-picture`);
// bigPhoto.classList.remove(`hidden`);
//
// bigPhoto.querySelector(`.big-picture__img img`).src = photoArray[0].url;
// bigPhoto.querySelector(`.likes-count`).textContent = photoArray[0].likes;
// bigPhoto.querySelector(`.comments-count`).textContent = photoArray[0].comments.length;
//
// bigPhoto.querySelector(`.social__caption`).textContent = photoArray[0].description;
//
//
//
// const socialComments = bigPhoto.querySelector(`.social__comments`);
// socialComments.innerHTML = ``;
//
// const socialComment = document.createElement(`li`);
// socialComment.classList.add(`social__comment`);
// socialComments.appendChild(socialComment);
//
// const socialAvatar = document.createElement(`img`);
// socialAvatar.classList.add(`social__picture`);
// socialAvatar.src =
// socialComment.appendChild(socialAvatar);
