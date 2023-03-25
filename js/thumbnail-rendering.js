import {getImageDescriptions} from './data.js';

const pictures = document.querySelector('.pictures');
const photosDescriptions = getImageDescriptions();

const templateContent = document.querySelector('#picture').content;
const templatePicture = templateContent.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

photosDescriptions.forEach(({url, likes, comments}) => {
  const copyImage = templatePicture.cloneNode(true);
  copyImage.querySelector('.picture__img').src = url;
  copyImage.querySelector('.picture__likes').textContent = likes;
  copyImage.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.append(copyImage);
});

pictures.append(pictureListFragment);
