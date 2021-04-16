'use strict';

const PHOTO_DESCRIPTIONS = [
  `Приятное времяпрепровождение с друзьями, песни под гитару, страшные истории вечером у костра.`,
  `Для стокового фотографа удачный кадр — это только половина успеха.`,
  `Придумать название — самая творческая часть этого монотонного занятия.`,
  `Краткость — сестра таланта...`,
  `Несбыточные мечты о велосипеде`,
];
const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
];
const USER_NAMES = [`Марк`, `Леонид`, `Катя`, `Барбара`, `Шанель`];
const MIN_ARRAY_INDEX = 0;

const MIN_AVATAR_QUANTITY = 1;
const MAX_AVATAR_QUANTITY = 6;

const MIN_LIKE_QUANTITY = 15;
const MAX_LIKE_QUANTITY = 200;

const MIN_COMMENT_QUANTITY = 1;
const MAX_COMMENT_QUANTITY = 10;

const REQUIRED_PHOTO_QUANTITY = 25;

const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomComments = (quantity) => {
  const comments = [];
  for (let i = 0; i < quantity; i++) {
    comments.push({
      avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_QUANTITY, MAX_AVATAR_QUANTITY)}.svg`,
      message: MESSAGES[getRandomNumber(MIN_ARRAY_INDEX, MESSAGES.length)],
      name: USER_NAMES[getRandomNumber(MIN_ARRAY_INDEX, USER_NAMES.length)],
    });
  }
  return comments;
};

const getPhotos = (quantity) => {
  const photos = [];
  for (let i = 0; i < quantity; i++) {
    photos.push({
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: PHOTO_DESCRIPTIONS[getRandomNumber(MIN_ARRAY_INDEX, PHOTO_DESCRIPTIONS.length)],
      likes: getRandomNumber(MIN_LIKE_QUANTITY, MAX_LIKE_QUANTITY),
      comments: getRandomComments(getRandomNumber(MIN_COMMENT_QUANTITY, MAX_COMMENT_QUANTITY)),
    });
  }
  return photos;
};

const getPhotoDomElement = (photo) => {
  const newPhoto = pictureTemplate.cloneNode(true);
  newPhoto.querySelector(`.picture`).dataset.id = photo.id;
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

const photos = getPhotos(REQUIRED_PHOTO_QUANTITY);
fillDomElementByPhoto(photos);
