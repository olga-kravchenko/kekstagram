'use strict';

(() => {
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
  const MIN_AVATAR_QUANTITY = 1;
  const MAX_AVATAR_QUANTITY = 6;
  const MIN_LIKE_QUANTITY = 15;
  const MAX_LIKE_QUANTITY = 200;
  const MIN_COMMENT_QUANTITY = 1;
  const MAX_COMMENT_QUANTITY = 10;

  const getComment = () => {
    return {
      avatar: `img/avatar-${window.util.getRandomNumber(MIN_AVATAR_QUANTITY, MAX_AVATAR_QUANTITY)}.svg`,
      message: MESSAGES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, MESSAGES.length)],
      name: USER_NAMES[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, USER_NAMES.length)],
    };
  };

  const getRandomComments = (quantity) => {
    const comments = [];
    for (let i = 0; i < quantity; i++) {
      comments.push(getComment());
    }
    return comments;
  };

  const getPhoto = (i) => {
    return {
      id: i,
      url: `photos/${i + 1}.jpg`,
      description: PHOTO_DESCRIPTIONS[window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX, PHOTO_DESCRIPTIONS.length)],
      likes: window.util.getRandomNumber(MIN_LIKE_QUANTITY, MAX_LIKE_QUANTITY),
      comments: getRandomComments(window.util.getRandomNumber(MIN_COMMENT_QUANTITY, MAX_COMMENT_QUANTITY)),
    };
  };

  const getPhotos = (quantity) => {
    const photos = [];
    for (let i = 0; i < quantity; i++) {
      photos.push(getPhoto(i));
    }
    return photos;
  };

  window.data = {
    getPhotos,
  };
})();
