'use strict';

(() => {
  const STATUS_CODE_OK = 200;
  const TIMEOUT_IN_MS = 10000;
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  const onLoadRequest = (request, onLoad, onError) => {
    if (request.status === STATUS_CODE_OK) {
      onLoad(request.response);
    }
  };

  const onErrorRequest = (onError) => onError(`Произошла ошибка соединения`);
  const onTimeoutRequest = (onError, timeout) => onError(`Запрос не успел выполниться за ${timeout} мс`);

  const upload = (onSuccess, onError) => {
    const request = new XMLHttpRequest();
    request.timeout = TIMEOUT_IN_MS;
    request.responseType = `json`;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError, request.timeout));
    request.open(`GET`, URL);
    request.send();
  };

  window.backend = {
    upload,
  };
})();
