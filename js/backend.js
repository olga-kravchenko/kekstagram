'use strict';

(() => {
  const STATUS_CODE_OK = 200;
  const STATUS_CODE_BAD_REQUEST = 400;
  const TIMEOUT_IN_MS = 10000;

  const onLoadRequest = (request, onLoad, onError) => {
    if (request.status === STATUS_CODE_OK) {
      onLoad(request.response);
    } else {
      onError(`Статус ответа: ${request.status} ${request.statusText}`);
    }
  };

  const onErrorRequest = (onError) => onError(`Произошла ошибка соединения`);
  const onTimeoutRequest = (onError) => onError(`Запрос не успел выполниться за ${TIMEOUT_IN_MS} мс`);

  const upload = (onSuccess, onError) => {
    const URL = `https://21.javascript.pages.academy/kekstagram/data`;
    const request = new XMLHttpRequest();
    request.timeout = TIMEOUT_IN_MS;
    request.responseType = `json`;

    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError));
    request.open(`GET`, URL);
    request.send();
  };


  const send = (data, onSuccess, onError) => {
    const URL = `https://21.javascript.pages.academy/kekstagram`;
    const request = new XMLHttpRequest();
    request.timeout = TIMEOUT_IN_MS;
    request.responseType = `json`;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError, request.timeout));
    request.open(`POST`, URL);
    request.send(data);
  };

  window.backend = {
    upload,
    send,
  };
})();
