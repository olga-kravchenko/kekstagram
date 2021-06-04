'use strict';

const onSuccess = window.gallery.activate;
const onError = window.util.showErrorMessage;

window.backend.get(onSuccess, onError);
window.form.activate();
