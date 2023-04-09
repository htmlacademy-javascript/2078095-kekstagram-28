
const isEscapeKey = (evt) => evt.key === 'Escape';

const TIMEOUT = 3000;
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

export {isEscapeKey,showAlert};
