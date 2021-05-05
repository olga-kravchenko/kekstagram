'use strict';

(() => {
  const onSuccess = window.gallery.activate;
  const onError = window.util.showErrorMessage;

  window.backend.upload(onSuccess, onError);
  window.form.activate();
})();
