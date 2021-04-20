'use strict';

(() => {
  const REQUIRED_PHOTO_QUANTITY = 25;

  const photos = window.data.getPhotos(REQUIRED_PHOTO_QUANTITY);
  window.gallery.activate(photos);

})();
