'use strict';

(() => {
  const getPhotos = (photos) => {
    for (let i = 0; i < photos.length; i++) {
      photos.push(photos[i]);
    }
    return photos;
  };

  window.data = {
    getPhotos,
  };
})();
