'use strict';

(() => {
  const STATUS_CODE_OK = 200;
  const TIMEOUT_IN_MS = 10000;
  const URL = {
    SEND: `https://21.javascript.pages.academy/kekstagram`,
    UPLOAD: `https://21.javascript.pages.academy/kekstagram/data`,
  };

  const onLoadRequest = (request, onLoad, onError) => {
    if (request.status === STATUS_CODE_OK) {
      onLoad(request.response);
    } else {
      onError(`Статус ответа: ${request.status} ${request.statusText}`);
    }
  };

  const onErrorRequest = (onError) => onError(`Произошла ошибка соединения`);
  const onTimeoutRequest = (onError) => onError(`Запрос не успел выполниться за ${TIMEOUT_IN_MS} мс`);

  const sendRequest = (onSuccess, onError, requestMethod, data) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    request.timeout = TIMEOUT_IN_MS;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError));
    const url = requestMethod === `POST` ? URL.SEND : URL.UPLOAD;
    request.open(requestMethod, url);
    request.send(data);
  };

  const upload = (onSuccess, onError) => sendRequest(onSuccess, onError, `GET`);
  const send = (data, onSuccess, onError) => sendRequest(onSuccess, onError, `POST`, data);

  window.backend = {
    upload,
    send,
  };
})();
