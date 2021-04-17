'use strict';

(() => {
  const bigPhoto = document.querySelector(`.big-picture`);
  const cancelButton = bigPhoto.querySelector(`#picture-cancel`);
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
    window.popupUpload.body.classList.remove(`modal-open`);
  };

  window.miniature.pictures.addEventListener(`click`, (evt) => {
    const picture = evt.target.closest(`.picture`);
    if (picture) {
      const id = picture.dataset.id;
      showModalBigPhoto();
      window.bigPhoto.fillByInformation(window.miniature.photos[id]);
    }
  });

  cancelButton.addEventListener(`click`, hideModalBigPhoto);

  const onEscKey = (evt) => {
    const isEscape = evt.key === `Escape`;
    const isBigPhotoHidden = !bigPhoto.classList.contains(`hidden`);
    if (isEscape && isBigPhotoHidden) {
      evt.preventDefault();
      hideModalBigPhoto();
    }
  };

  document.addEventListener(`keydown`, onEscKey);

  window.popupPreview = {
    bigPhoto,
  };
})();
