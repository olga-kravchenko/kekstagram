'use strict';

(() => {
  const socialComments = window.popupPreview.bigPhoto.querySelector(`.social__comments`);

  const addCommentsToParent = (parent, comments) => {
    window.util.cleanContent(socialComments);
    for (let i = 0; i < comments.length; i++) {
      const newComment = window.util.createNewElement(`li`, `social__comment`);
      parent.appendChild(newComment);
      const avatar = window.util.createNewElement(`img`, `social__picture`);
      avatar.src = comments[i].avatar;
      avatar.alt = comments[i].name;
      newComment.appendChild(avatar);
      const text = window.util.createNewElement(`p`, `social__text`, comments[i].message);
      newComment.appendChild(text);
    }
  };

  const fillByInformation = (photo) => {
    window.popupPreview.bigPhoto.querySelector(`.big-picture__img img`).src = photo.url;
    window.popupPreview.bigPhoto.querySelector(`.likes-count`).textContent = photo.likes;
    window.popupPreview.bigPhoto.querySelector(`.comments-count`).textContent = photo.comments.length;
    window.popupPreview.bigPhoto.querySelector(`.social__caption`).textContent = photo.description;
    addCommentsToParent(socialComments, photo.comments);
  };

  window.bigPhoto = {
    fillByInformation,
  };
})();
