import { isEscapeKey } from './util.js';

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

function validateHashtag(value){
  return hashtag.test(value);
}

function validateDescription(value){
  return value.length <= 140;
}

pristine.addValidator(hashtagInput,validateHashtag, 'Хэш-тэг не соответствует требованиям');
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
    } else{
      // eslint-disable-next-line no-use-before-define
      closeEditingForm();
    }
  }
};

const openEditingForm = function(){

  uploadFormModal.classList.remove('hidden');
  document.addEventListener('keydown',onDocumentKeydown);
  document.querySelector('body').classList.add('modal-open');

};

const closeEditingForm = function(){

  uploadFormModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
};

uploadInput.addEventListener('change',openEditingForm);
closeButton.addEventListener('click',closeEditingForm);


