import { isEscapeKey } from './util.js';
import {resetScale} from './scale.js';
import {resetEffect, hideSlider} from './effects.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('#upload-file');
const uploadFormModal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm,{
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__description--error',
  errorClass: 'text__description--invalid',
  successClass: 'text__description--valid',
  errorTextTag: 'div',
});


let errorMessage = '';

function validateHashtag(value){

  const str = value.toLowerCase();
  const hashtags = str.split(' ');

  for (let i = 0; i < hashtags.length; i++){

    if (!hashtag.test(hashtags[i])){
      errorMessage = 'Хэш-тэг не соответствует требованиям';
      return false;
    }
    if (hashtags.indexOf(hashtags[i]) !== i){
      errorMessage = 'У картинки не может быть два одинаковых хэш-тега';
      return false;
    }
  }

  if (hashtags.length > 5){
    errorMessage = 'У картинки не может быть более 5 хэш-тегов';
    return false;
  }

  return true;
}

function validateDescription(value){
  return value.length <= 140;
}
function validateErrorMessage(){
  return errorMessage;
}

pristine.addValidator(hashtagInput,validateHashtag, validateErrorMessage);
pristine.addValidator(descriptionInput,validateDescription,'Текст комментария должен быть до 140 символов');


uploadForm.addEventListener('submit',(evt) =>{

  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid){
    return;
  }
  uploadForm.submit();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else if (document.activeElement === hashtagInput) {
      evt.stopPropagation();
    } else{
      // eslint-disable-next-line no-use-before-define
      closeEditingForm();
    }
  }
};

const openEditingForm = function(){

  hideSlider();
  uploadFormModal.classList.remove('hidden');
  document.addEventListener('keydown',onDocumentKeydown);
  document.querySelector('body').classList.add('modal-open');

};

const closeEditingForm = function(){

  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  uploadFormModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change',openEditingForm);
closeButton.addEventListener('click',closeEditingForm);


