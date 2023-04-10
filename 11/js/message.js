import {onDocumentKeydown} from './form-validation.js';
import { isEscapeKey } from './util.js';
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const body = document.querySelector('body');

const onSuccessAnywhereClick = (evt) => {
  if (evt.target === successMessage) {
    successMessage.remove();
    document.removeEventListener('click', onSuccessAnywhereClick);
    document.removeEventListener('keydown', onSuccessKeydown);
  }
};

const onErrorAnywhereClick = (evt) => {
  if (evt.target === errorMessage) {
    errorMessage.remove();
    document.removeEventListener('click', onErrorAnywhereClick);
    document.removeEventListener('keydown', onErrorKeydown);
  }
};

function onSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (successMessage) {
      successMessage.remove();
    }
  }
}

function onErrorKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorMessage) {
      errorMessage.remove();
      document.addEventListener('keydown', onDocumentKeydown);
    }
  }
}

const onSuccessButtonClick = () => {
  if (successMessage) {
    successMessage.remove();
  }
};

const onErrorButtonClick = () => {
  if (errorMessage) {
    errorMessage.remove();
  }
};

const showSuccessMessage = () => {
  successMessage.cloneNode(true);
  body.append(successMessage);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessAnywhereClick);
};


const showErrorMessage = () => {
  errorMessage.cloneNode(true);
  body.append(errorMessage);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorAnywhereClick);
};
successButton.addEventListener('click', onSuccessButtonClick);
errorButton.addEventListener('click', onErrorButtonClick);

export{showSuccessMessage, showErrorMessage};
