const pictures = document.querySelector('.pictures');
import {renderFullPhoto} from './fullsize-rendering.js';
import {getRandomInteger} from './util.js';
const templateContent = document.querySelector('#picture').content;
const templatePicture = templateContent.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();


const imageFilters = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

let showType = 'DEFAULT';

const filterButtons = document.querySelectorAll('.img-filters__button');

function setActiveButton(clickedButton) {

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  clickedButton.classList.add('img-filters__button--active');
}

const filterDefaultClick = (cb) => {
  buttonDefault.addEventListener('click',(evt) =>{
    showType = 'DEFAULT';
    setActiveButton(evt.target);
    cb();
  });
};

const filterRandomClick = (cb) => {
  buttonRandom.addEventListener('click',(evt) =>{
    showType = 'RANDOM';
    setActiveButton(evt.target);
    cb();
  });
};

const filterDiscussedClick = (cb) => {
  buttonDiscussed.addEventListener('click',(evt) =>{
    showType = 'DISCUSSED';
    setActiveButton(evt.target);
    cb();
  });
};

const filterImages = (data) => {

  if (showType === 'DEFAULT'){
    const copyMass = data.slice();
    return copyMass;
  }
  if (showType === 'RANDOM'){
    const copyMass = data.slice();
    copyMass.sort(() => getRandomInteger(-1, 1));
    return copyMass.slice(0,10);
  }
  if (showType === 'DISCUSSED'){
    const copyMass = data.slice();
    copyMass.sort((a, b) => b.comments.length - a.comments.length);
    return copyMass;
  }
};


const renderingPhotos = (ImagesData) => {

  const pictureElements = pictures.querySelectorAll('.picture');
  pictureElements.forEach((pictureElement) => {
    pictureElement.remove();
  });

  const sortData = filterImages(ImagesData);
  sortData
    .forEach((data) => {
      const copyImage = templatePicture.cloneNode(true);
      copyImage.querySelector('.picture__img').src = data.url;
      copyImage.querySelector('.picture__likes').textContent = data.likes;
      copyImage.querySelector('.picture__comments').textContent = data.comments.length;
      pictureListFragment.append(copyImage);
      const openFullSize = () => renderFullPhoto(data);
      copyImage.addEventListener('click', openFullSize);
    });
  pictures.append(pictureListFragment);
  imageFilters.classList.remove('img-filters--inactive');
};

export {renderingPhotos,filterDefaultClick,filterRandomClick,filterDiscussedClick};
