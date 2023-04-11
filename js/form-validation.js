import { isEscapeKey } from './util.js';
import {resetScale} from './scale.js';
import {resetEffect, hideSlider} from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadFormModal = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const uploadButton = uploadForm.querySelector('.img-upload__submit');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION = 140;

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

  if (value === ''){
    return true;
  }
  const str = value.toLowerCase().trim().replace(/\s+/g, ' ');
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

  if (hashtags.length > MAX_HASHTAGS){
    errorMessage = 'У картинки не может быть более 5 хэш-тегов';
    return false;
  }

  return true;
}

function validateDescription(value){
  return value.length <= MAX_DESCRIPTION;
}
function validateErrorMessage(){
  return errorMessage;
}

pristine.addValidator(hashtagInput,validateHashtag, validateErrorMessage);
pristine.addValidator(descriptionInput,validateDescription,'Текст комментария должен быть до 140 символов');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else if (document.activeElement === hashtagInput) {
      evt.stopPropagation();
    } else{
      closeEditingForm();
    }
  }
};

function openEditingForm (){

  hideSlider();
  uploadFormModal.classList.remove('hidden');
  document.addEventListener('keydown',onDocumentKeydown);
  document.querySelector('body').classList.add('modal-open');

}

function closeEditingForm (){

  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  uploadFormModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmit();
      await cb(new FormData(uploadForm));
      unblockSubmit();
    }
  });
};

function blockSubmit (){
  uploadButton.disabled = true;
  uploadButton.textContent = 'Публикую';
}

function unblockSubmit (){
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
}

uploadInput.addEventListener('change',openEditingForm);
closeButton.addEventListener('click',closeEditingForm);

export {onDocumentKeydown, closeEditingForm, setOnFormSubmit};
