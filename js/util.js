const TIMEOUT = 3000;
const RERENDER_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

function showAlert (message) {

  const alertMessage = document.createElement('div');
  alertMessage.style.background = 'red';
  alertMessage.style.color = 'white';
  alertMessage.style.fontSize = '36px';
  alertMessage.style.padding = '10px';
  alertMessage.style.position = 'absolute';
  alertMessage.style.top = '0';
  alertMessage.style.left = '0';
  alertMessage.style.right = '0';
  alertMessage.textContent = message;
  alertMessage.style.textAlign = 'center';
  document.body.append(alertMessage);
  setTimeout(() => {
    alertMessage.remove();
  }, TIMEOUT);
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey,showAlert,getRandomInteger, debounce, RERENDER_DELAY};
