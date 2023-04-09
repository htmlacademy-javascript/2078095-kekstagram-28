const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  SEND: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Ошибка при загрузке данных. Попробуйте обновить страницу',
  SEND: 'Ошибка при отправки формы. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => load(Route.GET, ErrorText.GET);

const sendData = (body) => load(Route.SEND, ErrorText.SEND, Method.POST, body);

export {getData, sendData};
