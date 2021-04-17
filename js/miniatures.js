'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`).content;

  const getRandomComments = (quantity) => {
    const comments = [];
    for (let i = 0; i < quantity; i++) {
      comments.push({
        avatar: `img/avatar-${window.util.getRandomNumber(window.date.MIN_AVATAR_QUANTITY, window.date.MAX_AVATAR_QUANTITY)}.svg`,
        message: window.date.MESSAGES[window.util.getRandomNumber(window.date.MIN_ARRAY_INDEX, window.date.MESSAGES.length)],
        name: window.date.USER_NAMES[window.util.getRandomNumber(window.date.MIN_ARRAY_INDEX, window.date.USER_NAMES.length)],
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
        description: window.date.PHOTO_DESCRIPTIONS[window.util.getRandomNumber(window.date.MIN_ARRAY_INDEX, window.date.PHOTO_DESCRIPTIONS.length)],
        likes: window.util.getRandomNumber(window.date.MIN_LIKE_QUANTITY, window.date.MAX_LIKE_QUANTITY),
        comments: getRandomComments(window.util.getRandomNumber(window.date.MIN_COMMENT_QUANTITY, window.date.MAX_COMMENT_QUANTITY)),
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

  const photos = getPhotos(window.date.REQUIRED_PHOTO_QUANTITY);
  fillDomElementByPhoto(photos);

  window.miniature = {
    pictures,
    photos,
  };
})();
