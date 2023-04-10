
const isEscapeKey = (evt) => evt.key === 'Escape';

const TIMEOUT = 3000;
const RERENDER_DELAY = 500;
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

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {isEscapeKey,showAlert,getRandomInteger, debounce, RERENDER_DELAY};
