'use strict';

const bigPhoto = document.querySelector(`.big-picture`);
const socialComments = bigPhoto.querySelector(`.social__comments`);
const cancelButton = bigPhoto.querySelector(`.cancel`);

const comments = photos[0].comments;

const commentCount = document.querySelector(`.social__comment-count`);
const commentLoader = document.querySelector(`.comments-loader`);

const showModalBigPhoto = () => {
  bigPhoto.classList.remove(`hidden`);
  commentCount.classList.add(`hidden`);
  commentLoader.classList.add(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
};

const hideModalBigPhoto = () => {
  bigPhoto.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
};

const createNewElement = (tagName, className, text) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  if (text) {
    newElement.textContent = text;
  }
  return newElement;
};

const cleanContent = (cleaningPlace) => {
  cleaningPlace.innerHTML = ``;
};

const addCommentsToParent = (parent) => {
  cleanContent(socialComments);

  for (let i = 0; i < comments.length; i++) {
    const newComment = createNewElement(`li`, `social__comment`);
    parent.appendChild(newComment);

    const avatar = createNewElement(`img`, `social__picture`);
    avatar.src = comments[i].avatar;
    avatar.alt = comments[i].name;
    newComment.appendChild(avatar);

    const text = createNewElement(`p`, `social__text`, comments[i].message);
    newComment.appendChild(text);
  }
};

const fillBigPhotoByInformation = (photo) => {
  bigPhoto.querySelector(`.big-picture__img img`).src = photo.url;
  bigPhoto.querySelector(`.likes-count`).textContent = photo.likes;
  bigPhoto.querySelector(`.comments-count`).textContent = photo.comments.length;
  bigPhoto.querySelector(`.social__caption`).textContent = photo.description;
  addCommentsToParent(socialComments);
};


pictures.addEventListener(`click`, (evt) => {
  const picture = evt.target.closest(`.picture`);
  if (picture) {
    const id = picture.dataset.id;
    console.log(picture);
    showModalBigPhoto();
    fillBigPhotoByInformation(photos[id]);
  }
});
cancelButton.addEventListener(`click`, hideModalBigPhoto);

const onEscKey = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    hideModalBigPhoto();
  }
};

document.addEventListener(`keydown`, onEscKey);
